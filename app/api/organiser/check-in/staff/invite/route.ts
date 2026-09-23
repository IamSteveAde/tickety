import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import crypto from "crypto";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

function hashToken(token: string) {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  if (
    session.user.role !== "ORGANISER" &&
    session.user.role !== "ADMIN"
  ) {
    return NextResponse.json(
      { error: "Only organisers can invite staff." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const eventId =
      typeof body.eventId === "string"
        ? body.eventId.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!eventId || !email) {
      return NextResponse.json(
        {
          error: "Event and email address are required.",
        },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        {
          error: "Enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const event = await prisma.event.findFirst({
      where:
        session.user.role === "ADMIN"
          ? {
              id: eventId,
            }
          : {
              id: eventId,
              organiserId: session.user.id,
            },
      select: {
        id: true,
        title: true,
        organiserId: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          error: "Event not found.",
        },
        { status: 404 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (
      existingUser &&
      existingUser.role !== "CHECKIN_STAFF"
    ) {
      return NextResponse.json(
        {
          error:
            "This email already belongs to an organiser or admin account.",
        },
        { status: 409 }
      );
    }

    if (existingUser) {
      const existingAssignment =
        await prisma.eventStaff.findUnique({
          where: {
            eventId_userId: {
              eventId: event.id,
              userId: existingUser.id,
            },
          },
        });

      if (existingAssignment) {
        return NextResponse.json(
          {
            error:
              "This person already has check-in access to this event.",
          },
          { status: 409 }
        );
      }

      await prisma.eventStaff.create({
        data: {
          eventId: event.id,
          userId: existingUser.id,
        },
      });

      return NextResponse.json({
        success: true,
        existingStaff: true,
        message: "Check-in access has been added.",
      });
    }

    await prisma.staffInvitation.updateMany({
      where: {
        eventId: event.id,
        email,
        acceptedAt: null,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    const token = crypto.randomBytes(32).toString("hex");

    const tokenHash = hashToken(token);

    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await prisma.staffInvitation.create({
      data: {
        email,
        eventId: event.id,
        invitedById: session.user.id,
        tokenHash,
        expiresAt,
      },
    });

    const baseUrl =
      process.env.NEXTAUTH_URL ??
      "http://localhost:3000";

    const inviteUrl =
      `${baseUrl}/staff/accept-invite?token=${token}`;

    return NextResponse.json({
      success: true,
      existingStaff: false,
      inviteUrl,
      event: {
        id: event.id,
        title: event.title,
      },
    });
  } catch (error) {
    console.error(
      "Staff invitation error:",
      error
    );

    return NextResponse.json(
      {
        error: "We couldn't create the invitation.",
      },
      { status: 500 }
    );
  }
}