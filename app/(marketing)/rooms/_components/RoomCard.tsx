"use client";

import Image from "next/image";
import Link from "next/link";
import { Room, getImageUrl } from "@/lib/rooms/sanity-queries";

interface RoomCardProps {
    room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
    const availability = room.availabilityStatus;
    
    return (
        <Link
            href={`/rooms/${room.slug.current}`}
            className="group block relative w-full h-full"
        >
            {/* Image Container - Airbnb Style (Aspect Square-ish) */}
            <div className="relative w-full aspect-[20/19] rounded-xl overflow-hidden bg-neutral-100 mb-3">
                <Image
                    src={getImageUrl(room.image)}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Availability Badge */}
                {availability && (
                    <div className="absolute top-3 left-3 z-10">
                        {availability.isAvailable ? (
                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                Available
                            </div>
                        ) : (
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                Booked
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Content - Below Image */}
            <div className="flex flex-col gap-1 text-dark">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg leading-tight pr-2">
                        {room.title}
                    </h3>
                </div>

                {room.tagline && (
                    <p className="text-dark-muted text-sm line-clamp-2 mb-1">
                        {room.tagline}
                    </p>
                )}

                <p className="text-dark-muted text-sm mb-1">
                    Up to {room.capacity} guests
                </p>

                {/* Availability Status */}
                {availability && !availability.isAvailable && availability.nextAvailableDate && (
                    <p className="text-orange text-xs font-medium mb-1">
                        Next available: {new Date(availability.nextAvailableDate).toLocaleDateString()}
                    </p>
                )}

                <div className="flex items-baseline gap-1 mt-1">
                    {room.priceRange ? (
                        <>
                            <span className="font-bold text-lg text-dark">
                                From GH₵{room.priceRange.min}
                            </span>
                            <span className="text-dark-light text-sm">night</span>
                        </>
                    ) : (
                        <span className="text-sm text-dark-muted italic">Select dates for pricing</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
