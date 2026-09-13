import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Mock listing customer orders
  const orders = [
    { id: 'ORD-101', date: '2023-10-20', total: 1500, status: 'Delivered' },
    { id: 'ORD-102', date: '2023-10-25', total: 850, status: 'Preparing' }
  ];
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Idempotency check header could be added here
    const idempotencyKey = request.headers.get('x-idempotency-key');

    // Simulate order creation
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      ...body,
      status: 'Order Placed',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
