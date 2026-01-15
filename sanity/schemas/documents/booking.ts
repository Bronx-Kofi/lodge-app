import { CalendarIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'booking',
  title: 'Bookings',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'bookingReference',
      title: 'Booking Reference',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique booking reference (e.g., MHL-12345)',
      readOnly: true,
    }),
    defineField({
      name: 'room',
      title: 'Room',
      type: 'reference',
      to: [{ type: 'roomSimplified' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guestName',
      title: 'Guest Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'guestEmail',
      title: 'Guest Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'guestPhone',
      title: 'Guest Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'checkIn',
      title: 'Check-in Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'checkOut',
      title: 'Check-out Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'adults',
      title: 'Number of Adults',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'children',
      title: 'Number of Children',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price (GH₵)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'status',
      title: 'Booking Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'paymentIntentId',
      title: 'Stripe Payment Intent ID',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'specialRequests',
      title: 'Special Requests',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'confirmationSent',
      title: 'Confirmation Email Sent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'reminderSent',
      title: 'Reminder Email Sent',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'nationality',
      title: 'Guest Nationality',
      type: 'string',
      description: 'Guest country (for visa receipts)',
    }),
    defineField({
      name: 'passportNumber',
      title: 'Passport Number',
      type: 'string',
      description: 'Optional: For international guests requiring visa documentation',
    }),
    defineField({
      name: 'receiptNumber',
      title: 'Receipt Number',
      type: 'string',
      description: 'Unique receipt identifier for accounting',
      readOnly: true,
    }),
    defineField({
      name: 'receiptIssued',
      title: 'Receipt Issued',
      type: 'boolean',
      initialValue: false,
      description: 'Whether a formal receipt has been generated',
    }),
    defineField({
      name: 'receiptIssuedAt',
      title: 'Receipt Issued Date',
      type: 'datetime',
      description: 'When the receipt was first generated',
      readOnly: true,
    }),
    defineField({
      name: 'checkInFormData',
      title: 'Check-In Form Data',
      type: 'object',
      description: 'Additional information from pre-check-in form',
      fields: [
        { name: 'dateOfBirth', title: 'Date of Birth', type: 'date' },
        { name: 'roomPreference', title: 'Room Preference', type: 'string' },
        { name: 'arrivalTime', title: 'Arrival Time', type: 'string' },
        { name: 'needsPickup', title: 'Needs Pickup', type: 'boolean' },
        { name: 'emergencyContactName', title: 'Emergency Contact Name', type: 'string' },
        { name: 'emergencyContactPhone', title: 'Emergency Contact Phone', type: 'string' },
        { name: 'emergencyContactRelation', title: 'Emergency Contact Relation', type: 'string' },
        { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
      ],
    }),
  ],
  preview: {
    select: {
      guestName: 'guestName',
      room: 'room.title',
      checkIn: 'checkIn',
      status: 'status',
      reference: 'bookingReference',
    },
    prepare({ guestName, room, checkIn, status, reference }) {
      return {
        title: `${reference} - ${guestName}`,
        subtitle: `${room} • Check-in: ${checkIn} • ${status}`,
      };
    },
  },
  orderings: [
    {
      title: 'Check-in Date',
      name: 'checkInDate',
      by: [{ field: 'checkIn', direction: 'desc' }],
    },
    {
      title: 'Created Date',
      name: 'createdDate',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
});
