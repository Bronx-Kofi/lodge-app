"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface WelcomeVideoProps {
    src?: string; // e.g., YouTube embed URL or MP4
}

export function WelcomeVideo({ src }: WelcomeVideoProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!src) return null;

    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-stone-900 shadow-xl shadow-stone-900/40">
            {!isPlaying ? (
                <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center group"
                >
                    {/* Thumbnail Placeholder (Can be dynamic later) */}
                    <div className="absolute inset-0 bg-stone-800">
                        {/* Abstract pattern or fallback image */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                    </div>

                    <div className="z-10 flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                            <Play fill="white" className="ml-1 text-white" size={24} />
                        </div>
                        <div className="text-center">
                            <p className="font-serif text-xl text-white mb-1">Welcome Home</p>
                            <p className="text-xs text-white/60 uppercase tracking-widest">A message from Mickeal</p>
                        </div>
                    </div>
                </button>
            ) : (
                <iframe
                    src={`${src}?autoplay=1&modestbranding=1&rel=0`}
                    title="Welcome Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
        </div>
    );
}
