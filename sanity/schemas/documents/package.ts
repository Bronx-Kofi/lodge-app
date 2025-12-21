import { defineField, defineType } from "sanity";

export const packageType = defineType({
    name: "package",
    title: "Package / Experience",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
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
            name: "price",
            title: "Package Price (USD)",
            type: "number",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "inclusions",
            title: "Inclusions",
            type: "array",
            of: [{ type: "string" }],
            options: {
                layout: "tags",
            },
        }),
        defineField({
            name: "linkedRooms",
            title: "Available for Room Types",
            type: "array",
            of: [{ type: "reference", to: { type: "roomSimplified" } }],
        }),
    ],
});
