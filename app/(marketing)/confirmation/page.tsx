'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSiteSettings } from '@/lib/sanity-queries';
import { cleanPhoneNumber } from '@/lib/utils/phone';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [whatsappNumber, setWhatsappNumber] = useState("233000000000");

  const reference = searchParams.get('reference');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!reference || !email) {
      router.push('/rooms');
      return;
    }

    // Fetch both booking and settings
    Promise.all([
      fetchBookingData(),
      getSiteSettings()
    ]).then(([_, settings]) => {
      const rawNumber = settings?.whatsapp || settings?.whatsappNumbers?.main || "233000000000";
      setWhatsappNumber(cleanPhoneNumber(rawNumber));
    });
  }, [reference, email]);

  async function fetchBookingData() {
    try {
      const res = await fetch('/api/bookings/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, bookingReference: reference }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setBooking(data.booking);
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading confirmation...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <p className="text-neutral-600 mb-6">{error || 'Unable to find your booking'}</p>
          <Link href="/rooms" className="btn-primary">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <h1 className="text-4xl font-bold text-dark mb-3">Booking Confirmed! 🎉</h1>
          <p className="text-xl text-neutral-600">
            Your reservation at Miky Hillside Lodge is confirmed
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-200">
            <div>
              <div className="text-sm text-neutral-500 mb-1">Booking Reference</div>
              <div className="text-2xl font-bold text-orange">{booking.bookingReference}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-neutral-500 mb-1">Status</div>
              <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-sm">
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-dark mb-3">Room Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Room:</span>
                  <span className="font-medium">{booking.room.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Guests:</span>
                  <span className="font-medium">
                    {booking.adults} {booking.adults === 1 ? 'Adult' : 'Adults'}
                    {booking.children > 0 && `, ${booking.children} ${booking.children === 1 ? 'Child' : 'Children'}`}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-dark mb-3">Stay Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-in:</span>
                  <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Check-out:</span>
                  <span className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Total:</span>
                  <span className="font-bold text-orange">GH₵{booking.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <div className="mb-6">
              <h3 className="font-semibold text-dark mb-2">Special Requests</h3>
              <p className="text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
                {booking.specialRequests}
              </p>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-2xl">📋</div>
              <div>
                <div className="font-semibold text-dark mb-1">Save Your Booking Reference</div>
                <div className="text-sm text-neutral-600">
                  Please save <strong>{booking.bookingReference}</strong> - you&apos;ll need it to view your booking.
                  We will contact you via WhatsApp at <strong>{booking.guestPhone}</strong> to confirm.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-dark mb-6">What&apos;s Next?</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">Save Your Booking Reference</h3>
                <p className="text-sm text-neutral-600">
                  Keep <strong>{booking.bookingReference}</strong> handy. You&apos;ll need it to view or manage your booking.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">We&apos;ll Contact You</h3>
                <p className="text-sm text-neutral-600">
                  We&apos;ll reach out via WhatsApp to confirm your booking and provide check-in details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">Contact Us</h3>
                <p className="text-sm text-neutral-600">
                  Have questions? Contact us via WhatsApp or email. We&apos;re here to help!
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/rooms" className="btn-secondary flex-1 text-center">
            Book Another Room
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hello! I have a booking: ${booking.bookingReference}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 text-center"
          >
            Contact via WhatsApp
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full"></div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
