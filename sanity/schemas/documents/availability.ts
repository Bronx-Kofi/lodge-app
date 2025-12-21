import { CalendarIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'availability',
  title: 'Room Availability',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'room',
      title: 'Room',
      type: 'reference',
      to: [{ type: 'roomSimplified' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
      description: 'Is this room available on this date?',
    }),
    defineField({
      name: 'price',
      title: 'Price Override (GH₵)',
      type: 'number',
      description: 'Optional: Override the base room price for this specific date',
    }),
    defineField({
      name: 'reason',
      title: 'Unavailability Reason',
      type: 'string',
      options: {
        list: [
          { title: 'Booked', value: 'booked' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Blocked', value: 'blocked' },
          { title: 'Private Event', value: 'private_event' },
        ],
      },
      hidden: ({ parent }) => parent?.available !== false,
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      room: 'room.title',
      date: 'date',
      available: 'available',
      reason: 'reason',
    },
    prepare({ room, date, available, reason }) {
      return {
        title: `${room} - ${date}`,
        subtitle: available ? 'Available' : `Unavailable: ${reason || 'No reason'}`,
      };
    },
  },
});
