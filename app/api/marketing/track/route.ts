import { NextResponse } from 'next/server';

/**
 * Digital Akwaaba Tracking API
 * 
 * Captures guest conversion events (WhatsApp clicks) for business intelligence.
 * In a real production environment, this would log to a database, GA4, or a CRM.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, target, metadata } = body;

        // Mock logging to server console
        console.log(`[TRACKING EVENT] ${new Date().toISOString()}`);
        console.log(`- Type: ${type}`);
        console.log(`- Target: ${target}`);
        console.log(`- Metadata:`, metadata);

        return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
    } catch (error) {
        console.error('[TRACKING ERROR]', error);
        return NextResponse.json({ success: false, error: 'Invalid tracking payload' }, { status: 400 });
    }
}
