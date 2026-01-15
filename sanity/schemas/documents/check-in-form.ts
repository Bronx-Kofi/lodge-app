import { UserIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'checkInForm',
  title: 'Check-In Forms',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'checkInReference',
      title: 'Check-In Reference',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique check-in form reference (e.g., CHK-12345)',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Reviewed', value: 'reviewed' },
          { title: 'Processed', value: 'processed' },
          { title: 'Checked In', value: 'checked-in' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bookingReference',
      title: 'Booking Reference (if available)',
      type: 'string',
      description: 'Link to existing booking if guest provided reference',
    }),
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
    }),
    defineField({
      name: 'passportNumber',
      title: 'Passport/ID Number',
      type: 'string',
    }),
    defineField({
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
    }),
    defineField({
      name: 'checkInDate',
      title: 'Check-In Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'checkOutDate',
      title: 'Check-Out Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'numberOfGuests',
      title: 'Number of Guests',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'roomPreference',
      title: 'Room Preference (legacy)',
      type: 'string',
      description: 'Legacy free-text field (kept for older submissions). New submissions should use Selected Room fields below.',
    }),
    defineField({
      name: 'selectedRoom',
      title: 'Selected Room',
      type: 'reference',
      to: [{ type: 'roomSimplified' }],
      description: 'Room selected by the guest (recommended for accurate pricing).',
    }),
    defineField({
      name: 'selectedRoomTitle',
      title: 'Selected Room Title',
      type: 'string',
      description: 'Stored copy of the room title at time of submission (for audit/receipts).',
    }),
    defineField({
      name: 'nightlyRate',
      title: 'Nightly Rate',
      type: 'number',
      description: 'Stored nightly rate at time of submission (for accurate receipts).',
    }),
    defineField({
      name: 'paymentDeclaration',
      title: 'Payment Declaration',
      type: 'string',
      options: {
        list: [
          { title: 'Paid via Telecel Cash (Mobile Money)', value: 'paid_telecel' },
          { title: 'Not Paid Yet', value: 'not_paid' },
        ],
        layout: 'radio',
      },
      initialValue: 'not_paid',
    }),
    defineField({
      name: 'telecelPaymentNumber',
      title: 'Telecel Payment Number',
      type: 'string',
      description: 'Telecel number used for payment (if paid).',
    }),
    defineField({
      name: 'telecelTransactionId',
      title: 'Telecel Transaction ID / Reference',
      type: 'string',
      description: 'Transaction ID or reference provided by Telecel (if paid).',
    }),
    defineField({
      name: 'amountPaid',
      title: 'Amount Paid',
      type: 'number',
      description: 'Amount the guest states they paid (if paid).',
    }),
    defineField({
      name: 'paymentNotes',
      title: 'Payment Notes',
      type: 'string',
      description: 'Optional notes about payment (e.g., sender name).',
    }),
    defineField({
      name: 'specialRequests',
      title: 'Special Requests',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'arrivalTime',
      title: 'Expected Arrival Time',
      type: 'string',
    }),
    defineField({
      name: 'needsPickup',
      title: 'Needs Pickup',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'emergencyContactName',
      title: 'Emergency Contact Name',
      type: 'string',
    }),
    defineField({
      name: 'emergencyContactPhone',
      title: 'Emergency Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'emergencyContactRelation',
      title: 'Emergency Contact Relationship',
      type: 'string',
    }),
    defineField({
      name: 'needsVisaReceipt',
      title: 'Needs Visa Receipt',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'notes',
      title: 'Staff Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes for staff',
    }),
  ],
  preview: {
    select: {
      guestName: 'guestName',
      checkInDate: 'checkInDate',
      status: 'status',
      reference: 'checkInReference',
    },
    prepare({ guestName, checkInDate, status, reference }) {
      return {
        title: `${reference} - ${guestName}`,
        subtitle: `Check-in: ${checkInDate} • ${status}`,
      };
    },
  },
  orderings: [
    {
      title: 'Submitted Date',
      name: 'submittedDate',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Check-in Date',
      name: 'checkInDate',
      by: [{ field: 'checkInDate', direction: 'asc' }],
    },
  ],
});
