"use client";

interface LodgeLocationMapProps {
    lodgeName: string;
    address?: string;
}

export default function LodgeLocationMap({ 
    lodgeName,
    address = "Sunyani Dumasua Clayso, Sunyani Berekum Road, Bono Region, Ghana"
}: LodgeLocationMapProps) {
    // Encode the address for Google Maps
    const encodedAddress = encodeURIComponent(address);
    const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodedAddress}&zoom=15`;
    const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    return (
        <div className="w-full">
            <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-forest-900 mb-4">
                    Find Us
                </h2>
                <div className="w-24 h-1 bg-orange mx-auto mb-4" />
                <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-2">
                    <strong>{lodgeName}</strong>
                </p>
                <p className="text-base text-stone-500 max-w-2xl mx-auto">
                    Sunyani Dumasua Clayso<br />
                    Sunyani Berekum Road<br />
                    Bono Region, Ghana
                </p>
            </div>
            
            {/* Google Maps Embed */}
            <div className="h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-6">
                <iframe
                    src={mapsSearchUrl.replace('/search/', '/embed/').replace('&query=', '?q=')}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing location of ${lodgeName}`}
                />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                    href={mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white font-semibold rounded-full hover:bg-orange-600 transition-colors shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Get Directions</span>
                </a>
                
                <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange font-semibold rounded-full border-2 border-orange hover:bg-orange-50 transition-colors shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>View on Google Maps</span>
                </a>
            </div>
        </div>
    );
}
