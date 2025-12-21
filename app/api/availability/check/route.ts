import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const { roomId, checkIn, checkOut } = await request.json();

    // Validate input
    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required fields: roomId, checkIn, checkOut' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validate dates
    if (checkInDate >= checkOutDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    if (checkInDate < new Date()) {
      return NextResponse.json(
        { error: 'Check-in date cannot be in the past' },
        { status: 400 }
      );
    }

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

    const isAvailable = overlappingBookings.length === 0 && blockedDates.length === 0;

    return NextResponse.json({
      available: isAvailable,
      overlappingBookings: overlappingBookings.length,
      blockedDates: blockedDates.length,
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}
