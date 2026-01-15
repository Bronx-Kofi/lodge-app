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
  const pricePerNight = nights > 0 ? booking.totalPrice / nights : booking.totalPrice;

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
      <div className="max-w-4xl mx-auto px-6 mb-6 print:hidden">
        <div className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-dark">Reservation Receipt</h2>
            <p className="text-sm text-neutral-600">Reference: {booking.bookingReference}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
            <a
              href={`/receipt/visa?reference=${reference}&email=${email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Visa Application Version
            </a>
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
                {booking.nationality && (
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Nationality</div>
                    <div className="font-medium text-dark">{booking.nationality}</div>
                  </div>
                )}
                {booking.passportNumber && (
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Passport Number</div>
                    <div className="font-medium text-dark">{booking.passportNumber}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Booking Reference</div>
                  <div className="font-bold text-orange">{booking.bookingReference}</div>
                </div>
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
                  <div className="font-semibold text-dark">{nights} {nights === 1 ? 'Night' : 'Nights'}</div>
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
                    GH₵{pricePerNight.toLocaleString()} × {nights} {nights === 1 ? 'night' : 'nights'}
                  </div>
                </div>
                <div className="font-semibold text-dark">
                  GH₵{booking.totalPrice.toLocaleString()}
                </div>
              </div>
              <div className="border-t-2 border-neutral-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-dark">Total Amount</div>
                  <div className="text-2xl font-bold text-orange">
                    GH₵{booking.totalPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-sm text-neutral-600 mt-2">
                  Payment Status: <span className="font-semibold capitalize">{booking.paymentStatus || 'Pending'}</span>
                </div>
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
                <span>For international guests: This receipt can be used for visa application purposes.</span>
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

      {/* Print Footer Note */}
      <div className="max-w-4xl mx-auto px-6 mt-6 print:hidden">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <div className="font-semibold mb-2">🛂 Need this for Visa Application?</div>
          <p className="mb-3">
            This receipt is embassy-compliant, but we have a <strong>dedicated visa application version</strong> with enhanced formatting specifically designed for embassies and consulates.
          </p>
          <a
            href={`/receipt/visa?reference=${reference}&email=${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Get Visa Application Version
          </a>
        </div>
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
