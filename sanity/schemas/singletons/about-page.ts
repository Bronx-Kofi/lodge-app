import { defineField, defineType } from "sanity";

/**
 * About Page - SIMPLIFIED
 */
export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Header" },
    { name: "story", title: "Our Story" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Page Title",
      type: "string",
      description: "Main heading. Example: About Us",
      group: "hero",
    }),

    defineField({
      name: "heroImage",
      title: "Header Image",
      type: "image",
      description: "Image shown at top of page (1920x600 recommended)",
      options: { hotspot: true },
      group: "hero",
    }),

    defineField({
      name: "storyTitle",
      title: "Story Section Title",
      type: "string",
      description: "Example: Our Story",
      group: "story",
    }),

    defineField({
      name: "storyContent",
      title: "Our Story",
      type: "text",
      rows: 10,
      description: "Tell your lodge's story. 2-4 paragraphs work well.",
      group: "story",
    }),

    defineField({
      name: "storyImage",
      title: "Story Image",
      type: "image",
      description: "Image alongside your story",
      options: { hotspot: true },
      group: "story",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "About Page",
        subtitle: "Edit about page content",
      };
    },
  },
});
