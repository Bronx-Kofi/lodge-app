import { getHeritageSites } from "@/lib/heritage/sanity-queries";
import { getExplorePage, getSiteSettings } from "@/lib/sanity-queries";
import { cleanPhoneNumber } from "@/lib/utils/phone";
import { ExplorePageClient } from "./_components/ExplorePageClient";

// Enable static generation with revalidation
export const revalidate = 1800; // 30 minutes

export default async function ExplorePage() {
    // Fetch all data server-side
    const [sites, pageData, siteSettings] = await Promise.all([
        getHeritageSites(),
        getExplorePage(),
        getSiteSettings()
    ]);

    // Use CMS data or defaults
    const heroTitle = pageData?.heroTitle || "Heritage & Experiences";
    const heroSubtitle = pageData?.heroSubtitle || "Beyond the Lodge lies the heart of the Bono Region. Ancient groves, cascading waters, and stories waiting to be heard.";
    const ctaTitle = pageData?.ctaTitle || "Let Our Concierge Guide You";
    const ctaDescription = pageData?.ctaDescription || "Our local experts will craft personalized itineraries, arrange private tours, and share insider knowledge to make your Bono Region adventure unforgettable.";
    const rawNumber = siteSettings?.whatsapp || siteSettings?.whatsappNumbers?.main || "233000000000";
    const whatsappNumber = cleanPhoneNumber(rawNumber);

    return (
        <ExplorePageClient
            sites={sites}
            heroTitle={heroTitle}
            heroSubtitle={heroSubtitle}
            ctaTitle={ctaTitle}
            ctaDescription={ctaDescription}
            whatsappNumber={whatsappNumber}
            categories={pageData?.categories}
        />
    );
}
