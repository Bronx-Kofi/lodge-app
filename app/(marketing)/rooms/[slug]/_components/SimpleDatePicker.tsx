"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isAfter, isBefore, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimpleDatePickerProps {
    onSelect: (range: { from: Date; to?: Date } | undefined) => void;
    selected?: { from?: Date; to?: Date };
}

export function SimpleDatePicker({ onSelect, selected }: SimpleDatePickerProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [rangeStart, setRangeStart] = useState<Date | null>(selected?.from || null);
    const [rangeEnd, setRangeEnd] = useState<Date | null>(selected?.to || null);

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    const handleDateClick = (day: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (isBefore(day, today)) return; // Don't allow past dates

        if (!rangeStart || (rangeStart && rangeEnd)) {
            // Start new range
            setRangeStart(day);
            setRangeEnd(null);
            onSelect({ from: day });
        } else {
            // Complete the range
            if (isAfter(day, rangeStart)) {
                setRangeEnd(day);
                onSelect({ from: rangeStart, to: day });
            } else {
                // If clicked date is before start, make it the new start
                setRangeStart(day);
                setRangeEnd(null);
                onSelect({ from: day });
            }
        }
    };

    const isInRange = (day: Date) => {
        if (!rangeStart || !rangeEnd) return false;
        return isAfter(day, rangeStart) && isBefore(day, rangeEnd);
    };

    const isRangeStart = (day: Date) => rangeStart && isSameDay(day, rangeStart);
    const isRangeEnd = (day: Date) => rangeEnd && isSameDay(day, rangeEnd);
    const isToday = (day: Date) => isSameDay(day, new Date());
    const isPast = (day: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return isBefore(day, today);
    };
    const isCurrentMonth = (day: Date) => day.getMonth() === currentMonth.getMonth();

    return (
        <div className="w-full max-w-[380px] mx-auto p-2 sm:p-4 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-2 sm:mb-4">
                <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                    type="button"
                    aria-label="Previous month"
                >
                    <ChevronLeft size={18} className="text-gray-600" />
                </button>
                <h3 className="text-base sm:text-lg font-bold text-orange-600">
                    {format(currentMonth, 'MMM yyyy')}
                </h3>
                <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
                    type="button"
                    aria-label="Next month"
                >
                    <ChevronRight size={18} className="text-gray-600" />
                </button>
            </div>

            {/* Week days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs sm:text-sm font-bold text-gray-600 uppercase py-1 sm:py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid - ensure all rows are visible */}
            <div 
                className="grid grid-cols-7 gap-1 sm:gap-2"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridAutoRows: '36px',
                    gap: '0.25rem'
                }}
            >
                {days.map((day, idx) => {
                    const disabled = isPast(day);
                    const selected = isRangeStart(day) || isRangeEnd(day);
                    const inRange = isInRange(day);
                    const today = isToday(day);
                    const currentMonthDay = isCurrentMonth(day);

                    return (
                        <button
                            key={idx}
                            onClick={() => handleDateClick(day)}
                            disabled={disabled}
                            type="button"
                            className={`
                                relative h-9 w-full text-sm sm:text-base font-semibold rounded-md sm:rounded-lg transition-all
                                flex items-center justify-center touch-manipulation
                                ${!currentMonthDay ? 'text-gray-400' : 'text-gray-800'}
                                ${disabled ? 'opacity-30 cursor-not-allowed line-through text-gray-400' : 'cursor-pointer hover:bg-orange-50 active:bg-orange-100'}
                                ${selected ? 'bg-orange-500 text-white font-bold hover:bg-orange-600 shadow-md' : ''}
                                ${inRange ? 'bg-orange-100 text-orange-800 font-semibold' : ''}
                                ${today && !selected ? 'ring-1 sm:ring-2 ring-orange-500 ring-inset font-bold text-orange-600' : ''}
                            `}
                        >
                            {format(day, 'd')}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-2 sm:mt-4 text-xs text-gray-500 text-center px-2">
                Tap to select check-in, tap again for check-out
            </div>
        </div>
    );
}
