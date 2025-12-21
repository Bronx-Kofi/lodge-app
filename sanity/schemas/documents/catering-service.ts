import { defineField, defineType } from "sanity";

export default defineType({
  name: "cateringService",
  title: "Catering Services & Kitchens",
  type: "document",
  // icon: UtensilsIcon,
  fields: [
    defineField({
      name: "name",
      title: "Kitchen/Service Name",
      type: "string",
      description: "e.g., 'Main Kitchen', 'Banquet Kitchen', 'Pastry Kitchen'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Brief description of this kitchen's capabilities",
    }),
    defineField({
      name: "kitchenType",
      title: "Kitchen Type",
      type: "string",
      options: {
        list: [
          { title: "Main Kitchen (Full Service)", value: "main" },
          { title: "Banquet Kitchen", value: "banquet" },
          { title: "Pastry/Bakery", value: "pastry" },
          { title: "Event Catering", value: "event" },
        ],
      },
    }),
    defineField({
      name: "capacity",
      title: "Service Capacity",
      type: "object",
      fields: [
        {
          name: "mealsPerHour",
          title: "Meals Per Hour",
          type: "number",
          description: "How many meals can be prepared per hour",
        },
        {
          name: "maxGuests",
          title: "Maximum Guests Per Event",
          type: "number",
        },
      ],
    }),
    defineField({
      name: "equipment",
      title: "Kitchen Equipment",
      type: "array",
      description: "Available equipment and facilities",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "item",
              title: "Equipment",
              type: "string",
              options: {
                list: [
                  "Commercial Ovens",
                  "Gas Stoves",
                  "Industrial Refrigerators",
                  "Freezers",
                  "Food Warmers",
                  "Prep Tables",
                  "Dishwashers",
                  "Mixer/Blender",
                  "Deep Fryers",
                  "Grills",
                  "Steamer",
                  "Food Processor",
                  "Ice Maker",
                  "Serving Stations",
                ],
              },
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              initialValue: 1,
            },
          ],
        },
      ],
    }),
    defineField({
      name: "cateringPackages",
      title: "Catering Packages",
      type: "array",
      description: "Pre-designed meal packages for events",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "packageName",
              title: "Package Name",
              type: "string",
              description: "e.g., 'Wedding Deluxe', 'Corporate Lunch', 'Cocktail Reception'",
            },
            {
              name: "description",
              title: "Package Description",
              type: "text",
              rows: 3,
            },
            {
              name: "pricePerPerson",
              title: "Price Per Person (GHS)",
              type: "number",
            },
            {
              name: "minimumGuests",
              title: "Minimum Number of Guests",
              type: "number",
            },
            {
              name: "menuItems",
              title: "What's Included",
              type: "array",
              of: [{ type: "string" }],
              description: "List of dishes included in this package",
            },
            {
              name: "courseType",
              title: "Course Type",
              type: "string",
              options: {
                list: [
                  { title: "Buffet", value: "buffet" },
                  { title: "Plated Service (3-course)", value: "plated3" },
                  { title: "Plated Service (4-course)", value: "plated4" },
                  { title: "Plated Service (5-course)", value: "plated5" },
                  { title: "Family Style", value: "family" },
                  { title: "Cocktail/Appetizers", value: "cocktail" },
                ],
              },
            },
            {
              name: "beverages",
              title: "Beverages Included",
              type: "object",
              fields: [
                {
                  name: "nonAlcoholic",
                  title: "Non-Alcoholic Drinks",
                  type: "boolean",
                  initialValue: true,
                },
                {
                  name: "alcoholic",
                  title: "Alcoholic Beverages",
                  type: "boolean",
                  initialValue: false,
                },
                {
                  name: "beverageDetails",
                  title: "Beverage Details",
                  type: "string",
                  description: "e.g., 'Soft drinks, juice, water' or 'Open bar for 3 hours'",
                },
              ],
            },
            {
              name: "staffIncluded",
              title: "Staff Included",
              type: "object",
              fields: [
                {
                  name: "chefs",
                  title: "Number of Chefs",
                  type: "number",
                },
                {
                  name: "servers",
                  title: "Number of Servers",
                  type: "number",
                },
                {
                  name: "bartenders",
                  title: "Number of Bartenders",
                  type: "number",
                },
              ],
            },
            {
              name: "featured",
              title: "Featured Package",
              type: "boolean",
              description: "Show this package prominently",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "packageName",
              price: "pricePerPerson",
              course: "courseType",
            },
            prepare({ title, price, course }) {
              return {
                title,
                subtitle: `GHS ${price}/person • ${course}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "menuCategories",
      title: "Menu Categories",
      type: "array",
      description: "À la carte menu items organized by category",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Appetizers/Starters", value: "appetizers" },
                  { title: "Soups", value: "soups" },
                  { title: "Salads", value: "salads" },
                  { title: "Main Courses", value: "mains" },
                  { title: "Side Dishes", value: "sides" },
                  { title: "Desserts", value: "desserts" },
                  { title: "Beverages", value: "beverages" },
                  { title: "Breakfast Items", value: "breakfast" },
                ],
              },
            },
            {
              name: "items",
              title: "Menu Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "dishName",
                      title: "Dish Name",
                      type: "string",
                    },
                    {
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                    },
                    {
                      name: "price",
                      title: "Price (GHS)",
                      type: "number",
                    },
                    {
                      name: "dietaryInfo",
                      title: "Dietary Information",
                      type: "array",
                      of: [{ type: "string" }],
                      options: {
                        list: [
                          "Vegetarian",
                          "Vegan",
                          "Gluten-Free",
                          "Halal",
                          "Dairy-Free",
                          "Nut-Free",
                          "Spicy",
                        ],
                      },
                    },
                    {
                      name: "image",
                      title: "Dish Image",
                      type: "image",
                      options: {
                        hotspot: true,
                      },
                    },
                  ],
                  preview: {
                    select: {
                      title: "dishName",
                      price: "price",
                      media: "image",
                    },
                    prepare({ title, price, media }) {
                      return {
                        title,
                        subtitle: `GHS ${price}`,
                        media,
                      };
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "specialDiets",
      title: "Special Dietary Accommodations",
      type: "array",
      description: "Dietary restrictions and preferences we can accommodate",
      of: [{ type: "string" }],
      options: {
        list: [
          "Vegetarian",
          "Vegan",
          "Gluten-Free",
          "Halal",
          "Kosher",
          "Dairy-Free",
          "Nut-Free Allergies",
          "Diabetic-Friendly",
          "Low-Sodium",
          "Shellfish-Free",
        ],
      },
    }),
    defineField({
      name: "cuisineTypes",
      title: "Cuisine Types Offered",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          "Ghanaian Traditional",
          "West African",
          "Continental",
          "Chinese",
          "Indian",
          "Italian",
          "Mediterranean",
          "American",
          "BBQ/Grills",
          "Fusion",
        ],
      },
    }),
    defineField({
      name: "serviceAreas",
      title: "Service Areas",
      type: "array",
      description: "Where catering is available",
      of: [{ type: "string" }],
      options: {
        list: [
          "In-Room Dining",
          "Restaurant",
          "Event Halls",
          "Poolside",
          "Garden",
          "Off-Site Events (within radius)",
        ],
      },
    }),
    defineField({
      name: "bookingDetails",
      title: "Booking Information",
      type: "object",
      fields: [
        {
          name: "advanceNotice",
          title: "Advance Notice Required",
          type: "string",
          description: "e.g., '48 hours', '1 week for events over 100 guests'",
        },
        {
          name: "depositRequired",
          title: "Deposit Required (%)",
          type: "number",
          description: "Percentage of total cost",
        },
        {
          name: "cancellationPolicy",
          title: "Cancellation Policy",
          type: "text",
          rows: 3,
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "object",
      fields: [
        {
          name: "main",
          title: "Main Image",
          type: "image",
          description: "Kitchen or beautifully plated dish",
          options: {
            hotspot: true,
          },
        },
        {
          name: "gallery",
          title: "Gallery",
          type: "array",
          of: [
            {
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "caption",
                  title: "Caption",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "object",
      description: "Video content showcasing kitchen and food",
      fields: [
        {
          name: "kitchenTour",
          title: "Kitchen Tour Video",
          type: "file",
          description: "Upload kitchen walkthrough video",
          options: {
            accept: "video/*",
          },
        },
        {
          name: "kitchenTourUrl",
          title: "Or Kitchen Tour URL",
          type: "url",
          description: "YouTube/Vimeo URL",
        },
        {
          name: "foodPreparation",
          title: "Food Preparation Videos",
          type: "array",
          description: "Show your chefs in action!",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "videoFile",
                  title: "Video File",
                  type: "file",
                  options: {
                    accept: "video/*",
                  },
                },
                {
                  name: "videoUrl",
                  title: "Video URL",
                  type: "url",
                },
                {
                  name: "title",
                  title: "Video Title",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      description: "Show prominently on homepage",
      initialValue: false,
    }),
    defineField({
      name: "availability",
      title: "Service Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Limited Availability", value: "limited" },
          { title: "Temporarily Unavailable", value: "unavailable" },
        ],
      },
      initialValue: "available",
    }),
  ],
  preview: {
    select: {
      title: "name",
      type: "kitchenType",
      media: "images.main",
    },
    prepare({ title, type, media }) {
      return {
        title,
        subtitle: type,
        media,
      };
    },
  },
});
