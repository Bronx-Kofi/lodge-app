import { defineField, defineType } from "sanity";

/**
 * Navigation - SIMPLIFIED
 */
export default defineType({
  name: "navigation",
  title: "Navigation Menu",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Menu Links",
      type: "array",
      description: "Links shown in website header",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Link Text",
              type: "string",
              description: "What visitors see",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "string",
              description: "Where it goes (e.g., /rooms)",
              validation: (Rule) => Rule.required(),
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
        title: "Navigation Menu",
        subtitle: "Edit header links",
      };
    },
  },
});
