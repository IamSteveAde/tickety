import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyEmailWebhook, shouldSuppressEmail } from "@/lib/email/webhook";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });
  const body = await request.text();
  if (!verifyEmailWebhook(body, request.headers, secret)) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  let payload: { type?: string; created_at?: string; data?: { email_id?: string; to?: string[]; bounce?: { type?: string } } };
  try { payload = JSON.parse(body); }
  catch { return NextResponse.json({ error: "Invalid payload" }, { status: 400 }); }
  const supported = ["email.sent", "email.delivered", "email.delivery_delayed", "email.bounced", "email.complained", "email.failed", "email.suppressed"];
  if (!payload.type || !supported.includes(payload.type)) return NextResponse.json({ received: true });
  const providerId = payload.data?.email_id;
  const occurredAt = new Date(payload.created_at || "");
  if (!providerId || !Number.isFinite(occurredAt.getTime())) return NextResponse.json({ error: "Invalid email event" }, { status: 400 });
  const status = payload.type.slice(6);
  try {
    await prisma.$transaction(async (tx) => {
      await tx.emailDeliveryEvent.upsert({ where: { id: request.headers.get("svix-id")! }, update: {}, create: { id: request.headers.get("svix-id")!, providerId, status, occurredAt } });
      await tx.emailNotification.updateMany({ where: { providerId, OR: [{ deliveryUpdatedAt: null }, { deliveryUpdatedAt: { lte: occurredAt } }] }, data: { deliveryStatus: status, deliveryUpdatedAt: occurredAt } });
      if (shouldSuppressEmail(status, payload.data?.bounce?.type)) {
        for (const recipient of payload.data?.to || []) {
          if (typeof recipient !== "string") continue;
          const email = recipient.trim().toLowerCase();
          await tx.emailSuppression.upsert({ where: { email }, update: { reason: status }, create: { email, reason: status } });
        }
      }
    });
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Could not record email event" }, { status: 500 });
  }
}
