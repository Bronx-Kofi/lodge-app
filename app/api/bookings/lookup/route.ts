import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const { email, bookingReference } = await request.json();

    if (!email || !bookingReference) {
      return NextResponse.json(
        { error: 'Email and booking reference are required' },
        { status: 400 }
      );
    }

    // Find booking by reference and email
    const booking = await client.fetch(
      `*[_type == "booking" && 
         bookingReference == $reference && 
         guestEmail == $email
      ][0]{
        _id,
        bookingReference,
        "room": room->{
          _id,
          title,
          tagline,
          "image": image.asset->url
        },
        guestName,
        guestEmail,
        guestPhone,
        checkIn,
        checkOut,
        adults,
        children,
        totalPrice,
        status,
        paymentStatus,
        specialRequests,
        createdAt
      }`,
      { reference: bookingReference, email }
    );

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found with the provided details' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Error looking up booking:', error);
    return NextResponse.json(
      { error: 'Failed to look up booking' },
      { status: 500 }
    );
  }
}
