"use client";

import { Room } from "@/lib/rooms/sanity-queries";
import { RoomCard } from "../../rooms/_components/RoomCard";
import { StaggerContainer, StaggerItem, ScrollReveal } from "../scroll-reveal";

interface FeaturedRoomsProps {
    rooms: Room[];
    title?: string;
    subtitle?: string;
}

export function FeaturedRooms({ rooms, title, subtitle }: FeaturedRoomsProps) {
    if (!rooms || rooms.length === 0) return null;

    // Take up to 3 rooms for the homepage
    const displayRooms = rooms.slice(0, 3);

    return (
        <section className="py-24 bg-white">
            <div className="section-container">
                <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight">
                            {title || "Our Rooms"}
                        </h2>
                        <p className="text-lg text-dark-muted max-w-xl">
                            {subtitle || "Curated spaces designed for off-grid luxury and deep relaxation."}
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {displayRooms.map((room) => (
                        <StaggerItem key={room._id} className="h-full">
                            <RoomCard room={room} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
