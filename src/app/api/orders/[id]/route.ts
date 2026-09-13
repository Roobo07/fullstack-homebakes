import { NextResponse } from 'next/server';

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Mock fetching a single order
  const order = {
    id,
    date: '2023-10-25T10:00:00Z',
    status: 'Preparing',
    total: 1250,
    items: [
      { name: 'Chocolate Cake', quantity: 1, price: 500 }
    ],
    deliveryMethod: 'delivery',
    address: '123 Main St'
  };

  return NextResponse.json({ order });
}

export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  // Mock updating order
  return NextResponse.json({ success: true, orderId: id, updatedData: body });
}