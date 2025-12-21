import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Site Settings - SIMPLIFIED FOR MANAGERS
 */
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "brand", title: "Name & Logo" },
    { name: "typography", title: "Fonts & Typography" },
    { name: "colors", title: "Color Theme" },
    { name: "contact", title: "Contact Info" },
    { name: "social", title: "Social Media" },
  ],
  fields: [
    // ==================== BRANDING ====================
    defineField({
      name: "siteName",
      title: "Lodge Name",
      type: "string",
      description: "Your business name",
      validation: (Rule) => Rule.required(),
      group: "brand",
    }),

    defineField({
      name: "tagline",
      title: "Tagline (Optional)",
      type: "string",
      description: "Short slogan",
      group: "brand",
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Your lodge logo (PNG with transparent background recommended)",
      options: { hotspot: true },
      group: "brand",
    }),

    defineField({
      name: "logoHeight",
      title: "Logo Height (in pixels)",
      type: "number",
      description: "Recommended: 40-50px for header. Logo width will scale proportionally.",
      initialValue: 45,
      validation: (Rule) => Rule.min(20).max(100),
      group: "brand",
    }),

    defineField({
      name: "logoColorMode",
      title: "Logo Color Mode",
      type: "string",
      description: "Choose how the logo should appear",
      options: {
        list: [
          { title: "Original Colors", value: "original" },
          { title: "White (for dark backgrounds)", value: "white" },
          { title: "Black (for light backgrounds)", value: "black" },
          { title: "Brand Orange", value: "orange" },
        ],
        layout: "radio",
      },
      initialValue: "original",
      group: "brand",
    }),

    // Typography Settings
    defineField({
      name: "fontPairing",
      title: "Font Style",
      type: "string",
      description: "Choose your preferred font combination",
      options: {
        list: [
          { 
            title: "Elegant Serif (Current - Playfair + Inter) - Classic and sophisticated", 
            value: "playfair-inter"
          },
          { 
            title: "Modern Sans (Poppins + Inter) - Clean and contemporary", 
            value: "poppins-inter"
          },
          { 
            title: "Professional (Montserrat + Open Sans) - Business-friendly and readable", 
            value: "montserrat-opensans"
          },
          { 
            title: "Classic Serif (Merriweather + Lato) - Traditional and trustworthy", 
            value: "merriweather-lato"
          },
          { 
            title: "Friendly Rounded (Nunito + Work Sans) - Warm and approachable", 
            value: "nunito-worksans"
          },
        ],
        layout: "radio",
      },
      initialValue: "playfair-inter",
      group: "typography",
    }),

    // Color Theme Settings
    defineField({
      name: "primaryColor",
      title: "Primary Color (Hex Code)",
      type: "string",
      description: "Main brand color. Enter hex code (e.g., #FF6B35). Default: #FF6B35 (Orange)",
      placeholder: "#FF6B35",
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: "hex color",
        invert: false,
      }).error("Must be a valid hex color (e.g., #FF6B35)"),
      group: "colors",
    }),

    defineField({
      name: "secondaryColor",
      title: "Secondary Color (Hex Code)",
      type: "string",
      description: "Secondary accent color. Default: #1C1917 (Dark Stone)",
      placeholder: "#1C1917",
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: "hex color",
        invert: false,
      }).error("Must be a valid hex color (e.g., #1C1917)"),
      group: "colors",
    }),

    defineField({
      name: "backgroundColor",
      title: "Background Color (Hex Code)",
      type: "string",
      description: "Page background color. Default: #FAFAF9 (Light Stone)",
      placeholder: "#FAFAF9",
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: "hex color",
        invert: false,
      }).error("Must be a valid hex color (e.g., #FAFAF9)"),
      group: "colors",
    }),

    defineField({
      name: "textColor",
      title: "Text Color (Hex Code)",
      type: "string",
      description: "Main text color. Default: #292524 (Dark Stone)",
      placeholder: "#292524",
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/, {
        name: "hex color",
        invert: false,
      }).error("Must be a valid hex color (e.g., #292524)"),
      group: "colors",
    }),

    defineField({
      name: "linkColor",
      title: "Link Color (Hex Code)",
      type: "string",
      description: "Hyperlink color. Leave empty to use primary color. Default: Same as primary",
      placeholder: "#FF6B35",
      validation: (Rule) => Rule.optional().regex(/^#[0-9A-Fa-f]{6}$/, {
        name: "hex color",
        invert: false,
      }).error("Must be a valid hex color (e.g., #FF6B35)"),
      group: "colors",
    }),

    // ==================== CONTACT INFO ====================
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Main phone with country code",
      group: "contact",
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      description: "WhatsApp number (no + or spaces). Example: 233240000000",
      validation: (Rule) => Rule.required(),
      group: "contact",
    }),

    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Main contact email",
      validation: (Rule) => Rule.email(),
      group: "contact",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      description: "Full address as displayed",
      group: "contact",
    }),

    defineField({
      name: "checkInTime",
      title: "Check-in Time",
      type: "string",
      description: "Example: 2:00 PM",
      group: "contact",
    }),

    defineField({
      name: "checkOutTime",
      title: "Check-out Time",
      type: "string",
      description: "Example: 11:00 AM",
      group: "contact",
    }),

    // ==================== SOCIAL MEDIA ====================
    defineField({
      name: "facebook",
      title: "Facebook Page URL",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "instagram",
      title: "Instagram Profile URL",
      type: "url",
      group: "social",
    }),

    defineField({
      name: "twitter",
      title: "Twitter/X Profile URL",
      type: "url",
      group: "social",
    }),
  ],

  preview: {
    select: { title: "siteName" },
    prepare({ title }) {
      return {
        title: title || "Site Settings",
        subtitle: "Contact info & social links",
      };
    },
  },
});
