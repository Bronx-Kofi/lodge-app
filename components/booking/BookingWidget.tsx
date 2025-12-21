'use client';

import { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker';
import { GuestSelector } from './GuestSelector';
import { PriceBreakdown } from './PriceBreakdown';
import Link from 'next/link';

interface Room {
  _id: string;
  title: string;
  price: number;
  capacity: number;
}

interface BookingWidgetProps {
  room: Room;
}

export function BookingWidget({ room }: BookingWidgetProps) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pricing, setPricing] = useState<any>(null);
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [loadingPricing, setLoadingPricing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check availability when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      checkAvailability();
    } else {
      setAvailability('idle');
      setPricing(null);
    }
  }, [checkIn, checkOut]);

  // Calculate pricing when dates or guests change
  useEffect(() => {
    if (checkIn && checkOut && availability === 'available') {
      calculatePricing();
    }
  }, [checkIn, checkOut, adults, children, availability]);

  async function checkAvailability() {
    setAvailability('checking');
    setError(null);
    
    try {
      const res = await fetch('/api/availability/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room._id,
          checkIn: checkIn?.toISOString().split('T')[0],
          checkOut: checkOut?.toISOString().split('T')[0],
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setAvailability('unavailable');
        return;
      }

      setAvailability(data.available ? 'available' : 'unavailable');
      
      if (!data.available) {
        setError('Room is not available for selected dates');
        setPricing(null);
      }
    } catch (err) {
      console.error('Error checking availability:', err);
      setError('Failed to check availability');
      setAvailability('unavailable');
    }
  }

  async function calculatePricing() {
    setLoadingPricing(true);
    setError(null);
    
    try {
      const res = await fetch('/api/pricing/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: room._id,
          checkIn: checkIn?.toISOString().split('T')[0],
          checkOut: checkOut?.toISOString().split('T')[0],
          adults,
          children,
        }),
      });

      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setPricing(null);
        return;
      }

      setPricing(data);
    } catch (err) {
      console.error('Error calculating pricing:', err);
      setError('Failed to calculate pricing');
    } finally {
      setLoadingPricing(false);
    }
  }

  function handleReserve() {
    const params = new URLSearchParams({
      roomId: room._id,
      checkIn: checkIn?.toISOString().split('T')[0] || '',
      checkOut: checkOut?.toISOString().split('T')[0] || '',
      adults: adults.toString(),
      children: children.toString(),
    });
    
    window.location.href = `/checkout?${params.toString()}`;
  }

  const canReserve = checkIn && checkOut && availability === 'available' && pricing;

  return (
    <div className="sticky top-24 border-2 border-neutral-200 rounded-2xl shadow-lg bg-white overflow-hidden">
      {/* Price Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-bold text-dark">GH₵{room.price.toLocaleString()}</span>
          <span className="text-neutral-500">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <span>⭐</span>
          <span className="font-semibold">4.9</span>
          <span className="text-neutral-500">(23 reviews)</span>
        </div>
      </div>

      {/* Booking Form */}
      <div className="p-6 space-y-4">
        {/* Date Selection */}
        <div>
          <label className="block text-sm font-semibold text-dark mb-2">
            Select Dates
          </label>
          <DatePicker
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
            blockedDates={[]} // TODO: Fetch from API
          />
        </div>

        {/* Guest Selection */}
        <div>
          {/* eslint-disable-next-line react/no-children-prop */}
          <GuestSelector
            adults={adults}
            children={children}
            onAdultsChange={setAdults}
            onChildrenChange={setChildren}
            maxGuests={room.capacity}
          />
        </div>

        {/* Availability Status */}
        {availability === 'checking' && (
          <div className="text-center py-3 text-neutral-500 bg-neutral-50 rounded-lg">
            <div className="animate-pulse">Checking availability...</div>
          </div>
        )}
        
        {availability === 'unavailable' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {availability === 'available' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm flex items-center gap-2">
            <span>✓</span>
            <span>Available for your dates</span>
          </div>
        )}

        {/* Price Breakdown */}
        {pricing && availability === 'available' && (
          <PriceBreakdown pricing={pricing} loading={loadingPricing} />
        )}

        {/* Reserve Button */}
        <button
          onClick={handleReserve}
          disabled={!canReserve}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!checkIn || !checkOut ? 'Select dates' : 'Reserve'}
        </button>

        <p className="text-center text-xs text-neutral-500 mt-3">
          You won&apos;t be charged yet
        </p>
      </div>
    </div>
  );
}
