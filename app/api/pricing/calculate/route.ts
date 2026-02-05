import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: NextRequest) {
  try {
    const { roomId, checkIn, checkOut, adults, children, numberOfRooms } = await request.json();

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

    // Get room info with pricing details
    const room = await client.fetch(
      `*[_type == "roomSimplified" && _id == $roomId][0]{
        title,
        capacity,
        pricingType,
        priceMin,
        priceMax,
        fixedDisplayPrice,
        fixedPrice
      }`,
      { roomId }
    );

    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    // Determine the correct price based on pricing type
    let roomPrice;
    if (room.fixedPrice) {
      // Receipt override price wins
      roomPrice = room.fixedPrice;
    } else if (room.pricingType === 'fixed' && room.fixedDisplayPrice) {
      // Fixed pricing type
      roomPrice = room.fixedDisplayPrice;
    } else if (room.pricingType === 'range' && room.priceMin) {
      // Range pricing type
      roomPrice = room.priceMin;
    } else {
      // Fallback to any available price
      roomPrice = room.fixedDisplayPrice || room.priceMin;
    }

    if (!roomPrice) {
      return NextResponse.json(
        { error: 'Room price not set. Please contact us for pricing.' },
        { status: 400 }
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

    const rooms = numberOfRooms || 1; // Default to 1 room if not specified

    // Use determined price for calculations
    const baseRatePerNight = roomPrice;
    let basePrice = baseRatePerNight * nights;

    // Calculate fees (per room)
    const cleaningFeePerRoom = 50; // Fixed cleaning fee per room
    const totalCleaningFee = cleaningFeePerRoom * rooms;
    
    // Service fee on all rooms
    const serviceFee = Math.round(basePrice * rooms * 0.10); // 10% service fee
    
    // Calculate subtotal before tax
    const subtotalBeforeTax = Math.round(basePrice * rooms) + totalCleaningFee + serviceFee;
    
    // VAT on everything
    const taxes = Math.round(subtotalBeforeTax * 0.125); // 12.5% VAT

    const total = subtotalBeforeTax + taxes;

    return NextResponse.json({
      roomTitle: room.title,
      nights,
      numberOfRooms: rooms,
      baseRate: baseRatePerNight,
      basePrice: Math.round(basePrice),
      basePriceTotal: Math.round(basePrice * rooms),
      cleaningFee: totalCleaningFee,
      cleaningFeePerRoom: cleaningFeePerRoom,
      serviceFee,
      taxes,
      total,
      breakdown: {
        nightlyRate: `GH₵${baseRatePerNight} × ${nights} ${nights === 1 ? 'night' : 'nights'}`,
        roomsMultiplier: rooms > 1 ? `× ${rooms} ${rooms === 1 ? 'room' : 'rooms'}` : null,
        subtotal: Math.round(basePrice * rooms),
        fees: totalCleaningFee + serviceFee,
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
