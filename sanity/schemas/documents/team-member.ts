import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Members",
  type: "document",
  // icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      description: "e.g., 'General Manager', 'Head Chef', 'Front Desk Supervisor'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 4,
      description: "Brief professional background",
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: [
          { title: "Management", value: "management" },
          { title: "Front Desk", value: "frontdesk" },
          { title: "Housekeeping", value: "housekeeping" },
          { title: "Kitchen & Catering", value: "kitchen" },
          { title: "Events & Banquets", value: "events" },
          { title: "Maintenance", value: "maintenance" },
          { title: "Security", value: "security" },
        ],
      },
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      description: "Optional - only shown if you want staff to be contactable",
      fields: [
        {
          name: "email",
          title: "Email",
          type: "string",
        },
        {
          name: "phone",
          title: "Phone",
          type: "string",
        },
        {
          name: "extension",
          title: "Extension",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (CEO = 1, Manager = 2, etc.)",
      initialValue: 999,
    }),
    defineField({
      name: "showOnAboutPage",
      title: "Show on About Page",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: "name",
      title: "title",
      media: "photo",
      department: "department",
    },
    prepare({ name, title, media, department }) {
      return {
        title: name,
        subtitle: `${title} • ${department}`,
        media,
      };
    },
  },
});
