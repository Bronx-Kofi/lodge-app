/**
 * Cache Configuration
 * 
 * Centralized caching settings for optimal performance
 */

// Sanity query cache duration (in seconds)
export const CACHE_DURATIONS = {
  // Site-wide settings (rarely change)
  siteSettings: 3600, // 1 hour
  
  // Content that changes occasionally
  heritageSites: 1800, // 30 minutes
  rooms: 1800, // 30 minutes
  
  // Homepage content
  homepage: 600, // 10 minutes
  
  // Individual pages
  page: 1800, // 30 minutes
  
  // Navigation and footer
  navigation: 3600, // 1 hour
} as const;

// Next.js revalidation times
export const REVALIDATE = {
  homepage: 60, // 1 minute
  listing: 300, // 5 minutes
  detail: 600, // 10 minutes
  static: 3600, // 1 hour
} as const;

// Fetch cache options
export const getFetchOptions = (tags: string[] = []) => ({
  next: {
    revalidate: 300, // 5 minutes default
    tags,
  },
});
