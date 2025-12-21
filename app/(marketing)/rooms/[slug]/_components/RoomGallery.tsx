"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoPlayer } from "@/app/_components/VideoPlayer";

export interface GalleryItem {
    type: "image" | "video";
    src: string; // Image URL or video file URL
    videoUrl?: string; // External video URL (YouTube/Vimeo)
    poster?: string; // Video thumbnail
    alt?: string;
}

interface RoomGalleryProps {
    items: GalleryItem[]; // Mixed media items
    title: string;
}

export function RoomGallery({ items, title }: RoomGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const currentItem = items[selectedIndex];

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="grid gap-4">
            {/* Main Stage */}
            <motion.div
                layoutId={`media-${selectedIndex}`}
                className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl bg-neutral-100"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0"
                    >
                        {currentItem.type === "video" ? (
                            <VideoPlayer
                                videoSrc={currentItem.src}
                                videoUrl={currentItem.videoUrl}
                                poster={currentItem.poster}
                                title={currentItem.alt || title}
                                className="w-full h-full"
                                controls
                                muted={false}
                            />
                        ) : (
                            <Image
                                src={currentItem.src}
                                alt={currentItem.alt || title}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority={selectedIndex === 0}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Thumbs with video indicators */}
            <div className="grid grid-cols-4 gap-4">
                {items.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedIndex(idx)}
                        className={`
                            relative aspect-video overflow-hidden rounded-lg transition-all duration-300
                            ${selectedIndex === idx ? "ring-2 ring-terracotta ring-offset-2 opacity-100" : "opacity-70 hover:opacity-100"}
                        `}
                        aria-label={`View ${item.type} ${idx + 1}`}
                    >
                        {/* Thumbnail */}
                        <Image
                            src={item.type === "video" && item.poster ? item.poster : item.src}
                            alt={item.alt || `${title} view ${idx + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 15vw"
                        />
                        
                        {/* Video play icon overlay */}
                        {item.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-neutral-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
