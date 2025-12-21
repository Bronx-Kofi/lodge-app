import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Tailwind Configuration for Lodge
 * 
 * Implements the "Bono Palette" from UX Design Specification:
 * - Primary: Terracotta & Ochre (grounding tones)
 * - Secondary: Forest Canopy (nature sections)
 * - Accent: Akwaaba Gold (CTAs and interactions)
 * - Base: Clean Paper (high-whitespace backgrounds)
 */
export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary - Vibrant Orange
        orange: {
          DEFAULT: "#FF6B35",
          50: "#FFF4ED",
          100: "#FFE4D6",
          200: "#FFC9AD",
          300: "#FFA366",
          400: "#FF8547",
          500: "#FF6B35",
          600: "#E84A05",
          700: "#C13A00",
          800: "#9A2E00",
          900: "#731F00",
        },
        // Secondary - Warm Coral for accents
        coral: {
          DEFAULT: "#FF8C61",
          light: "#FFAB8A",
          dark: "#E86D3D",
        },
        // Neutral Base - Clean Whites
        white: {
          DEFAULT: "#FFFFFF",
          warm: "#FFF8F5",
          cool: "#F8FAFC",
          cream: "#FFFAF6",
        },
        // Dark tones for contrast
        dark: {
          DEFAULT: "#1A1A1A",
          soft: "#2D2D2D",
          muted: "#4A4A4A",
          light: "#6B6B6B",
        },
        // Legacy alias for compatibility (maps to orange)
        terracotta: {
          DEFAULT: "#FF6B35",
          50: "#FFF4ED",
          100: "#FFE4D6",
          200: "#FFC9AD",
          300: "#FFA366",
          400: "#FF8547",
          500: "#FF6B35",
          600: "#E84A05",
          700: "#C13A00",
          800: "#9A2E00",
          900: "#731F00",
        },
        ochre: {
          DEFAULT: "#FF8C61",
          100: "#FFE4D6",
          200: "#FFC9AD",
          300: "#FFAB8A",
          400: "#FF8C61",
        },
        akwaaba: {
          DEFAULT: "#FF6B35",
          500: "#FF6B35",
          600: "#E84A05",
        },
        paper: {
          DEFAULT: "#FFFAF6",
          50: "#FFFFFF",
          100: "#FFFAF6",
          200: "#FFF4ED",
        },
      },
      fontFamily: {
        // Heading: Playfair Display (Serif) - Premium, heritage-focused
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        // Body: Inter (Sans-Serif) - High readability
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        // UI/Utility: IBM Plex Mono - Data elements
        mono: ["IBM Plex Mono", "monospace"],
      },
      spacing: {
        // Generous whitespace for premium feel
        "section": "8rem",
        "section-sm": "4rem",
        "section-xs": "3rem",
      },
      fontSize: {
        // Enhanced typography scale
        'display-xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'brand': '0 10px 40px -10px rgba(255, 107, 53, 0.25)',
        'brand-lg': '0 20px 60px -15px rgba(255, 107, 53, 0.35)',
        'glow': '0 0 40px rgba(255, 107, 53, 0.4)',
        'glow-sm': '0 0 20px rgba(255, 107, 53, 0.3)',
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "breathe": "breathe 2s ease-in-out infinite",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;

