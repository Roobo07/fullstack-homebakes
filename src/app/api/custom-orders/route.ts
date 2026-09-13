import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Custom orders GET API ready' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: 'Custom order request created', data: body });
}
