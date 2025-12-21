import { 
  Inter, 
  Playfair_Display, 
  Poppins, 
  Montserrat, 
  Open_Sans,
  Merriweather,
  Lato,
  Nunito,
  Work_Sans
} from "next/font/google";

// Current default fonts
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Modern Sans: Poppins + Inter
export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Professional: Montserrat + Open Sans
export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Classic Serif: Merriweather + Lato
export const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Friendly Rounded: Nunito + Work Sans
export const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export type FontPairing = 'playfair-inter' | 'poppins-inter' | 'montserrat-opensans' | 'merriweather-lato' | 'nunito-worksans';

/**
 * Get font classes based on CMS selection
 */
export function getFontClasses(pairing?: FontPairing): string {
  switch (pairing) {
    case 'poppins-inter':
      return `${poppins.variable} ${inter.variable}`;
    case 'montserrat-opensans':
      return `${montserrat.variable} ${openSans.variable}`;
    case 'merriweather-lato':
      return `${merriweather.variable} ${lato.variable}`;
    case 'nunito-worksans':
      return `${nunito.variable} ${workSans.variable}`;
    case 'playfair-inter':
    default:
      return `${playfair.variable} ${inter.variable}`;
  }
}

/**
 * Get font family names for description
 */
export function getFontDescription(pairing?: FontPairing): { heading: string; body: string } {
  switch (pairing) {
    case 'poppins-inter':
      return { heading: 'Poppins', body: 'Inter' };
    case 'montserrat-opensans':
      return { heading: 'Montserrat', body: 'Open Sans' };
    case 'merriweather-lato':
      return { heading: 'Merriweather', body: 'Lato' };
    case 'nunito-worksans':
      return { heading: 'Nunito', body: 'Work Sans' };
    case 'playfair-inter':
    default:
      return { heading: 'Playfair Display', body: 'Inter' };
  }
}
