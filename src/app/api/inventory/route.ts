import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Mock inventory GET response
  return NextResponse.json({
    success: true,
    data: [
      { id: 1, productName: 'Chocolate Truffle Cake', sku: 'CAKE-TRF-001', stock: 15, lowStockThreshold: 5, status: 'In Stock' },
      { id: 2, productName: 'Vanilla Cupcake', sku: 'CUP-VAN-002', stock: 3, lowStockThreshold: 10, status: 'Low Stock' },
    ]
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, message: 'Inventory record created', data: body }, { status: 201 });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { inventoryId, quantity, type, reason, notes } = body;
  
  // Mock adjustment processing
  return NextResponse.json({ 
    success: true, 
    message: 'Stock adjusted successfully', 
    data: { inventoryId, quantity, type, reason } 
  });
}
