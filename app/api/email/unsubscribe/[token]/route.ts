import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// RFC 8058 one-click unsubscribe. GET only shows the preference page so mail
// scanners cannot unsubscribe guests by prefetching a link.
export async function POST(_request: Request, { params }: { params: { token: string } }) {
  await prisma.eventEmailPreference.updateMany({ where: { token: params.token }, data: { unsubscribedAt: new Date() } });
  return NextResponse.json({ unsubscribed: true });
}
