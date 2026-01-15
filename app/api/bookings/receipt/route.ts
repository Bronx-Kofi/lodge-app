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

    // Try to find booking first
    let booking = await client.fetch(
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

    // If no booking found, try check-in form
    if (!booking) {
      const checkInForm = await client.fetch(
        `*[_type == "checkInForm" && 
           checkInReference == $reference && 
           email == $email
        ][0]{
          _id,
          checkInReference,
          guestName,
          email,
          phone,
          nationality,
          passportNumber,
          checkInDate,
          checkOutDate,
          numberOfGuests,
          roomPreference,
          specialRequests,
          submittedAt,
          status
        }`,
        { reference: bookingReference, email }
      );

      if (!checkInForm) {
        return NextResponse.json(
          { error: 'Reservation not found with the provided details' },
          { status: 404 }
        );
      }

      // Convert check-in form to booking format
      booking = {
        _id: checkInForm._id,
        bookingReference: checkInForm.checkInReference,
        room: {
          title: checkInForm.roomPreference || 'Standard Room',
          tagline: '',
        },
        guestName: checkInForm.guestName,
        guestEmail: checkInForm.email,
        guestPhone: checkInForm.phone,
        nationality: checkInForm.nationality || '',
        passportNumber: checkInForm.passportNumber || '',
        checkIn: checkInForm.checkInDate,
        checkOut: checkInForm.checkOutDate,
        adults: checkInForm.numberOfGuests || 1,
        children: 0,
        totalPrice: 0,
        status: checkInForm.status || 'confirmed',
        paymentStatus: 'pending',
        specialRequests: checkInForm.specialRequests || '',
        createdAt: checkInForm.submittedAt,
        receiptNumber: null,
        receiptIssued: false,
        receiptIssuedAt: null,
      };
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
