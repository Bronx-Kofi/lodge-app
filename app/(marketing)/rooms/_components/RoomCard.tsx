"use client";

import Image from "next/image";
import Link from "next/link";
import { Room, getImageUrl } from "@/lib/rooms/sanity-queries";

interface RoomCardProps {
    room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
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

                <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-bold text-lg text-dark">GH₵{room.price}</span>
                    <span className="text-dark-light text-sm">night</span>
                </div>
            </div>
        </Link>
    );
}
