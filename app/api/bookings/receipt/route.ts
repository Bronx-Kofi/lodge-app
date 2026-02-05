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
        "room": room[_type == "roomSimplified"]->{
          _id,
          title,
          tagline,
          price,
          receiptPrice,
          bookingPrice,
          "finalPrice": coalesce(receiptPrice, price),
          "image": image.asset->url
        },
        guestName,
        guestEmail,
        guestPhone,
        nationality,
        passportNumber,
        ghanaCardNumber,
        numberOfRooms,
        checkIn,
        checkOut,
        adults,
        children,
        roomPricePerNight,
        totalPrice,
        status,
        paymentStatus,
        amountPaid,
        paymentMethod,
        paymentReference,
        paymentNotes,
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
          ghanaCardNumber,
          numberOfRooms,
          checkInDate,
          checkOutDate,
          numberOfGuests,
          roomPreference,
          selectedRoom[_type == "roomSimplified"]->{
            _id,
            title,
            price,
            receiptPrice,
            bookingPrice,
            "finalPrice": coalesce(receiptPrice, price),
            "image": image.asset->url
          },
          selectedRoomTitle,
          nightlyRate,
          totalPrice,
          paymentDeclaration,
          telecelPaymentNumber,
          telecelTransactionId,
          amountPaid,
          paymentNotes,
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

      // Resolve room/pricing for check-in form receipts (priority: selectedRoom -> stored nightlyRate -> roomPreference text match)
      let roomData = checkInForm.selectedRoom || null;

      // If selectedRoom exists but lacks price (shouldn't), fall back
      const storedNightlyRate = typeof checkInForm.nightlyRate === 'number' ? checkInForm.nightlyRate : null;

      if (!roomData && checkInForm.roomPreference) {
        roomData = await readClient.fetch(
          `*[_type == "roomSimplified" && title match $roomTitle][0]{
            _id,
            title,
            tagline,
            price,
            receiptPrice,
            bookingPrice,
            "finalPrice": coalesce(receiptPrice, price),
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

      // If we still can't determine the nightly rate (legacy submissions), fall back to the lowest-priced room.
      let nightlyRate = storedNightlyRate;
      
      // Use roomData.finalPrice if available (from our computed alias)
      if (roomData && typeof roomData.finalPrice === 'number' && roomData.finalPrice > 0) {
        nightlyRate = roomData.finalPrice;
      }

      let fallbackRoom: { title: string; finalPrice: number | null } | null = null;
      if (nightlyRate == null) {
        fallbackRoom = await readClient.fetch(
          `*[_type == "roomSimplified" && defined(price)] | order(coalesce(receiptPrice, price) asc)[0]{
            title,
            price,
            receiptPrice,
            bookingPrice,
            "finalPrice": coalesce(receiptPrice, price)
          }`
        );
        nightlyRate = typeof fallbackRoom?.finalPrice === 'number' && fallbackRoom.finalPrice > 0 ? fallbackRoom.finalPrice : null;
      }

      // Use stored totalPrice if available (includes all fees), otherwise calculate basic total
      const numberOfRooms = checkInForm.numberOfRooms || 1;
      let finalTotal;
      
      if (typeof checkInForm.totalPrice === 'number' && checkInForm.totalPrice > 0) {
        // Use the pre-calculated total from check-in form (includes all fees and taxes)
        finalTotal = checkInForm.totalPrice;
        console.log(`[Receipt API] Using stored totalPrice: GH₵${finalTotal}`);
      } else if (nightlyRate && nights > 0) {
        // Fallback: calculate basic total if totalPrice not available (legacy data)
        finalTotal = nightlyRate * nights * numberOfRooms;
        console.log(`[Receipt API] Calculated fallback total: GH₵${finalTotal} (${nightlyRate} × ${nights} × ${numberOfRooms})`);
      } else {
        finalTotal = null;
      }

      // Convert check-in form to booking format
      booking = {
        _id: checkInForm._id,
        bookingReference: checkInForm.checkInReference,
        room: roomData || {
          title:
            checkInForm.selectedRoomTitle ||
            checkInForm.roomPreference ||
            fallbackRoom?.title ||
            'Standard Room',
          tagline: '',
          price: nightlyRate,
        },
        guestName: checkInForm.guestName,
        guestEmail: checkInForm.email,
        guestPhone: checkInForm.phone,
        nationality: checkInForm.nationality || '',
        passportNumber: checkInForm.passportNumber || '',
        ghanaCardNumber: checkInForm.ghanaCardNumber || '',
        numberOfRooms: numberOfRooms,
        checkIn: checkInForm.checkInDate,
        checkOut: checkInForm.checkOutDate,
        adults: checkInForm.numberOfGuests || 1,
        children: 0,
        // For receipts, totalPrice should be the full stay total with all fees
        totalPrice: finalTotal,
        status: checkInForm.status || 'confirmed',
        // Map declaration to a paymentStatus for UI
        paymentStatus: checkInForm.paymentDeclaration === 'paid_telecel' ? 'paid' : 'pending',
        specialRequests: checkInForm.specialRequests || '',
        createdAt: checkInForm.submittedAt,
        receiptNumber: null,
        receiptIssued: false,
        receiptIssuedAt: null,
        paymentDeclaration: checkInForm.paymentDeclaration || 'not_paid',
        telecelPaymentNumber: checkInForm.telecelPaymentNumber || '',
        telecelTransactionId: checkInForm.telecelTransactionId || '',
        amountPaid: typeof checkInForm.amountPaid === 'number' ? checkInForm.amountPaid : null,
        paymentNotes: checkInForm.paymentNotes || '',
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
