"use client";

/**
 * Adaptive Hero Component - Premium Airbnb-Style Design
 * 
 * Features:
 * - Always visible, bold text from the start
 * - High-contrast design with text shadows
 * - Striking gradient fallback if no image
 * - Immediate visual impact
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useShouldLoadVideo } from "./use-connection-tier";
import { HeroVideo } from "./HeroVideo";

interface AdaptiveHeroProps {
    /** Video URL for fast connections */
    videoSrc?: string;
    /** Fallback image URL */
    imageSrc: string;
    /** Alt text for accessibility */
    imageAlt: string;
    /** Optional headline text */
    headline?: string;
    /** Optional tagline text */
    tagline?: string;
    /** Optional overlay content */
    children?: React.ReactNode;
}

export function AdaptiveHero({
    videoSrc,
    imageSrc,
    imageAlt,
    headline,
    tagline,
    children,
}: AdaptiveHeroProps) {
    const shouldLoadVideo = useShouldLoadVideo();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Check if we have a valid image source
    const hasValidImage = imageSrc && imageSrc !== "/hero-fallback.jpg" && !imageError;

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden">
            {/* Background Layer - Stunning gradient fallback or image */}
            <div className="absolute inset-0">
                {/* Always show gradient background first */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-800" />

                {/* Image layer - appears on top when loaded */}
                {hasValidImage && (
                    <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                            onLoad={() => setImageLoaded(true)}
                            onError={() => setImageError(true)}
                        />
                    </motion.div>
                )}

                {/* Video layer - only for fast connections */}
                {shouldLoadVideo && videoSrc && videoLoaded && (
                    <HeroVideo
                        src={videoSrc}
                        className="absolute inset-0"
                        onLoad={() => setVideoLoaded(true)}
                    />
                )}
            </div>

            {/* Enhanced overlay for better text contrast */}
            {imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            )}

            {/* HERO CONTENT - Always visible, positioned bottom for Airbnb-style */}
            <div className="absolute inset-0 flex items-end pb-24 md:pb-32">
                <div className="section-container w-full">
                    <motion.div
                        className="max-w-4xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Headline - HUGE, BOLD, UNMISSABLE */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tight"
                            style={{
                                textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 2px 2px 8px rgba(0,0,0,0.7)'
                            }}
                        >
                            {headline || "Welcome to the Hillside"}
                        </h1>

                        {/* Tagline - Clear and prominent */}
                        <p className="text-lg sm:text-xl md:text-2xl text-white font-medium mb-8 md:mb-10 max-w-2xl leading-relaxed"
                            style={{
                                textShadow: '0 2px 15px rgba(0,0,0,0.8), 1px 1px 6px rgba(0,0,0,0.7)'
                            }}
                        >
                            {tagline || "Off-grid luxury meets authentic Ghanaian hospitality"}
                        </p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-4"
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator - bottom center */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="w-8 h-12 border-2 border-white/60 rounded-full flex items-start justify-center p-2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-1.5 h-3 bg-white/80 rounded-full" />
                </motion.div>
            </motion.div>

            {/* Decorative elements - Orange accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent" />
        </section>
    );
}
