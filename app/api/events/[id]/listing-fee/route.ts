import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { initializeTransaction } from "@/lib/paystack";
import { LISTING_FEE_KOBO, LISTING_FEE_NAIRA } from "@/lib/constants";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const event = await prisma.event.findUnique({ where: { id: params.id } });
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  if (event.organiserId !== session.user.id && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (event.status === "live") {
    return NextResponse.json({ error: "This event is already live." }, { status: 400 });
  }
  if (!session.user.email) {
    return NextResponse.json({ error: "Your account has no email on file." }, { status: 400 });
  }

  try {
    const origin = request.nextUrl.origin;
    const { authorization_url, reference } = await initializeTransaction({
      email: session.user.email,
      amountKobo: LISTING_FEE_KOBO,
      callbackUrl: `${origin}/api/payments/listing-fee/callback`,
      metadata: { eventId: event.id },
    });

    await prisma.listingFeePayment.upsert({
      where: { eventId: event.id },
      update: { paystackRef: reference, amount: LISTING_FEE_NAIRA, status: "pending" },
      create: { eventId: event.id, paystackRef: reference, amount: LISTING_FEE_NAIRA, status: "pending" },
    });

    return NextResponse.json({ redirectUrl: authorization_url });
  } catch (err) {
    console.error("Failed to start listing fee payment:", err);
    return NextResponse.json({ error: "Couldn't start payment. Try again shortly." }, { status: 500 });
  }
}