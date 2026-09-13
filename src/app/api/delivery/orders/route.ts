import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Delivery orders GET API ready' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: 'Delivery order created', data: body });
}
