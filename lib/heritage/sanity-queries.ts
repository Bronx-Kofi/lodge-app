import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export interface HeritageSite {
    _id: string;
    title: string;
    slug: { current: string };
    category: "Nature" | "Culture" | "History";
    image: any;
    summary: string;
    description?: any[];
    secretHistory?: string;
    travelTime: string;
    location: {
        lat: number;
        lng: number;
    };
    gallery?: any[];
}

const heritageSitesQuery = groq`*[_type == "heritageSite"] | order(title asc) {
  _id,
  title,
  slug,
  category,
  image,
  summary,
  description,
  secretHistory,
  travelTime,
  location,
  gallery
}`;

const heritageSiteBySlugQuery = groq`*[_type == "heritageSite" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  image,
  summary,
  description,
  secretHistory,
  travelTime,
  location,
  gallery
}`;

export async function getHeritageSites(): Promise<HeritageSite[]> {
    try {
        const sites = await client.fetch(heritageSitesQuery, {}, {
            next: { revalidate: 1800, tags: ['heritageSites'] }
        });
        return sites || [];
    } catch (error) {
        console.error("Error fetching heritage sites from Sanity:", error);
        return [];
    }
}

export async function getHeritageSiteBySlug(slug: string): Promise<HeritageSite | null> {
    try {
        const site = await client.fetch(heritageSiteBySlugQuery, { slug }, {
            next: { revalidate: 1800, tags: ['heritageSite', `heritageSite-${slug}`] }
        });
        return site || null;
    } catch (error) {
        console.error("Error fetching heritage site from Sanity:", error);
        return null;
    }
}

// Get all slugs for static generation
export async function getAllHeritageSlugs(): Promise<string[]> {
    try {
        const slugQuery = groq`*[_type == "heritageSite"].slug.current`;
        const slugs = await client.fetch<string[]>(slugQuery, {}, {
            next: { revalidate: 3600, tags: ['heritageSites'] }
        });
        return slugs || [];
    } catch (error) {
        console.error("Error fetching heritage site slugs:", error);
        return [];
    }
}

// Helper function to get image URL from Sanity with optimization
export function getImageUrl(image: any): string {
    if (!image) return "/hero-fallback.jpg";
    
    // If it's already a URL (from mock data), return it
    if (typeof image === "string") return image;
    
    // If it's a Sanity image reference, build the URL with optimization
    if (image.asset?._ref) {
        const ref = image.asset._ref;
        const [_file, id, dimensions, format] = ref.split("-");
        // Add auto=format and quality parameters for optimization
        return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}?auto=format&q=85`;
    }
    
    return "/hero-fallback.jpg";
}
