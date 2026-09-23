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

/**
 * GET
 *
 * Loads the available Nigerian banks and tells the frontend
 * whether the organiser already has a Paystack subaccount.
 */
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

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
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

    const banks = await listBanks({
      country: "nigeria",
      perPage: 100,
    });

    return NextResponse.json({
      connected: Boolean(user.paystackSubaccountCode),
      subaccountCode: user.paystackSubaccountCode,
      banks,
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

/**
 * POST
 *
 * Creates the Paystack subaccount.
 *
 * IMPORTANT:
 * We intentionally DO NOT call /bank/resolve here.
 *
 * The account was already verified by the verify endpoint.
 * The signed verification token proves:
 *
 * - which organiser verified it
 * - which bank was verified
 * - which account number was verified
 * - the verified account name
 * - that the verification has not expired
 */
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

    if (user.paystackSubaccountCode) {
      return NextResponse.json(
        {
          error: "A payout account is already connected",
        },
        {
          status: 400,
        }
      );
    }

    const body = await request.json();

    const bankCode = String(body.bankCode ?? "").trim();
    const accountNumber = String(body.accountNumber ?? "").trim();
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

    const verified =
      verifyPayoutVerificationToken(verificationToken);

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
     * Make sure the verification belongs to this organiser.
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
     * Make sure the details being submitted are exactly
     * the details that were verified.
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
     * NO bank resolve happens here.
     */
    const subaccount = await createSubaccount({
      businessName:
        businessName || verified.accountName,
      bankCode: verified.bankCode,
      accountNumber: verified.accountNumber,
      percentageCharge: 0,
      description: `Tickety payout account for ${verified.accountName}`,
      primaryContactName: user.name,
      primaryContactEmail: user.email,
    });

    /*
     * Save the Paystack subaccount code against the organiser.
     */
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        paystackSubaccountCode:
          subaccount.subaccount_code,
      },
    });

    return NextResponse.json({
      success: true,
      accountName: verified.accountName,
      subaccountCode: subaccount.subaccount_code,
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