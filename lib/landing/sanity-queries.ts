import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export interface LandingPageHero {
  title?: string;
  tagline?: string;
  videoSrc?: any;
  fallbackImage?: any;
}

export interface Feature {
  _key: string;
  title: string;
  description: string;
}

export interface LandingPage {
  _id: string;
  heroTitle?: string;
  heroTagline?: string;
  heroImage?: any;
  heroVideo?: any;
  featuresTitle?: string;
  features?: Feature[];
  featuredRoomsTitle?: string;
  featuredRooms?: any[];
  whatsappEnabled?: boolean;
  whatsappMessage?: string;
}

const landingPageQuery = groq`*[_type == "homepage"][0] {
    _id,
    heroTitle,
    heroTagline,
    heroImage {
        asset-> {
            _id,
            url
        }
    },
    heroVideo {
        asset-> {
            _id,
            url
        }
    },
    featuresTitle,
    features[] {
        _key,
        title,
        description
    },
    featuredRoomsTitle,
    featuredRooms[]-> {
        _id,
        title,
        slug,
        tagline,
        price,
        capacity,
        image {
            asset-> {
                _id,
                url
            }
        }
    },
    whatsappEnabled,
    whatsappMessage
}`;

export async function getLandingPage(): Promise<LandingPage | null> {
  const hasValidCredentials =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'mockprojectid';

  if (!hasValidCredentials) {
    return null;
  }

  try {
    // Reduced cache time from 60s to 10s for faster content updates
    const landingPage = await client.fetch(landingPageQuery, {}, { next: { revalidate: 1800 } });
    return landingPage || null;
  } catch (error) {
    console.warn("Sanity CMS not configured yet. Using defaults.");
    return null;
  }
}
