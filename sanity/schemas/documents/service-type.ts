import { defineField, defineType } from "sanity";

/**
 * Service Request Types
 * 
 * Configurable service request buttons for the concierge page.
 * Allows managers to add, remove, or customize service request options.
 */
export default defineType({
  name: "serviceType",
  title: "Service Request Types",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Service ID",
      type: "slug",
      description: "Unique identifier (e.g., 'towels', 'dining', 'maintenance')",
      options: {
        source: "label",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "label",
      title: "Display Label",
      type: "string",
      description: "Text shown on button (e.g., 'Towels', 'Room Service')",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon identifier (e.g., 'bath', 'utensils', 'wrench')",
      options: {
        list: [
          { title: "Bath/Towels (Bath)", value: "bath" },
          { title: "Dining (Utensils)", value: "utensils" },
          { title: "Maintenance (Wrench)", value: "wrench" },
          { title: "Housekeeping (Broom)", value: "broom" },
          { title: "Laundry (Shirt)", value: "shirt" },
          { title: "Concierge (Bell)", value: "bell" },
          { title: "WiFi", value: "wifi" },
          { title: "Air Conditioning", value: "snowflake" },
          { title: "Phone", value: "phone" },
          { title: "General Request", value: "help-circle" },
        ],
      },
    }),

    defineField({
      name: "color",
      title: "Button Color",
      type: "string",
      description: "Color theme for the button",
      options: {
        list: [
          { title: "Blue", value: "blue" },
          { title: "Orange", value: "orange" },
          { title: "Stone/Gray", value: "stone" },
          { title: "Green", value: "green" },
          { title: "Red", value: "red" },
          { title: "Purple", value: "purple" },
        ],
      },
      initialValue: "blue",
    }),

    defineField({
      name: "messageTemplate",
      title: "WhatsApp Message Template",
      type: "text",
      rows: 3,
      description: "Message sent when this service is requested. Use {roomTitle} for room name.",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "targetNumber",
      title: "Target WhatsApp Number",
      type: "string",
      description: "Which number receives this request",
      options: {
        list: [
          { title: "Main WhatsApp", value: "main" },
          { title: "Reception", value: "reception" },
          { title: "Operations", value: "operations" },
          { title: "Concierge", value: "concierge" },
        ],
      },
      initialValue: "operations",
    }),

    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      description: "Show this service request option to guests",
      initialValue: true,
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which buttons appear (lower numbers first)",
      initialValue: 0,
    }),

    defineField({
      name: "description",
      title: "Internal Description",
      type: "text",
      rows: 2,
      description: "Internal notes about this service (not shown to guests)",
    }),
  ],

  preview: {
    select: {
      title: "label",
      subtitle: "id.current",
      enabled: "enabled",
      order: "order",
    },
    prepare({ title, subtitle, enabled, order }) {
      return {
        title: enabled ? title : `[Hidden] ${title}`,
        subtitle: `${subtitle} | Order: ${order}`,
      };
    },
  },
});
