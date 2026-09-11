import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { markListingFeePaid } from "@/lib/data";

export async function POST(request: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    console.error("PAYSTACK_SECRET_KEY not set — rejecting webhook");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const expectedHash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  if (signature !== expectedHash) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);

  if (payload.event === "charge.success") {
    const reference = payload.data?.reference as string | undefined;
    const eventId = payload.data?.metadata?.eventId as string | undefined;

    if (reference && eventId) {
      try {
        await markListingFeePaid(eventId, reference);
      } catch (err) {
        console.error("Failed to mark listing fee paid from webhook:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}