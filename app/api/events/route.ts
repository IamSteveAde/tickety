import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEvents, createEvent } from "@/lib/data";
import { prisma } from "@/lib/db";
import { initializeTransaction } from "@/lib/paystack";
import { LISTING_FEE_KOBO, LISTING_FEE_NAIRA } from "@/lib/constants";

export async function GET() {
  const events = await getEvents();
  return NextResponse.json({ events });
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "You need to be logged in to create an event." }, { status: 401 });
  }

  const body = await request.json();

  const required = ["title", "description", "state", "venue", "date", "startTime", "category"];
  for (const field of required) {
    if (!body?.[field]) {
      return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const baseSlug = slugify(body.title);
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.event.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const tags: string[] =
    typeof body.tags === "string"
      ? body.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

  const isFree = !!body.isFree;

  let event;
  try {
    event = await createEvent({
      title: body.title,
      slug,
      description: body.description,
      state: body.state,
      venue: body.venue,
      date: body.date,
      startTime: body.startTime,
      category: body.category,
      organiserId: session.user.id,
      status: isFree ? "pending" : "live",
      coverImageUrl: body.coverImageUrl || undefined,
      tags,
      refundPolicy: body.refundPolicy || undefined,
      minAge: body.minAge ? Number(body.minAge) : undefined,
      ticketTypes: isFree
        ? [{ name: "General Admission", price: 0, quantityTotal: Number(body.freeCapacity) || 100 }]
        : (body.ticketTypes ?? []).map((t: { name: string; price: string; quantity: string }) => ({
            name: t.name,
            price: Number(t.price) || 0,
            quantityTotal: Number(t.quantity) || 0,
          })),
      customQuestions: (body.customQuestions ?? []).map((q: { label: string }) => ({
        label: q.label,
      })),
    });
  } catch (err) {
    console.error("Failed to create event:", err);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }

  // Paid events go live immediately — no upfront fee, the platform earns
  // its cut per ticket sale later. Free events need the listing fee paid
  // first, so we send the organiser to Paystack before it goes live.
  if (!isFree) {
    return NextResponse.json({ event }, { status: 201 });
  }

  if (!session.user.email) {
    return NextResponse.json(
      {
        error:
          "Your account has no email on file, so we can't start payment. The event was saved but isn't live yet — contact support.",
      },
      { status: 400 }
    );
  }

  try {
    const origin = request.nextUrl.origin;
    const { authorization_url, reference } = await initializeTransaction({
      email: session.user.email,
      amountKobo: LISTING_FEE_KOBO,
      callbackUrl: `${origin}/api/payments/listing-fee/callback`,
      metadata: { eventId: event.id },
    });

    await prisma.listingFeePayment.create({
      data: {
        eventId: event.id,
        amount: LISTING_FEE_NAIRA,
        paystackRef: reference,
        status: "pending",
      },
    });

    return NextResponse.json({ event, redirectUrl: authorization_url }, { status: 201 });
  } catch (err) {
    console.error("Failed to start listing fee payment:", err);
    return NextResponse.json(
      {
        error:
          "Your event was saved but we couldn't start the payment. It won't go live until the fee is paid — try again from your dashboard.",
      },
      { status: 500 }
    );
  }
}