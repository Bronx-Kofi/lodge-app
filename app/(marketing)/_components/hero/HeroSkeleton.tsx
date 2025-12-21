"use client";

/**
 * Hero Skeleton Component
 * 
 * Animated placeholder shown during hero loading.
 * Part of the "Bono-Speed" tiered loading pattern.
 */

import { motion } from "framer-motion";

export function HeroSkeleton() {
    return (
        <div className="relative w-full h-[70vh] min-h-[500px] bg-neutral-900 overflow-hidden">
            {/* Animated shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                    x: ["-100%", "100%"],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Content placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                    {/* Title skeleton */}
                    <motion.div
                        className="h-12 w-64 bg-white/10 rounded-lg mx-auto"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {/* Subtitle skeleton */}
                    <motion.div
                        className="h-6 w-48 bg-white/10 rounded-lg mx-auto"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    />
                </div>
            </div>
        </div>
    );
}
