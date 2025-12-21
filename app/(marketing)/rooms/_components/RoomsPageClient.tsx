"use client";

import { motion } from "framer-motion";
import { RoomCard } from "./RoomCard";
import { useState } from "react";
import type { Room } from "@/lib/rooms/sanity-queries";

interface RoomsPageData {
    heroTitle?: string;
    heroSubtitle?: string;
}

interface RoomsPageClientProps {
    initialRooms: Room[];
    pageData?: RoomsPageData | null;
}

export function RoomsPageClient({ initialRooms, pageData }: RoomsPageClientProps) {
    // No sorting needed - all rooms have the same fixed price (GHS 367)
    const sortedRooms = initialRooms;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-paper to-white">
            <div className="section-container">
                {/* Header */}
                <div className="mb-12 md:mb-16 pt-10 md:pt-16">
                    <div className="max-w-3xl mx-auto text-center px-4 mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif text-4xl md:text-5xl lg:text-7xl text-terracotta mb-6"
                        >
                            {pageData?.heroTitle || "Find Your Sanctuary"}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-24 h-1 bg-ochre-400 mx-auto mb-6"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-neutral-600 text-lg md:text-xl leading-relaxed"
                        >
                            {pageData?.heroSubtitle || "From perched cliffside suites to intimate forest cabins, every room connects you deeply with the Bono Region."}
                        </motion.p>
                    </div>

                    {/* Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-white rounded-2xl shadow-soft border border-neutral-200/60"
                    >
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta/10 to-ochre/10">
                                <svg className="w-5 h-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="text-center sm:text-left">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-serif font-bold text-terracotta">{initialRooms.length}</span>
                                    <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                                        {initialRooms.length === 1 ? 'Room' : 'Rooms'}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-400 mt-0.5">Luxury Accommodations</p>
                            </div>
                        </div>
                        {/* Removed sort filter - all rooms have fixed price of GHS 367 */}
                    </motion.div>
                </div>

                {/* Grid - Professional 3-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {sortedRooms.map((room, index) => (
                        <motion.div
                            key={room._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <RoomCard room={room} />
                        </motion.div>
                    ))}
                </div>

                {/* Why Book Direct Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-8 md:p-12 bg-gradient-to-br from-terracotta-50 to-ochre-50 rounded-3xl"
                >
                    <h2 className="font-serif text-3xl md:text-4xl text-terracotta mb-6 text-center">
                        Why Book Direct?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-soft">
                                <svg className="w-8 h-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-900 mb-2">Best Rate Guarantee</h3>
                            <p className="text-sm text-neutral-600">Lowest prices available only through direct booking</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-soft">
                                <svg className="w-8 h-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-900 mb-2">Exclusive Perks</h3>
                            <p className="text-sm text-neutral-600">Complimentary welcome drinks and room upgrades</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 shadow-soft">
                                <svg className="w-8 h-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-900 mb-2">Flexible Booking</h3>
                            <p className="text-sm text-neutral-600">Free cancellation up to 48 hours before arrival</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
