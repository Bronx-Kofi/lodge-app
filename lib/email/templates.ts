// Email templates for guest notifications

interface BookingConfirmationData {
  guestName: string;
  guestEmail: string;
  checkInReference: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  roomPreference?: string;
}

export function generateBookingConfirmationEmail(data: BookingConfirmationData): string {
  const {
    guestName,
    checkInReference,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    roomPreference,
  } = data;

  // Format dates nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Orange Bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">
                Miky Hillside Lodge
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">
                Your Home Away From Home
              </p>
            </td>
          </tr>

          <!-- Success Badge -->
          <tr>
            <td style="padding: 30px 30px 20px;">
              <div style="background-color: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 15px; text-align: center;">
                <p style="margin: 0; color: #065f46; font-size: 18px; font-weight: 600;">
                  ✓ Booking Confirmed!
                </p>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0 0 20px;">
                Dear <strong>${guestName}</strong>,
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #374151; margin: 0 0 20px;">
                Thank you for choosing Miky Hillside Lodge! We're excited to welcome you.
              </p>

              <!-- Booking Details Card -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 25px; margin: 25px 0;">
                <h2 style="margin: 0 0 20px; color: #111827; font-size: 20px; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">
                  Your Reservation Details
                </h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px; font-weight: 600;">
                      Booking Reference:
                    </td>
                    <td style="padding: 12px 0; color: #111827; font-size: 16px; font-weight: bold; text-align: right;">
                      ${checkInReference}
                    </td>
                  </tr>
                  <tr style="border-top: 1px solid #e5e7eb;">
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
                      Check-in:
                    </td>
                    <td style="padding: 12px 0; color: #111827; font-size: 14px; text-align: right;">
                      ${formatDate(checkInDate)}
                      <div style="color: #6b7280; font-size: 12px; margin-top: 4px;">From 2:00 PM</div>
                    </td>
                  </tr>
                  <tr style="border-top: 1px solid #e5e7eb;">
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
                      Check-out:
                    </td>
                    <td style="padding: 12px 0; color: #111827; font-size: 14px; text-align: right;">
                      ${formatDate(checkOutDate)}
                      <div style="color: #6b7280; font-size: 12px; margin-top: 4px;">Until 12:00 PM</div>
                    </td>
                  </tr>
                  <tr style="border-top: 1px solid #e5e7eb;">
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
                      Number of Guests:
                    </td>
                    <td style="padding: 12px 0; color: #111827; font-size: 14px; text-align: right;">
                      ${numberOfGuests} ${numberOfGuests === 1 ? 'Guest' : 'Guests'}
                    </td>
                  </tr>
                  ${roomPreference ? `
                  <tr style="border-top: 1px solid #e5e7eb;">
                    <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">
                      Room Preference:
                    </td>
                    <td style="padding: 12px 0; color: #111827; font-size: 14px; text-align: right;">
                      ${roomPreference}
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- What's Next Section -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; padding: 20px; margin: 25px 0;">
                <h3 style="margin: 0 0 15px; color: #1e40af; font-size: 16px;">
                  What Happens Next?
                </h3>
                <ol style="margin: 0; padding-left: 20px; color: #1e3a8a;">
                  <li style="margin-bottom: 10px;">We'll contact you via WhatsApp to confirm payment details</li>
                  <li style="margin-bottom: 10px;">Complete your payment via Telecel Cash</li>
                  <li style="margin-bottom: 10px;">Arrive at the lodge on your check-in date</li>
                  <li>Enjoy your stay with us!</li>
                </ol>
              </div>

              <!-- Contact Information -->
              <div style="background-color: #fff7ed; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h3 style="margin: 0 0 15px; color: #c2410c; font-size: 16px;">
                  📞 Need Help?
                </h3>
                <p style="margin: 0; color: #7c2d12; font-size: 14px; line-height: 1.6;">
                  <strong>WhatsApp:</strong> +233 XX XXX XXXX<br>
                  <strong>Phone:</strong> +233 XX XXX XXXX<br>
                  <strong>Email:</strong> info@mikyhillsidelodge.com
                </p>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 25px 0 0;">
                We look forward to hosting you at Miky Hillside Lodge!
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin: 10px 0 0;">
                Warm regards,<br>
                <strong style="color: #111827;">The Miky Hillside Lodge Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #111827; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; color: #9ca3af; font-size: 12px;">
                Miky Hillside Lodge &copy; 2026. All rights reserved.
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 11px;">
                Dumasua, Sunyani, Ghana
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Generate plain text version for email clients that don't support HTML
export function generatePlainTextConfirmation(data: BookingConfirmationData): string {
  const { guestName, checkInReference, checkInDate, checkOutDate, numberOfGuests } = data;

  return `
BOOKING CONFIRMATION - Miky Hillside Lodge

Dear ${guestName},

Thank you for choosing Miky Hillside Lodge! We're excited to welcome you.

RESERVATION DETAILS:
-------------------
Booking Reference: ${checkInReference}
Check-in: ${checkInDate} (from 2:00 PM)
Check-out: ${checkOutDate} (until 12:00 PM)
Guests: ${numberOfGuests}

WHAT'S NEXT:
-----------
1. We'll contact you via WhatsApp to confirm payment details
2. Complete your payment via Telecel Cash
3. Arrive at the lodge on your check-in date
4. Enjoy your stay with us!

NEED HELP?
----------
WhatsApp: +233 XX XXX XXXX
Phone: +233 XX XXX XXXX
Email: info@mikyhillsidelodge.com

We look forward to hosting you!

Warm regards,
The Miky Hillside Lodge Team

---
Miky Hillside Lodge
Dumasua, Sunyani, Ghana
  `.trim();
}
