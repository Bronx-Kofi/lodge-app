import { Resend } from 'resend';
import { generateBookingConfirmationEmail, generatePlainTextConfirmation } from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendConfirmationEmailParams {
  guestName: string;
  guestEmail: string;
  checkInReference: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  roomPreference?: string;
}

export async function sendConfirmationEmail(params: SendConfirmationEmailParams) {
  try {
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.log('[Email] RESEND_API_KEY not configured - skipping email');
      return { success: false, message: 'Email service not configured' };
    }

    const htmlContent = generateBookingConfirmationEmail(params);
    const textContent = generatePlainTextConfirmation(params);

    const { data, error } = await resend.emails.send({
      from: 'Miky Hillside Lodge <bookings@mikyhillsidelodge.com>',
      to: [params.guestEmail],
      subject: `Booking Confirmed - ${params.checkInReference}`,
      html: htmlContent,
      text: textContent,
    });

    if (error) {
      console.error('[Email] Failed to send:', error);
      return { success: false, error };
    }

    console.log('[Email] Sent successfully:', data?.id);
    return { success: true, messageId: data?.id };
  } catch (error) {
    console.error('[Email] Error sending confirmation:', error);
    return { success: false, error };
  }
}
