import { client } from "@/sanity/lib/client";

/**
 * Check if a room has any upcoming bookings or blocked dates
 * Returns availability status for display purposes
 */
export async function getRoomAvailabilityStatus(roomId: string): Promise<{
  isAvailable: boolean;
  nextAvailableDate?: string;
  hasUpcomingBookings: boolean;
}> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const next30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    // Check for confirmed bookings in the next 30 days
    const upcomingBookings = await client.fetch(
      `*[_type == "booking" && 
         room._ref == $roomId && 
         status in ["pending", "confirmed"] &&
         checkIn >= $today &&
         checkIn <= $next30Days
      ] | order(checkIn asc)`,
      { roomId, today, next30Days }
    );

    // Check for blocked dates in the next 30 days
    const blockedDates = await client.fetch(
      `*[_type == "availability" && 
         room._ref == $roomId && 
         available == false &&
         date >= $today &&
         date <= $next30Days
      ] | order(date asc)`,
      { roomId, today, next30Days }
    );

    const hasUpcomingBookings = upcomingBookings.length > 0 || blockedDates.length > 0;

    // Room is available if there are no bookings starting today
    const todayBookings = await client.fetch(
      `*[_type == "booking" && 
         room._ref == $roomId && 
         status in ["pending", "confirmed"] &&
         checkIn <= $today &&
         checkOut > $today
      ]`,
      { roomId, today }
    );

    const isAvailable = todayBookings.length === 0;

    // Find next available date if currently booked
    let nextAvailableDate;
    if (!isAvailable && upcomingBookings.length > 0) {
      nextAvailableDate = upcomingBookings[0].checkOut;
    }

    return {
      isAvailable,
      nextAvailableDate,
      hasUpcomingBookings,
    };
  } catch (error) {
    console.error("Error checking room availability:", error);
    // Default to available if we can't check
    return {
      isAvailable: true,
      hasUpcomingBookings: false,
    };
  }
}

/**
 * Check if a specific date range is available for a room
 */
export async function checkDateRangeAvailability(
  roomId: string,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  try {
    // Check for existing bookings that overlap
    const overlappingBookings = await client.fetch(
      `*[_type == "booking" && 
         room._ref == $roomId && 
         status in ["pending", "confirmed"] &&
         (
           (checkIn <= $checkIn && checkOut > $checkIn) ||
           (checkIn < $checkOut && checkOut >= $checkOut) ||
           (checkIn >= $checkIn && checkOut <= $checkOut)
         )
      ]`,
      { roomId, checkIn, checkOut }
    );

    // Check for blocked dates in availability collection
    const blockedDates = await client.fetch(
      `*[_type == "availability" && 
         room._ref == $roomId && 
         available == false &&
         date >= $checkIn && 
         date < $checkOut
      ]`,
      { roomId, checkIn, checkOut }
    );

    return overlappingBookings.length === 0 && blockedDates.length === 0;
  } catch (error) {
    console.error("Error checking date range availability:", error);
    return true; // Default to available if we can't check
  }
}
