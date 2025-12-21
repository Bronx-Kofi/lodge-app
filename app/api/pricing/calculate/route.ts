import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const { roomId, checkIn, checkOut, adults, children } = await request.json();

    // Validate input
    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Calculate number of nights
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (nights < 1) {
      return NextResponse.json(
        { error: 'Invalid date range' },
        { status: 400 }
      );
    }

    // Get room base price
    const room = await client.fetch(
      `*[_type == "roomSimplified" && _id == $roomId][0]{
        title,
        price,
        capacity
      }`,
      { roomId }
    );

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    // Validate capacity
    const totalGuests = (adults || 1) + (children || 0);
    if (totalGuests > room.capacity) {
      return NextResponse.json(
        { error: `Room capacity is ${room.capacity} guests` },
        { status: 400 }
      );
    }

    let basePrice = room.price * nights;

    // Check for pricing rules
    const pricingRules = await client.fetch(
      `*[_type == "pricingRule" && 
         active == true &&
         startDate <= $checkOut &&
         endDate >= $checkIn &&
         (count(rooms) == 0 || $roomId in rooms[]._ref)
      ] | order(priority desc)`,
      { roomId, checkIn, checkOut }
    );

    // Apply pricing rules
    let totalModifier = 0;
    const appliedRules: any[] = [];

    for (const rule of pricingRules) {
      // Check minimum stay requirement
      if (rule.minimumStay && nights < rule.minimumStay) {
        continue;
      }

      if (rule.modifierType === 'percentage') {
        totalModifier += rule.modifierValue;
        appliedRules.push({
          name: rule.name,
          type: rule.modifierType,
          value: rule.modifierValue,
        });
      } else if (rule.modifierType === 'fixed') {
        basePrice += rule.modifierValue;
        appliedRules.push({
          name: rule.name,
          type: rule.modifierType,
          value: rule.modifierValue,
        });
      }
    }

    // Apply percentage modifiers
    if (totalModifier !== 0) {
      basePrice = basePrice * (1 + totalModifier / 100);
    }

    // Calculate fees
    const cleaningFee = 50; // Fixed cleaning fee
    const serviceFee = Math.round(basePrice * 0.10); // 10% service fee
    const taxes = Math.round((basePrice + cleaningFee + serviceFee) * 0.125); // 12.5% VAT

    const total = Math.round(basePrice + cleaningFee + serviceFee + taxes);

    return NextResponse.json({
      roomTitle: room.title,
      nights,
      baseRate: room.price,
      basePrice: Math.round(basePrice),
      cleaningFee,
      serviceFee,
      taxes,
      total,
      appliedRules,
      breakdown: {
        nightlyRate: `GH₵${room.price} × ${nights} nights`,
        subtotal: Math.round(basePrice),
        fees: cleaningFee + serviceFee,
        taxAmount: taxes,
      },
    });
  } catch (error) {
    console.error('Error calculating pricing:', error);
    return NextResponse.json(
      { error: 'Failed to calculate pricing' },
      { status: 500 }
    );
  }
}
