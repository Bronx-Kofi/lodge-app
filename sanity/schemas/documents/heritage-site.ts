import { defineField, defineType } from "sanity";

export const heritageSite = defineType({
    name: "heritageSite",
    title: "Heritage Site",
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
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Nature", value: "nature" },
                    { title: "Culture", value: "culture" },
                    { title: "History", value: "history" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Main Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "summary",
            title: "Short Summary",
            type: "text",
            rows: 3,
            description: "Appears on the card in the directory.",
            validation: (Rule) => Rule.max(200),
        }),
        defineField({
            name: "description",
            title: "Full Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "secretHistory",
            title: "Secret History",
            type: "text",
            rows: 5,
            description: "The 'Cinematic' backstory or local legend associated with the site.",
        }),
        defineField({
            name: "travelTime",
            title: "Travel Time from Lodge",
            type: "string",
            placeholder: "e.g. 45 mins drive",
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "geopoint",
        }),
        defineField({
            name: "gallery",
            title: "Gallery Images",
            description: "Upload 5-10 photos showing different views of the site. Click 'Upload' to add images.",
            type: "array",
            of: [
                {
                    type: "image",
                    options: { 
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: "alt",
                            title: "Alternative Text",
                            type: "string",
                            description: "Describe what's in this image",
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                            description: "Optional caption for this image",
                        },
                    ],
                }
            ],
            validation: (Rule) => Rule.max(10),
        }),
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "category",
            media: "image",
        },
    },
});
