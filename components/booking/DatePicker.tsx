'use client';

import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState, useEffect } from 'react';

interface DatePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  blockedDates?: Date[];
  minStay?: number;
}

export function DatePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  blockedDates = [],
  minStay = 1,
}: DatePickerProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: checkIn || undefined,
    to: checkOut || undefined,
  });

  useEffect(() => {
    setSelectedRange({
      from: checkIn || undefined,
      to: checkOut || undefined,
    });
  }, [checkIn, checkOut]);

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    onCheckInChange(range?.from || null);
    onCheckOutChange(range?.to || null);
  };

  return (
    <div className="border border-neutral-200 rounded-xl p-4 bg-white">
      <style jsx global>{`
        .rdp {
          --rdp-cell-size: 40px;
          --rdp-accent-color: #ff6b35;
          --rdp-background-color: #fff4ed;
          font-family: inherit;
        }
        .rdp-day_selected:not([disabled]) {
          background-color: #ff6b35;
          color: white;
          font-weight: 600;
        }
        .rdp-day_selected:hover:not([disabled]) {
          background-color: #e84a05;
        }
        .rdp-day_today {
          font-weight: bold;
          color: #ff6b35;
        }
        .rdp-day_disabled {
          opacity: 0.3;
          text-decoration: line-through;
        }
        .rdp-day:hover:not([disabled]) {
          background-color: #fff4ed;
        }
      `}</style>
      
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        disabled={[
          { before: new Date() },
          ...blockedDates.map(date => ({ 
            from: date, 
            to: date 
          })),
        ]}
        modifiers={{
          booked: blockedDates,
        }}
        modifiersStyles={{
          booked: {
            backgroundColor: '#fecaca',
            color: '#991b1b',
            textDecoration: 'line-through',
          },
        }}
        numberOfMonths={2}
        className="flex justify-center"
      />
      
      {checkIn && checkOut && (
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-600">Check-in:</span>
            <span className="font-semibold">{checkIn.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-neutral-600">Check-out:</span>
            <span className="font-semibold">{checkOut.toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <span className="text-neutral-600">Nights:</span>
            <span className="font-semibold">
              {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
