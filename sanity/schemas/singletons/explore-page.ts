import { defineField, defineType } from "sanity";

/**
 * Explore Page - SIMPLIFIED
 */
export default defineType({
  name: "explorePage",
  title: "Explore Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Page Title",
      type: "string",
      description: "Main heading. Example: Heritage & Experiences",
    }),

    defineField({
      name: "heroSubtitle",
      title: "Page Subtitle",
      type: "text",
      rows: 2,
      description: "Description below title",
    }),

    defineField({
      name: "ctaTitle",
      title: "Contact Section Title",
      type: "string",
      description: "Title for book a tour section",
    }),

    defineField({
      name: "ctaDescription",
      title: "Contact Section Text",
      type: "text",
      rows: 3,
      description: "Text encouraging guests to contact you",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Explore Page",
        subtitle: "Edit page header and CTA text",
      };
    },
  },
});
