'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { getSiteSettings } from '@/lib/sanity-queries';

function VisaReceiptContent() {
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

  const handleDownloadPDF = () => {
    // Use browser's print dialog with PDF save option
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading visa confirmation...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Confirmation Not Found</h1>
          <p className="text-neutral-600 mb-6">{error || 'Unable to find your booking'}</p>
        </div>
      </div>
    );
  }

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  const issueDate = new Date();

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
    <div className="min-h-screen bg-neutral-100 pt-24 pb-8 print:bg-white print:py-0">
      {/* Action Bar - Hidden on print */}
      <div className="print:hidden sticky top-[72px] sm:top-[80px] z-40 bg-neutral-100/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
          <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h2 className="font-semibold text-dark text-base sm:text-lg">
                  Hotel Booking Confirmation for Visa Application
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                  Reference: {booking.bookingReference}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full md:w-[360px] md:justify-end">
                <button
                  onClick={handleDownloadPDF}
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
                  onClick={handlePrint}
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
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visa Confirmation Document */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 print:px-0" ref={receiptRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg print:shadow-none"
        >
          {/* Official Header */}
          <div className="border-b-4 border-orange p-8 print:p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center px-5 py-2 bg-orange text-white font-semibold text-xs tracking-widest uppercase rounded-sm mb-4 leading-none">
                Official Document
              </div>
              <h1 className="text-2xl font-bold text-dark uppercase tracking-wide">
                Hotel Booking Confirmation
              </h1>
              <p className="text-lg font-semibold text-neutral-600 mt-1">
                For Visa Application Purposes
              </p>
            </div>

            <div className="border-2 border-neutral-300 p-4 bg-neutral-50">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-bold text-dark text-lg mb-2">
                    {siteSettings?.title || 'Miky Hillside Lodge'}
                  </div>
                  <div className="text-sm space-y-1 text-neutral-700">
                    <div>{siteSettings?.address || 'Dumasua, Sunyani, Ghana'}</div>
                    {siteSettings?.phone && <div>Tel: {siteSettings.phone}</div>}
                    {siteSettings?.email && <div>Email: {siteSettings.email}</div>}
                    {siteSettings?.whatsapp && <div>WhatsApp: {siteSettings.whatsapp}</div>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-500 mb-1">Confirmation Number</div>
                  <div className="text-xl font-bold text-orange mb-3">
                    {booking.receiptNumber || booking.bookingReference}
                  </div>
                  <div className="text-sm text-neutral-500 mb-1">Booking Reference</div>
                  <div className="text-lg font-semibold text-dark mb-3">
                    {booking.bookingReference}
                  </div>
                  <div className="text-sm text-neutral-500">Issue Date</div>
                  <div className="font-medium text-dark">{formatDate(issueDate)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Statement */}
          <div className="p-8 print:p-6 bg-orange-50 border-b border-neutral-200">
            <h2 className="text-center font-bold text-dark text-lg mb-4">TO WHOM IT MAY CONCERN</h2>
            <div className="text-neutral-800 leading-relaxed space-y-3">
              <p>
                This is to confirm that <strong>{booking.guestName}</strong>
                {booking.passportNumber && <>, holding passport number <strong>{booking.passportNumber}</strong></>}
                {booking.nationality && <>, nationality <strong>{booking.nationality}</strong></>},
                has a <strong className="text-orange">CONFIRMED AND GUARANTEED</strong> reservation at{' '}
                <strong>{siteSettings?.title || 'Miky Hillside Lodge'}</strong>.
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-4 p-4 bg-white border-l-4 border-orange">
                <div>
                  <div className="text-sm text-neutral-500">Check-in Date</div>
                  <div className="font-bold text-dark">{formatFullDate(checkInDate)}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Check-out Date</div>
                  <div className="font-bold text-dark">{formatFullDate(checkOutDate)}</div>
                </div>
              </div>
              <p>
                <strong>Duration of stay:</strong> {nights} {nights === 1 ? 'night' : 'nights'}
              </p>
              <p>
                <strong>Accommodation type:</strong> {booking.room.title}
              </p>
              <p>
                This booking is <strong className="text-green-600">CONFIRMED</strong> and the guest is expected to arrive on the specified check-in date.
              </p>
            </div>
          </div>

          {/* Guest Information */}
          <div className="p-8 print:p-6 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-dark mb-4 pb-2 border-b-2 border-orange">
              Guest Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Full Name:</div>
                  <div className="flex-1 font-medium text-dark">{booking.guestName}</div>
                </div>
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Email:</div>
                  <div className="flex-1 font-medium text-dark">{booking.guestEmail}</div>
                </div>
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Phone:</div>
                  <div className="flex-1 font-medium text-dark">{booking.guestPhone}</div>
                </div>
              </div>
              <div className="space-y-3">
                {booking.nationality && (
                  <div className="flex">
                    <div className="w-40 text-sm text-neutral-600 font-semibold">Nationality:</div>
                    <div className="flex-1 font-medium text-dark">{booking.nationality}</div>
                  </div>
                )}
                {booking.passportNumber && (
                  <div className="flex">
                    <div className="w-40 text-sm text-neutral-600 font-semibold">Passport No:</div>
                    <div className="flex-1 font-medium text-dark">{booking.passportNumber}</div>
                  </div>
                )}
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">No. of Guests:</div>
                  <div className="flex-1 font-medium text-dark">
                    {booking.adults} {booking.adults === 1 ? 'Adult' : 'Adults'}
                    {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? 'Child' : 'Children'}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accommodation Details */}
          <div className="p-8 print:p-6 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-dark mb-4 pb-2 border-b-2 border-orange">
              Accommodation Details
            </h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Room Type:</div>
                  <div className="flex-1 font-medium text-dark">{booking.room.title}</div>
                </div>
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Check-in Time:</div>
                  <div className="flex-1 font-medium text-dark">From 2:00 PM</div>
                </div>
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Check-out Time:</div>
                  <div className="flex-1 font-medium text-dark">Until 12:00 PM</div>
                </div>
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Total Nights:</div>
                  <div className="flex-1 font-medium text-dark">{nights}</div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-neutral-50 rounded border border-neutral-200">
                <div className="text-sm text-neutral-600 font-semibold mb-2">Booking Status:</div>
                <div className="flex items-center gap-2">
                  <span className="inline-block px-4 py-1 bg-green-600 text-white rounded font-bold text-sm">
                    CONFIRMED
                  </span>
                  <span className="text-sm text-neutral-600">
                    ({booking.status.charAt(0).toUpperCase() + booking.status.slice(1)})
                  </span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                <div className="text-sm text-green-800 font-semibold">Cancellation Policy:</div>
                <div className="text-sm text-green-700 mt-1">
                  This is a guaranteed reservation. The booking is fully confirmed and the guest is expected on the specified dates.
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-8 print:p-6 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-dark mb-4 pb-2 border-b-2 border-orange">
              Payment Summary
            </h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Room Rate:</div>
                  <div className="flex-1 font-medium text-dark">
                    {booking.room?.price
                      ? `GH₵ ${booking.room.price.toLocaleString()} per night`
                      : booking.totalPrice && nights > 0
                        ? `GH₵ ${Math.round(booking.totalPrice / nights).toLocaleString()} per night`
                        : 'Standard rate'}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-40 text-sm text-neutral-600 font-semibold">Number of Nights:</div>
                  <div className="flex-1 font-medium text-dark">{nights}</div>
                </div>
              </div>
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-dark">Total Amount:</div>
                  <div className="text-xl font-bold text-orange">
                    {booking.totalPrice
                      ? `GH₵ ${booking.totalPrice.toLocaleString()}`
                      : booking.room?.price
                        ? `GH₵ ${(booking.room.price * nights).toLocaleString()}`
                        : 'Amount on file'}
                  </div>
                </div>
                {booking.totalPrice && nights > 0 && (
                  <div className="text-sm text-neutral-500 text-right mt-1">
                    (GH₵ {Math.round(booking.totalPrice / nights).toLocaleString()} × {nights} nights)
                  </div>
                )}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded border border-green-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-green-800">
                    {booking.paymentStatus === 'paid'
                      ? 'Payment Received - Fully Prepaid'
                      : booking.paymentStatus === 'partial'
                        ? 'Deposit Received - Balance Due at Check-in'
                        : 'Confirmed - Payment Due at Property'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Information */}
          <div className="p-8 print:p-6 border-b-2 border-neutral-300 bg-neutral-50">
            <h3 className="text-lg font-bold text-dark mb-4 pb-2 border-b-2 border-orange">
              Verification &amp; Contact Information
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 border border-neutral-200 rounded">
                <div className="text-sm font-semibold text-neutral-700 mb-3">
                  For verification of this booking confirmation, embassies and consulates may contact us at:
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {siteSettings?.phone && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="font-medium">{siteSettings.phone}</span>
                    </div>
                  )}
                  {siteSettings?.email && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{siteSettings.email}</span>
                    </div>
                  )}
                  {siteSettings?.whatsapp && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      <span className="font-medium">{siteSettings.whatsapp}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-sm text-neutral-600 space-y-2">
                <div className="flex gap-2">
                  <span className="text-orange">•</span>
                  <span>Quote <strong>Booking Reference: {booking.bookingReference}</strong> or <strong>Confirmation Number: {booking.receiptNumber || booking.bookingReference}</strong> for verification</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-orange">•</span>
                  <span>We are available 24/7 to verify this booking confirmation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Authorization Section */}
          <div className="p-8 print:p-6 border-b border-neutral-200">
            <h3 className="text-lg font-bold text-dark mb-4">Authorization</h3>
            <div className="space-y-4">
              <p className="text-sm text-neutral-700">
                This document is electronically generated and issued by {siteSettings?.title || 'Miky Hillside Lodge'}.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <div className="text-sm text-neutral-600 mb-2">Issued By:</div>
                  <div className="font-semibold text-dark">{siteSettings?.title || 'Miky Hillside Lodge'}</div>
                  <div className="text-sm text-neutral-600 mt-1">{siteSettings?.address || 'Dumasua, Sunyani, Ghana'}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-600 mb-2">Date of Issue:</div>
                  <div className="font-semibold text-dark">{formatFullDate(issueDate)}</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-neutral-300">
                <div className="text-sm text-neutral-600 font-semibold mb-6">Official Seal</div>

                <div className="flex justify-center md:justify-start">
                  <div className="relative group">
                    {/* Seal Container */}
                    <div className="w-64 h-64 rounded-full border-4 border-neutral-800 flex flex-col items-center justify-center p-6 text-center relative bg-white shrink-0">
                      {/* Inner Ring (Decorative) */}
                      <div className="absolute inset-2 rounded-full border border-neutral-800 opacity-50"></div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                        <div className="uppercase font-bold text-xs tracking-[0.2em] text-neutral-800 mb-1">
                          {siteSettings?.title || 'Miky Hillside Lodge'}
                        </div>

                        <div className="text-[10px] uppercase tracking-wider text-neutral-600 mb-4">
                          Official Confirmation
                        </div>

                        {/* Signature - Centered and prominent */}
                        <div className="relative w-56 h-24 my-1">
                          <Image
                            src="/sig.png"
                            alt="Authorized signature"
                            fill
                            className="object-contain" // Changed from object-contain to be safer, but contain is good
                            sizes="(max-width: 768px) 100vw, 224px"
                            priority
                          />
                        </div>

                        <div className="w-32 h-px bg-neutral-800/20 my-2"></div>

                        <div className="text-[10px] font-medium text-neutral-600 uppercase tracking-widest">
                          {formatDate(issueDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Footer */}
          <div className="p-6 print:p-4 bg-dark text-white text-center">
            <p className="text-sm font-semibold mb-2">
              OFFICIAL BOOKING CONFIRMATION
            </p>
            <p className="text-xs text-neutral-400">
              {siteSettings?.title || 'Miky Hillside Lodge'} • {siteSettings?.address || 'Dumasua, Sunyani, Ghana'}
            </p>
            <p className="text-xs text-neutral-400 mt-2">
              Document Reference: {booking.bookingReference} • Issued: {formatDate(issueDate)}
            </p>
            <p className="text-xs text-neutral-500 mt-3">
              This is an electronically generated document and is valid without physical signature
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

export default function VisaReceiptPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full"></div>
      </div>
    }>
      <VisaReceiptContent />
    </Suspense>
  );
}
