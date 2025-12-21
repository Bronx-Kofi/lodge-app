"use client";

import { motion } from "framer-motion";
import type { AboutPage } from "@/lib/sanity-queries";
import dynamic from "next/dynamic";

const LodgeLocationMap = dynamic(() => import("./LodgeLocationMap"), {
    ssr: false,
    loading: () => <div className="h-[500px] w-full rounded-3xl bg-neutral-200 animate-pulse flex items-center justify-center text-neutral-400">Loading Map...</div>
});

interface AboutPageClientProps {
    pageData: AboutPage | null;
    whatsappNumber: string;
}

export function AboutPageClient({ pageData, whatsappNumber }: AboutPageClientProps) {
    const heroTitle = pageData?.heroTitle || "Our Story";
    const storyTitle = pageData?.storyTitle || "The Miky Hillside Story";
    const storyContent = pageData?.storyContent || `Nestled in the heart of the Bono Region, Miky Hillside Lodge offers a unique blend of authentic Ghanaian hospitality and modern comfort. Our story begins with a vision to create a sanctuary where travelers can experience the rich culture and natural beauty of Ghana.

With stunning hillside views, sustainable infrastructure powered by solar and Starlink, and easy access to the region's heritage sites, we've created more than just a place to stay—we've created an experience.`;

    return (
        <div className="min-h-screen pt-24 pb-20">
            {/* Hero Section with Image */}
            <section className="relative">
                {/* Hero Image */}
                {pageData?.heroImage?.asset?.url ? (
                    <div className="relative h-[60vh] w-full">
                        <img
                            src={pageData.heroImage.asset.url}
                            alt={heroTitle}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                                    {heroTitle}
                                </h1>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    <div className="relative py-20 bg-gradient-to-b from-orange-50 to-white">
                        <div className="section-container">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-4xl mx-auto text-center"
                            >
                                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
                                    {heroTitle}
                                </h1>
                                <div className="divider-brand mb-8" />
                            </motion.div>
                        </div>
                    </div>
                )}
            </section>

            {/* Location Map Section */}
            <section className="py-16 bg-stone-50">
                <div className="section-container">
                    <LodgeLocationMap lodgeName={heroTitle} />
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="section-container">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {pageData?.storyImage?.asset?.url && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative h-96 rounded-3xl overflow-hidden"
                            >
                                <img
                                    src={pageData.storyImage.asset.url}
                                    alt={storyTitle}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        )}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-serif text-3xl md:text-4xl text-dark mb-6">
                                {storyTitle}
                            </h2>
                            <div className="prose prose-lg text-stone-600 whitespace-pre-line">
                                {storyContent}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900">
                <div className="section-container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white drop-shadow-lg">
                            Ready to Experience the Hillside?
                        </h2>
                        <p className="text-lg md:text-xl text-white mb-12 max-w-2xl mx-auto drop-shadow-md">
                            Let us welcome you with authentic Ghanaian Akwaaba hospitality.
                        </p>
                        <a
                            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm interested in learning more about Miky Hillside Lodge.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-lg shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
