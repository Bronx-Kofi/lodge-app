'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
  priceRange: [number, number];
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    checkIn: null,
    checkOut: null,
    guests: 2,
    priceRange: [0, 1000],
  });

  return (
    <div className="sticky top-20 z-30 bg-white shadow-md rounded-full px-6 py-3 mx-auto max-w-4xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 flex items-center gap-4 text-left"
        >
          <div className="flex-1 border-r border-neutral-200 pr-4">
            <div className="text-xs font-semibold text-neutral-500 uppercase">Dates</div>
            <div className="text-sm text-dark">
              {filters.checkIn && filters.checkOut
                ? `${filters.checkIn} - ${filters.checkOut}`
                : 'Select dates'}
            </div>
          </div>
          <div className="flex-1 border-r border-neutral-200 pr-4">
            <div className="text-xs font-semibold text-neutral-500 uppercase">Guests</div>
            <div className="text-sm text-dark">{filters.guests} guests</div>
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold text-neutral-500 uppercase">Price</div>
            <div className="text-sm text-dark">
              GH₵{filters.priceRange[0]} - GH₵{filters.priceRange[1]}
            </div>
          </div>
        </button>
        
        <button
          onClick={() => onSearch(filters)}
          className="p-3 bg-orange text-white rounded-full hover:bg-orange-600 transition-colors"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-4 border-t border-neutral-200"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Check-in</label>
                <input
                  type="date"
                  value={filters.checkIn || ''}
                  onChange={(e) => setFilters({ ...filters, checkIn: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Check-out</label>
                <input
                  type="date"
                  value={filters.checkOut || ''}
                  onChange={(e) => setFilters({ ...filters, checkOut: e.target.value })}
                  className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm"
                  min={filters.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
