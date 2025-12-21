import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/sanity-queries';
import { urlForImage } from '@/sanity/lib/utils';

export const runtime = 'edge';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const logo = settings?.logo;
    
    if (logo) {
      const logoUrl = urlForImage(logo)?.width(32).height(32).url();
      
      if (logoUrl) {
        // Fetch the image from Sanity CDN
        const imageResponse = await fetch(logoUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        
        return new NextResponse(imageBuffer, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=86400, immutable',
          },
        });
      }
    }
    
    // Fallback to default favicon
    const defaultFavicon = await fetch(new URL('/favicon.ico', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'));
    const buffer = await defaultFavicon.arrayBuffer();
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/x-icon',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error generating favicon:', error);
    return new NextResponse(null, { status: 404 });
  }
}
