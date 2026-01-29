import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/sanity/lib/utils";

export interface Room {
  _id: string;
  title: string;
  slug: { current: string };
  tagline: string;
  capacity: number;
  intro: string;
  description: any[]; // Block content
  amenities: string[];
  image: any; // Sanity image reference
  gallery: any[]; // Sanity gallery references (images/videos)
  wifiSsid?: string;
  wifiPassword?: string;
  welcomeVideoUrl?: string;
  welcomeVideo?: any; // Sanity file reference for uploaded video
  instructions?: {
    title: string;
    icon: string;
    content: string;
  }[];
  cancellationPolicy?: string;
  // Availability info (added at runtime)
  availabilityStatus?: {
    isAvailable: boolean;
    nextAvailableDate?: string;
    hasUpcomingBookings: boolean;
  };
  // Dynamic pricing - calculated at runtime
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
}

/**
 * Get image URL from Sanity image reference
 */
export function getImageUrl(imageRef: any): string {
  if (!imageRef) {
    return "/hero-fallback.jpg";
  }

  // If it's already a URL string
  if (typeof imageRef === "string") {
    return imageRef;
  }

  // If it has asset.url from the query
  if (imageRef.asset?.url) {
    return imageRef.asset.url;
  }

  // Use urlForImage utility
  const url = urlForImage(imageRef)?.url();
  return url || "/hero-fallback.jpg";
}

const roomsQuery = groq`*[_type == "roomSimplified"] | order(title asc) {
  _id,
  title,
  slug,
  tagline,
  capacity,
  intro,
  description,
  amenities,
  image {
    asset-> {
      _id,
      url
    },
    alt
  },
  gallery[] {
    _type,
    mediaType,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    video {
      asset-> {
        _id,
        url
      }
    },
    videoUrl,
    caption
  },
  wifiSsid,
  wifiPassword,
  welcomeVideoUrl,
  welcomeVideo {
    asset-> {
      _id,
      url
    }
  },
  instructions,
  cancellationPolicy
}`;

const roomBySlugQuery = groq`*[_type == "roomSimplified" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  tagline,
  capacity,
  intro,
  description,
  amenities,
  image {
    asset-> {
      _id,
      url
    },
    alt
  },
  gallery[] {
    _type,
    mediaType,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    video {
      asset-> {
        _id,
        url
      }
    },
    videoUrl,
    caption
  },
  wifiSsid,
  wifiPassword,
  welcomeVideoUrl,
  welcomeVideo {
    asset-> {
      _id,
      url
    }
  },
  instructions,
  cancellationPolicy
}`;

export async function getRooms(): Promise<Room[]> {
  try {
    const rooms = await client.fetch<Room[]>(roomsQuery, {}, { 
      next: { 
        revalidate: 60, // 1 minute for faster content updates
        tags: ['rooms']
      } 
    });
    return rooms || [];
  } catch (error) {
    console.error("❌ Error fetching rooms from Sanity:", error);
    return [];
  }
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  try {
    const room = await client.fetch<Room>(roomBySlugQuery, { slug }, { 
      next: { 
        revalidate: 60, // 1 minute for faster content updates
        tags: ['room', `room-${slug}`]
      } 
    });
    return room || null;
  } catch (error) {
    console.error("❌ Error fetching room from Sanity:", error);
    return null;
  }
}

// Get all room slugs for static generation
export async function getAllRoomSlugs(): Promise<string[]> {
  try {
    const slugQuery = groq`*[_type == "roomSimplified"].slug.current`;
    const slugs = await client.fetch<string[]>(slugQuery, {}, {
      next: { revalidate: 3600, tags: ['rooms'] }
    });
    return slugs || [];
  } catch (error) {
    console.error("Error fetching room slugs:", error);
    return [];
  }
}
