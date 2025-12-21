"use client";

import Link from "next/link";
import { Room } from "@/lib/rooms/sanity-queries";
import { WifiCard } from "./WifiCard";
import { WelcomeVideo } from "./WelcomeVideo";
import { ServiceGrid } from "./ServiceGrid";
import { Wind, Droplets, CloudLightning, Info } from "lucide-react";
import { motion } from "framer-motion";


const IconMap: Record<string, any> = {
    "wind": Wind,
    "droplets": Droplets,
    "cloud-lightning": CloudLightning,
    "default": Info
};

interface ConciergePageClientProps {
    room: Room;
    whatsappNumber: string;
}

export function ConciergePageClient({ room, whatsappNumber }: ConciergePageClientProps) {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-stone-50">
            <div className="max-w-2xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">My Room</p>
                    <h1 className="font-serif text-3xl md:text-4xl text-forest-900 mb-2">
                        {room.title}
                    </h1>
                    <p className="text-stone-500 italic">Digital Manual</p>
                </div>

                {/* Welcome Video */}
                <div className="mb-10">
                    <WelcomeVideo src={room.welcomeVideoUrl || room.welcomeVideo?.asset?.url || "https://www.youtube.com/embed/VIDEO_ID"} />
                </div>

                {/* Wi-Fi Card (Primary Utility) */}
                {room.wifiSsid && room.wifiPassword && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <WifiCard ssid={room.wifiSsid} pass={room.wifiPassword} />
                    </motion.div>
                )}

                {/* Instructions */}
                <div>
                    <h2 className="font-serif text-xl text-stone-800 mb-6 flex items-center gap-2">
                        <Info size={20} className="text-ochre-400" />
                        Room Guide
                    </h2>

                    <div className="grid gap-4">
                        {room.instructions?.map((instruction, idx) => {
                            const Icon = IconMap[instruction.icon] || IconMap.default;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex gap-4 items-start"
                                >
                                    <div className="p-3 bg-forest-50 text-forest-800 rounded-xl">
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-forest-900 mb-1">{instruction.title}</h3>
                                        <p className="text-stone-500 text-sm leading-relaxed">{instruction.content}</p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {(!room.instructions || room.instructions.length === 0) && (
                            <div className="text-stone-400 text-sm italic text-center py-6">
                                No specific instructions for this room yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-10">
                    <h2 className="font-serif text-xl text-stone-800 mb-4 px-1">Quick Requests</h2>
                    <ServiceGrid roomTitle={room.title} whatsappNumber={whatsappNumber} />
                </div>

                {/* Reception Quick Action */}
                <div className="mt-12 text-center">
                    <p className="text-stone-500 text-sm mb-4">Need something else?</p>
                    <Link
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 text-forest-900 font-medium rounded-full shadow-sm hover:bg-stone-50 transition-colors"
                    >
                        Chat with Reception
                    </Link>
                </div>

            </div>
        </div>
    );
}
