import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/sanity-queries';
import { urlForImage } from '@/sanity/lib/utils';

export const runtime = 'edge';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const logo = settings?.logo;
    
    if (logo) {
      const logoUrl = urlForImage(logo)?.width(180).height(180).fit('crop').url();
      
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
    
    return new NextResponse(null, { status: 404 });
  } catch (error) {
    console.error('Error generating apple icon:', error);
    return new NextResponse(null, { status: 404 });
  }
}
