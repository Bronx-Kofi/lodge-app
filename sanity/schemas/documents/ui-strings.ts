import { defineField, defineType } from "sanity";

/**
 * UI Strings
 * 
 * Singleton document for all UI text strings, labels, and messages
 * used throughout the website. This allows managers to customize
 * every piece of text without touching code.
 */
export default defineType({
  name: "uiStrings",
  title: "UI Text & Labels",
  type: "document",
  fields: [
    // ==================== COMMON STRINGS ====================
    defineField({
      name: "common",
      title: "Common UI Text",
      type: "object",
      fields: [
        {
          name: "backButton",
          title: "Back Button Text",
          type: "string",
          initialValue: "Back",
        },
        {
          name: "loadingText",
          title: "Loading Text",
          type: "string",
          initialValue: "Loading...",
        },
        {
          name: "errorText",
          title: "Generic Error Text",
          type: "string",
          initialValue: "Something went wrong. Please try again.",
        },
        {
          name: "noResultsText",
          title: "No Results Text",
          type: "string",
          initialValue: "No results found.",
        },
        {
          name: "readMoreButton",
          title: "Read More Button",
          type: "string",
          initialValue: "Read More",
        },
        {
          name: "viewAllButton",
          title: "View All Button",
          type: "string",
          initialValue: "View All",
        },
      ],
    }),

    // ==================== BOOKING WIDGET ====================
    defineField({
      name: "bookingWidget",
      title: "Booking Widget",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Widget Title",
          type: "string",
          initialValue: "Book your stay",
        },
        {
          name: "cancellationPolicy",
          title: "Cancellation Policy Text",
          type: "string",
          initialValue: "Free cancellation up to 48h before.",
        },
        {
          name: "datesLabel",
          title: "Dates Label",
          type: "string",
          initialValue: "Dates",
        },
        {
          name: "guestsLabel",
          title: "Guests Label",
          type: "string",
          initialValue: "Guests",
        },
        {
          name: "datePickerPlaceholder",
          title: "Date Picker Placeholder",
          type: "string",
          initialValue: "Select Check-in / Check-out",
        },
        {
          name: "guestSingular",
          title: "Guest (Singular)",
          type: "string",
          initialValue: "Guest",
        },
        {
          name: "guestPlural",
          title: "Guests (Plural)",
          type: "string",
          initialValue: "Guests",
        },
        {
          name: "nightSingular",
          title: "Night (Singular)",
          type: "string",
          initialValue: "night",
        },
        {
          name: "nightPlural",
          title: "Nights (Plural)",
          type: "string",
          initialValue: "nights",
        },
        {
          name: "checkAvailabilityButton",
          title: "Check Availability Button",
          type: "string",
          initialValue: "Check Availability",
        },
        {
          name: "redirectingText",
          title: "Redirecting Text",
          type: "string",
          initialValue: "Opening WhatsApp...",
        },
        {
          name: "pricePerNight",
          title: "Price Per Night Text",
          type: "string",
          initialValue: "/ night",
        },
      ],
    }),

    // ==================== ROOM PAGES ====================
    defineField({
      name: "roomPages",
      title: "Room Pages",
      type: "object",
      fields: [
        {
          name: "backToRooms",
          title: "Back to Rooms Link",
          type: "string",
          initialValue: "Back to Rooms",
        },
        {
          name: "experienceHeading",
          title: "Experience Section Heading",
          type: "string",
          initialValue: "Experience",
        },
        {
          name: "amenitiesHeading",
          title: "Amenities Section Heading",
          type: "string",
          initialValue: "Amenities",
        },
        {
          name: "galleryHeading",
          title: "Gallery Heading",
          type: "string",
          initialValue: "Gallery",
        },
        {
          name: "upToGuests",
          title: "Up to X Guests Text",
          type: "string",
          initialValue: "Up to {count} Guests",
          description: "{count} will be replaced with actual number",
        },
        {
          name: "loadingSanctuary",
          title: "Loading Text",
          type: "string",
          initialValue: "Loading sanctuary...",
        },
      ],
    }),

    // ==================== HERITAGE PAGES ====================
    defineField({
      name: "heritagePages",
      title: "Heritage/Explore Pages",
      type: "object",
      fields: [
        {
          name: "backToGuide",
          title: "Back to Guide Link",
          type: "string",
          initialValue: "Back to Guide",
        },
        {
          name: "theStoryHeading",
          title: "The Story Heading",
          type: "string",
          initialValue: "The Story",
        },
        {
          name: "didYouKnowHeading",
          title: "Did You Know Heading",
          type: "string",
          initialValue: "Did you know?",
        },
        {
          name: "galleryHeading",
          title: "Gallery Heading",
          type: "string",
          initialValue: "Gallery",
        },
        {
          name: "morePhotosComingSoon",
          title: "More Photos Coming Soon",
          type: "string",
          initialValue: "More photos coming soon",
        },
        {
          name: "loadingGuide",
          title: "Loading Text",
          type: "string",
          initialValue: "Loading guide...",
        },
        {
          name: "travelTimeFrom",
          title: "Travel Time From Text",
          type: "string",
          initialValue: "from Lodge",
          description: "Appears after time duration",
        },
      ],
    }),

    // ==================== TOUR INQUIRY ====================
    defineField({
      name: "tourInquiry",
      title: "Tour Inquiry Widget",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Want to visit?",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
          initialValue: "Our team can arrange transportation, guides, and picnic baskets for your trip.",
        },
        {
          name: "buttonText",
          title: "Button Text",
          type: "string",
          initialValue: "Arrange a Visit",
        },
        {
          name: "connectingText",
          title: "Connecting Text",
          type: "string",
          initialValue: "Connecting...",
        },
      ],
    }),

    // ==================== CONCIERGE/PRIVATE ROOM ====================
    defineField({
      name: "concierge",
      title: "Concierge/Private Room Page",
      type: "object",
      fields: [
        {
          name: "myRoomLabel",
          title: "My Room Label",
          type: "string",
          initialValue: "My Room",
        },
        {
          name: "digitalManualLabel",
          title: "Digital Manual Subtitle",
          type: "string",
          initialValue: "Digital Manual",
        },
        {
          name: "roomGuideHeading",
          title: "Room Guide Heading",
          type: "string",
          initialValue: "Room Guide",
        },
        {
          name: "quickRequestsHeading",
          title: "Quick Requests Heading",
          type: "string",
          initialValue: "Quick Requests",
        },
        {
          name: "needSomethingElse",
          title: "Need Something Else Text",
          type: "string",
          initialValue: "Need something else?",
        },
        {
          name: "chatWithReceptionButton",
          title: "Chat with Reception Button",
          type: "string",
          initialValue: "Chat with Reception",
        },
        {
          name: "loadingManual",
          title: "Loading Text",
          type: "string",
          initialValue: "Loading your manual...",
        },
        {
          name: "noInstructions",
          title: "No Instructions Text",
          type: "string",
          initialValue: "No specific instructions for this room yet.",
        },
      ],
    }),

    // ==================== SERVICE REQUESTS ====================
    defineField({
      name: "serviceRequests",
      title: "Service Request Messages",
      type: "object",
      description: "WhatsApp message templates for service requests",
      fields: [
        {
          name: "towelsRequest",
          title: "Towels Request Template",
          type: "text",
          rows: 2,
          initialValue: "Hi Operations! I'm in {roomTitle} and I'd like to request: Towels.",
          description: "{roomTitle} will be replaced with actual room name",
        },
        {
          name: "diningRequest",
          title: "Dining Request Template",
          type: "text",
          rows: 2,
          initialValue: "Hi Operations! I'm in {roomTitle} and I'd like to request: Dining.",
        },
        {
          name: "fixItRequest",
          title: "Fix It Request Template",
          type: "text",
          rows: 2,
          initialValue: "Hi Operations! I'm in {roomTitle} and I'd like to request: Fix It.",
        },
      ],
    }),

    // ==================== WHATSAPP MESSAGES ====================
    defineField({
      name: "whatsappMessages",
      title: "WhatsApp Message Templates",
      type: "object",
      fields: [
        {
          name: "generalInquiry",
          title: "General Inquiry",
          type: "text",
          rows: 3,
          initialValue: "Hi! I'm interested in learning more about Miky Hillside Lodge. I'd love to discuss availability and packages.",
        },
        {
          name: "roomBooking",
          title: "Room Booking Inquiry",
          type: "text",
          rows: 3,
          initialValue: "Hi Miky Lodge! I'm interested in the *{roomTitle}* for *{dates}* ({guests} guests). Is it available?",
          description: "Variables: {roomTitle}, {dates}, {guests}",
        },
        {
          name: "tourInquiry",
          title: "Tour Inquiry",
          type: "text",
          rows: 3,
          initialValue: "Hi Miky Hillside! I'm interested in a tour of {siteTitle}. Can you help me arrange a visit?",
          description: "Variables: {siteTitle}",
        },
        {
          name: "heritageTourGeneral",
          title: "Heritage Tour General",
          type: "text",
          rows: 3,
          initialValue: "Hi! I'd like to plan a heritage tour. Can you help me?",
        },
      ],
    }),

    // ==================== FORM LABELS ====================
    defineField({
      name: "forms",
      title: "Form Labels & Placeholders",
      type: "object",
      fields: [
        {
          name: "nameLabel",
          title: "Name Label",
          type: "string",
          initialValue: "Name",
        },
        {
          name: "namePlaceholder",
          title: "Name Placeholder",
          type: "string",
          initialValue: "Enter your name",
        },
        {
          name: "emailLabel",
          title: "Email Label",
          type: "string",
          initialValue: "Email",
        },
        {
          name: "emailPlaceholder",
          title: "Email Placeholder",
          type: "string",
          initialValue: "Enter your email",
        },
        {
          name: "phoneLabel",
          title: "Phone Label",
          type: "string",
          initialValue: "Phone",
        },
        {
          name: "phonePlaceholder",
          title: "Phone Placeholder",
          type: "string",
          initialValue: "Enter your phone number",
        },
        {
          name: "messageLabel",
          title: "Message Label",
          type: "string",
          initialValue: "Message",
        },
        {
          name: "messagePlaceholder",
          title: "Message Placeholder",
          type: "string",
          initialValue: "Enter your message",
        },
        {
          name: "submitButton",
          title: "Submit Button",
          type: "string",
          initialValue: "Submit",
        },
        {
          name: "sendButton",
          title: "Send Button",
          type: "string",
          initialValue: "Send",
        },
        {
          name: "requiredFieldError",
          title: "Required Field Error",
          type: "string",
          initialValue: "This field is required",
        },
        {
          name: "invalidEmailError",
          title: "Invalid Email Error",
          type: "string",
          initialValue: "Please enter a valid email address",
        },
        {
          name: "successMessage",
          title: "Form Success Message",
          type: "string",
          initialValue: "Thank you! We'll get back to you soon.",
        },
      ],
    }),

    // ==================== RESILIENCE BADGE ====================
    defineField({
      name: "resilienceBadge",
      title: "Resilience Status Badge",
      type: "object",
      fields: [
        {
          name: "starlinkOnline",
          title: "Starlink Online Text",
          type: "string",
          initialValue: "Starlink Online",
        },
        {
          name: "starlinkOffline",
          title: "Starlink Offline Text",
          type: "string",
          initialValue: "Starlink Offline",
        },
        {
          name: "solarOnline",
          title: "Solar Online Text",
          type: "string",
          initialValue: "Solar Active",
        },
        {
          name: "solarOffline",
          title: "Solar Offline Text",
          type: "string",
          initialValue: "Grid Power",
        },
        {
          name: "viewDetailsButton",
          title: "View Details Button",
          type: "string",
          initialValue: "View Details",
        },
        {
          name: "loadingStatus",
          title: "Loading Status Text",
          type: "string",
          initialValue: "Checking status...",
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "UI Text & Labels",
        subtitle: "All website text strings",
      };
    },
  },
});
