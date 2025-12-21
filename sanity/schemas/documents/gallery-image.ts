import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "galleryImage",
  title: "Media Library",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Media Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true, // Focal point for responsive cropping
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text (SEO)",
          description: "Describe the image for accessibility and SEO",
          validation: (Rule) => Rule.required().min(10).max(125),
        },
        {
          name: "attribution",
          type: "string",
          title: "Photo Credit",
          description: "Optional: Photographer or source",
        },
      ],
      hidden: ({ parent }) => parent?.mediaType === "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as any;
          if (parent?.mediaType === "image" && !value) {
            return "Image is required when media type is Image";
          }
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      description: "Upload video file (MP4, MOV recommended)",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.mediaType === "image",
    }),
    defineField({
      name: "videoUrl",
      title: "Or Video URL",
      type: "url",
      description: "YouTube/Vimeo URL instead of uploading",
      hidden: ({ parent }) => parent?.mediaType === "image",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 2,
      description: "Brief description of the image",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Rooms & Accommodations", value: "rooms" },
          { title: "Event Halls", value: "halls" },
          { title: "Restaurant & Dining", value: "dining" },
          { title: "Kitchen & Catering", value: "kitchen" },
          { title: "Hotel Exterior", value: "exterior" },
          { title: "Hotel Facilities", value: "facilities" },
          { title: "Events & Functions", value: "events" },
          { title: "Staff & Team", value: "team" },
          { title: "Nearby Attractions", value: "attractions" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description / Internal Notes",
      type: "text",
      rows: 3,
      description: "Internal notes, context, or detailed description for team reference",
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "image",
      mediaType: "mediaType",
      collections: "collections",
      tags: "tags",
      featured: "featured",
    },
    prepare({ title, category, media, mediaType, collections, tags, featured }) {
      const typeLabel = mediaType === "video" ? "[Video]" : "[Image]";
      const featuredLabel = featured ? " [Starred]" : "";
      const collectionsText = collections && collections.length > 0
        ? ` | ${collections.length} collection${collections.length > 1 ? 's' : ''}`
        : "";
      const tagsText = tags && tags.length > 0
        ? ` | ${tags.length > 1 ? 's' : ''}`
        : "";

      return {
        title: `${typeLabel}${featuredLabel} ${title}`,
        subtitle: `${category || "Uncategorized"}${collectionsText}${tagsText}`,
        media,
      };
    },
  },
  // Media Library storage - not published to site until referenced
  // Items here are just stored, not displayed anywhere automatically
});
