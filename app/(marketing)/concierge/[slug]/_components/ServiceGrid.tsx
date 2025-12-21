"use client";

import { useEffect, useState } from "react";
import { Bath, Utensils, Wrench, Bell, Shirt, Sparkles, Wifi, Snowflake, Phone, HelpCircle } from "lucide-react";
import { getServiceTypes, getSiteSettings } from "@/lib/sanity-queries";
import type { ServiceType } from "@/lib/sanity-queries";

interface ServiceGridProps {
    roomTitle: string;
    whatsappNumber: string;
}

const IconMap: Record<string, any> = {
    "bath": Bath,
    "utensils": Utensils,
    "wrench": Wrench,
    "bell": Bell,
    "shirt": Shirt,
    "broom": Sparkles,
    "wifi": Wifi,
    "snowflake": Snowflake,
    "phone": Phone,
    "help-circle": HelpCircle,
};

const ColorMap: Record<string, string> = {
    "blue": "bg-blue-50 text-blue-600 hover:bg-blue-100",
    "orange": "bg-orange-50 text-orange-600 hover:bg-orange-100",
    "stone": "bg-stone-100 text-stone-600 hover:bg-stone-200",
    "green": "bg-green-50 text-green-600 hover:bg-green-100",
    "red": "bg-red-50 text-red-600 hover:bg-red-100",
    "purple": "bg-purple-50 text-purple-600 hover:bg-purple-100",
};

export function ServiceGrid({ roomTitle, whatsappNumber }: ServiceGridProps) {
    const [services, setServices] = useState<ServiceType[]>([]);
    const [numbers, setNumbers] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getServiceTypes(), getSiteSettings()])
            .then(([serviceTypes, settings]) => {
                setServices(serviceTypes);
                setNumbers({
                    main: settings?.whatsappNumbers?.main || whatsappNumber,
                    reception: settings?.whatsappNumbers?.reception || whatsappNumber,
                    operations: settings?.whatsappNumbers?.operations || whatsappNumber,
                    concierge: settings?.whatsappNumbers?.concierge || whatsappNumber,
                });
                setLoading(false);
            });
    }, [whatsappNumber]);

    const handleRequest = async (service: ServiceType) => {
        // Replace {roomTitle} placeholder in message template
        const message = service.messageTemplate.replace(/{roomTitle}/g, roomTitle);
        const targetNumber = numbers[service.targetNumber] || whatsappNumber;
        const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

        // Track conversion
        try {
            await fetch('/api/marketing/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'service_request',
                    target: service.label,
                    metadata: { room: roomTitle }
                }),
                keepalive: true
            });
        } catch (err) {
            console.error('Tracking failed', err);
        }

        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-stone-100 rounded-2xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (services.length === 0) {
        // Fallback to default services
        const defaultServices = [
            { label: 'Towels', icon: 'bath', color: 'blue' },
            { label: 'Dining', icon: 'utensils', color: 'orange' },
            { label: 'Fix It', icon: 'wrench', color: 'stone' }
        ];

        return (
            <div className="grid grid-cols-3 gap-3">
                {defaultServices.map((service, idx) => {
                    const Icon = IconMap[service.icon] || HelpCircle;
                    const colorClass = ColorMap[service.color] || ColorMap.blue;
                    return (
                        <button
                            key={idx}
                            onClick={() => {
                                const msg = `Hi! I'm in ${roomTitle} and I'd like to request: ${service.label}.`;
                                window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
                            }}
                            className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md hover:border-stone-200 transition-all active:scale-95 group"
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${colorClass}`}>
                                <Icon size={20} />
                            </div>
                            <span className="text-xs font-medium text-stone-600">{service.label}</span>
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-3">
            {services.map((service) => {
                const Icon = IconMap[service.icon] || HelpCircle;
                const colorClass = ColorMap[service.color] || ColorMap.blue;

                return (
                    <button
                        key={service._id}
                        onClick={() => handleRequest(service)}
                        className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md hover:border-stone-200 transition-all active:scale-95 group"
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${colorClass}`}>
                            <Icon size={20} />
                        </div>
                        <span className="text-xs font-medium text-stone-600">{service.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
