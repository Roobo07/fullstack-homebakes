import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const lowerMessage = message.toLowerCase();
    
    let botResponse = "I'm still learning! For complex queries, please contact us at +91 98765 43210";
    
    if (lowerMessage.match(/menu|products|cakes/)) {
      botResponse = "Check out our menu at /shop!";
    } else if (lowerMessage.match(/order|track/)) {
      botResponse = "You can track your order at /orders";
    } else if (lowerMessage.match(/custom|birthday|wedding/)) {
      botResponse = "Design your dream cake at /custom-cake!";
    } else if (lowerMessage.match(/delivery|deliver/)) {
      botResponse = "We deliver within 10km. Fees: 0-3km ₹30, 3-5km ₹50, 5-8km ₹80";
    } else if (lowerMessage.match(/hours|open|time/)) {
      botResponse = "We're open Mon-Sat 9AM-8PM, Sun 10AM-6PM";
    } else if (lowerMessage.match(/phone|call|contact/)) {
      botResponse = "Call us: +91 98765 43210 or WhatsApp: +91 98765 43210";
    }

    // Architecture ready for AI integration
    // TODO: Replace keyword matching with AI API integration here
    
    return NextResponse.json({ response: botResponse });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}
