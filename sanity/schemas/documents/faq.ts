import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQs",
  type: "document",
  // icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Bookings & Reservations", value: "bookings" },
          { title: "Payments", value: "payments" },
          { title: "Rooms", value: "rooms" },
          { title: "Event Halls", value: "halls" },
          { title: "Catering Services", value: "catering" },
          { title: "Policies", value: "policies" },
          { title: "Facilities & Amenities", value: "facilities" },
          { title: "Location & Directions", value: "location" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "orderPriority",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (most important questions = 1, 2, 3...)",
      initialValue: 999,
    }),
  ],
  preview: {
    select: {
      question: "question",
      category: "category",
      order: "orderPriority",
    },
    prepare({ question, category, order }) {
      return {
        title: question,
        subtitle: `${category} • Order: ${order}`,
      };
    },
  },
});
