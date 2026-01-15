'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PaymentSection } from './_payment-section';

export default function CheckInFormPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function loadRooms() {
      try {
        setRoomsLoading(true);
        const res = await fetch('/api/rooms/list');
        const data = await res.json();
        if (!mounted) return;

        if (data?.success && Array.isArray(data.rooms)) {
          setRooms(data.rooms);
        }
      } catch (e) {
        // Non-blocking; guest can still submit with booking reference or free-text preference
        console.error('Failed to load rooms list', e);
      } finally {
        if (mounted) setRoomsLoading(false);
      }
    }

    loadRooms();

    return () => {
      mounted = false;
    };
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [rooms, setRooms] = useState<Array<{ _id: string; title: string; price: number; capacity?: number }>>([]);
  const [roomsLoading, setRoomsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: '',
    dateOfBirth: '',
    
    // Booking Details
    bookingReference: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    roomPreference: '',
    selectedRoomId: '',
    selectedRoomTitle: '',
    nightlyRate: 0,

    paymentDeclaration: 'not_paid' as 'paid_telecel' | 'not_paid',
    telecelPaymentNumber: '',
    telecelTransactionId: '',
    amountPaid: 0,
    paymentNotes: '',
    
    // Additional Information
    specialRequests: '',
    arrivalTime: '',
    needsPickup: false,
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    
    // Visa Receipt
    needsVisaReceipt: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.needsVisaReceipt && (!formData.nationality || !formData.passportNumber)) {
      setError('Please provide nationality and passport number for official receipt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Submit check-in form data
      const res = await fetch('/api/check-in/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Check for non-200 responses
      if (!res.ok) {
        console.error('API error:', res.status, data);
        setError(data.error || `Server error (${res.status}). Please try again or contact us via WhatsApp.`);
        return;
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      setSuccess(true);
      
      // Redirect to confirmation after 2 seconds
      setTimeout(() => {
        if (data.bookingReference) {
          router.push(`/check-in-confirmation?reference=${data.bookingReference}&email=${formData.email}`);
        }
      }, 2000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-dark mb-3">Form Submitted Successfully!</h1>
          <p className="text-neutral-600 mb-6">Thank you for completing your check-in information. We look forward to welcoming you!</p>
          <div className="animate-spin w-8 h-8 border-4 border-orange border-t-transparent rounded-full mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-paper to-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Fast & Secure Booking
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-3">Complete Your Reservation</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Just a few details and you&apos;re all set. We&apos;ll send a confirmation to your email.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
              <div className="w-10 h-10 bg-orange text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-sm">
                1
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark">Your Details</h2>
                <p className="text-sm text-neutral-500">Let us know who&apos;s staying with us</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="e.g., Ghana, Nigeria, USA"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">
                  Passport/ID Number
                </label>
                <input
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="A12345678"
                />
              </div>
            </div>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
              <div className="w-10 h-10 bg-orange text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-sm">
                2
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark">Stay Details</h2>
                <p className="text-sm text-neutral-500">When are you checking in?</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">
                  Booking Reference (if you have one)
                </label>
                <input
                  type="text"
                  value={formData.bookingReference}
                  onChange={(e) => setFormData({ ...formData, bookingReference: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="MHL-123456"
                />
                <p className="text-xs text-neutral-500 mt-1">
                  If you booked via WhatsApp, we&apos;ll provide this to you
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Expected Check-In Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.checkInDate}
                  onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Expected Check-Out Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.checkOutDate}
                  onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Expected Arrival Time
                </label>
                <input
                  type="time"
                  value={formData.arrivalTime}
                  onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">
                  Select Room <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.selectedRoomId}
                  onChange={(e) => {
                    const roomId = e.target.value;
                    const room = rooms.find((r) => r._id === roomId);
                    setFormData({
                      ...formData,
                      selectedRoomId: roomId,
                      selectedRoomTitle: room?.title || '',
                      nightlyRate: room?.price || 0,
                    });
                  }}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none bg-white"
                >
                  <option value="" disabled>
                    {roomsLoading ? 'Loading rooms...' : 'Select a room'}
                  </option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.title} — GH₵ {room.price.toLocaleString()} / night
                    </option>
                  ))}
                </select>
                <p className="text-xs text-neutral-500 mt-1">
                  This is required so your reservation receipt can show the correct total amount.
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">
                  Room Preference (Optional)
                </label>
                <input
                  type="text"
                  value={formData.roomPreference}
                  onChange={(e) => setFormData({ ...formData, roomPreference: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="e.g., Ground floor, away from noise"
                />
              </div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
              <div className="w-10 h-10 bg-orange text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-sm">
                3
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark">Special Requests</h2>
                <p className="text-sm text-neutral-500">Any preferences or requirements?</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Special Requests or Requirements
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none resize-none"
                  rows={4}
                  placeholder="Any special accommodations, preferences, or requests..."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsPickup}
                    onChange={(e) => setFormData({ ...formData, needsPickup: e.target.checked })}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium text-dark">I need airport/station pickup</span>
                    <p className="text-sm text-neutral-600 mt-1">
                      We&apos;ll contact you to arrange transportation (additional charges may apply)
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </motion.div>

          <PaymentSection formData={formData} setFormData={setFormData} />

          {/* Emergency Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
              <div className="w-10 h-10 bg-orange text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-sm">
                4
              </div>
              <div>
                <h2 className="text-xl font-bold text-dark">Emergency Contact</h2>
                <p className="text-sm text-neutral-500">Someone we can reach if needed</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Emergency Contact Phone
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-dark mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  value={formData.emergencyContactRelation}
                  onChange={(e) => setFormData({ ...formData, emergencyContactRelation: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange focus:border-orange outline-none"
                  placeholder="e.g., Spouse, Parent, Sibling"
                />
              </div>
            </div>
          </motion.div>

          {/* Visa Receipt Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6"
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.needsVisaReceipt}
                onChange={(e) => setFormData({ ...formData, needsVisaReceipt: e.target.checked })}
                className="mt-1"
              />
              <div>
                <span className="font-bold text-dark text-lg">Send me an official booking receipt</span>
                <p className="text-sm text-neutral-700 mt-1">
                  Receive a professional confirmation document with all booking details
                </p>
              </div>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Check-In Form'
              )}
            </button>
          </motion.div>

          <p className="text-center text-sm text-neutral-500">
            Need help? Contact us on WhatsApp or call us directly
          </p>
        </form>
      </div>
    </div>
  );
}
