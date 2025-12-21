'use client';

interface GuestSelectorProps {
  adults: number;
  children: number;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  maxGuests: number;
}

export function GuestSelector({
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  maxGuests,
}: GuestSelectorProps) {
  const totalGuests = adults + children;

  return (
    <div className="border border-neutral-200 rounded-xl p-4 space-y-4 bg-white">
      <h3 className="font-semibold text-dark mb-3">Guests</h3>
      
      {/* Adults */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-dark">Adults</div>
          <div className="text-sm text-neutral-500">Age 13+</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onAdultsChange(Math.max(1, adults - 1))}
            disabled={adults <= 1}
            className="w-9 h-9 rounded-full border-2 border-neutral-300 hover:border-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-semibold"
            aria-label="Decrease adults"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{adults}</span>
          <button
            type="button"
            onClick={() => onAdultsChange(Math.min(maxGuests, adults + 1))}
            disabled={totalGuests >= maxGuests}
            className="w-9 h-9 rounded-full border-2 border-neutral-300 hover:border-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-semibold"
            aria-label="Increase adults"
          >
            +
          </button>
        </div>
      </div>

      {/* Children */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-dark">Children</div>
          <div className="text-sm text-neutral-500">Ages 2-12</div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChildrenChange(Math.max(0, children - 1))}
            disabled={children <= 0}
            className="w-9 h-9 rounded-full border-2 border-neutral-300 hover:border-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-semibold"
            aria-label="Decrease children"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold">{children}</span>
          <button
            type="button"
            onClick={() => onChildrenChange(Math.min(maxGuests - adults, children + 1))}
            disabled={totalGuests >= maxGuests}
            className="w-9 h-9 rounded-full border-2 border-neutral-300 hover:border-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-lg font-semibold"
            aria-label="Increase children"
          >
            +
          </button>
        </div>
      </div>

      {/* Capacity Warning */}
      {totalGuests >= maxGuests && (
        <div className="text-sm text-orange bg-orange-50 rounded-lg p-3 mt-3">
          Maximum capacity: {maxGuests} guests
        </div>
      )}
    </div>
  );
}
