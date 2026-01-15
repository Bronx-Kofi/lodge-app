"use client";
/**
 * Sanity Studio Configuration
 * SIMPLIFIED - Removed visual editing to avoid configuration warnings
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { singletonPlugin } from "@/sanity/plugins/settings";
import { assistWithPresets } from "@/sanity/plugins/assist";
import { deadSimpleCMS } from "@/sanity/structure/dead-simple";

// Singleton Schemas
import siteSettings from "@/sanity/schemas/singletons/site-settings";
import navigation from "@/sanity/schemas/singletons/navigation";
import footer from "@/sanity/schemas/singletons/footer";
import homepage from "@/sanity/schemas/singletons/homepage";
import roomsPage from "@/sanity/schemas/singletons/rooms-page";
import explorePage from "@/sanity/schemas/singletons/explore-page";
import aboutPage from "@/sanity/schemas/singletons/about-page";

// Content Schemas
import uiStrings from "@/sanity/schemas/documents/ui-strings";
import serviceType from "@/sanity/schemas/documents/service-type";
import roomUltraSimple from "@/sanity/schemas/documents/room-ultra-simple";

// Booking System
import booking from "@/sanity/schemas/documents/booking";
import availability from "@/sanity/schemas/documents/availability";
import pricingRule from "@/sanity/schemas/documents/pricing-rule";
import review from "@/sanity/schemas/documents/review";
import checkInForm from "@/sanity/schemas/documents/check-in-form";

// Other Documents
import author from "@/sanity/schemas/documents/author";
import { packageType } from "@/sanity/schemas/documents/package";
import { heritageSite } from "@/sanity/schemas/documents/heritage-site";
import eventHall from "@/sanity/schemas/documents/event-hall";
import cateringService from "@/sanity/schemas/documents/catering-service";
import galleryImage from "@/sanity/schemas/documents/gallery-image";
import teamMember from "@/sanity/schemas/documents/team-member";
import blogPost from "@/sanity/schemas/documents/blog-post";
import faq from "@/sanity/schemas/documents/faq";

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  apiVersion: '2024-02-28', // Use stable API version
  schema: {
    types: [
      // Singletons
      siteSettings,
      navigation,
      footer,
      homepage,
      roomsPage,
      explorePage,
      aboutPage,
      uiStrings,
      
      // Property Documents
      roomUltraSimple,
      eventHall,
      cateringService,
      packageType,
      
      // Booking System
      booking,
      checkInForm,
      availability,
      pricingRule,
      review,
      
      // Content Documents
      heritageSite,
      blogPost,
      author,
      serviceType,
      
      // Media & Other
      galleryImage,
      teamMember,
      faq,
    ],
  },
  plugins: [
    // Main content editing tool
    structureTool({ 
      structure: deadSimpleCMS,
    }),
    // Singleton handling
    singletonPlugin([
      siteSettings.name,
      navigation.name,
      footer.name,
      homepage.name,
      roomsPage.name,
      explorePage.name,
      aboutPage.name,
      uiStrings.name,
    ]),
    // Unsplash images
    unsplashImageAsset(),
    // AI Assist
    assistWithPresets(),
    // GROQ Vision (dev only)
    process.env.NODE_ENV === "development" &&
    visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});
