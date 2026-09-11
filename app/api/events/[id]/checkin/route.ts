import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

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

  const body = await request.json();
  const ticketId = (body?.ticketId ?? "").trim();
  if (!ticketId) {
    return NextResponse.json({ error: "Enter a ticket ID." }, { status: 400 });
  }

  const attendee = await prisma.attendee.findFirst({
    where: { ticketId, eventId: params.id },
    include: { ticketType: true },
  });

  if (!attendee) {
    return NextResponse.json({ error: "No ticket found with that ID for this event." }, { status: 404 });
  }

  if (attendee.paymentStatus !== "paid") {
    return NextResponse.json(
      { error: "This ticket hasn't been paid for.", name: attendee.name },
      { status: 409 }
    );
  }

  if (attendee.checkInStatus || attendee.ticketStatus === "used") {
    return NextResponse.json(
      { error: "Ticket already used.", name: attendee.name },
      { status: 409 }
    );
  }

  const updated = await prisma.attendee.update({
    where: { id: attendee.id },
    data: { checkInStatus: true, checkInTime: new Date(), ticketStatus: "used" },
    include: { ticketType: true },
  });

  return NextResponse.json({
    name: updated.name,
    ticketType: updated.ticketType.name,
  });
}