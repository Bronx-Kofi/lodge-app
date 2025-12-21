import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getHeritageSiteBySlug, getAllHeritageSlugs, HeritageSite } from "@/lib/heritage/sanity-queries";
import { getSiteSettings } from "@/lib/sanity-queries";
import { cleanPhoneNumber } from "@/lib/utils/phone";
import { TourInquiry } from "./_components/TourInquiry";
import { urlForImage } from "@/sanity/lib/utils";

// Generate static params for all heritage sites
export async function generateStaticParams() {
  const slugs = await getAllHeritageSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Enable static generation with revalidation
export const revalidate = 60; // 1 minute for faster updates during content editing

export default async function HeritageSiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Fetch data server-side with caching
    const [site, settings] = await Promise.all([
        getHeritageSiteBySlug(slug),
        getSiteSettings()
    ]);

    if (!site) {
        notFound();
    }

    const rawNumber = settings?.whatsapp || settings?.whatsappNumbers?.main || "233000000000";
    const whatsappNumber = cleanPhoneNumber(rawNumber);

    // Convert Sanity image object to URL
    // Use max width of 2400px without upscaling, let Sanity optimize
    const imageUrl = site.image ? urlForImage(site.image)?.width(2400).quality(90).url() : null;

    return (
        <article className="min-h-screen pt-24 pb-20 bg-stone-50">
            {/* Hero Image */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] bg-stone-200">
                {imageUrl ? (
                    <>
                        <Image
                            src={imageUrl}
                            alt={site.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-terracotta-100">
                        <div className="text-center">
                            <svg className="w-24 h-24 mx-auto text-terracotta/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-terracotta/60 font-medium">Heritage Site</p>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-7xl mx-auto">
                    <div>
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-white uppercase bg-terracotta rounded-full">
                            {site.category}
                        </span>
                        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 shadow-sm">{site.title}</h1>
                        <div className="flex items-center gap-4 text-white/90 text-sm font-medium tracking-wide">
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                {site.travelTime} from Lodge
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-3 gap-12 lg:gap-20">

                {/* Main Content */}
                <div className="md:col-span-2 space-y-12">
                    {/* Back Link */}
                    <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-terracotta transition-colors group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back to Guide
                    </Link>

                    <div>
                        <h2 className="font-serif text-2xl text-stone-900 mb-6">The Story</h2>
                        <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed text-lg">
                            {site.summary && <p>{site.summary}</p>}
                            
                            {site.description && Array.isArray(site.description) && site.description.map((block, i) => {
                                // Handle block content from Sanity
                                if (typeof block === 'object' && block._type === 'block') {
                                    return (
                                        <p key={block._key || i} className="mb-4">
                                            {block.children?.map((child: any) => child.text).join(' ')}
                                        </p>
                                    );
                                }
                                return null;
                            })}
                            
                            {!site.description || site.description.length === 0 && (
                                <p className="text-stone-400 italic">
                                    Description coming soon. Visit our Sanity CMS to add content for this heritage site.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* "Secret History" Block - Cinematic storytelling element */}
                    {site.secretHistory && (
                        <div className="pl-6 md:pl-8 border-l-4 border-ochre-400 py-2">
                            <h3 className="font-serif text-xl text-stone-800 mb-3 italic">Did you know?</h3>
                            <p className="text-stone-600 italic whitespace-pre-line">
                                {site.secretHistory}
                            </p>
                        </div>
                    )}

                    {/* Gallery */}
                    {site.gallery && site.gallery.length > 0 && (
                        <div>
                            <h2 className="font-serif text-2xl text-stone-900 mb-6">Gallery</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {site.gallery.map((image, index) => {
                                    const galleryImageUrl = urlForImage(image)?.width(800).height(800).quality(85).url();
                                    return galleryImageUrl ? (
                                        <div key={image._key || index} className="aspect-square bg-stone-200 rounded-lg relative overflow-hidden group cursor-pointer">
                                            <Image 
                                                src={galleryImageUrl} 
                                                alt={image.alt || `${site.title} - Image ${index + 1}`} 
                                                fill 
                                                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                            {image.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                    <p className="text-white text-sm">{image.caption}</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="relative">
                    <TourInquiry siteTitle={site.title} whatsappNumber={whatsappNumber} />
                </div>

            </div>
        </article>
    );
}
