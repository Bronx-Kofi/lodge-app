import { getRooms } from "@/lib/rooms/sanity-queries";
import { getRoomAvailabilityStatus } from "@/lib/rooms/availability-helpers";

// Enable static generation with revalidation
export const revalidate = 60; // 1 minute - more frequent updates for availability
import { getRoomsPage } from "@/lib/sanity-queries";
import { RoomsPageClient } from "./_components/RoomsPageClient";

export default async function RoomsPage() {
    // Fetch rooms and page data on server side for better performance and SEO
    const [rooms, pageData] = await Promise.all([
        getRooms(),
        getRoomsPage()
    ]);

    // Add availability status to each room
    const roomsWithAvailability = await Promise.all(
        rooms.map(async (room) => {
            const availabilityStatus = await getRoomAvailabilityStatus(room._id);
            return {
                ...room,
                availabilityStatus,
            };
        })
    );

    return <RoomsPageClient initialRooms={roomsWithAvailability} pageData={pageData} />;
}
