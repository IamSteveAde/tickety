import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { initializeTransaction } from "@/lib/paystack";
import { completeFreeTicketOrder } from "@/lib/ticket-orders";
import {
  TICKET_SERVICE_FEE_NAIRA,
  TICKET_COMMISSION_PERCENT,
} from "@/lib/constants";

type CheckoutTicket = {
  ticketTypeId: string;
  quantity: number;
};

type CheckoutQuestionAnswer = {
  questionId: string;
  answer: string;
};

type CheckoutBody = {
  eventId?: string;
  tickets?: CheckoutTicket[];
  name?: string;
  email?: string;
  phone?: string;
  customAnswers?: CheckoutQuestionAnswer[];
};

const ORDER_EXPIRY_MINUTES = 15;

function getEventEndDate(event: {
  date: Date;
  endTime: string;
}): Date {
  const [hours, minutes] = event.endTime.split(":").map(Number);

  const endDate = new Date(event.date);
  endDate.setHours(hours, minutes, 0, 0);

  return endDate;
}

function hasEventEnded(event: {
  date: Date;
  endTime: string;
}): boolean {
  return getEventEndDate(event) <= new Date();
}

function createOrderReference(): string {
  return `ORD-${Date.now()}-${crypto
    .randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeEmail(value: unknown): string {
  return normalizeString(value).toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isValidQuantity(quantity: unknown): quantity is number {
  return (
    typeof quantity === "number" &&
    Number.isInteger(quantity) &&
    quantity > 0 &&
    quantity <= 20
  );
}

function isValidTickets(
  tickets: unknown
): tickets is CheckoutTicket[] {
  if (!Array.isArray(tickets) || tickets.length === 0) {
    return false;
  }

  return tickets.every((ticket) => {
    if (!ticket || typeof ticket !== "object") {
      return false;
    }

    const item = ticket as CheckoutTicket;

    return (
      typeof item.ticketTypeId === "string" &&
      item.ticketTypeId.trim().length > 0 &&
      isValidQuantity(item.quantity)
    );
  });
}

function isValidCustomAnswers(
  answers: unknown
): answers is CheckoutQuestionAnswer[] {
  if (answers === undefined) {
    return true;
  }

  if (!Array.isArray(answers)) {
    return false;
  }

  return answers.every((answer) => {
    if (!answer || typeof answer !== "object") {
      return false;
    }

    const item = answer as CheckoutQuestionAnswer;

    return (
      typeof item.questionId === "string" &&
      item.questionId.trim().length > 0 &&
      typeof item.answer === "string"
    );
  });
}

export async function POST(request: NextRequest) {
  let body: CheckoutBody;

  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request body.",
      },
      {
        status: 400,
      }
    );
  }

  const eventId = normalizeString(body.eventId);
  const name = normalizeString(body.name);
  const email = normalizeEmail(body.email);
  const phone = normalizeString(body.phone);
  const tickets = body.tickets;
  const customAnswers = body.customAnswers ?? [];

  /*
   * ---------------------------------------------------------------
   * BASIC VALIDATION
   * ---------------------------------------------------------------
   */

  if (!eventId) {
    return NextResponse.json(
      {
        error: "Event is required.",
      },
      {
        status: 400,
      }
    );
  }

  if (!name || name.length < 2) {
    return NextResponse.json(
      {
        error: "Please enter your full name.",
      },
      {
        status: 400,
      }
    );
  }

  if (name.length > 120) {
    return NextResponse.json(
      {
        error: "Name is too long.",
      },
      {
        status: 400,
      }
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      {
        error: "Please enter a valid email address.",
      },
      {
        status: 400,
      }
    );
  }

  if (email.length > 254) {
    return NextResponse.json(
      {
        error: "Email address is too long.",
      },
      {
        status: 400,
      }
    );
  }

  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json(
      {
        error: "Please enter a valid phone number.",
      },
      {
        status: 400,
      }
    );
  }

  if (!isValidTickets(tickets)) {
    return NextResponse.json(
      {
        error: "Please select at least one valid ticket.",
      },
      {
        status: 400,
      }
    );
  }

  if (!isValidCustomAnswers(customAnswers)) {
    return NextResponse.json(
      {
        error: "Invalid custom question answers.",
      },
      {
        status: 400,
      }
    );
  }

  /*
   * ---------------------------------------------------------------
   * NORMALIZE TICKET SELECTION
   *
   * If the frontend accidentally sends the same ticket type twice,
   * combine it into one item before processing.
   * ---------------------------------------------------------------
   */

  const ticketMap = new Map<string, number>();

  for (const ticket of tickets) {
    const ticketTypeId = ticket.ticketTypeId.trim();

    ticketMap.set(
      ticketTypeId,
      (ticketMap.get(ticketTypeId) ?? 0) + ticket.quantity
    );
  }

  const normalizedTickets = Array.from(ticketMap.entries()).map(
    ([ticketTypeId, quantity]) => ({
      ticketTypeId,
      quantity,
    })
  );

  for (const ticket of normalizedTickets) {
    if (ticket.quantity > 20) {
      return NextResponse.json(
        {
          error:
            "You can purchase a maximum of 20 tickets of each ticket type per order.",
        },
        {
          status: 400,
        }
      );
    }
  }

  /*
   * ---------------------------------------------------------------
   * LOAD EVENT
   * ---------------------------------------------------------------
   */

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      ticketTypes: true,
      customQuestions: true,
      organiser: {
        select: {
          paystackSubaccountCode: true,
        },
      },
    },
  });

  if (!event) {
    return NextResponse.json(
      {
        error: "Event not found.",
      },
      {
        status: 404,
      }
    );
  }

  if (event.status !== "live" || hasEventEnded(event)) {
    return NextResponse.json(
      {
        error: "This event is no longer available for ticket purchases.",
      },
      {
        status: 400,
      }
    );
  }

  /*
   * ---------------------------------------------------------------
   * VALIDATE CUSTOM QUESTIONS
   * ---------------------------------------------------------------
   */

  const suppliedAnswers = new Map<string, string>();

  for (const answer of customAnswers) {
    suppliedAnswers.set(
      answer.questionId.trim(),
      answer.answer.trim()
    );
  }

  for (const question of event.customQuestions) {
    if (!question.required) {
      continue;
    }

    const answer = suppliedAnswers.get(question.id);

    if (!answer) {
      return NextResponse.json(
        {
          error: `Please answer: ${question.label}`,
          questionId: question.id,
        },
        {
          status: 400,
        }
      );
    }

    if (
      question.type === "select" &&
      question.options.length > 0 &&
      !question.options.includes(answer)
    ) {
      return NextResponse.json(
        {
          error: `Please select a valid answer for: ${question.label}`,
          questionId: question.id,
        },
        {
          status: 400,
        }
      );
    }
  }

  /*
   * ---------------------------------------------------------------
   * VALIDATE THAT ANSWERS BELONG TO THIS EVENT
   * ---------------------------------------------------------------
   */

  for (const answer of customAnswers) {
    const question = event.customQuestions.find(
      (question) => question.id === answer.questionId
    );

    if (!question) {
      return NextResponse.json(
        {
          error:
            "One or more custom question answers are invalid.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      question.type === "select" &&
      question.options.length > 0 &&
      answer.answer.trim() &&
      !question.options.includes(answer.answer.trim())
    ) {
      return NextResponse.json(
        {
          error: `Invalid answer for: ${question.label}`,
          questionId: question.id,
        },
        {
          status: 400,
        }
      );
    }
  }

  /*
   * ---------------------------------------------------------------
   * FIND SELECTED TICKET TYPES
   * ---------------------------------------------------------------
   */

  const selectedTicketTypeIds = normalizedTickets.map(
    (ticket) => ticket.ticketTypeId
  );

  const selectedTicketTypes = event.ticketTypes.filter((ticket) =>
    selectedTicketTypeIds.includes(ticket.id)
  );

  if (
    selectedTicketTypes.length !==
    selectedTicketTypeIds.length
  ) {
    return NextResponse.json(
      {
        error: "One or more selected tickets are invalid.",
      },
      {
        status: 400,
      }
    );
  }

  /*
   * ---------------------------------------------------------------
   * CALCULATE TICKET AMOUNT FROM DATABASE
   *
   * Never trust a total supplied by the browser.
   * ---------------------------------------------------------------
   */

  let ticketAmount = 0;

  const orderItems = normalizedTickets.map((selection) => {
    const ticketType = selectedTicketTypes.find(
      (ticket) => ticket.id === selection.ticketTypeId
    );

    if (!ticketType) {
      throw new Error(
        "Selected ticket type could not be found."
      );
    }

    ticketAmount +=
      ticketType.price * selection.quantity;

    return {
      ticketTypeId: ticketType.id,
      quantity: selection.quantity,
      unitPrice: ticketType.price,
    };
  });

  /*
   * ---------------------------------------------------------------
   * PAYMENT BREAKDOWN
   *
   * Customer pays:
   *   ticket amount + ₦1,200 service fee
   *
   * Organiser receives:
   *   90% of ticket amount
   *
   * Tickety keeps:
   *   10% commission + service fee
   *
   * The service fee is charged once per order.
   * ---------------------------------------------------------------
   */

  const serviceFee =
    ticketAmount > 0
      ? TICKET_SERVICE_FEE_NAIRA
      : 0;

  const commissionAmount =
    Math.round(
      (ticketAmount * TICKET_COMMISSION_PERCENT) / 100
    );

  const organiserAmount =
    ticketAmount - commissionAmount;

  const platformFee =
    commissionAmount + serviceFee;

  const totalAmount =
    ticketAmount + serviceFee;

  const reference = createOrderReference();

  /*
   * ---------------------------------------------------------------
   * FREE ORDER
   *
   * Free events do not need Paystack.
   *
   * We still create an Order so every ticket purchase follows the
   * same data model.
   *
   * After creating the order, completeFreeTicketOrder() issues the
   * actual attendee/ticket records.
   * ---------------------------------------------------------------
   */

  if (ticketAmount === 0) {
    try {
      const order = await prisma.$transaction(
        async (tx) => {
          const freshEvent =
            await tx.event.findUnique({
              where: {
                id: eventId,
              },
              include: {
                ticketTypes: true,
              },
            });

          if (
            !freshEvent ||
            freshEvent.status !== "live" ||
            hasEventEnded(freshEvent)
          ) {
            throw new Error("EVENT_UNAVAILABLE");
          }

          /*
           * Check inventory again using the fresh database state.
           */

          for (const item of orderItems) {
            const ticket =
              freshEvent.ticketTypes.find(
                (ticketType) =>
                  ticketType.id === item.ticketTypeId
              );

            if (!ticket) {
              throw new Error("INVALID_TICKET");
            }

            const available =
              ticket.quantityTotal -
              ticket.quantitySold -
              ticket.quantityReserved;

            if (item.quantity > available) {
              throw new Error(
                `SOLD_OUT:${ticket.name}:${available}`
              );
            }
          }

          /*
           * Create the free order.
           *
           * We mark it paid because no external payment is
           * required.
           */

          return tx.order.create({
            data: {
              reference,
              paystackRef: `FREE-${reference}`,

              name,
              email,
              phone,

              amount: 0,
              ticketAmount: 0,
              serviceFee: 0,
              organiserAmount: 0,
              commissionAmount: 0,
              platformFee: 0,

              status: "paid",

              customAnswers:
                customAnswers.length > 0
                  ? customAnswers
                  : undefined,

              paidAt: new Date(),

              eventId,

              items: {
                create: orderItems,
              },
            },
          });
        },
        {
          isolationLevel: "Serializable",
        }
      );

      /*
       * Issue the actual attendee tickets.
       *
       * This creates:
       * - Attendee records
       * - Ticket IDs
       * - Transaction records
       * - quantitySold updates
       */

      const completedOrder =
        await completeFreeTicketOrder(order.id);

      return NextResponse.json(
        {
          success: true,
          free: true,
          orderId: completedOrder.id,
          reference: completedOrder.reference,
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error(
        "Free ticket checkout failed:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "";

      if (message === "EVENT_UNAVAILABLE") {
        return NextResponse.json(
          {
            error:
              "This event is no longer available for ticket purchases.",
          },
          {
            status: 400,
          }
        );
      }

      if (message === "INVALID_TICKET") {
        return NextResponse.json(
          {
            error:
              "One or more selected tickets are no longer available.",
          },
          {
            status: 400,
          }
        );
      }

      if (message.startsWith("SOLD_OUT:")) {
        const [, ticketName, available] =
          message.split(":");

        return NextResponse.json(
          {
            error:
              available === "0"
                ? `${ticketName} is sold out.`
                : `Only ${available} ${ticketName} ticket${
                    available === "1" ? "" : "s"
                  } remaining.`,
          },
          {
            status: 409,
          }
        );
      }

      return NextResponse.json(
        {
          error:
            "We couldn't complete your ticket purchase. Please try again.",
        },
        {
          status: 500,
        }
      );
    }
  }

  /*
   * ---------------------------------------------------------------
   * ORGANISER PAYOUT ACCOUNT
   *
   * Paid ticket sales must have an organiser Paystack subaccount
   * so the 90% organiser share is split automatically at payment.
   * ---------------------------------------------------------------
   */

  const organiserSubaccountCode =
    event.organiser.paystackSubaccountCode?.trim();

  if (!organiserSubaccountCode) {
    return NextResponse.json(
      {
        error:
          "This event is not ready to accept paid tickets. The organiser needs to connect a payout account first.",
      },
      {
        status: 409,
      }
    );
  }

  /*
   * ---------------------------------------------------------------
   * PAID CHECKOUT
   * ---------------------------------------------------------------
   */

  const expiresAt = new Date(
    Date.now() +
      ORDER_EXPIRY_MINUTES * 60 * 1000
  );

  try {
    /*
     * Reserve inventory and create the order in one transaction.
     */

    const order = await prisma.$transaction(
      async (tx) => {
        /*
         * First clean up expired reservations for the selected
         * ticket types.
         */

        const expiredOrders =
          await tx.order.findMany({
            where: {
              status: "pending",

              expiresAt: {
                lt: new Date(),
              },

              items: {
                some: {
                  ticketTypeId: {
                    in: selectedTicketTypeIds,
                  },
                },
              },
            },

            include: {
              items: true,
            },
          });

        for (const expiredOrder of expiredOrders) {
          await tx.order.updateMany({
            where: {
              id: expiredOrder.id,
              status: "pending",
            },

            data: {
              status: "failed",
            },
          });

          for (const item of expiredOrder.items) {
            await tx.ticketType.updateMany({
              where: {
                id: item.ticketTypeId,

                quantityReserved: {
                  gte: item.quantity,
                },
              },

              data: {
                quantityReserved: {
                  decrement: item.quantity,
                },
              },
            });
          }
        }

        /*
         * Re-read ticket types after releasing expired
         * reservations.
         */

        const freshTicketTypes =
          await tx.ticketType.findMany({
            where: {
              id: {
                in: selectedTicketTypeIds,
              },

              eventId,
            },
          });

        if (
          freshTicketTypes.length !==
          selectedTicketTypeIds.length
        ) {
          throw new Error("INVALID_TICKET");
        }

        /*
         * Check available inventory.
         */

        for (const item of orderItems) {
          const ticket =
            freshTicketTypes.find(
              (ticketType) =>
                ticketType.id === item.ticketTypeId
            );

          if (!ticket) {
            throw new Error("INVALID_TICKET");
          }

          const available =
            ticket.quantityTotal -
            ticket.quantitySold -
            ticket.quantityReserved;

          if (item.quantity > available) {
            throw new Error(
              `SOLD_OUT:${ticket.name}:${available}`
            );
          }
        }

        /*
         * Reserve the tickets.
         */

        for (const item of orderItems) {
          const ticket =
            freshTicketTypes.find(
              (ticketType) =>
                ticketType.id === item.ticketTypeId
            );

          if (!ticket) {
            throw new Error("INVALID_TICKET");
          }

          const available =
            ticket.quantityTotal -
            ticket.quantitySold -
            ticket.quantityReserved;

          /*
           * The conditional update prevents two simultaneous
           * checkouts from reserving the same final tickets.
           */

          const updated =
            await tx.ticketType.updateMany({
              where: {
                id: item.ticketTypeId,

                quantityReserved: {
                  lte:
                    ticket.quantityTotal -
                    ticket.quantitySold -
                    item.quantity,
                },
              },

              data: {
                quantityReserved: {
                  increment: item.quantity,
                },
              },
            });

          if (updated.count !== 1) {
            throw new Error(
              `SOLD_OUT:${ticket.name}:${available}`
            );
          }
        }

        /*
         * Create the pending order.
         */

        return tx.order.create({
          data: {
            reference,

            paystackRef: `PENDING-${reference}`,

            name,
            email,
            phone,

            /*
             * Full amount charged to the customer:
             *
             * ticket amount + service fee
             */
            amount: totalAmount,

            /*
             * Ticket amount before platform fees.
             */
            ticketAmount,

            /*
             * ₦1,200 service fee paid by the customer.
             */
            serviceFee,

            /*
             * 90% of ticket amount.
             */
            organiserAmount,

            /*
             * 10% of ticket amount.
             */
            commissionAmount,

            /*
             * Tickety's gross platform revenue:
             * commission + service fee.
             */
            platformFee,

            status: "pending",

            customAnswers:
              customAnswers.length > 0
                ? customAnswers
                : undefined,

            expiresAt,

            eventId,

            items: {
              create: orderItems,
            },
          },
        });
      },
      {
        isolationLevel: "Serializable",
      }
    );

    /*
     * -------------------------------------------------------------
     * INITIALIZE PAYSTACK
     * -------------------------------------------------------------
     */

    const origin = request.nextUrl.origin;

    let payment;

    try {
      payment = await initializeTransaction({
        email,

        /*
         * Customer pays:
         *
         * ticketAmount + serviceFee
         */
        amountKobo:
          totalAmount * 100,

        /*
         * This must point to the API callback route that
         * verifies the Paystack transaction and completes
         * the ticket order.
         */
        callbackUrl:
          `${origin}/api/payments/tickets/callback`,

        /*
         * ---------------------------------------------------------
         * PAYSTACK SPLIT
         * ---------------------------------------------------------
         *
         * Organiser receives exactly 90% of the ticket amount.
         *
         * Example:
         *
         * Ticket amount:       ₦50,000
         * Service fee:          ₦1,200
         * Customer pays:       ₦51,200
         *
         * Organiser share:     ₦45,000
         * Tickety remainder:    ₦6,200
         *
         * The remainder contains:
         * - ₦5,000 commission
         * - ₦1,200 service fee
         *
         * bearer_type "account" means the main Tickety account
         * bears Paystack's transaction processing fee.
         * ---------------------------------------------------------
         */

        split: {
          type: "flat",
          bearer_type: "account",

          subaccounts: [
            {
              subaccount:
                organiserSubaccountCode,

              /*
               * Paystack expects the share in kobo.
               */
              share:
                organiserAmount * 100,
            },
          ],
        },

        metadata: {
          paymentType: "TICKET_PURCHASE",
          orderId: order.id,
          orderReference: order.reference,
          eventId,
        },
      });
    } catch (paymentError) {
      /*
       * Paystack initialization failed after we reserved
       * tickets.
       *
       * Release the reservation and mark the order failed.
       */

      console.error(
        "Paystack initialization failed:",
        paymentError
      );

      await prisma.$transaction(
        async (tx) => {
          const failedOrder =
            await tx.order.findUnique({
              where: {
                id: order.id,
              },

              include: {
                items: true,
              },
            });

          if (!failedOrder) {
            return;
          }

          if (
            failedOrder.status !== "pending"
          ) {
            return;
          }

          await tx.order.update({
            where: {
              id: failedOrder.id,
            },

            data: {
              status: "failed",
            },
          });

          for (const item of failedOrder.items) {
            await tx.ticketType.updateMany({
              where: {
                id: item.ticketTypeId,

                quantityReserved: {
                  gte: item.quantity,
                },
              },

              data: {
                quantityReserved: {
                  decrement: item.quantity,
                },
              },
            });
          }
        }
      );

      return NextResponse.json(
        {
          error:
            "We couldn't start the payment. Please try again.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * -------------------------------------------------------------
     * SAVE REAL PAYSTACK REFERENCE
     * -------------------------------------------------------------
     */

    await prisma.order.update({
      where: {
        id: order.id,
      },

      data: {
        paystackRef: payment.reference,
      },
    });

    return NextResponse.json(
      {
        success: true,

        orderId: order.id,

        reference: order.reference,

        authorizationUrl:
          payment.authorization_url,

        expiresAt: order.expiresAt,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Ticket checkout failed:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "";

    if (message === "INVALID_TICKET") {
      return NextResponse.json(
        {
          error:
            "One or more selected tickets are no longer available.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.startsWith("SOLD_OUT:")) {
      const [, ticketName, available] =
        message.split(":");

      return NextResponse.json(
        {
          error:
            available === "0"
              ? `${ticketName} is sold out.`
              : `Only ${available} ${ticketName} ticket${
                  available === "1" ? "" : "s"
                } remaining.`,
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        error:
          "We couldn't start your checkout. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}