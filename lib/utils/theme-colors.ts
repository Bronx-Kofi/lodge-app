import { SiteSettings } from '@/lib/sanity-queries';

// Default color palette
const DEFAULT_COLORS = {
  primary: '#FF6B35',      // Orange
  secondary: '#1C1917',    // Dark Stone
  background: '#FAFAF9',   // Light Stone
  text: '#292524',         // Dark Stone
  link: '#FF6B35',         // Orange (same as primary)
};

/**
 * Get theme colors from site settings or use defaults
 */
export function getThemeColors(settings?: SiteSettings | null) {
  return {
    primary: settings?.primaryColor || DEFAULT_COLORS.primary,
    secondary: settings?.secondaryColor || DEFAULT_COLORS.secondary,
    background: settings?.backgroundColor || DEFAULT_COLORS.background,
    text: settings?.textColor || DEFAULT_COLORS.text,
    link: settings?.linkColor || settings?.primaryColor || DEFAULT_COLORS.link,
  };
}

/**
 * Generate CSS variables for theme colors
 */
export function generateThemeCSS(settings?: SiteSettings | null): string {
  const colors = getThemeColors(settings);
  
  return `
    :root {
      --color-primary: ${colors.primary};
      --color-secondary: ${colors.secondary};
      --color-background: ${colors.background};
      --color-text: ${colors.text};
      --color-link: ${colors.link};
      
      /* Derived colors */
      --color-primary-hover: ${adjustBrightness(colors.primary, -10)};
      --color-primary-light: ${adjustBrightness(colors.primary, 20)};
      --color-secondary-light: ${adjustBrightness(colors.secondary, 10)};
    }
  `;
}

/**
 * Adjust color brightness (simple hex adjustment)
 */
function adjustBrightness(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Adjust brightness
  const adjust = (val: number) => {
    const adjusted = val + (val * percent / 100);
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };
  
  const newR = adjust(r);
  const newG = adjust(g);
  const newB = adjust(b);
  
  // Convert back to hex
  return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
}
