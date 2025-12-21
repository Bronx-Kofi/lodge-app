"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { HeritageSite } from "@/lib/heritage/sanity-queries";

// Custom Icon to match the brand (Terracotta Pin)
const terracottaIcon = L.divIcon({
    className: "custom-marker",
    html: `<div style="
    background-color: #8c3a28; 
    width: 24px; 
    height: 24px; 
    border-radius: 50%; 
    border: 2px solid white; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
});

interface HeritageMapProps {
    sites: HeritageSite[];
}

export default function HeritageMap({ sites }: HeritageMapProps) {
    // Center roughly between sites (Sunyani/Bono region)
    const [center] = useState<[number, number]>([7.85, -1.9]);

    // Fix for Leaflet map container height not being set by default
    // We handle it in the parent or via className, but safer to enforce here if needed.

    return (
        <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-0">
            <MapContainer
                center={center}
                zoom={9}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                dragging={true} // Enable dragging on desktop, maybe disable on mobile touch if it interferes?
            >
                {/* CartoDB Voyager Tiles - Clean, muted colors suitable for our aesthetic */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {sites
                    .filter(site => site.location && site.location.lat && site.location.lng)
                    .map((site) => (
                    <Marker
                        key={site._id}
                        position={[site.location.lat, site.location.lng]}
                        icon={terracottaIcon}
                    >
                        <Popup className="font-sans">
                            <div className="text-center p-1">
                                <h3 className="font-bold text-terracotta text-sm mb-1">{site.title}</h3>
                                <p className="text-xs text-stone-500 font-medium uppercase">{site.travelTime}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* The Lodge Pin (Distinctive) */}
                <Marker
                    position={[7.6, -2.1]} /* Approx loc for Lodge/Sunyani for context - Adjust if real coordinates known */
                    icon={L.divIcon({
                        className: "lodge-marker",
                        html: `<div style="
                    background-color: #2c3e2e; 
                    width: 32px; 
                    height: 32px; 
                    border-radius: 50%; 
                    border: 3px solid #ffaa4c; 
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 10px;
                    font-weight: bold;
                ">M</div>`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16],
                    })}
                >
                    <Popup>
                        <div className="text-center">
                            <h3 className="font-serif font-bold text-forest-900">Miky Hillside Lodge</h3>
                            <p className="text-xs text-stone-500">Your Sanctuary</p>
                        </div>
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
}
