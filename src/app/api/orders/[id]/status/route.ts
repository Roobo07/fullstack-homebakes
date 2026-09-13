import { NextResponse } from 'next/server';

export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { status } = await request.json();
    
    // Validate status transition (mock)
    const validStatuses = ['Order Placed', 'Payment Confirmed', 'Order Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Picked Up', 'Cancelled'];
    
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Mock inserting status history
    const historyEntry = {
      orderId: id,
      status,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ success: true, message: `Status updated to ${status}`, history: historyEntry });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}