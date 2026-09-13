import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ success: true, data: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, billId: 'BILL-1001', data: body });
}
