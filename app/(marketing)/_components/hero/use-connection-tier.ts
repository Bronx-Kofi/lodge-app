"use client";

/**
 * Connection Tier Detection Hook
 * 
 * Detects the user's connection speed to determine which media tier to load.
 * Part of the "Bono-Speed" engine for <2s LCP on slow connections.
 * 
 * @returns 'fast' | 'slow' | 'unknown'
 */

import { useState, useEffect } from "react";

type ConnectionTier = "fast" | "slow" | "unknown";

interface NetworkInformation extends EventTarget {
    effectiveType: "4g" | "3g" | "2g" | "slow-2g";
    saveData: boolean;
    downlink: number; // Mbps
}

declare global {
    interface Navigator {
        connection?: NetworkInformation;
    }
}

/**
 * Determines media tier based on connection quality
 */
function getConnectionTier(connection: NetworkInformation | undefined): ConnectionTier {
    // No connection info available
    if (!connection) {
        return "unknown";
    }

    // User has data saver enabled - respect their preference
    if (connection.saveData) {
        return "slow";
    }

    // Check effective connection type
    const { effectiveType, downlink } = connection;

    // Fast: 4G with good bandwidth (>2 Mbps)
    if (effectiveType === "4g" && downlink > 2) {
        return "fast";
    }

    // Slow: 3G, 2G, or slow 4G
    if (effectiveType === "3g" || effectiveType === "2g" || effectiveType === "slow-2g") {
        return "slow";
    }

    // Medium 4G - still show video but could be delayed
    if (effectiveType === "4g") {
        return "fast";
    }

    return "unknown";
}

export function useConnectionTier(): ConnectionTier {
    // Default to unknown for SSR
    const [tier, setTier] = useState<ConnectionTier>("unknown");

    useEffect(() => {
        // Only run on client
        if (typeof window === "undefined") return;

        const connection = navigator.connection;

        // Set initial tier
        setTier(getConnectionTier(connection));

        // Listen for connection changes
        if (connection) {
            const handleChange = () => {
                setTier(getConnectionTier(connection));
            };

            connection.addEventListener("change", handleChange);
            return () => connection.removeEventListener("change", handleChange);
        }
    }, []);

    return tier;
}

/**
 * Returns true if video should be loaded based on connection tier
 */
export function useShouldLoadVideo(): boolean {
    const tier = useConnectionTier();
    return tier === "fast" || tier === "unknown";
}
