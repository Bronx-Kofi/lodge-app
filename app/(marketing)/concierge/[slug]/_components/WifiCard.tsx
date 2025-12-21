"use client";

import { useState } from "react";
import { Copy, Check, Wifi } from "lucide-react";

interface WifiCardProps {
    ssid: string;
    pass: string;
}

export function WifiCard({ ssid, pass }: WifiCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pass);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-forest-900 rounded-3xl p-6 text-white shadow-xl shadow-forest-900/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Wifi size={120} />
            </div>

            <h3 className="text-white/60 text-sm font-medium uppercase tracking-widest mb-6">Wi-Fi Access</h3>

            <div className="space-y-4">
                <div>
                    <p className="text-xs text-white/40 mb-1">Network</p>
                    <p className="font-serif text-xl">{ssid}</p>
                </div>

                <div>
                    <p className="text-xs text-white/40 mb-1">Password</p>
                    <div className="flex items-center gap-3">
                        <p className="font-mono text-2xl tracking-wider text-ochre-300">{pass}</p>
                        <button
                            onClick={handleCopy}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                        >
                            {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {copied && (
                <div className="absolute bottom-4 right-6 text-xs text-green-400 font-medium animate-pulse">
                    Copied to clipboard
                </div>
            )}
        </div>
    );
}
