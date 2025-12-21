import { defineField, defineType } from "sanity";

/**
 * Rooms Page - SIMPLIFIED
 */
export default defineType({
  name: "roomsPage",
  title: "Rooms Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Page Title",
      type: "string",
      description: "Main heading. Example: Our Rooms",
    }),

    defineField({
      name: "heroSubtitle",
      title: "Page Subtitle",
      type: "text",
      rows: 2,
      description: "Description below title",
    }),

    // Why Book Direct Section
    defineField({
      name: "whyBookDirectTitle",
      title: "Why Book Direct - Title",
      type: "string",
      description: "Main heading for the section",
      initialValue: "Why Book Direct?",
    }),

    defineField({
      name: "whyBookDirectBenefits",
      title: "Why Book Direct - Benefits",
      type: "array",
      description: "List of benefits (max 3 recommended)",
      validation: (Rule) => Rule.max(5),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Choose an icon",
              options: {
                list: [
                  { title: "💰 Money/Best Price", value: "money" },
                  { title: "✨ Star/Exclusive Perks", value: "star" },
                  { title: "📅 Calendar/Flexible Booking", value: "calendar" },
                  { title: "🎁 Gift/Special Offers", value: "gift" },
                  { title: "💎 Diamond/Premium Service", value: "diamond" },
                ],
              },
              initialValue: "money",
            },
            {
              name: "title",
              title: "Benefit Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Rooms Page",
        subtitle: "Edit page header text & Why Book Direct",
      };
    },
  },
});
