import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Create a client with write permissions using environment variables directly
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-02-28',
  useCdn: false, // Don't use CDN for mutations
  token: process.env.SANITY_API_TOKEN, // Write token from environment
});

// Log configuration (without exposing token)
console.log('[Check-In API] Sanity Config:', {
  projectId: client.config().projectId,
  dataset: client.config().dataset,
  hasToken: !!client.config().token,
  tokenLength: client.config().token?.length || 0,
});

// Generate unique check-in form reference
function generateCheckInReference(): string {
  const prefix = 'CHK';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  console.log('[Check-In API] Request received');
  
  try {
    const formData = await request.json();
    console.log('[Check-In API] Form data parsed:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    });

    const {
      firstName,
      lastName,
      email,
      phone,
      nationality,
      passportNumber,
      dateOfBirth,
      bookingReference,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      roomPreference,
      selectedRoomId,
      selectedRoomTitle,
      nightlyRate,
      paymentDeclaration,
      telecelPaymentNumber,
      telecelTransactionId,
      amountPaid,
      paymentNotes,
      specialRequests,
      arrivalTime,
      needsPickup,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
      needsVisaReceipt,
    } = formData;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !checkInDate || !checkOutDate) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // If guest has booking reference, try to find and update existing booking
    if (bookingReference) {
      try {
        const existingBooking = await client.fetch(
          `*[_type == "booking" && bookingReference == $reference][0]`,
          { reference: bookingReference }
        );

        if (existingBooking) {
          // Update existing booking with check-in form data
          await client
            .patch(existingBooking._id)
            .set({
              guestName: `${firstName} ${lastName}`,
              guestEmail: email,
              guestPhone: phone,
              nationality: nationality || '',
              passportNumber: passportNumber || '',
              specialRequests: specialRequests || '',
              checkIn: checkInDate,
              checkOut: checkOutDate,
              adults: numberOfGuests || 1,
              // Store additional check-in data
              checkInFormData: {
                dateOfBirth,
                roomPreference,
                arrivalTime,
                needsPickup,
                emergencyContactName,
                emergencyContactPhone,
                emergencyContactRelation,
                submittedAt: new Date().toISOString(),
              },
            })
            .commit();

          return NextResponse.json({
            success: true,
            bookingReference: existingBooking.bookingReference,
            message: 'Check-in form submitted successfully',
          });
        }
      } catch (err) {
        console.error('Error finding booking:', err);
      }
    }

    // If no booking reference or booking not found, create new check-in submission
    const checkInReference = generateCheckInReference();
    
    console.log('[Check-In API] Creating check-in form document:', checkInReference);

    const checkInSubmission = await client.create({
      _type: 'checkInForm',
      checkInReference,
      guestName: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      phone,
      nationality: nationality || '',
      passportNumber: passportNumber || '',
      dateOfBirth: dateOfBirth || '',
      bookingReference: bookingReference || '',
      checkInDate,
      checkOutDate,
      numberOfGuests: numberOfGuests || 1,
      roomPreference: roomPreference || '',
      selectedRoom: selectedRoomId ? { _type: 'reference', _ref: selectedRoomId } : undefined,
      selectedRoomTitle: selectedRoomTitle || '',
      nightlyRate: typeof nightlyRate === 'number' ? nightlyRate : undefined,
      paymentDeclaration: paymentDeclaration || 'not_paid',
      telecelPaymentNumber: telecelPaymentNumber || '',
      telecelTransactionId: telecelTransactionId || '',
      amountPaid: typeof amountPaid === 'number' ? amountPaid : undefined,
      paymentNotes: paymentNotes || '',
      specialRequests: specialRequests || '',
      arrivalTime: arrivalTime || '',
      needsPickup: needsPickup || false,
      emergencyContactName: emergencyContactName || '',
      emergencyContactPhone: emergencyContactPhone || '',
      emergencyContactRelation: emergencyContactRelation || '',
      needsVisaReceipt: needsVisaReceipt || false,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    });

    // Send confirmation email with receipt link
    try {
      const { sendConfirmationEmail } = await import('@/lib/email/send-confirmation');
      
      const emailResult = await sendConfirmationEmail({
        guestName: `${firstName} ${lastName}`,
        guestEmail: email,
        checkInReference,
        checkInDate,
        checkOutDate,
        numberOfGuests: numberOfGuests || 1,
        roomPreference: roomPreference || undefined,
      });

      if (emailResult.success) {
        console.log('[Check-In API] Email sent successfully to:', email);
      } else {
        console.log('[Check-In API] Email not sent (service not configured or error)');
      }
    } catch (emailError) {
      console.error('[Check-In API] Email error:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      checkInReference,
      bookingReference: bookingReference || checkInReference,
      message: 'Check-in form submitted successfully',
    });
  } catch (error) {
    console.error('[Check-In API] DETAILED ERROR:', error);
    console.error('[Check-In API] Error name:', (error as Error).name);
    console.error('[Check-In API] Error message:', (error as Error).message);
    console.error('[Check-In API] Error stack:', (error as Error).stack);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit check-in form',
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}
