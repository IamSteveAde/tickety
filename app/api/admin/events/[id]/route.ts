import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { setEventStatus } from "@/lib/data";
import { prisma } from "@/lib/db";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const status = body?.status;
  if (!["live", "pending", "disabled"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (session.user.role !== "ADMIN") {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      select: { organiserId: true },
    });
    if (!event || event.organiserId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  await setEventStatus(params.id, status);
  return NextResponse.json({ ok: true });
}