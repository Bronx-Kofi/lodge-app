import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventHall",
  title: "Event Halls",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Hall Name",
      type: "string",
      description: "e.g., Grand Ballroom, Conference Hall A",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly version of the hall name",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short description (e.g., 'Perfect for weddings and corporate events')",
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
      ],
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "object",
      fields: [
        {
          name: "minimum",
          title: "Minimum Guests",
          type: "number",
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: "maximum",
          title: "Maximum Guests",
          type: "number",
          validation: (Rule) => Rule.required().min(1),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dimensions",
      title: "Hall Dimensions",
      type: "object",
      fields: [
        {
          name: "squareFeet",
          title: "Square Feet",
          type: "number",
        },
        {
          name: "length",
          title: "Length (ft)",
          type: "number",
        },
        {
          name: "width",
          title: "Width (ft)",
          type: "number",
        },
        {
          name: "height",
          title: "Ceiling Height (ft)",
          type: "number",
        },
      ],
    }),
    defineField({
      name: "setupStyles",
      title: "Available Setup Styles",
      type: "array",
      description: "Room can be configured in these layouts",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "style",
              title: "Setup Style",
              type: "string",
              options: {
                list: [
                  { title: "Theater (rows of chairs)", value: "theater" },
                  { title: "Classroom (tables with chairs)", value: "classroom" },
                  { title: "Banquet (round tables)", value: "banquet" },
                  { title: "U-Shape", value: "ushape" },
                  { title: "Boardroom", value: "boardroom" },
                  { title: "Cocktail (standing)", value: "cocktail" },
                  { title: "Wedding Reception", value: "wedding" },
                ],
              },
            },
            {
              name: "capacity",
              title: "Capacity in this setup",
              type: "number",
            },
          ],
          preview: {
            select: {
              style: "style",
              capacity: "capacity",
            },
            prepare({ style, capacity }) {
              return {
                title: style,
                subtitle: `${capacity} guests`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "object",
      fields: [
        {
          name: "hourly",
          title: "Hourly Rate (GHS)",
          type: "number",
          description: "Leave empty if not offered",
        },
        {
          name: "halfDay",
          title: "Half Day Rate (GHS)",
          type: "number",
          description: "Typically 4 hours",
        },
        {
          name: "fullDay",
          title: "Full Day Rate (GHS)",
          type: "number",
          description: "Typically 8-10 hours",
        },
        {
          name: "weekend",
          title: "Weekend Rate (GHS)",
          type: "number",
          description: "Premium for Friday-Sunday",
        },
      ],
    }),
    defineField({
      name: "equipment",
      title: "Included Equipment & Amenities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "item",
              title: "Equipment/Amenity",
              type: "string",
              options: {
                list: [
                  "Projector & Screen",
                  "Sound System",
                  "Microphones",
                  "WiFi",
                  "Air Conditioning",
                  "Stage/Platform",
                  "Podium",
                  "Whiteboard",
                  "Flip Charts",
                  "Tables & Chairs",
                  "Lighting System",
                  "DJ Booth",
                  "Dance Floor",
                  "Bar Area",
                  "Kitchen Access",
                  "Restrooms",
                  "Parking",
                  "Security",
                  "Generator Backup",
                ],
              },
            },
            {
              name: "included",
              title: "Included in Base Price?",
              type: "boolean",
              initialValue: true,
            },
            {
              name: "additionalCost",
              title: "Additional Cost (if not included)",
              type: "number",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "cateringOptions",
      title: "Catering Options",
      type: "object",
      fields: [
        {
          name: "inHouse",
          title: "In-house catering available",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "externalAllowed",
          title: "External caterers allowed",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "cateringFee",
          title: "External Catering Fee (GHS)",
          type: "number",
          description: "Fee if guest brings external caterer",
        },
      ],
    }),
    defineField({
      name: "eventTypes",
      title: "Suitable Event Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Weddings", value: "wedding" },
          { title: "Corporate Conferences", value: "conference" },
          { title: "Seminars & Workshops", value: "seminar" },
          { title: "Birthday Parties", value: "birthday" },
          { title: "Anniversary Celebrations", value: "anniversary" },
          { title: "Church Services", value: "church" },
          { title: "Product Launches", value: "launch" },
          { title: "Networking Events", value: "networking" },
          { title: "Training Sessions", value: "training" },
          { title: "Gala Dinners", value: "gala" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Hall Images",
      type: "object",
      fields: [
        {
          name: "main",
          title: "Main Image",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "gallery",
          title: "Image Gallery",
          type: "array",
          of: [
            {
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                },
              ],
            },
          ],
        },
        {
          name: "floorPlan",
          title: "Floor Plan",
          type: "image",
          description: "Upload hall floor plan/layout diagram",
        },
      ],
    }),
    defineField({
      name: "videos",
      title: "Hall Videos",
      type: "object",
      description: "Video content showcasing the event hall",
      fields: [
        {
          name: "venueVideo",
          title: "Venue Tour Video",
          type: "file",
          description: "Upload a video walkthrough of the hall (MP4, MOV)",
          options: {
            accept: "video/*",
          },
        },
        {
          name: "venueVideoUrl",
          title: "Or Venue Video URL",
          type: "url",
          description: "YouTube/Vimeo URL for venue tour",
        },
        {
          name: "eventHighlights",
          title: "Past Events Highlight Reel",
          type: "file",
          description: "Showcase past weddings/events held here",
          options: {
            accept: "video/*",
          },
        },
      ],
    }),
    defineField({
      name: "availability",
      title: "Availability Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Temporarily Unavailable", value: "unavailable" },
          { title: "Under Renovation", value: "renovation" },
        ],
      },
      initialValue: "available",
    }),
    defineField({
      name: "featured",
      title: "Featured Hall",
      type: "boolean",
      description: "Show this hall prominently on homepage",
      initialValue: false,
    }),
    defineField({
      name: "parking",
      title: "Parking Details",
      type: "object",
      fields: [
        {
          name: "spaces",
          title: "Number of Parking Spaces",
          type: "number",
        },
        {
          name: "valet",
          title: "Valet Parking Available",
          type: "boolean",
        },
        {
          name: "cost",
          title: "Parking Cost",
          type: "string",
          description: "e.g., 'Free', 'GHS 20', 'GHS 10/hour'",
        },
      ],
    }),
    defineField({
      name: "specialFeatures",
      title: "Special Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Any unique features (e.g., 'Panoramic windows', 'Garden access')",
    }),
    defineField({
      name: "bookingRequirements",
      title: "Booking Requirements",
      type: "text",
      description: "Minimum booking hours, deposit requirements, cancellation policy, etc.",
      rows: 4,
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          validation: (Rule) => Rule.max(160),
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      tagline: "tagline",
      media: "images.main",
      capacity: "capacity.maximum",
    },
    prepare({ title, tagline, media, capacity }) {
      return {
        title,
        subtitle: `${tagline} | Up to ${capacity} guests`,
        media,
      };
    },
  },
});
