import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { latitude, longitude, orderSubtotal } = await request.json();

    if (!latitude || !longitude) {
      return NextResponse.json({ error: 'Coordinates required' }, { status: 400 });
    }

    // Mock server-side calculation
    // Calculate distance between bakery and given coords
    const distanceKm = 4.5;
    
    let available = true;
    let fee = 0;
    let zone = 'Zone 1';
    let message = 'Delivery available';

    if (distanceKm > 15) {
      available = false;
      message = 'Outside of delivery area';
    } else if (distanceKm > 10) {
      fee = 150;
      zone = 'Zone 3';
    } else if (distanceKm > 5) {
      fee = 100;
      zone = 'Zone 2';
    } else {
      fee = 50;
    }

    // Free delivery over 1500
    if (orderSubtotal >= 1500 && available) {
      fee = 0;
      message = 'Free delivery applied!';
    }

    return NextResponse.json({
      available,
      distance: distanceKm,
      fee,
      zone,
      message
    });
  } catch (error) {
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
