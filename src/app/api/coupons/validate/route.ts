import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { code, subtotal, customerId } = await request.json();

    // Mock validation logic
    if (code === 'WELCOME10') {
      return NextResponse.json({ 
        valid: true, 
        discount: subtotal * 0.1, 
        message: '10% discount applied!' 
      });
    }

    if (code === 'BIRTHDAY200') {
      if (subtotal < 800) {
        return NextResponse.json({ valid: false, message: 'Minimum order amount is ₹800' });
      }
      return NextResponse.json({ 
        valid: true, 
        discount: 200, 
        message: '₹200 discount applied!' 
      });
    }

    return NextResponse.json({ valid: false, message: 'Invalid or expired coupon code' });
  } catch (error) {
    return NextResponse.json({ valid: false, message: 'Error validating coupon' }, { status: 500 });
  }
}
