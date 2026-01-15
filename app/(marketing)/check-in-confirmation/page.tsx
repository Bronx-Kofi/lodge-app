'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

function CheckInConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const email = searchParams.get('email');

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

          <h1 className="text-4xl font-bold text-dark mb-3">Booking Confirmed</h1>
          <p className="text-xl text-neutral-600">
            Thank you for completing your pre-check-in information
          </p>
        </motion.div>

        {/* Confirmation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          {reference && (
            <div className="mb-6 pb-6 border-b border-neutral-200">
              <div className="text-sm text-neutral-500 mb-1">Reference Number</div>
              <div className="text-2xl font-bold text-orange">{reference}</div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">Form Received</h3>
                <p className="text-sm text-neutral-600">
                  We&apos;ve received your check-in information and our team is reviewing it
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">What&apos;s Next?</h3>
                <p className="text-sm text-neutral-600">
                  Our team will review your information and contact you via WhatsApp or phone to confirm your booking details
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">Smooth Check-In</h3>
                <p className="text-sm text-neutral-600">
                  When you arrive, your check-in will be quick and easy since we already have your information!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-2xl">📧</div>
              <div>
                <div className="font-semibold text-dark mb-1">Confirmation Email Sent</div>
                <div className="text-sm text-neutral-600">
                  A confirmation has been sent to <strong>{email}</strong>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <h2 className="text-2xl font-bold text-dark mb-6">Before Your Arrival</h2>

          <div className="space-y-4 text-sm text-neutral-700">
            <div className="flex gap-2">
              <span className="text-orange font-bold">•</span>
              <span>Keep your reference number handy: <strong>{reference}</strong></span>
            </div>
            <div className="flex gap-2">
              <span className="text-orange font-bold">•</span>
              <span>Check-in time is from 2:00 PM</span>
            </div>
            <div className="flex gap-2">
              <span className="text-orange font-bold">•</span>
              <span>Please bring a valid ID or passport</span>
            </div>
            <div className="flex gap-2">
              <span className="text-orange font-bold">•</span>
              <span>We&apos;ll contact you if we need any additional information</span>
            </div>
            <div className="flex gap-2">
              <span className="text-orange font-bold">•</span>
              <span>If you need to make changes, contact us via WhatsApp</span>
            </div>
          </div>
        </motion.div>

        {/* Visa Receipt Section */}
        {reference && email && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6"
          >
            <div className="flex gap-4 items-start">
              <div className="text-4xl">🛂</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-dark mb-2">
                  Need a Visa Application Receipt?
                </h3>
                <p className="text-sm text-neutral-700 mb-4">
                  Download your embassy-compliant booking confirmation for visa applications. 
                  Accepted by embassies worldwide including Schengen, US, UK, Canada, and Australia.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/receipt?reference=${reference}&email=${encodeURIComponent(email)}`}
                    className="btn-secondary text-center"
                  >
                    📄 View Standard Receipt
                  </Link>
                  <Link
                    href={`/receipt/visa?reference=${reference}&email=${encodeURIComponent(email)}`}
                    className="btn-primary text-center"
                  >
                    🛂 Get Visa Application Receipt
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/" className="btn-secondary flex-1 text-center">
            Back to Home
          </Link>
          <Link href="/rooms" className="btn-primary flex-1 text-center">
            Explore Our Rooms
          </Link>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-neutral-600">
            Questions? Need to make changes?
          </p>
          <p className="text-sm text-neutral-600 mt-1">
            Contact us via WhatsApp or call us directly
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function CheckInConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full"></div>
      </div>
    }>
      <CheckInConfirmationContent />
    </Suspense>
  );
}
