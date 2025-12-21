import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Homepage - SIMPLIFIED FOR MANAGERS
 * Only the essential fields to edit homepage content
 */
export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "features", title: "Features" },
    { name: "rooms", title: "Featured Rooms" },
    { name: "whatsapp", title: "WhatsApp Button" },
  ],
  fields: [
    // ==================== HERO SECTION ====================
    defineField({
      name: "heroTitle",
      title: "Hero Headline",
      type: "string",
      description: "Main text visitors see first. Example: Welcome to the Hillside",
      group: "hero",
    }),

    defineField({
      name: "heroTagline",
      title: "Hero Subtitle",
      type: "text",
      rows: 2,
      description: "Supporting text below headline",
      group: "hero",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "Main background image (1920x1080 recommended)",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      group: "hero",
    }),

    defineField({
      name: "heroVideo",
      title: "Hero Video (Optional)",
      type: "file",
      description: "Optional video to play instead of image (MP4, max 20MB)",
      options: { accept: "video/*" },
      group: "hero",
    }),

    // ==================== VALUE PROPOSITIONS ====================
    defineField({
      name: "featuresTitle",
      title: "Features Section Title",
      type: "string",
      description: "Title above features. Example: The Hillside Promise",
      group: "features",
    }),

    defineField({
      name: "features",
      title: "Features (add 3-4)",
      type: "array",
      description: "Add your main selling points",
      group: "features",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // ==================== FEATURED ROOMS ====================
    defineField({
      name: "featuredRoomsTitle",
      title: "Rooms Section Title",
      type: "string",
      description: "Title above room cards. Example: Our Rooms",
      group: "rooms",
    }),

    defineField({
      name: "featuredRooms",
      title: "Select Rooms to Feature",
      type: "array",
      description: "Pick which rooms show on homepage (max 6)",
      group: "rooms",
      of: [{ type: "reference", to: [{ type: "roomSimplified" }] }],
      validation: (Rule) => Rule.max(6),
    }),

    // ==================== WHATSAPP FAB ====================
    defineField({
      name: "whatsappEnabled",
      title: "Show WhatsApp Button?",
      type: "boolean",
      description: "Turn on to show floating WhatsApp chat button",
      initialValue: true,
      group: "whatsapp",
    }),

    defineField({
      name: "whatsappMessage",
      title: "Pre-filled Message",
      type: "text",
      rows: 2,
      description: "Message guests see when they click WhatsApp",
      group: "whatsapp",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Homepage",
        subtitle: "Edit hero, features, and rooms",
      };
    },
  },
});
