"use client";

/**
 * Lifestyle Grid Section
 * 
 * Displays the Lodge's lifestyle identifiers in an elegant grid.
 * Uses generous whitespace for "High-Touch" premium feel.
 */

import Image from "next/image";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../scroll-reveal";

interface LifestyleItem {
    _key: string;
    name: string;
    tagline?: string;
    background_image?: any;
}

interface LifestyleGridProps {
    lifestyleItems?: LifestyleItem[];
}

// No default data - everything must come from CMS

export function LifestyleGrid({ lifestyleItems }: LifestyleGridProps) {
    // Use CMS data if available, otherwise use defaults
    const displayItems = lifestyleItems && lifestyleItems.length > 0 ? lifestyleItems : null;
    return (
        <section className="py-section bg-gradient-to-b from-orange-50 via-white-warm to-white">
            <div className="section-container">
                <ScrollReveal className="text-center mb-20">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
                        A Lifestyle Experience
                    </h2>
                    <div className="divider-brand mb-6" />
                    <p className="text-lg md:text-xl text-dark-muted max-w-2xl mx-auto leading-relaxed">
                        Three pillars of the Miky Hillside way
                    </p>
                </ScrollReveal>

                <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-10">
                    {displayItems && displayItems.length > 0 ? (
                        // Render CMS data
                        displayItems.map((item) => (
                            <StaggerItem key={item._key}>
                                <div className="group relative overflow-hidden rounded-3xl aspect-[3/4] bg-orange-100 shadow-medium hover:shadow-brand-lg transition-shadow duration-500">
                                    {/* Background image from CMS or gradient */}
                                    {item.background_image?.image?.asset?.url ? (
                                        <img
                                            src={item.background_image.image.asset.url}
                                            alt={item.background_image.image.alt || item.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-coral" />
                                    )}

                                    {/* Image overlay with enhanced gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/60 transition-all duration-500" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                                        <h3 className="font-serif text-3xl mb-2 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                                            {item.name}
                                        </h3>
                                        {item.tagline && (
                                            <p className="text-white/90 text-base font-light tracking-wide opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                {item.tagline}
                                            </p>
                                        )}
                                    </div>

                                    {/* Decorative corner accent */}
                                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-orange/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </StaggerItem>
                        ))
                    ) : (
                        <div className="col-span-3 text-center py-12">
                            <p className="text-dark-light text-lg">
                                Add lifestyle items in Sanity Studio → Homepage → Lifestyle Grid
                            </p>
                        </div>
                    )}
                </StaggerContainer>
            </div>
        </section>
    );
}
