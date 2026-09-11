import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN ?? "tickety-dev-verify-token";

/**
 * Meta's one-time webhook verification handshake. When you register this
 * URL in the WhatsApp Business Platform dashboard, Meta sends a GET request
 * with these query params and expects the challenge echoed back verbatim.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

/**
 * Incoming WhatsApp messages land here. Real implementation:
 * 1. Parse the entry/changes payload for the message + sender phone number.
 * 2. Look up (or start) that attendee's conversation state against the
 *    event ID carried in the original deep link.
 * 3. Advance the scripted flow — ticket type -> quantity -> custom
 *    questions -> payment link -> confirmation — falling back to an
 *    AI-interpreted response only where the PRD calls for free text.
 */
export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log("Received WhatsApp webhook payload:", JSON.stringify(payload).slice(0, 500));

  return NextResponse.json({ received: true });
}
