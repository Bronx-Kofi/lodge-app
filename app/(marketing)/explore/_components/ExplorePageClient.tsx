"use client";

import { useState } from "react";
import { HeritageSite } from "@/lib/heritage/sanity-queries";
import { HeritageCard } from "./HeritageCard";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeritageMap = dynamic(() => import("./HeritageMap"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full rounded-3xl bg-neutral-200 animate-pulse flex items-center justify-center text-neutral-400">Loading Map...</div>
});

interface ExplorePageClientProps {
    sites: HeritageSite[];
    heroTitle: string;
    heroSubtitle: string;
    ctaTitle: string;
    ctaDescription: string;
    whatsappNumber: string;
    categories?: string[];
}

export function ExplorePageClient({
    sites,
    heroTitle,
    heroSubtitle,
    ctaTitle,
    ctaDescription,
    whatsappNumber,
    categories
}: ExplorePageClientProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Filter sites by category (case-insensitive comparison)
    const filteredSites = selectedCategory === "all" 
        ? sites 
        : sites.filter(site => site.category?.toLowerCase() === selectedCategory.toLowerCase());

    // Get unique categories from sites or use provided categories
    const availableCategories = categories || ["Nature", "Culture", "History"];

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-stone-50 via-paper to-white">
            <div className="section-container">

                {/* Header */}
                <div className="mb-12 md:mb-16 pt-10 md:pt-16">
                    <div className="max-w-3xl mx-auto text-center px-4 mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-serif text-4xl md:text-5xl lg:text-7xl text-terracotta mb-6"
                        >
                            {heroTitle}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="w-24 h-1 bg-ochre-400 mx-auto mb-8"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-stone-600 text-lg md:text-xl leading-relaxed"
                        >
                            {heroSubtitle}
                        </motion.p>
                    </div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-3"
                    >
                        <button 
                            onClick={() => setSelectedCategory("all")}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                                selectedCategory === "all"
                                    ? "bg-terracotta text-white"
                                    : "bg-white text-neutral-700 border border-neutral-300 hover:border-terracotta hover:text-terracotta"
                            }`}
                        >
                            All Sites
                        </button>
                        {availableCategories.map((category) => (
                            <button 
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                                    selectedCategory === category
                                        ? "bg-terracotta text-white"
                                        : "bg-white text-neutral-700 border border-neutral-300 hover:border-terracotta hover:text-terracotta"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-12 lg:gap-12">
                    {filteredSites.map((site, index) => (
                        <motion.div
                            key={site._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <HeritageCard site={site} />
                        </motion.div>
                    ))}
                </div>

                {/* Interactive Map */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 md:mt-32 lg:mt-40"
                >
                    <div className="text-center mb-12 px-4">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest-900 mb-6">Plan Your Journey</h2>
                        <div className="w-24 h-1 bg-forest-400 mx-auto mb-6" />
                        <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            The Lodge is perfectly positioned as your basecamp.
                            Explore the region&apos;s treasures, all within a short drive.
                        </p>
                    </div>

                    <HeritageMap sites={sites} />
                </motion.div>

                {/* Concierge Service CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-8 md:p-12 bg-gradient-to-br from-forest-50 to-terracotta-50 rounded-3xl"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-serif text-3xl md:text-4xl text-forest-900 mb-6">
                            {ctaTitle}
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                            {ctaDescription}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'd like to plan a heritage tour.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-lg"
                            >
                                <span>Plan Your Tour</span>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
