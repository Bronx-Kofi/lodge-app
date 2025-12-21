import { getAboutPage, getSiteSettings } from "@/lib/sanity-queries";
import { cleanPhoneNumber } from "@/lib/utils/phone";
import { AboutPageClient } from "./_components/AboutPageClient";

// Enable static generation with revalidation
export const revalidate = 1800; // 30 minutes

export default async function AboutPage() {
    const [pageData, siteSettings] = await Promise.all([
        getAboutPage(),
        getSiteSettings()
    ]);

    const rawNumber = siteSettings?.whatsapp || siteSettings?.whatsappNumbers?.main || "233000000000";
    const whatsappNumber = cleanPhoneNumber(rawNumber);

    return <AboutPageClient pageData={pageData} whatsappNumber={whatsappNumber} />;
}
