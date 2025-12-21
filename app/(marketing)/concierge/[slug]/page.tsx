import { notFound } from "next/navigation";
import { getRoomBySlug } from "@/lib/rooms/sanity-queries";
import { getSiteSettings } from "@/lib/sanity-queries";
import { cleanPhoneNumber } from "@/lib/utils/phone";
import { ConciergePageClient } from "./_components/ConciergePageClient";

export default async function ConciergePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    // Fetch room and settings data
    const [room, siteSettings] = await Promise.all([
        getRoomBySlug(slug),
        getSiteSettings()
    ]);

    if (!room) {
        notFound();
    }

    const rawNumber = siteSettings?.whatsapp || siteSettings?.whatsappNumbers?.main || "233000000000";
    const whatsappNumber = cleanPhoneNumber(rawNumber);

    return (
        <ConciergePageClient
            room={room}
            whatsappNumber={whatsappNumber}
        />
    );
}
