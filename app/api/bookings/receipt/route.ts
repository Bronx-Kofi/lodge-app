import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Generate unique receipt number
function generateReceiptNumber(bookingReference: string): string {
  const timestamp = Date.now().toString().slice(-6);
  return `RCP-${bookingReference.split('-')[1]}-${timestamp}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email, bookingReference } = await request.json();

    if (!email || !bookingReference) {
      return NextResponse.json(
        { error: 'Email and booking reference are required' },
        { status: 400 }
      );
    }

    // Find booking by reference and email with all needed data
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
        nationality,
        passportNumber,
        checkIn,
        checkOut,
        adults,
        children,
        totalPrice,
        status,
        paymentStatus,
        specialRequests,
        createdAt,
        receiptNumber,
        receiptIssued,
        receiptIssuedAt
      }`,
      { reference: bookingReference, email }
    );

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found with the provided details' },
        { status: 404 }
      );
    }

    // If receipt hasn't been issued yet, generate receipt number and update booking
    if (!booking.receiptIssued) {
      const receiptNumber = generateReceiptNumber(booking.bookingReference);
      const receiptIssuedAt = new Date().toISOString();

      await client
        .patch(booking._id)
        .set({
          receiptNumber,
          receiptIssued: true,
          receiptIssuedAt,
        })
        .commit();

      booking.receiptNumber = receiptNumber;
      booking.receiptIssuedAt = receiptIssuedAt;
      booking.receiptIssued = true;
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('Error generating receipt:', error);
    return NextResponse.json(
      { error: 'Failed to generate receipt' },
      { status: 500 }
    );
  }
}
