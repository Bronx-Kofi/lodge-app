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
  ],

  preview: {
    prepare() {
      return {
        title: "Rooms Page",
        subtitle: "Edit page header text",
      };
    },
  },
});
