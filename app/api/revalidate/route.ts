import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Sanity
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { _type } = body;

    // Revalidate based on document type
    switch (_type) {
      case 'siteSettings':
        // Revalidate all pages when site settings change
        revalidatePath('/', 'layout');
        break;
      case 'navigation':
      case 'footer':
        revalidatePath('/', 'layout');
        break;
      case 'homepage':
        revalidatePath('/');
        break;
      case 'room':
        revalidateTag('rooms');
        revalidatePath('/rooms');
        break;
      case 'heritageSite':
        revalidateTag('heritageSites');
        revalidatePath('/explore');
        break;
      case 'aboutPage':
        revalidatePath('/about');
        break;
      case 'roomsPage':
        revalidatePath('/rooms');
        break;
      case 'explorePage':
        revalidatePath('/explore');
        break;
      default:
        // Revalidate everything if type is unknown
        revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
