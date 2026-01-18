import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Generate unique booking reference
function generateBookingReference(): string {
  const prefix = 'MHL';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();

    const {
      roomId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      adults,
      children,
      numberOfRooms,
      specialRequests,
      totalPrice,
      nationality,
      passportNumber,
    } = bookingData;

    // Validate required fields
    if (!roomId || !guestName || !guestEmail || !guestPhone || !checkIn || !checkOut || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Double-check availability before creating booking
    const availabilityCheck = await fetch(
      `${request.nextUrl.origin}/api/availability/check`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, checkIn, checkOut }),
      }
    );

    const availabilityResult = await availabilityCheck.json();

    if (!availabilityResult.available) {
      return NextResponse.json(
        { error: 'Room is no longer available for selected dates' },
        { status: 409 }
      );
    }

    // Generate unique booking reference
    const bookingReference = generateBookingReference();

    // Create booking in Sanity
    const booking = await client.create({
      _type: 'booking',
      bookingReference,
      room: {
        _type: 'reference',
        _ref: roomId,
      },
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      numberOfRooms: numberOfRooms || 1,
      adults: adults || 1,
      children: children || 0,
      totalPrice,
      status: 'pending',
      paymentStatus: 'pending',
      specialRequests: specialRequests || '',
      nationality: nationality || '',
      passportNumber: passportNumber || '',
      createdAt: new Date().toISOString(),
      confirmationSent: false,
      reminderSent: false,
      receiptIssued: false,
    });

    // Create availability blocks for booked dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Block each night
    const availabilityPromises = [];
    for (let i = 0; i < nights; i++) {
      const date = new Date(checkInDate);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];

      availabilityPromises.push(
        client.create({
          _type: 'availability',
          room: {
            _type: 'reference',
            _ref: roomId,
          },
          date: dateString,
          available: false,
          reason: 'booked',
          notes: `Booking: ${bookingReference}`,
        })
      );
    }

    await Promise.all(availabilityPromises);

    // Email system removed as per user preference
    // Bookings will be visible in Sanity Studio
    // Property can contact guests via WhatsApp or phone

    return NextResponse.json({
      success: true,
      booking: {
        _id: booking._id,
        bookingReference,
        status: booking.status,
        guestEmail: booking.guestEmail,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      },
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
