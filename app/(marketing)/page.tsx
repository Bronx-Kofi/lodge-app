/**
 * Landing Page - Miky Hillside Lodge
 * 
 * 100% CMS-driven homepage - NO hardcoded content
 * Optimized as a SERVER COMPONENT for speed and SEO
 */

import Link from "next/link";
import { AdaptiveHero } from "./_components/hero";
import { ValuePropositions, AkwaabaFab, FeaturedRooms } from "./_components/sections";
import { getLandingPage } from "@/lib/landing/sanity-queries";
import { getSiteSettings } from "@/lib/sanity-queries";
import { getRooms } from "@/lib/rooms/sanity-queries";
import { urlForImage, urlForVideo } from "@/sanity/lib/utils";
import { cleanPhoneNumber } from "@/lib/utils/phone";

// Enable static generation with revalidation
export const revalidate = 600; // 10 minutes for homepage (more frequent updates)

// This is now a Server Component
export default async function LandingPage() {
    // Parallel data fetching on the server
    const [pageData, settings, roomsData] = await Promise.all([
        getLandingPage(),
        getSiteSettings(),
        getRooms()
    ]);

    const rooms = roomsData || [];
    const rawNumber = settings?.whatsapp || settings?.whatsappNumbers?.main || "233000000000";
    const whatsappNumber = cleanPhoneNumber(rawNumber);

    // Extract hero data with NEW simplified field names
    // Add timestamp for cache busting on images
    const heroImageSrc = pageData?.heroImage
        ? (pageData.heroImage.asset?.url || urlForImage(pageData.heroImage)?.url() || "/hero-fallback.jpg")
        : "/hero-fallback.jpg";

    const heroVideoSrc = pageData?.heroVideo
        ? (pageData.heroVideo.asset?.url || urlForVideo(pageData.heroVideo))
        : undefined;

    const heroHeadline = pageData?.heroTitle || "Welcome to the Hillside";
    const heroTagline = pageData?.heroTagline || "Off-grid luxury meets authentic Ghanaian hospitality";

    // Transform features to valueProps format for compatibility
    const valueProps = pageData?.features?.map((f, i) => ({
        _key: f._key || `feature-${i}`,
        title: f.title,
        description: f.description,
        order: i,
    })) || [];

    return (
        <>
            {/* Hero Section - from CMS */}
            <AdaptiveHero
                imageSrc={heroImageSrc}
                imageAlt="Miky Hillside Lodge overlooking the Bono Region hills"
                videoSrc={heroVideoSrc}
                headline={heroHeadline}
                tagline={heroTagline}
            >
                {/* Primary CTA */}
                <Link
                    href="/rooms"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-orange font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    <span>Explore Rooms</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>

                {/* Secondary CTA */}
                <a
                    href="#learn-more"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold text-lg rounded-full border-2 border-white/80 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                    <span>Learn More</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </AdaptiveHero>

            {/* Featured Rooms */}
            <FeaturedRooms 
                rooms={pageData?.featuredRooms || rooms}
                title={pageData?.featuredRoomsTitle}
                subtitle="Curated spaces designed for off-grid luxury and deep relaxation."
            />

            {/* Value Propositions - from CMS */}
            <section id="learn-more" className="scroll-mt-20">
                {valueProps.length > 0 && (
                    <ValuePropositions 
                        valueProps={valueProps}
                        title={pageData?.featuresTitle}
                        subtitle="Where modern comfort meets timeless tradition"
                    />
                )}
            </section>

            {/* Floating WhatsApp Button */}
            <AkwaabaFab phoneNumber={whatsappNumber} />
        </>
    );
}
