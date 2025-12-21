import { getRooms } from "@/lib/rooms/sanity-queries";

// Enable static generation with revalidation
export const revalidate = 1800; // 30 minutes
import { getRoomsPage } from "@/lib/sanity-queries";
import { RoomsPageClient } from "./_components/RoomsPageClient";

export default async function RoomsPage() {
    // Fetch rooms and page data on server side for better performance and SEO
    const [rooms, pageData] = await Promise.all([
        getRooms(),
        getRoomsPage()
    ]);

    return <RoomsPageClient initialRooms={rooms} pageData={pageData} />;
}
