import { StarIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Reviews',
  type: 'document',
  icon: StarIcon,
  fields: [
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
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'overallRating',
      title: 'Overall Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      description: '1-5 stars',
    }),
    defineField({
      name: 'categoryRatings',
      title: 'Category Ratings',
      type: 'object',
      fields: [
        { name: 'cleanliness', title: 'Cleanliness', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
        { name: 'communication', title: 'Communication', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
        { name: 'checkIn', title: 'Check-in', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
        { name: 'accuracy', title: 'Accuracy', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
        { name: 'location', title: 'Location', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
        { name: 'value', title: 'Value', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Review Title',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'body',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().min(10),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'verified',
      title: 'Verified Guest',
      type: 'boolean',
      initialValue: false,
      description: 'Guest stayed and booking confirmed',
    }),
    defineField({
      name: 'bookingReference',
      title: 'Booking Reference',
      type: 'string',
      description: 'Link to booking for verification',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'propertyResponse',
      title: 'Property Response',
      type: 'text',
      rows: 3,
      description: 'Optional response from property owner',
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Helpful Count',
      type: 'number',
      initialValue: 0,
      description: 'Number of users who found this helpful',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      guestName: 'guestName',
      room: 'room.title',
      rating: 'overallRating',
      status: 'status',
      verified: 'verified',
    },
    prepare({ guestName, room, rating, status, verified }) {
      const stars = `${rating} Stars`;
      return {
        title: `${guestName} - ${stars}`,
        subtitle: `${room} • ${status} ${verified ? '(Verified)' : ''}`,
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Highest Rated',
      name: 'highestRated',
      by: [{ field: 'overallRating', direction: 'desc' }],
    },
  ],
});
