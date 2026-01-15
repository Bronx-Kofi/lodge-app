import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

// Generate unique check-in form reference
function generateCheckInReference(): string {
  const prefix = 'CHK';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

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

    return NextResponse.json({
      success: true,
      checkInReference,
      bookingReference: bookingReference || checkInReference,
      message: 'Check-in form submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting check-in form:', error);
    return NextResponse.json(
      { error: 'Failed to submit check-in form' },
      { status: 500 }
    );
  }
}
