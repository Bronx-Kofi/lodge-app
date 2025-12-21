"use client";

import Image from "next/image";
import Link from "next/link";
import { HeritageSite, getImageUrl } from "@/lib/heritage/sanity-queries";

interface HeritageCardProps {
    site: HeritageSite;
}

export function HeritageCard({ site }: HeritageCardProps) {
    return (
        <Link
            href={`/explore/${site.slug.current}`}
            className="group block relative rounded-3xl overflow-hidden bg-white shadow-medium hover:shadow-large transition-all duration-500 hover:-translate-y-2"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={getImageUrl(site.image)}
                    alt={site.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Subtle overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge - Enhanced */}
                <div className="absolute top-4 left-4 bg-terracotta text-white backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-brand">
                    {site.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
                <div className="flex items-center justify-between mb-4 text-xs text-stone-500 font-semibold tracking-wider uppercase">
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {site.travelTime}
                    </span>
                </div>

                <h3 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-terracotta transition-colors leading-tight">
                    {site.title}
                </h3>

                <p className="text-stone-600 leading-relaxed line-clamp-2 mb-6">
                    {site.summary}
                </p>

                {/* Micro-interaction arrow - Enhanced */}
                <div className="flex items-center gap-2 text-sm font-bold text-terracotta uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Discover More
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-ochre-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
    );
}
