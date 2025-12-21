import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

/**
 * Image optimization presets
 */
export const IMAGE_PRESETS = {
  thumbnail: { width: 300, quality: 80, format: 'webp' },
  card: { width: 600, quality: 85, format: 'webp' },
  hero: { width: 1920, quality: 90, format: 'webp' },
  fullscreen: { width: 2400, quality: 90, format: 'webp' },
  favicon: { width: 32, height: 32, quality: 90, format: 'png' },
  og: { width: 1200, height: 630, quality: 90, format: 'jpg' },
} as const;

export type ImagePreset = keyof typeof IMAGE_PRESETS;

/**
 * Get optimized image URL with preset
 */
export function getOptimizedImageUrl(
  source: SanityImageSource,
  preset: ImagePreset = 'card'
): string | null {
  if (!source) return null;
  
  try {
    const config = IMAGE_PRESETS[preset];
    let urlBuilder = builder.image(source).auto('format').fit('max');
    
    if (config.width) urlBuilder = urlBuilder.width(config.width);
    if (config.height) urlBuilder = urlBuilder.height(config.height);
    if (config.quality) urlBuilder = urlBuilder.quality(config.quality);
    if (config.format) urlBuilder = urlBuilder.format(config.format as any);
    
    return urlBuilder.url();
  } catch (error) {
    console.error('Error generating optimized image URL:', error);
    return null;
  }
}

/**
 * Get responsive image srcset for different screen sizes
 */
export function getResponsiveSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600, 2000]
): string | null {
  if (!source) return null;
  
  try {
    const srcSet = widths
      .map(width => {
        const url = builder
          .image(source)
          .width(width)
          .quality(85)
          .auto('format')
          .fit('max')
          .url();
        return `${url} ${width}w`;
      })
      .join(', ');
    
    return srcSet;
  } catch (error) {
    console.error('Error generating srcSet:', error);
    return null;
  }
}

/**
 * Get blur data URL for progressive image loading
 */
export function getBlurDataUrl(source: SanityImageSource): string | null {
  if (!source) return null;
  
  try {
    return builder
      .image(source)
      .width(20)
      .quality(20)
      .blur(50)
      .url();
  } catch (error) {
    console.error('Error generating blur URL:', error);
    return null;
  }
}
