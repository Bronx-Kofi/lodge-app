import { HomeIcon } from '@sanity/icons';
import { defineType, defineField } from 'sanity';

/**
 * ULTRA SIMPLE ROOM SCHEMA
 * Grouped into clear sections with simple field names
 */

export default defineType({
  name: "roomSimplified",
  title: "Room",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: 'basic', title: '1. Basic Info' },
    { name: 'photos', title: '2. Photos' },
    { name: 'pricing', title: '3. Price' },
    { name: 'capacity', title: '4. Who Can Stay' },
    { name: 'amenities', title: '5. What\'s Included' },
    { name: 'details', title: '6. Additional Details' },
  ],
  fields: [
    // GROUP 1: BASIC INFO
    defineField({
      name: "title",
      title: "Room Name",
      type: "string",
      description: "Example: Hillside Suite or Garden View Room",
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),

    defineField({
      name: "slug",
      title: "Web Address (Click Generate)",
      type: "slug",
      description: "Click the Generate button - don't type this",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'basic',
    }),

    defineField({
      name: "tagline",
      title: "Short Description (1-2 sentences)",
      type: "string",
      description: "Example: Spacious room with stunning mountain views",
      group: 'basic',
    }),

    defineField({
      name: "description",
      title: "Full Description (2-3 paragraphs)",
      type: "array",
      description: "Describe the room in detail - add paragraphs using the + button",
      of: [{ type: "block" }],
      group: 'basic',
    }),

    // GROUP 2: PHOTOS
    defineField({
      name: "image",
      title: "Main Photo (Most Important)",
      type: "image",
      description: "This is THE photo people see first. Use your best! 1920x1080 pixels",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      group: 'photos',
    }),

    defineField({
      name: "gallery",
      title: "More Photos (5-10 images)",
      type: "array",
      description: "Upload photos showing different angles, bed, bathroom, view",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
              description: "Describe the image for accessibility",
            },
            {
              name: "caption",
              title: "Caption (Optional)",
              type: "string",
            },
          ],
        },
      ],
      group: 'photos',
    }),

    // GROUP 3: PRICING
    defineField({
      name: "price",
      title: "Price Per Night (Ghana Cedis)",
      type: "number",
      description: "Example: 250 for GHC 250 per night",
      validation: (Rule) => Rule.required().positive(),
      group: 'pricing',
    }),

    // GROUP 4: CAPACITY
    defineField({
      name: "capacity",
      title: "Maximum Guests (Total)",
      type: "number",
      description: "How many people can sleep here?",
      validation: (Rule) => Rule.required().positive().integer(),
      group: 'capacity',
    }),

    defineField({
      name: "beds",
      title: "Number of Beds",
      type: "number",
      description: "How many beds?",
      validation: (Rule) => Rule.positive().integer(),
      group: 'capacity',
    }),

    defineField({
      name: "bedType",
      title: "Bed Size",
      type: "string",
      description: "What size are the beds?",
      options: {
        list: [
          { title: "Single/Twin", value: "single" },
          { title: "Double", value: "double" },
          { title: "Queen", value: "queen" },
          { title: "King", value: "king" },
        ],
        layout: "radio",
      },
      group: 'capacity',
    }),

    defineField({
      name: "bathrooms",
      title: "Number of Bathrooms",
      type: "number",
      description: "How many bathrooms?",
      validation: (Rule) => Rule.positive().integer(),
      group: 'capacity',
    }),

    // GROUP 5: AMENITIES
    defineField({
      name: "amenities",
      title: "What's Included? (Check all that apply)",
      type: "array",
      description: "Check the boxes for what this room has",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "WiFi (Starlink)", value: "wifi" },
          { title: "Air Conditioning", value: "ac" },
          { title: "Balcony/Terrace", value: "balcony" },
          { title: "Kitchen", value: "kitchen" },
          { title: "Living Room", value: "livingRoom" },
          { title: "Minibar", value: "minibar" },
          { title: "TV", value: "tv" },
          { title: "Work Desk", value: "desk" },
          { title: "Safe", value: "safe" },
          { title: "Private Bathroom", value: "bathroom" },
          { title: "Free Toiletries", value: "toiletries" },
          { title: "Car Park", value: "carPark" },
        ],
        layout: "grid",
      },
      group: 'amenities',
    }),

    defineField({
      name: "view",
      title: "View Type",
      type: "string",
      description: "What can guests see from the room?",
      options: {
        list: [
          { title: "Garden View", value: "garden" },
          { title: "Pool View", value: "pool" },
          { title: "Mountain View", value: "mountain" },
          { title: "City View", value: "city" },
          { title: "No Specific View", value: "none" },
        ],
        layout: "radio",
      },
      group: 'amenities',
    }),

    defineField({
      name: 'cancellationPolicy',
      title: 'Cancellation Policy',
      type: 'string',
      description: 'Displayed on booking widget (e.g., "Free cancellation up to 48h before")',
      initialValue: 'Free cancellation up to 48h before.',
      validation: (Rule) => Rule.max(100),
      group: 'details',
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "image",
      price: "price",
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title: title || "Untitled Room",
        subtitle: price ? `GHC ${price}/night - ${subtitle || ''}` : subtitle,
        media,
      };
    },
  },
});
