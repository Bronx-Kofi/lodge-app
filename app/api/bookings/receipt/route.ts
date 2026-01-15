import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Create a write-enabled client for this API route
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-02-28',
  useCdn: false, // Don't use CDN for mutations
  token: process.env.SANITY_API_TOKEN, // Write token
});

// Create a read client (no token needed for public data)
const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-02-28',
  useCdn: false, // Don't cache for receipt data
});

// Generate unique receipt number
function generateReceiptNumber(bookingReference: string): string {
  const timestamp = Date.now().toString().slice(-6);
  const refPart = bookingReference.split('-')[1] || 'XXXXX';
  return `RCP-${refPart}-${timestamp}`;
}

export async function POST(request: NextRequest) {
  console.log('[Receipt API] Request received');

  try {
    const body = await request.json();
    const { email, bookingReference } = body;

    console.log('[Receipt API] Looking for:', { email, bookingReference });

    if (!email || !bookingReference) {
      console.log('[Receipt API] Missing required fields');
      return NextResponse.json(
        { error: 'Email and booking reference are required' },
        { status: 400 }
      );
    }

    // Try to find booking first
    console.log('[Receipt API] Searching for booking...');
    let booking = await readClient.fetch(
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
          price,
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
      console.log('[Receipt API] No booking found, trying check-in form...');
      const checkInForm = await readClient.fetch(
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
        console.log('[Receipt API] No check-in form found either');
        return NextResponse.json(
          {
            error: 'Reservation not found with the provided details',
            details: 'Please check your reference number and email address'
          },
          { status: 404 }
        );
      }

      console.log('[Receipt API] Found check-in form:', checkInForm.checkInReference);

      // Try to find room by roomPreference to get pricing
      let roomData = null;
      if (checkInForm.roomPreference) {
        roomData = await readClient.fetch(
          `*[_type == "roomSimplified" && title match $roomTitle][0]{
            _id,
            title,
            tagline,
            price,
            "image": image.asset->url
          }`,
          { roomTitle: `*${checkInForm.roomPreference}*` }
        );
      }

      // Calculate nights and total for check-in form receipts
      const checkInDate = new Date(checkInForm.checkInDate);
      const checkOutDate = new Date(checkInForm.checkOutDate);
      const nights = Math.max(
        1,
        Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
      );

      const nightlyRate = typeof roomData?.price === 'number' ? roomData.price : null;
      const computedTotal = nightlyRate ? nightlyRate * nights : null;

      // Convert check-in form to booking format
      booking = {
        _id: checkInForm._id,
        bookingReference: checkInForm.checkInReference,
        room: roomData || {
          title: checkInForm.roomPreference || 'Standard Room',
          tagline: '',
          price: nightlyRate,
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
        // For receipts, totalPrice should be the full stay total (not nightly rate)
        totalPrice: computedTotal,
        status: checkInForm.status || 'confirmed',
        paymentStatus: 'pending',
        specialRequests: checkInForm.specialRequests || '',
        createdAt: checkInForm.submittedAt,
        receiptNumber: null,
        receiptIssued: false,
        receiptIssuedAt: null,
      };
    }

    // Generate receipt number (don't try to update check-in forms as they don't have receipt fields)
    if (!booking.receiptIssued && !booking.receiptNumber) {
      const receiptNumber = generateReceiptNumber(booking.bookingReference);
      const receiptIssuedAt = new Date().toISOString();

      // Only try to update if it's a real booking document (not converted check-in form)
      const isRealBooking = await readClient.fetch(
        `*[_type == "booking" && _id == $id][0]._id`,
        { id: booking._id }
      );

      if (isRealBooking) {
        console.log('[Receipt API] Updating booking with receipt number...');
        try {
          await writeClient
            .patch(booking._id)
            .set({
              receiptNumber,
              receiptIssued: true,
              receiptIssuedAt,
            })
            .commit();

          console.log('[Receipt API] Receipt number saved to booking');
        } catch (patchError) {
          console.error('[Receipt API] Error updating booking:', patchError);
          // Continue anyway - we can still generate the receipt
        }
      } else {
        console.log('[Receipt API] Check-in form - generating receipt number without saving');
      }

      booking.receiptNumber = receiptNumber;
      booking.receiptIssuedAt = receiptIssuedAt;
      booking.receiptIssued = true;
    }

    console.log('[Receipt API] Returning receipt data');
    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error('[Receipt API] DETAILED ERROR:', error);
    console.error('[Receipt API] Error name:', (error as Error).name);
    console.error('[Receipt API] Error message:', (error as Error).message);
    console.error('[Receipt API] Error stack:', (error as Error).stack);

    return NextResponse.json(
      {
        error: 'Failed to generate receipt',
        details: (error as Error).message,
        type: (error as Error).name
      },
      { status: 500 }
    );
  }
}
