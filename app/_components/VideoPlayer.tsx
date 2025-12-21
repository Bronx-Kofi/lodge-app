"use client";

/**
 * VideoPlayer Component
 * 
 * Reusable video player for galleries and content sections.
 * Supports:
 * - Direct video uploads from Sanity
 * - External URLs (YouTube, Vimeo)
 * - Lazy loading with IntersectionObserver
 * - Fallback poster images
 * - Responsive design
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
    /** Direct video file URL */
    videoSrc?: string;
    /** External video URL (YouTube, Vimeo) */
    videoUrl?: string;
    /** Poster/thumbnail image */
    poster?: string;
    /** Video title for accessibility */
    title?: string;
    /** Additional CSS classes */
    className?: string;
    /** Show video controls */
    controls?: boolean;
    /** Auto-play video (muted) */
    autoPlay?: boolean;
    /** Loop video */
    loop?: boolean;
    /** Muted by default */
    muted?: boolean;
    /** Callback when video loads */
    onLoad?: () => void;
    /** Callback on error */
    onError?: () => void;
}

export function VideoPlayer({
    videoSrc,
    videoUrl,
    poster,
    title = "Video",
    className = "",
    controls = true,
    autoPlay = false,
    loop = false,
    muted = true,
    onLoad,
    onError,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Detect if URL is YouTube or Vimeo
    const isYouTube = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");
    const isVimeo = videoUrl?.includes("vimeo.com");
    const isExternal = isYouTube || isVimeo;

    // Extract video ID for embeds
    const getEmbedUrl = () => {
        if (!videoUrl) return null;
        
        if (isYouTube) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = videoUrl.match(regExp);
            const videoId = match && match[2].length === 11 ? match[2] : null;
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        }
        
        if (isVimeo) {
            const regExp = /vimeo.*\/(\d+)/i;
            const match = videoUrl.match(regExp);
            const videoId = match ? match[1] : null;
            return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
        }
        
        return videoUrl;
    };

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

    // Handle native video loading
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isVisible || isExternal) return;

        const handleCanPlay = () => {
            setIsLoaded(true);
            if (autoPlay) {
                video.play().catch(() => {
                    // Autoplay might be blocked
                });
            }
            onLoad?.();
        };

        const handleError = () => {
            setHasError(true);
            onError?.();
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener("canplay", handleCanPlay);
        video.addEventListener("error", handleError);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);

        // Start loading
        video.load();

        return () => {
            video.removeEventListener("canplay", handleCanPlay);
            video.removeEventListener("error", handleError);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
        };
    }, [isVisible, autoPlay, onLoad, onError, isExternal]);

    // Don't render if no source
    if (!videoSrc && !videoUrl) {
        return null;
    }

    // Show error state
    if (hasError) {
        return (
            <div className={`relative bg-neutral-900 flex items-center justify-center ${className}`}>
                <div className="text-center text-white p-8">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm opacity-75">Unable to load video</p>
                </div>
            </div>
        );
    }

    // Render external video (YouTube/Vimeo iframe)
    if (isExternal && videoUrl) {
        const embedUrl = getEmbedUrl();
        if (!embedUrl) return null;

        return (
            <div ref={containerRef} className={`relative ${className}`}>
                {isVisible ? (
                    <motion.iframe
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        src={embedUrl}
                        title={title}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-900" />
                )}
            </div>
        );
    }

    // Render native HTML5 video
    return (
        <div ref={containerRef} className={`relative group ${className}`}>
            <motion.video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={poster}
                controls={controls}
                muted={muted}
                loop={loop}
                playsInline
                preload="metadata"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                {isVisible && videoSrc && <source src={videoSrc} type="video/mp4" />}
                Your browser does not support the video tag.
            </motion.video>

            {/* Loading indicator */}
            <AnimatePresence>
                {!isLoaded && isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-neutral-900"
                    >
                        <div className="flex flex-col items-center text-white">
                            <svg className="w-8 h-8 animate-spin mb-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="text-sm">Loading video...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Play icon overlay (when controls are hidden) */}
            {!controls && !isPlaying && isLoaded && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
                    onClick={() => videoRef.current?.play()}
                    aria-label="Play video"
                >
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-neutral-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </motion.button>
            )}
        </div>
    );
}
