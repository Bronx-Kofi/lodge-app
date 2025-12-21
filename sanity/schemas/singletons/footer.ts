import { defineField, defineType } from "sanity";

/**
 * Footer - SIMPLIFIED
 */
export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Example: 2024 Miky Hillside Lodge. All rights reserved.",
    }),

    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      description: "Links shown in footer (e.g., Privacy Policy)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Link Text",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "string",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Footer",
        subtitle: "Edit copyright and links",
      };
    },
  },
});
