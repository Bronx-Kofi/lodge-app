import { defineField, defineType } from "sanity";

export default defineType({
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown in blog listings",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contentGallery",
      title: "Content Gallery",
      description: "Select additional images from Media Library for the article",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "galleryImage" }],
        }
      ],
    }),
    defineField({
      name: "content",
      title: "Post Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "Important for SEO and accessibility",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Local Attractions", value: "attractions" },
          { title: "Travel Tips", value: "travel-tips" },
          { title: "Events & Festivals", value: "events" },
          { title: "Hotel News", value: "hotel-news" },
          { title: "Food & Dining", value: "food" },
          { title: "Business Travel", value: "business" },
          { title: "Cultural Heritage", value: "culture" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords for SEO (e.g., 'sunyani', 'waterfall', 'business travel')",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
      description: "Select from team members",
    }),
    defineField({
      name: "publishDate",
      title: "Publish Date",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      description: "Show prominently on blog page",
      initialValue: false,
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
      title: "title",
      category: "category",
      media: "featuredImage",
      date: "publishDate",
    },
    prepare({ title, category, media, date }) {
      return {
        title,
        subtitle: `${category} | ${date}`,
        media,
      };
    },
  },
});
