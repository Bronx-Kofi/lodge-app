/**
 * Comprehensive Sanity Queries - SIMPLIFIED
 */

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// ============================================================================
// SITE SETTINGS
// ============================================================================

export interface SiteSettings {
    _id: string;
    siteName: string;
    tagline?: string;
    logo?: any;
    logoHeight?: number;
    logoColorMode?: 'original' | 'white' | 'black' | 'orange';
    // Typography
    fontPairing?: 'playfair-inter' | 'poppins-inter' | 'montserrat-opensans' | 'merriweather-lato' | 'nunito-worksans';
    // Color theme (simplified - just hex strings)
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    linkColor?: string;
    phone?: string;
    whatsapp: string;
    email?: string;
    address?: string;
    checkInTime?: string;
    checkOutTime?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    // Legacy compatibility
    whatsappNumbers?: {
        main?: string;
        reception?: string;
        operations?: string;
        concierge?: string;
    };
}

const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
    _id,
    siteName,
    tagline,
    logo,
    logoHeight,
    logoColorMode,
    fontPairing,
    primaryColor,
    secondaryColor,
    backgroundColor,
    textColor,
    linkColor,
    phone,
    whatsapp,
    email,
    address,
    checkInTime,
    checkOutTime,
    facebook,
    instagram,
    twitter
}`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const settings = await client.fetch(siteSettingsQuery, {}, { 
            next: { 
                revalidate: 3600, // 1 hour - settings rarely change
                tags: ['siteSettings']
            } 
        });
        // Add legacy compatibility for whatsappNumbers
        if (settings) {
            settings.whatsappNumbers = {
                main: settings.whatsapp,
                reception: settings.whatsapp,
                operations: settings.whatsapp,
                concierge: settings.whatsapp,
            };
        }
        return settings;
    } catch (error) {
        console.error("Error fetching site settings:", error);
        return null;
    }
}

// ============================================================================
// EXPLORE PAGE
// ============================================================================

export interface ExplorePage {
    _id: string;
    heroTitle?: string;
    heroSubtitle?: string;
    ctaTitle?: string;
    ctaDescription?: string;
    categories?: string[];
}

const explorePageQuery = groq`*[_type == "explorePage"][0] {
    _id,
    heroTitle,
    heroSubtitle,
    ctaTitle,
    ctaDescription
}`;

export async function getExplorePage(): Promise<ExplorePage | null> {
    try {
        return await client.fetch(explorePageQuery, {}, { next: { revalidate: 1800 } });
    } catch (error) {
        console.error("Error fetching explore page:", error);
        return null;
    }
}

// ============================================================================
// ROOMS PAGE
// ============================================================================

export interface RoomsPage {
    _id: string;
    heroTitle?: string;
    heroSubtitle?: string;
}

const roomsPageQuery = groq`*[_type == "roomsPage"][0] {
    _id,
    heroTitle,
    heroSubtitle
}`;

export async function getRoomsPage(): Promise<RoomsPage | null> {
    try {
        return await client.fetch(roomsPageQuery, {}, { next: { revalidate: 1800 } });
    } catch (error) {
        console.error("Error fetching rooms page:", error);
        return null;
    }
}

// ============================================================================
// NAVIGATION
// ============================================================================

export interface Navigation {
    _id: string;
    links: Array<{
        _key: string;
        label: string;
        url: string;
    }>;
}

const navigationQuery = groq`*[_type == "navigation"][0] {
    _id,
    links[] {
        _key,
        label,
        url
    }
}`;

export async function getNavigation(): Promise<Navigation | null> {
    try {
        return await client.fetch(navigationQuery, {}, { next: { revalidate: 1800 } });
    } catch (error) {
        console.error("Error fetching navigation:", error);
        return null;
    }
}

// ============================================================================
// FOOTER
// ============================================================================

export interface Footer {
    _id: string;
    copyrightText?: string;
    quickLinks?: Array<{
        label: string;
        url: string;
    }>;
}

const footerQuery = groq`*[_type == "footer"][0] {
    _id,
    copyrightText,
    quickLinks[] {
        label,
        url
    }
}`;

export async function getFooter(): Promise<Footer | null> {
    try {
        return await client.fetch(footerQuery, {}, { next: { revalidate: 1800 } });
    } catch (error) {
        console.error("Error fetching footer:", error);
        return null;
    }
}

// ============================================================================
// ABOUT PAGE
// ============================================================================

export interface AboutPage {
    _id: string;
    heroTitle?: string;
    heroImage?: any;
    storyTitle?: string;
    storyContent?: string;
    storyImage?: any;
}

const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
    _id,
    heroTitle,
    heroImage {
        asset-> {
            _id,
            url
        }
    },
    storyTitle,
    storyContent,
    storyImage {
        asset-> {
            _id,
            url
        }
    }
}`;

export async function getAboutPage(): Promise<AboutPage | null> {
    try {
        return await client.fetch(aboutPageQuery, {}, { next: { revalidate: 1800 } });
    } catch (error) {
        console.error("Error fetching about page:", error);
        return null;
    }
}

// ============================================================================
// SERVICE TYPES (for Concierge)
// ============================================================================

export interface ServiceType {
    _id: string;
    id: { current: string };
    label: string;
    icon: string;
    color: string;
    messageTemplate: string;
    targetNumber: 'main' | 'reception' | 'operations' | 'concierge';
    enabled: boolean;
    order: number;
}

const serviceTypesQuery = groq`*[_type == "serviceType" && enabled == true] | order(order asc) {
    _id,
    id,
    label,
    icon,
    color,
    messageTemplate,
    targetNumber,
    enabled,
    order
}`;

export async function getServiceTypes(): Promise<ServiceType[]> {
    try {
        const services = await client.fetch<ServiceType[]>(serviceTypesQuery, {}, { next: { revalidate: 1800 } });
        return services || [];
    } catch (error) {
        console.error("Error fetching service types:", error);
        return [];
    }
}
