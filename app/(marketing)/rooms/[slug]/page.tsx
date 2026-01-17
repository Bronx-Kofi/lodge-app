import { notFound } from "next/navigation";
import Link from "next/link";
import { getRoomBySlug, getAllRoomSlugs, Room } from "@/lib/rooms/sanity-queries";
import { getSiteSettings } from "@/lib/sanity-queries";
import { cleanPhoneNumber } from "@/lib/utils/phone";
import { RoomGallery } from "./_components/RoomGallery";
import { transformGalleryData } from "@/lib/rooms/gallery-helpers";
import { BookingWidget } from "./_components/BookingWidget";
import { getRoomAvailabilityStatus } from "@/lib/rooms/availability-helpers";

// Generate static params for all rooms
export async function generateStaticParams() {
  const slugs = await getAllRoomSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Enable static generation with revalidation
export const revalidate = 60; // 1 minute for faster content updates

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    
    // Fetch data server-side with caching
    const [room, settings] = await Promise.all([
        getRoomBySlug(slug),
        getSiteSettings()
    ]);

    if (!room) {
        notFound();
    }

    // Get availability status
    const availabilityStatus = await getRoomAvailabilityStatus(room._id);

    const rawNumber = settings?.whatsapp || settings?.whatsappNumbers?.main || "233000000000";
    const whatsappNumber = cleanPhoneNumber(rawNumber);

    return (
        <article className="min-h-screen pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Breadcrumb / Back */}
                <Link href="/rooms" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-terracotta mb-8 group transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to Rooms
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <p className="text-ochre-500 font-medium tracking-wide uppercase text-sm mb-2">{room.tagline}</p>
                    <h1 className="font-serif text-4xl md:text-5xl text-terracotta mb-4">{room.title}</h1>
                    <div className="flex items-center gap-4 text-neutral-600 text-sm flex-wrap">
                        <span>Up to {room.capacity} Guests</span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        <span>GH₵{room.price} / Night</span>
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        {availabilityStatus.isAvailable ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Available Now
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                                <span className="w-2 h-2 bg-red-500 rounded-full" />
                                Currently Booked
                            </span>
                        )}
                    </div>
                    {!availabilityStatus.isAvailable && availabilityStatus.nextAvailableDate && (
                        <p className="text-sm text-orange mt-3 font-medium">
                            Next available from {new Date(availabilityStatus.nextAvailableDate).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                            })}
                        </p>
                    )}
                </div>

                {/* Gallery */}
                <div className="mb-16">
                    <RoomGallery items={transformGalleryData(room.gallery)} title={room.title} />
                </div>

                {/* Content Split */}
                <div className="grid md:grid-cols-3 gap-12 lg:gap-20">

                    {/* Main Description */}
                    <div className="md:col-span-2 space-y-8">
                        {room.description && (
                            <div>
                                <h2 className="font-serif text-2xl text-neutral-800 mb-4">Experience</h2>
                                <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed">
                                    {/* Handle block content array */}
                                    {Array.isArray(room.description) && room.description.map((block, i) => {
                                        // Handle block content from Sanity
                                        if (typeof block === 'object' && block._type === 'block') {
                                            return (
                                                <p key={block._key || i} className="mb-4">
                                                    {block.children?.map((child: any) => child.text).join(' ')}
                                                </p>
                                            );
                                        }
                                        // Handle plain strings in array
                                        if (typeof block === 'string') {
                                            return <p key={i} className="mb-4">{block}</p>;
                                        }
                                        return null;
                                    })}
                                    
                                    {/* Handle plain string (old format) */}
                                    {typeof room.description === 'string' && (
                                        <p className="mb-4 whitespace-pre-line">{room.description}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {room.amenities && room.amenities.length > 0 && (
                            <div>
                                <h2 className="font-serif text-2xl text-neutral-800 mb-4">Amenities</h2>
                                <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
                                    {room.amenities.map(amenity => (
                                        <li key={amenity} className="flex items-center gap-3 text-sm text-neutral-600">
                                            <svg className="text-forest shrink-0" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Sticky CTA */}
                    <div className="relative">
                        <div className="sticky top-32">
                            <BookingWidget
                                roomTitle={room.title}
                                basePrice={room.price}
                                capacity={room.capacity}
                                whatsappNumber={whatsappNumber}
                                cancellationPolicy={room.cancellationPolicy}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
