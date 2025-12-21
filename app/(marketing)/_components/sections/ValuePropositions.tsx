"use client";

/**
 * Value Propositions Section
 * 
 * Displays the Lodge's core values with scroll-revealed cards.
 * Uses the Bono Palette for visual consistency.
 */

import { ScrollReveal, StaggerContainer, StaggerItem } from "../scroll-reveal";

interface ValueProp {
    _key: string;
    title: string;
    description: string | any[]; // String or Block content
    icon?: any;
    order: number;
}

interface ValuePropositionsProps {
    valueProps?: ValueProp[];
    title?: string;
    subtitle?: string;
}

// No default data - everything must come from CMS

export function ValuePropositions({ valueProps, title, subtitle }: ValuePropositionsProps) {
    // Use CMS data if available, otherwise use defaults
    const displayProps = valueProps && valueProps.length > 0 ? valueProps : null;
    return (
        <section className="py-section bg-gradient-to-b from-white-warm to-white">
            <div className="section-container">
                <ScrollReveal className="text-center mb-20">
                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark mb-6">
                        {title || "Why Choose Hillside"}
                    </h2>
                    <div className="divider-brand mb-6" />
                    <p className="text-lg md:text-xl text-dark-muted max-w-2xl mx-auto leading-relaxed">
                        {subtitle || "Where modern comfort meets timeless tradition"}
                    </p>
                </ScrollReveal>

                <StaggerContainer className="grid md:grid-cols-3 gap-8 lg:gap-10">
                    {displayProps && displayProps.length > 0 ? (
                        // Render CMS data
                        displayProps.map((prop) => (
                            <StaggerItem key={prop._key}>
                                <div className="card-elevated p-8 lg:p-10 border border-orange-100/50 group h-full">
                                    <h3 className="font-serif text-2xl text-dark-soft mb-4 group-hover:text-orange transition-colors">
                                        {prop.title}
                                    </h3>
                                    <p className="text-dark-muted leading-relaxed text-lg">
                                        {prop.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))
                    ) : (
                        // Show message to add content in CMS
                        <div className="col-span-3 text-center py-12">
                            <p className="text-dark-light text-lg">
                                Add value propositions in Sanity Studio → Homepage → Value Propositions
                            </p>
                        </div>
                    )}
                </StaggerContainer>
            </div>
        </section>
    );
}
