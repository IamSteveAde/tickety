import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  createSubaccount,
  listBanks,
} from "@/lib/paystack";
import { verifyPayoutVerificationToken } from "@/lib/payout-verification";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

/* ============================================================
   GET — PAYOUT STATUS
============================================================ */

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (session.user.role !== "ORGANISER") {
      return NextResponse.json(
        {
          error: "Only organisers can access payout settings",
        },
        {
          status: 403,
        }
      );
    }

    /*
     * Read the payout account directly from the database.
     *
     * This is the single source of truth.
     */
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        paystackSubaccountCode: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const connected =
      typeof user.paystackSubaccountCode === "string" &&
      user.paystackSubaccountCode.trim().length > 0;

    /*
     * Only load banks when the organiser still needs
     * to configure payouts.
     */
    const banks = connected
      ? []
      : await listBanks({
          country: "nigeria",
          perPage: 100,
        });

    return NextResponse.json({
      connected,

      /*
       * Return the same value under both names so older
       * frontend code remains compatible.
       */
      paystackSubaccountCode:
        user.paystackSubaccountCode ?? null,

      subaccountCode:
        user.paystackSubaccountCode ?? null,

      banks,

      /*
       * Useful for debugging without exposing bank details.
       */
      payoutConfigured: connected,
    });
  } catch (error) {
    console.error("Payout GET error:", error);

    return NextResponse.json(
      {
        error: getErrorMessage(error),
      },
      {
        status: 500,
      }
    );
  }
}

/* ============================================================
   POST — CONNECT PAYOUT ACCOUNT
============================================================ */

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (session.user.role !== "ORGANISER") {
      return NextResponse.json(
        {
          error: "Only organisers can connect payout accounts",
        },
        {
          status: 403,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        paystackSubaccountCode: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * If the account is already connected, return success.
     *
     * Do NOT attempt to create another Paystack subaccount.
     */
    if (
      typeof user.paystackSubaccountCode === "string" &&
      user.paystackSubaccountCode.trim().length > 0
    ) {
      return NextResponse.json({
        success: true,
        connected: true,
        alreadyConnected: true,
        paystackSubaccountCode:
          user.paystackSubaccountCode,
        subaccountCode:
          user.paystackSubaccountCode,
      });
    }

    const body = await request.json();

    const bankCode = String(
      body.bankCode ?? ""
    ).trim();

    const accountNumber = String(
      body.accountNumber ?? ""
    ).trim();

    const businessName = String(
      body.businessName ?? user.name
    ).trim();

    const verificationToken = String(
      body.verificationToken ?? ""
    ).trim();

    if (!bankCode) {
      return NextResponse.json(
        {
          error: "Bank is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!/^\d{10}$/.test(accountNumber)) {
      return NextResponse.json(
        {
          error: "Account number must be 10 digits",
        },
        {
          status: 400,
        }
      );
    }

    if (!verificationToken) {
      return NextResponse.json(
        {
          error:
            "Please verify your bank account before connecting it.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Validate the signed verification token.
     */
    const verified =
      verifyPayoutVerificationToken(
        verificationToken
      );

    if (!verified) {
      return NextResponse.json(
        {
          error:
            "Bank verification has expired or is invalid. Please verify the account again.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * The verification must belong to this organiser.
     */
    if (verified.userId !== user.id) {
      return NextResponse.json(
        {
          error: "Invalid bank verification.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * The submitted details must exactly match
     * the verified details.
     */
    if (
      verified.bankCode !== bankCode ||
      verified.accountNumber !== accountNumber
    ) {
      return NextResponse.json(
        {
          error:
            "The bank details have changed. Please verify the account again.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Create the Paystack subaccount.
     *
     * No bank resolve happens here.
     */
    const subaccount = await createSubaccount({
      businessName:
        businessName || verified.accountName,

      bankCode:
        verified.bankCode,

      accountNumber:
        verified.accountNumber,

      percentageCharge: 0,

      description:
        `Tickety payout account for ${verified.accountName}`,

      primaryContactName:
        user.name,

      primaryContactEmail:
        user.email,
    });

    if (
      !subaccount?.subaccount_code ||
      typeof subaccount.subaccount_code !== "string"
    ) {
      throw new Error(
        "Paystack did not return a valid subaccount code."
      );
    }

    /*
     * Persist the Paystack subaccount against the
     * currently authenticated organiser.
     */
    const updatedUser =
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          paystackSubaccountCode:
            subaccount.subaccount_code,
        },
        select: {
          paystackSubaccountCode: true,
        },
      });

    /*
     * Confirm that the database write actually happened.
     */
    const connected =
      typeof updatedUser.paystackSubaccountCode ===
        "string" &&
      updatedUser.paystackSubaccountCode.trim().length > 0;

    if (!connected) {
      throw new Error(
        "Payout account was created but could not be saved."
      );
    }

    return NextResponse.json({
      success: true,
      connected: true,
      alreadyConnected: false,

      accountName:
        verified.accountName,

      subaccountCode:
        updatedUser.paystackSubaccountCode,

      paystackSubaccountCode:
        updatedUser.paystackSubaccountCode,
    });
  } catch (error) {
    console.error("Payout POST error:", error);

    return NextResponse.json(
      {
        error: getErrorMessage(error),
      },
      {
        status: 500,
      }
    );
  }
}