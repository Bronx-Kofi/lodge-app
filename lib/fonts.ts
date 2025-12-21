import { Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    fallback: ["system-ui", "arial"],
    adjustFontFallback: true,
});

export const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
    fallback: ["Georgia", "serif"],
    adjustFontFallback: true,
});
