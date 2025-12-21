import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "@/components/navigation/MobileNav";
import { getSiteSettings } from "@/lib/sanity-queries";
import { urlForImage } from "@/sanity/lib/utils";
import { generateThemeCSS } from "@/lib/utils/theme-colors";
import { 
  inter, 
  playfair, 
  poppins, 
  montserrat, 
  openSans, 
  merriweather, 
  lato, 
  nunito, 
  workSans 
} from "@/lib/utils/fonts";
import "../globals.css";

/**
 * Marketing Layout
 * 
 * Layout for public marketing pages with dynamic fonts from CMS.
 * Implements the "Boutique Clarity" typography system.
 * Now fetches site settings from CMS for dynamic branding and typography.
 */

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    
    const title = settings?.siteName 
        ? `${settings.siteName} | ${settings.tagline || 'Off-Grid Luxury in Bono Region'}`
        : "Miky Hillside Lodge | Off-Grid Luxury in Bono Region";
    
    const description = settings?.tagline || "Experience hillside living in Ghana's Bono Region. Starlink connectivity, solar power, and authentic Ghanaian hospitality await.";

    // Get logo for Open Graph image
    const logo = settings?.logo;
    const logoUrl = logo ? urlForImage(logo)?.width(1200).height(630).fit('crop').url() : null;

    return {
        title,
        description,
        icons: {
            icon: `/icon.png?v=${Date.now()}`,
            apple: `/apple-icon.png?v=${Date.now()}`,
        },
        openGraph: {
            title,
            description,
            type: "website",
            ...(logoUrl && {
                images: [{
                    url: logoUrl,
                    width: 1200,
                    height: 630,
                }],
            }),
        },
    };
}

export default async function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Fetch site settings for navigation and footer
    const settings = await getSiteSettings();
    const siteName = settings?.siteName || "Miky Hillside";
    const address = settings?.address || "Sunyani-Dumasua Road\nBono Region, Ghana";
    const facebook = settings?.facebook;
    const instagram = settings?.instagram;
    const twitter = settings?.twitter;
    
    // Logo configuration
    const logo = settings?.logo;
    const logoUrl = logo ? urlForImage(logo)?.height(settings?.logoHeight || 40).url() : null;
    const logoHeight = settings?.logoHeight || 40;
    const logoColorMode = settings?.logoColorMode || "original";
    
    // CSS filter for logo color modes
    const getLogoFilter = (mode: string) => {
        switch(mode) {
            case "white":
                return "brightness(0) invert(1)";
            case "black":
                return "brightness(0)";
            case "orange":
                return "brightness(0) saturate(100%) invert(56%) sepia(89%) saturate(1850%) hue-rotate(347deg) brightness(102%) contrast(101%)";
            default:
                return "none";
        }
    };
    
    // Generate dynamic theme CSS
    const themeCSS = generateThemeCSS(settings);
    const bgColor = settings?.backgroundColor;
    
    // Get font classes based on CMS selection
    const fontPairing = settings?.fontPairing || 'playfair-inter';
    let headingFont, bodyFont;
    
    switch (fontPairing) {
        case 'poppins-inter':
            headingFont = poppins.variable;
            bodyFont = inter.variable;
            break;
        case 'montserrat-opensans':
            headingFont = montserrat.variable;
            bodyFont = openSans.variable;
            break;
        case 'merriweather-lato':
            headingFont = merriweather.variable;
            bodyFont = lato.variable;
            break;
        case 'nunito-worksans':
            headingFont = nunito.variable;
            bodyFont = workSans.variable;
            break;
        case 'playfair-inter':
        default:
            headingFont = playfair.variable;
            bodyFont = inter.variable;
            break;
    }
    
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
            <div 
                className={`${headingFont} ${bodyFont} font-sans antialiased`}
                style={bgColor ? { backgroundColor: bgColor } : undefined}
            >
            {/* Global Navigation - Clean White Header with Orange Accents */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-orange-100/30 shadow-sm">
                <nav className="section-container py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        {logoUrl && (
                            <Image
                                src={logoUrl}
                                alt={siteName}
                                width={logoHeight * 2}
                                height={logoHeight}
                                style={{ 
                                    height: `${logoHeight}px`, 
                                    width: 'auto',
                                    filter: getLogoFilter(logoColorMode)
                                }}
                                className="object-contain"
                            />
                        )}
                        <span className="font-serif text-2xl text-dark hover:text-orange transition-colors">
                            {siteName}
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-dark-muted">
                        <Link href="/rooms" className="hover:text-orange transition-colors hover:scale-105 transform">
                            Rooms
                        </Link>
                        <Link href="/explore" className="hover:text-orange transition-colors hover:scale-105 transform">
                            Heritage
                        </Link>
                        <Link href="/about" className="hover:text-orange transition-colors hover:scale-105 transform">
                            About
                        </Link>
                    </div>

                    {/* Primary Action Button */}
                    <Link
                        href="/rooms"
                        className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-orange text-white text-sm font-bold rounded-full shadow-brand hover:shadow-glow hover:scale-105 transition-all duration-300"
                    >
                        Book Now
                    </Link>
                </nav>
            </header>

            {/* Main content with top padding for fixed header and bottom padding for mobile nav */}
            <main className="pb-20 md:pb-0">{children}</main>
            
            {/* Mobile Navigation */}
            <MobileNav />

            {/* Footer - Elegant Dark with Orange Accents */}
            <footer className="bg-gradient-to-br from-dark via-dark-soft to-dark text-white py-16">
                <div className="section-container">
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <h3 className="font-serif text-2xl mb-4 text-white">{siteName}</h3>
                            <p className="text-white/70 leading-relaxed">
                                {settings?.tagline || "Off-grid luxury in the heart of Ghana's Bono Region."}
                            </p>
                            
                            {/* Social Media Links */}
                            {(facebook || instagram || twitter) && (
                                <div className="flex gap-4 mt-4">
                                    {facebook && (
                                        <a 
                                            href={facebook} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-white/70 hover:text-orange transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {instagram && (
                                        <a 
                                            href={instagram} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-white/70 hover:text-orange transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {twitter && (
                                        <a 
                                            href={twitter} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-white/70 hover:text-orange transition-colors"
                                            aria-label="Twitter/X"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="font-medium text-lg mb-4 text-orange-300">Quick Links</h4>
                            <ul className="space-y-3 text-white/70">
                                <li><Link href="/rooms" className="hover:text-orange transition-colors hover:translate-x-1 inline-block transform">Rooms & Rates</Link></li>
                                <li><Link href="/explore" className="hover:text-orange transition-colors hover:translate-x-1 inline-block transform">Heritage Sites</Link></li>
                                <li><Link href="/about" className="hover:text-orange transition-colors hover:translate-x-1 inline-block transform">About</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-lg mb-4 text-orange-300">Connect</h4>
                            <p className="text-white/70 leading-relaxed whitespace-pre-line">
                                {address}
                            </p>
                            {settings?.phone && (
                                <p className="text-white/70 mt-2">
                                    Tel: {settings.phone}
                                </p>
                            )}
                            {settings?.email && (
                                <p className="text-white/70 mt-1">
                                    Email: {settings.email}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="border-t border-orange/20 pt-8 text-center text-sm text-white/50">
                        © {new Date().getFullYear()} {siteName}. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
        </>
    );
}
