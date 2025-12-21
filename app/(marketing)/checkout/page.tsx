'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get booking params
  const roomId = searchParams.get('roomId');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [pricing, setPricing] = useState<any>(null);
  const [room, setRoom] = useState<any>(null);

  useEffect(() => {
    if (!roomId || !checkIn || !checkOut) {
      router.push('/rooms');
      return;
    }
    
    // Fetch room details and pricing
    fetchCheckoutData();
  }, [roomId, checkIn, checkOut]);

  async function fetchCheckoutData() {
    try {
      // Fetch pricing
      const pricingRes = await fetch('/api/pricing/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          checkIn,
          checkOut,
          adults: parseInt(adults || '1'),
          children: parseInt(children || '0'),
        }),
      });
      
      const pricingData = await pricingRes.json();
      if (pricingData.error) {
        setError(pricingData.error);
        return;
      }
      setPricing(pricingData);

      // Fetch room details (we'll need to create this query)
      // For now, use pricing data which has room title
      setRoom({ title: pricingData.roomTitle });
    } catch (err) {
      console.error('Error fetching checkout data:', err);
      setError('Failed to load booking details');
    }
  }

  async function handleSubmit() {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId,
          guestName: `${formData.firstName} ${formData.lastName}`,
          guestEmail: formData.email,
          guestPhone: formData.phone,
          checkIn,
          checkOut,
          adults: parseInt(adults || '1'),
          children: parseInt(children || '0'),
          specialRequests: formData.specialRequests,
          totalPrice: pricing?.total || 0,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      // Redirect to confirmation page
      router.push(`/confirmation?reference=${data.booking.bookingReference}&email=${formData.email}`);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!pricing || !room) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-paper to-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <StepIndicator number={1} active={step === 1} completed={step > 1} label="Details" />
          <div className="w-16 h-px bg-neutral-300" />
          <StepIndicator number={2} active={step === 2} completed={step > 2} label="Payment" />
          <div className="w-16 h-px bg-neutral-300" />
          <StepIndicator number={3} active={step === 3} label="Confirm" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-md"
                >
                  <h2 className="text-2xl font-bold mb-6 text-dark">Guest Information</h2>

                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                        placeholder="john.doe@example.com"
                        required
                      />
                      <p className="text-xs text-neutral-500 mt-1">
                        Booking confirmation will be sent to this email
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                        placeholder="+233 XX XXX XXXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all h-24 resize-none"
                        placeholder="Any special requirements or requests..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                    className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-md"
                >
                  <h2 className="text-2xl font-bold mb-6 text-dark">Payment</h2>

                  {/* Placeholder for payment integration */}
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center mb-6">
                    <div className="text-6xl mb-4">💳</div>
                    <h3 className="text-xl font-semibold mb-2">Payment Integration</h3>
                    <p className="text-neutral-600 mb-6">
                      Stripe payment form will be integrated here
                    </p>
                    <p className="text-sm text-neutral-500">
                      For now, proceed to complete the booking
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-ghost flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Complete Booking'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-dark">Booking Summary</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b border-neutral-200">
                <div>
                  <div className="text-sm text-neutral-500">Room</div>
                  <div className="font-semibold">{room.title}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-neutral-500">Check-in</div>
                    <div className="font-semibold text-sm">{checkIn}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500">Check-out</div>
                    <div className="font-semibold text-sm">{checkOut}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-neutral-500">Guests</div>
                  <div className="font-semibold">
                    {adults} {parseInt(adults || '1') === 1 ? 'Adult' : 'Adults'}
                    {children && parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? 'Child' : 'Children'}`}
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm mb-4 pb-4 border-b border-neutral-200">
                <div className="flex justify-between">
                  <span>GH₵{pricing.baseRate} × {pricing.nights} nights</span>
                  <span>GH₵{pricing.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>GH₵{pricing.cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>GH₵{pricing.serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>GH₵{pricing.taxes}</span>
                </div>
              </div>

              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total (GH₵)</span>
                <span className="text-orange">GH₵{pricing.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ number, active, completed, label }: any) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
          completed ? 'bg-green-500 text-white' : ''
        } ${active ? 'bg-orange text-white ring-4 ring-orange-100' : ''} ${
          !active && !completed ? 'bg-neutral-200 text-neutral-500' : ''
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span className="text-xs mt-2 font-medium">{label}</span>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-orange border-t-transparent rounded-full"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
