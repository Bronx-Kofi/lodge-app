import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-02-28',
  useCdn: false,
});

export async function GET() {
  try {
    const rooms = await readClient.fetch(
      `*[_type == "roomSimplified"] | order(title asc) {
        _id,
        title,
        capacity
      }`
    );

    return NextResponse.json({ success: true, rooms });
  } catch (error) {
    console.error('[Rooms API] Error fetching rooms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}
