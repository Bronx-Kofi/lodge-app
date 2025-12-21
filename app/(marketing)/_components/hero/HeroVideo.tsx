"use client";

/**
 * Hero Video Component
 * 
 * Lazy-loaded video player with IntersectionObserver.
 * Only loads video when visible and connection tier allows.
 */

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroVideoProps {
    src?: string;
    poster?: string;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
}

export function HeroVideo({
    src,
    poster,
    className = "",
    onLoad,
    onError,
}: HeroVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Observe visibility for lazy loading
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Handle video loading
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isVisible || !src) return;

        const handleCanPlay = () => {
            setIsLoaded(true);
            video.play().catch(() => {
                // Autoplay might be blocked, that's okay
            });
            onLoad?.();
        };

        const handleError = () => {
            setHasError(true);
            onError?.();
        };

        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("error", handleError);

        // Start loading
        video.load();

        return () => {
            video.removeEventListener("canplay", handleCanPlay);
            video.removeEventListener("error", handleError);
        };
    }, [isVisible, src, onLoad, onError]);

    // Don't render if no source or if there was an error
    if (!src || hasError) {
        return null;
    }

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <motion.video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                poster={poster}
                muted
                loop
                playsInline
                preload="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {isVisible && <source src={src} type="video/mp4" />}
            </motion.video>
        </div>
    );
}
