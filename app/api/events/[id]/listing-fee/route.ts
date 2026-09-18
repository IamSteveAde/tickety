import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { initializeTransaction } from "@/lib/paystack";
import {
  LISTING_FEE_KOBO,
  LISTING_FEE_NAIRA,
} from "@/lib/constants";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // --------------------------------------------------
    // Authentication
    // --------------------------------------------------

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "You must be signed in to make this payment.",
        },
        { status: 401 }
      );
    }

    // --------------------------------------------------
    // Event ID
    // --------------------------------------------------

    const { id: eventId } = await params;

    if (!eventId) {
      return NextResponse.json(
        {
          error: "Event ID is required.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Find event
    // --------------------------------------------------

    const event = await prisma.event.findFirst({
      where: {
        id: eventId,
        organiserId: session.user.id,
      },
      include: {
        listingFeePayment: true,
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

    // --------------------------------------------------
    // Only pending events should pay listing fee
    // --------------------------------------------------

    if (event.status !== "pending") {
      if (event.status === "live") {
        return NextResponse.json(
          {
            error: "This event has already been published.",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error: "This event cannot be published at this time.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Organiser email
    // --------------------------------------------------

    if (!session.user.email) {
      return NextResponse.json(
        {
          error:
            "Your account does not have an email address. Please update your account and try again.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // If there is already a paid listing fee,
    // make sure the event is live.
    // --------------------------------------------------

    if (event.listingFeePayment?.status === "paid") {
      await prisma.event.update({
        where: {
          id: event.id,
        },
        data: {
          status: "live",
        },
      });

      return NextResponse.json({
        success: true,
        alreadyPaid: true,
        redirectUrl: `${request.nextUrl.origin}/organiser/dashboard`,
      });
    }

    // --------------------------------------------------
    // Paystack callback URL
    // --------------------------------------------------

    const origin = request.nextUrl.origin;

    const callbackUrl =
      `${origin}/api/payments/listing-fee/callback`;

    // --------------------------------------------------
    // Initialize Paystack transaction
    // --------------------------------------------------

    const {
      authorization_url,
      reference,
    } = await initializeTransaction({
      email: session.user.email,
      amountKobo: LISTING_FEE_KOBO,
      callbackUrl,
      metadata: {
        eventId: event.id,
        paymentType: "EVENT_LISTING_FEE",
      },
    });

    // --------------------------------------------------
    // Store/update pending payment
    // --------------------------------------------------

    if (event.listingFeePayment) {
      await prisma.listingFeePayment.update({
        where: {
          eventId: event.id,
        },
        data: {
          amount: LISTING_FEE_NAIRA,
          paystackRef: reference,
          status: "pending",
          paidAt: null,
        },
      });
    } else {
      await prisma.listingFeePayment.create({
        data: {
          eventId: event.id,
          amount: LISTING_FEE_NAIRA,
          paystackRef: reference,
          status: "pending",
        },
      });
    }

    // --------------------------------------------------
    // IMPORTANT:
    // This is the URL the frontend redirects to.
    // It MUST be Paystack's authorization URL.
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      redirectUrl: authorization_url,
      reference,
    });
  } catch (error) {
    console.error(
      "LISTING FEE INITIALIZATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to initialize payment.",
      },
      { status: 500 }
    );
  }
}