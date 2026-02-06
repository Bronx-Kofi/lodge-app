'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getSiteSettings } from '@/lib/sanity-queries';

function ReceiptContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const reference = searchParams.get('reference');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!reference || !email) {
      router.push('/rooms');
      return;
    }

    fetchData();
  }, [reference, email]);

  async function fetchData() {
    try {
      const [bookingRes, settings] = await Promise.all([
        fetch('/api/bookings/receipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, bookingReference: reference }),
        }),
        getSiteSettings(),
      ]);

      const bookingData = await bookingRes.json();

      if (bookingData.error) {
        setError(bookingData.error);
        return;
      }

      setBooking(bookingData.booking);
      setSiteSettings(settings);
    } catch (err) {
      console.error('Error fetching receipt:', err);
      setError('Failed to load receipt');
    } finally {
      setLoading(false);
    }
  }

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Receipt Not Found</h1>
          <p className="text-neutral-600 mb-6">{error || 'Unable to find your receipt'}</p>
        </div>
      </div>
    );
  }

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Validate dates
  const hasValidDates = checkOutDate > checkInDate && nights > 0;
  
  const computedTotal =
    typeof booking.totalPrice === 'number' && booking.totalPrice > 0
      ? booking.totalPrice
      : null;

  // Use stored roomPricePerNight first, then try room.finalPrice, fallback to calculating from total
  const pricePerNight =
    booking.roomPricePerNight ||
    booking.room?.finalPrice ||
    booking.room?.price ||
    (computedTotal && nights > 0 && booking.numberOfRooms > 0
      ? Math.round(computedTotal / nights / booking.numberOfRooms)
      : 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-8 print:bg-white print:py-0">
      {/* Print Actions - Hidden on print */}
      <div className="print:hidden sticky top-[72px] sm:top-[80px] z-40 bg-neutral-100/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h2 className="font-semibold text-dark text-base sm:text-lg">Reservation Receipt</h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">Reference: {booking.bookingReference}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full md:w-[360px] md:justify-end">
                <button
                  onClick={handlePrint}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </button>

                <button
                  onClick={() => window.open(`/receipt/visa?reference=${reference}&email=${email}`, '_blank')}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View Visa Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Document */}
      <div className="max-w-4xl mx-auto px-6 print:px-0" ref={receiptRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg print:shadow-none"
        >
          {/* Header */}
          <div className="border-b-4 border-orange p-8 print:p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-dark mb-2">
                  {siteSettings?.title || 'Miky Hillside Lodge'}
                </h1>
                <p className="text-neutral-600 max-w-md">
                  {siteSettings?.address || 'Dumasua, Sunyani, Ghana'}
                </p>
                {siteSettings?.phone && (
                  <p className="text-neutral-600">Tel: {siteSettings.phone}</p>
                )}
                {siteSettings?.email && (
                  <p className="text-neutral-600">Email: {siteSettings.email}</p>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-500 mb-1">Receipt Number</div>
                <div className="text-2xl font-bold text-orange">
                  {booking.receiptNumber || booking.bookingReference}
                </div>
                <div className="text-sm text-neutral-500 mt-2">
                  Issued: {formatDate(new Date(booking.receiptIssuedAt || booking.createdAt))}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange p-4">
              <h2 className="text-xl font-bold text-dark mb-1">RESERVATION RECEIPT</h2>
              <p className="text-sm text-neutral-600">
                Official confirmation for accommodation booking
              </p>
            </div>
          </div>

          {/* Guest Information */}
          <div className="p-8 print:p-6 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Guest Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Full Name</div>
                  <div className="font-semibold text-dark">{booking.guestName}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Email Address</div>
                  <div className="font-medium text-dark">{booking.guestEmail}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Phone Number</div>
                  <div className="font-medium text-dark">{booking.guestPhone}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Booking Reference</div>
                  <div className="font-bold text-orange">{booking.bookingReference}</div>
                </div>
                {booking.nationality && (
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Nationality</div>
                    <div className="font-medium text-dark">{booking.nationality}</div>
                  </div>
                )}
                {(booking.ghanaCardNumber || booking.passportNumber) && (
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">
                      {booking.ghanaCardNumber ? 'Ghana Card Number' : 'Passport Number'}
                    </div>
                    <div className="font-medium text-dark">
                      {booking.ghanaCardNumber || booking.passportNumber}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="p-8 print:p-6 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Reservation Details
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Accommodation</div>
                  <div className="font-semibold text-dark">{booking.room.title}</div>
                  {booking.room.tagline && (
                    <div className="text-sm text-neutral-600">{booking.room.tagline}</div>
                  )}
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Check-in Date</div>
                  <div className="font-medium text-dark">{formatFullDate(checkInDate)}</div>
                  <div className="text-sm text-neutral-600">From 2:00 PM</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Check-out Date</div>
                  <div className="font-medium text-dark">{formatFullDate(checkOutDate)}</div>
                  <div className="text-sm text-neutral-600">Until 12:00 PM</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Number of Nights</div>
                  <div className="font-semibold text-dark">
                    {hasValidDates ? (
                      <>{nights} {nights === 1 ? 'Night' : 'Nights'}</>
                    ) : (
                      <span className="text-red-600">Invalid dates</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Number of Guests</div>
                  <div className="font-medium text-dark">
                    {booking.adults} {booking.adults === 1 ? 'Adult' : 'Adults'}
                    {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? 'Child' : 'Children'}`}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Booking Status</div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {booking.specialRequests && (
              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <div className="text-sm text-neutral-500 mb-2">Special Requests</div>
                <div className="text-sm text-dark">{booking.specialRequests}</div>
              </div>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="p-8 print:p-6 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Pricing Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2">
                <div>
                  <div className="font-medium text-dark">Room Rate</div>
                  <div className="text-sm text-neutral-600">
                    {hasValidDates && pricePerNight > 0 ? (
                      booking.numberOfRooms > 1 
                        ? `${booking.numberOfRooms} ${booking.numberOfRooms === 1 ? 'room' : 'rooms'} × ${nights} ${nights === 1 ? 'night' : 'nights'} @ GH₵${pricePerNight.toLocaleString()}/night`
                        : `${nights} ${nights === 1 ? 'night' : 'nights'} @ GH₵${pricePerNight.toLocaleString()}/night`
                    ) : (
                      <span className="text-amber-600">Price not set. Please contact us.</span>
                    )}
                  </div>
                </div>
                <div className="font-semibold text-dark">
                  {hasValidDates && computedTotal != null && computedTotal > 0 ? `GH₵${computedTotal.toLocaleString()}` : <span className="text-amber-600 text-sm">TBD</span>}
                </div>
              </div>
              
              <div className="border-t-2 border-neutral-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-dark">Total Amount</div>
                  <div className="text-2xl font-bold text-orange">
                    {hasValidDates && computedTotal != null && computedTotal > 0 ? `GH₵${computedTotal.toLocaleString()}` : <span className="text-amber-600">To Be Determined</span>}
                  </div>
                </div>

                {/* Partial Payment Display */}
                {booking.amountPaid && booking.amountPaid > 0 ? (
                  <>
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <div className="font-semibold text-green-700">Amount Paid</div>
                          {booking.paymentMethod && (
                            <div className="text-sm text-neutral-600">
                              via {booking.paymentMethod === 'telecel' ? 'Telecel Cash' :
                                   booking.paymentMethod === 'mtn' ? 'MTN Mobile Money' :
                                   booking.paymentMethod === 'vodafone' ? 'Vodafone Cash' :
                                   booking.paymentMethod === 'bank_transfer' ? 'Bank Transfer' :
                                   booking.paymentMethod === 'cash' ? 'Cash' :
                                   booking.paymentMethod === 'card' ? 'Card' :
                                   booking.paymentMethod}
                            </div>
                          )}
                          {booking.paymentReference && (
                            <div className="text-xs text-neutral-500">
                              Ref: {booking.paymentReference}
                            </div>
                          )}
                        </div>
                        <div className="text-xl font-bold text-green-700">
                          GH₵ {booking.amountPaid.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-2 border-orange">
                        <div>
                          <div className="text-lg font-bold text-dark">
                            {booking.amountPaid >= computedTotal ? 'Status: Paid in Full ✓' : 'Balance Due'}
                          </div>
                          <div className="text-sm text-neutral-600">
                            {booking.paymentStatus === 'paid' ? 'Payment Complete' : 
                             booking.paymentStatus === 'partial' ? 'Partial Payment Received' :
                             'Payment Required'}
                          </div>
                        </div>
                        <div className={`text-2xl font-bold ${
                          booking.amountPaid >= computedTotal ? 'text-green-600' : 'text-orange'
                        }`}>
                          GH₵ {Math.max(0, computedTotal - booking.amountPaid).toLocaleString()}
                        </div>
                      </div>

                      {booking.paymentNotes && (
                        <div className="mt-3 text-sm text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                          <span className="font-semibold">Payment Notes:</span> {booking.paymentNotes}
                        </div>
                      )}
                    </div>

                    {/* Legacy telecel payment info - kept for backward compatibility */}
                    {booking.paymentDeclaration === 'paid_telecel' && !booking.paymentMethod && (
                      <div className="mt-3 text-sm text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                        <div className="font-semibold text-neutral-800 mb-1">Payment Information</div>
                        <div>Method: Telecel Cash (Mobile Money)</div>
                        <div>Paid To: 0201449457</div>
                        {booking.telecelPaymentNumber && <div>Sender Number: {booking.telecelPaymentNumber}</div>}
                        {booking.telecelTransactionId && <div>Transaction ID: {booking.telecelTransactionId}</div>}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-sm text-neutral-600 mt-2">
                    Payment Status: <span className="font-semibold">{booking.paymentStatus === 'paid' ? 'Paid' : booking.paymentStatus === 'partial' ? 'Deposit Paid' : 'Reservation Confirmed'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="p-8 print:p-6 bg-neutral-50">
            <h3 className="text-lg font-bold text-dark mb-4">Important Information</h3>
            <div className="space-y-2 text-sm text-neutral-700">
              <div className="flex gap-2">
                <span className="text-orange font-bold">•</span>
                <span>This receipt confirms your reservation at Miky Hillside Lodge.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-orange font-bold">•</span>
                <span>Check-in time is from 2:00 PM. Early check-in subject to availability.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-orange font-bold">•</span>
                <span>Check-out time is 12:00 PM. Late check-out may incur additional charges.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-orange font-bold">•</span>
                <span>Please bring a valid photo ID and this receipt upon check-in.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-orange font-bold">•</span>
                <span>Cancellation policy: Please contact us at least 48 hours before check-in for cancellations.</span>
              </div>
            </div>

            <div className="mt-6 p-4 border-2 border-orange rounded-lg bg-white">
              <div className="font-bold text-dark mb-2">Contact Us</div>
              <div className="text-sm space-y-1 text-neutral-700">
                {siteSettings?.phone && <div>Phone: {siteSettings.phone}</div>}
                {siteSettings?.whatsapp && <div>WhatsApp: {siteSettings.whatsapp}</div>}
                {siteSettings?.email && <div>Email: {siteSettings.email}</div>}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 print:p-4 bg-dark text-white text-center">
            <p className="text-sm">
              This is an official receipt from {siteSettings?.title || 'Miky Hillside Lodge'}
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              Receipt generated on {formatFullDate(new Date())}
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              For verification, please contact us with reference: {booking.bookingReference}
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full"></div>
      </div>
    }>
      <ReceiptContent />
    </Suspense>
  );
}
