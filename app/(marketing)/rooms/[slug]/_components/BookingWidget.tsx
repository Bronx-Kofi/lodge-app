"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, Users, ChevronDown, Loader2 } from "lucide-react";
import { SimpleDatePicker } from "./SimpleDatePicker";

interface BookingWidgetProps {
    roomTitle: string;
    basePrice: number;
    capacity: number;
    whatsappNumber: string;
    cancellationPolicy?: string;
}

export function BookingWidget({ roomTitle, basePrice, capacity, whatsappNumber, cancellationPolicy }: BookingWidgetProps) {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [guests, setGuests] = useState(2);
    const [rooms, setRooms] = useState(1); // Number of rooms to book
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const nights = dateRange?.from && dateRange?.to
        ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const totalPrice = nights * basePrice * rooms; // Multiply by number of rooms

    const handleWhatsAppRedirect = () => {
        setIsRedirecting(true);

        const startDate = dateRange?.from ? format(dateRange.from, "MMM d, yyyy") : "Not selected";
        const endDate = dateRange?.to ? format(dateRange.to, "MMM d, yyyy") : "";
        const dateString = endDate ? `${startDate} - ${endDate}` : startDate;

        // Build WhatsApp message with proper encoding
        let message = `BOOKING INQUIRY\n\n`;
        message += `Room: ${roomTitle}\n`;
        message += `Number of Rooms: ${rooms}\n`;
        message += `Check-in: ${dateRange?.from ? format(dateRange.from, "EEEE, MMM d, yyyy") : "Flexible"}\n`;
        message += `Check-out: ${dateRange?.to ? format(dateRange.to, "EEEE, MMM d, yyyy") : "Flexible"}\n`;
        
        if (nights > 0) {
            message += `Nights: ${nights}\n`;
            message += `Price per room per night: GHS ${basePrice}\n`;
            message += `Total Price: GHS ${totalPrice} (${rooms} ${rooms > 1 ? 'rooms' : 'room'} x ${nights} ${nights > 1 ? 'nights' : 'night'})\n`;
        }
        
        message += `Total Guests: ${guests} ${guests > 1 ? 'guests' : 'guest'}\n\n`;
        message += `Are these rooms available for these dates?`;

        setTimeout(async () => {
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            try {
                await fetch('/api/marketing/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'room_booking',
                        target: roomTitle,
                        metadata: {
                            checkIn: dateRange?.from?.toISOString(),
                            checkOut: dateRange?.to?.toISOString(),
                            guests
                        }
                    }),
                    keepalive: true
                });
            } catch (err) {
                console.error('Tracking failed', err);
            }

            window.open(whatsappUrl, '_blank');
            setIsRedirecting(false);
        }, 800);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100 text-neutral-800">
            {/* Header */}
            <div className="p-6 border-b border-neutral-100">
                <h3 className="font-serif text-xl text-terracotta mb-1">Book your stay</h3>
                <p className="text-sm text-neutral-500">{cancellationPolicy || 'Free cancellation up to 48h before.'}</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Date Selection - KEY FIX: Remove relative positioning */}
                <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Dates</label>
                    <button
                        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                        className="w-full flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-terracotta/50 transition-colors text-left"
                    >
                        <div className="flex items-center gap-3">
                            <CalendarIcon size={18} className="text-terracotta" />
                            <span className="text-sm font-medium">
                                {dateRange?.from ? (
                                    <>
                                        {format(dateRange.from, "MMM d")}
                                        {dateRange.to ? ` - ${format(dateRange.to, "MMM d")}` : ""}
                                    </>
                                ) : (
                                    <span className="text-neutral-400">Select Check-in / Check-out</span>
                                )}
                            </span>
                        </div>
                        <ChevronDown size={16} className={`transition-transform ${isCalendarOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Calendar Modal - Using React Portal for proper rendering */}
                    {mounted && isCalendarOpen && createPortal(
                        <AnimatePresence>
                            <div>
                                {/* Backdrop to close calendar */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-black/50 z-[9998]"
                                    onClick={() => setIsCalendarOpen(false)}
                                    style={{
                                        position: 'fixed',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                    }}
                                />
                                
                                {/* Calendar positioned relative to viewport - PORTAL FIX */}
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 9999,
                                        width: '95vw',
                                        maxWidth: '400px',
                                        maxHeight: '90vh',
                                        backgroundColor: 'white',
                                        borderRadius: '12px',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                        border: '1px solid #ddd',
                                        overflow: 'auto',
                                        WebkitOverflowScrolling: 'touch',
                                    }}
                                >
                                    <SimpleDatePicker
                                        selected={dateRange}
                                        onSelect={(range) => {
                                            setDateRange(range);
                                            if (range?.from && range?.to) {
                                                setIsCalendarOpen(false);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </AnimatePresence>,
                        document.body
                    )}
                </div>

                {/* Number of Rooms */}
                <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Number of Rooms</label>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="flex items-center gap-3">
                            <svg className="text-terracotta" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            <span className="text-sm font-medium">{rooms} Room{rooms > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setRooms(Math.max(1, rooms - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-terracotta text-neutral-600 hover:text-terracotta transition-colors"
                            >
                                -
                            </button>
                            <button
                                onClick={() => setRooms(rooms + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-terracotta text-neutral-600 hover:text-terracotta transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    {rooms > 1 && (
                        <p className="text-xs text-neutral-500 mt-2">
                            Booking {rooms} separate rooms • Each guest gets their own room
                        </p>
                    )}
                </div>

                {/* Guest Selection */}
                <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">Total Guests</label>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                        <div className="flex items-center gap-3">
                            <Users size={18} className="text-terracotta" />
                            <span className="text-sm font-medium">{guests} Guest{guests > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setGuests(Math.max(1, guests - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-terracotta text-neutral-600 hover:text-terracotta transition-colors"
                            >
                                -
                            </button>
                            <button
                                onClick={() => setGuests(guests + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-neutral-200 hover:border-terracotta text-neutral-600 hover:text-terracotta transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                        Max {capacity} guests per room • Total capacity: {rooms * capacity} guests
                    </p>
                </div>

                {/* Price Summary */}
                {nights > 0 && (
                    <div className="pt-4 border-t border-neutral-100 space-y-2">
                        <div className="flex items-center justify-between text-sm text-neutral-600">
                            <span>GH₵{basePrice} x {nights} {nights > 1 ? 'nights' : 'night'}</span>
                            <span>GH₵{basePrice * nights}</span>
                        </div>
                        {rooms > 1 && (
                            <div className="flex items-center justify-between text-sm text-neutral-600">
                                <span>x {rooms} rooms</span>
                                <span>GH₵{basePrice * nights * rooms}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                            <span className="font-semibold text-neutral-800">Total</span>
                            <span className="text-lg font-serif font-medium text-terracotta">GH₵{totalPrice}</span>
                        </div>
                    </div>
                )}

                {/* CTA */}
                <button
                    onClick={handleWhatsAppRedirect}
                    disabled={isRedirecting}
                    className="w-full py-4 bg-terracotta text-white rounded-lg font-medium hover:bg-terracotta-600 transition-all shadow-lg shadow-terracotta/20 flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                    {isRedirecting ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Opening WhatsApp...
                        </>
                    ) : (
                        <>
                            Check Availability
                            <svg className="transition-transform group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
