'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

function ReceiptDownloadContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasData, setHasData] = useState(false);

  const reference = searchParams.get('reference');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!reference || !email) {
      setError('Missing booking information');
      setLoading(false);
      return;
    }

    // Verify the booking exists
    setHasData(true);
    setLoading(false);
  }, [reference, email]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading receipt options...</p>
        </div>
      </div>
    );
  }

  if (error || !hasData) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-4">Information Required</h1>
          <p className="text-neutral-600 mb-6">
            We need your booking reference and email to display your receipt options.
          </p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Reservation Receipt Options
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Choose the receipt format that best meets your needs
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
            <span className="text-sm font-medium text-neutral-600">Reference:</span>
            <span className="text-sm font-bold text-dark">{reference}</span>
          </div>
        </motion.div>

        {/* Receipt Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Standard Receipt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dark mb-2">Standard Receipt</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Your complete reservation confirmation with all booking details and pricing information.
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Complete booking details</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Price breakdown</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Guest information</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Print or download as PDF</span>
                </div>
              </div>

              <Link
                href={`/receipt?reference=${reference}&email=${encodeURIComponent(email!)}`}
                className="block w-full text-center px-6 py-3 bg-neutral-100 text-dark rounded-lg hover:bg-neutral-200 transition-colors font-medium"
              >
                View Standard Receipt
              </Link>
            </div>
          </motion.div>

          {/* Visa Application Receipt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border-2 border-orange overflow-hidden hover:shadow-md transition-shadow relative"
          >
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 bg-orange text-white text-xs font-bold rounded-full">
                EMBASSY COMPLIANT
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 pr-20">
                  <h3 className="text-xl font-bold text-dark mb-2">Visa Application Receipt</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Official embassy-compliant confirmation for visa applications worldwide.
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Embassy-standard formatting</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Official confirmation statement</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Verification contact details</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-neutral-700">Accepted by Schengen, US, UK, Canada, Australia</span>
                </div>
              </div>

              <Link
                href={`/receipt/visa?reference=${reference}&email=${encodeURIComponent(email!)}`}
                className="block w-full text-center px-6 py-3 bg-orange text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                View Visa Receipt
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Information Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-dark mb-2">Download Instructions</h4>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li>• Both receipts can be printed or saved as PDF</li>
                <li>• Use the Print function in your browser and select "Save as PDF"</li>
                <li>• For visa applications, embassies may verify your booking by contacting us directly</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-neutral-600 hover:text-dark transition-colors">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ReceiptDownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full"></div>
      </div>
    }>
      <ReceiptDownloadContent />
    </Suspense>
  );
}
