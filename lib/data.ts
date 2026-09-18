import { prisma } from "@/lib/db";
import {
  EventItem,
  EventCategory,
  Attendee,
  Transaction,
  AdminEventSummary,
  CustomQuestion,
} from "@/lib/types";
import { Prisma } from "@prisma/client";
import { LISTING_FEE_NAIRA } from "@/lib/constants";

const eventInclude = {
  organiser: true,
  ticketTypes: true,
  customQuestions: true,
} satisfies Prisma.EventInclude;

type EventWithRelations = Prisma.EventGetPayload<{
  include: typeof eventInclude;
}>;

const COVER_GRADIENTS = [
  "from-plum-700 via-plum-600 to-leaf-600",
  "from-plum-800 via-plum-700 to-plum-500",
  "from-leaf-700 via-leaf-600 to-plum-600",
  "from-plum-600 via-leaf-600 to-leaf-500",
  "from-plum-500 via-plum-700 to-plum-900",
  "from-leaf-600 via-plum-600 to-plum-800",
];

function randomCoverGradient(): string {
  return COVER_GRADIENTS[
    Math.floor(Math.random() * COVER_GRADIENTS.length)
  ];
}

function formatCustomAnswers(
  customAnswers: Prisma.JsonValue | null,
  questions: { id: string; label: string }[]
): string {
  if (!customAnswers || typeof customAnswers !== "object") {
    return "";
  }

  const answers = customAnswers as Record<string, string>;

  return questions
    .map((q) =>
      answers[q.id] ? `${q.label}: ${answers[q.id]}` : null
    )
    .filter(Boolean)
    .join("; ");
}

function mapEvent(event: EventWithRelations): EventItem {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    state: event.state,
    venue: event.venue,
    date: event.date.toISOString().slice(0, 10),
    startTime: event.startTime,
    category: event.category as EventCategory,
    organiserName: event.organiser.name,
    organiserId: event.organiserId,
    featured: event.featured,
    trending: event.trending,
    coverGradient: event.coverGradient,
    coverImageUrl: event.coverImageUrl ?? undefined,
    tags: event.tags,
    refundPolicy: event.refundPolicy ?? undefined,
    minAge: event.minAge ?? undefined,

    ticketTypes: event.ticketTypes.map((t) => ({
      id: t.id,
      name: t.name,
      price: t.price,
      quantityTotal: t.quantityTotal,
      quantitySold: t.quantitySold,
    })),

    customQuestions: event.customQuestions.map(
      (q): CustomQuestion => ({
        id: q.id,
        label: q.label,
        type: q.type === "select" ? "select" : "text",
        options: q.options,
        required: q.required,
      })
    ),
  };
}

function mapAttendee(
  a: Prisma.AttendeeGetPayload<{
    include: { ticketType: true };
  }>,
  customQuestions: { id: string; label: string }[] = []
): Attendee {
  return {
    id: a.id,
    name: a.name,
    email: a.email,
    phone: a.phone,
    ticketType: a.ticketType.name,
    ticketId: a.ticketId,
    amountPaid: a.amountPaid,
    purchaseDate: a.purchaseDate.toISOString().slice(0, 10),
    paymentStatus: a.paymentStatus,
    checkInStatus: a.checkInStatus,
    checkInTime: a.checkInTime?.toISOString(),
    ticketStatus: a.ticketStatus,
    answers: formatCustomAnswers(
      a.customAnswers,
      customQuestions
    ),
  };
}

/* ===============================================================
   PUBLIC EVENTS
=============================================================== */

export async function getEvents(): Promise<EventItem[]> {
  const events = await prisma.event.findMany({
    where: {
      status: "live",
    },
    include: eventInclude,
    orderBy: {
      date: "asc",
    },
  });

  return events.map(mapEvent);
}

export async function getMostBookedEvents(
  limit = 3
): Promise<EventItem[]> {
  const events = await prisma.event.findMany({
    where: {
      status: "live",
    },
    include: eventInclude,
  });

  const ranked = events
    .map((event) => ({
      event,
      sold: event.ticketTypes.reduce(
        (sum, ticket) => sum + ticket.quantitySold,
        0
      ),
    }))
    .sort((a, b) => b.sold - a.sold);

  return ranked
    .slice(0, limit)
    .map((item) => mapEvent(item.event));
}

export async function getEventBySlug(
  slug: string
): Promise<EventItem | null> {
  const event = await prisma.event.findUnique({
    where: {
      slug,
    },
    include: eventInclude,
  });

  return event ? mapEvent(event) : null;
}

export async function getEventById(
  id: string
): Promise<EventItem | null> {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: eventInclude,
  });

  return event ? mapEvent(event) : null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  const events = await prisma.event.findMany({
    where: {
      status: "live",
    },
    select: {
      slug: true,
    },
  });

  return events.map((event) => event.slug);
}

/* ===============================================================
   ATTENDEES
=============================================================== */

export async function getAttendeesForEventSlug(
  slug: string
): Promise<Attendee[]> {
  const event = await prisma.event.findUnique({
    where: {
      slug,
    },
    include: {
      customQuestions: true,
    },
  });

  if (!event) {
    return [];
  }

  const attendees = await prisma.attendee.findMany({
    where: {
      eventId: event.id,
    },
    include: {
      ticketType: true,
    },
    orderBy: {
      purchaseDate: "desc",
    },
  });

  return attendees.map((attendee) =>
    mapAttendee(attendee, event.customQuestions)
  );
}

export async function getAttendeesForEventId(
  eventId: string
): Promise<Attendee[]> {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      customQuestions: true,
    },
  });

  if (!event) {
    return [];
  }

  const attendees = await prisma.attendee.findMany({
    where: {
      eventId,
    },
    include: {
      ticketType: true,
    },
    orderBy: {
      purchaseDate: "desc",
    },
  });

  return attendees.map((attendee) =>
    mapAttendee(attendee, event.customQuestions)
  );
}

/* ===============================================================
   TRANSACTIONS
=============================================================== */

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await prisma.transaction.findMany({
    include: {
      attendee: {
        include: {
          event: {
            include: {
              organiser: true,
            },
          },
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions.map((transaction) => ({
    id: transaction.id,
    eventTitle: transaction.attendee.event.title,
    organiserName: transaction.attendee.event.organiser.name,
    amount: transaction.amount,
    platformFee: transaction.platformFee,
    date: transaction.date.toISOString().slice(0, 10),
    status: transaction.status,
  }));
}

/* ===============================================================
   ADMIN EVENTS
=============================================================== */

export async function getAdminEvents(): Promise<
  AdminEventSummary[]
> {
  const events = await prisma.event.findMany({
    include: {
      organiser: true,
      attendees: true,
    },
  });

  return events.map((event) => {
    const paidAttendees = event.attendees.filter(
      (attendee) => attendee.paymentStatus === "paid"
    );

    return {
      id: event.id,
      title: event.title,
      organiserName: event.organiser.name,
      status: event.status,
      ticketsSold: event.attendees.length,
      gross: paidAttendees.reduce(
        (sum, attendee) => sum + attendee.amountPaid,
        0
      ),
    };
  });
}

/* ===============================================================
   ORGANISER EVENTS
=============================================================== */

export async function getEventsByOrganiserId(
  organiserId: string
): Promise<AdminEventSummary[]> {
  const events = await prisma.event.findMany({
    where: {
      organiserId,
    },
    include: {
      organiser: true,
      attendees: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return events.map((event) => {
    const paidAttendees = event.attendees.filter(
      (attendee) => attendee.paymentStatus === "paid"
    );

    return {
      id: event.id,
      title: event.title,
      organiserName: event.organiser.name,
      status: event.status,
      ticketsSold: event.attendees.length,
      gross: paidAttendees.reduce(
        (sum, attendee) => sum + attendee.amountPaid,
        0
      ),
    };
  });
}

/* ===============================================================
   ORGANISER SUMMARY
=============================================================== */

export interface OrganiserSummary {
  id: string;
  name: string;
  email: string;
  eventCount: number;
}

export async function getOrganisersSummary(): Promise<
  OrganiserSummary[]
> {
  const organisers = await prisma.user.findMany({
    where: {
      role: "ORGANISER",
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return organisers.map((organiser) => ({
    id: organiser.id,
    name: organiser.name,
    email: organiser.email,
    eventCount: organiser._count.events,
  }));
}

/* ===============================================================
   EVENT STATUS
=============================================================== */

export async function setEventStatus(
  eventId: string,
  status: "live" | "pending" | "disabled"
): Promise<void> {
  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      status,
    },
  });
}

/* ===============================================================
   CREATE EVENT
=============================================================== */

interface CreateEventInput {
  title: string;
  slug: string;
  description: string;
  state: string;
  venue: string;
  date: string;
  startTime: string;
  category: string;
  organiserId: string;
  status?: "live" | "pending" | "disabled";
  coverGradient?: string;
  coverImageUrl?: string;
  tags?: string[];
  refundPolicy?: string;
  minAge?: number;
  ticketTypes: {
    name: string;
    price: number;
    quantityTotal: number;
  }[];
  customQuestions: {
    label: string;
    required?: boolean;
  }[];
}

export async function createEvent(
  input: CreateEventInput
): Promise<EventItem> {
  const event = await prisma.event.create({
    data: {
      title: input.title,
      slug: input.slug,
      description: input.description,
      state: input.state,
      venue: input.venue,
      date: new Date(input.date),
      startTime: input.startTime,
      category: input.category,
      organiserId: input.organiserId,
      status: input.status ?? "live",
      coverGradient:
        input.coverGradient ?? randomCoverGradient(),
      coverImageUrl: input.coverImageUrl,
      tags: input.tags ?? [],
      refundPolicy: input.refundPolicy,
      minAge: input.minAge,

      ticketTypes: {
        create: input.ticketTypes.map((ticket) => ({
          name: ticket.name,
          price: ticket.price,
          quantityTotal: ticket.quantityTotal,
        })),
      },

      customQuestions: {
        create: input.customQuestions.map((question) => ({
          label: question.label,
          required: question.required ?? false,
        })),
      },
    },

    include: eventInclude,
  });

  return mapEvent(event);
}

/* ===============================================================
   LISTING FEE
=============================================================== */

/**
 * Called once Paystack confirms a free event's listing fee
 * was actually paid.
 *
 * This can safely be called more than once for the same event.
 */
export async function markListingFeePaid(
  eventId: string,
  paystackRef: string
): Promise<void> {
  await prisma.listingFeePayment.upsert({
    where: {
      eventId,
    },

    update: {
      status: "paid",
      paidAt: new Date(),
      paystackRef,
    },

    create: {
      eventId,
      amount: LISTING_FEE_NAIRA,
      paystackRef,
      status: "paid",
      paidAt: new Date(),
    },
  });

  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      status: "live",
    },
  });
}

/* ===============================================================
   ORGANISER CONTACTS
=============================================================== */

export interface ContactRow {
  id: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  ticketType: string;
  amountPaid: number;
  purchaseDate: string;
  paymentStatus: string;
  answers: string;
}

export async function getContactsForOrganiser(
  organiserId: string
): Promise<ContactRow[]> {
  const attendees = await prisma.attendee.findMany({
    where: {
      event: {
        organiserId,
      },
    },

    include: {
      ticketType: true,
      event: {
        include: {
          customQuestions: true,
        },
      },
    },

    orderBy: {
      purchaseDate: "desc",
    },
  });

  return attendees.map((attendee) => ({
    id: attendee.id,
    eventTitle: attendee.event.title,
    name: attendee.name,
    email: attendee.email,
    phone: attendee.phone,
    ticketType: attendee.ticketType.name,
    amountPaid: attendee.amountPaid,
    purchaseDate: attendee.purchaseDate
      .toISOString()
      .slice(0, 10),
    paymentStatus: attendee.paymentStatus,
    answers: formatCustomAnswers(
      attendee.customAnswers,
      attendee.event.customQuestions
    ),
  }));
}

export interface AdminContactRow extends ContactRow {
  organiserName: string;
}

export async function getAllContactsAdmin(): Promise<
  AdminContactRow[]
> {
  const attendees = await prisma.attendee.findMany({
    include: {
      ticketType: true,
      event: {
        include: {
          customQuestions: true,
          organiser: true,
        },
      },
    },

    orderBy: {
      purchaseDate: "desc",
    },
  });

  return attendees.map((attendee) => ({
    id: attendee.id,
    eventTitle: attendee.event.title,
    organiserName: attendee.event.organiser.name,
    name: attendee.name,
    email: attendee.email,
    phone: attendee.phone,
    ticketType: attendee.ticketType.name,
    amountPaid: attendee.amountPaid,
    purchaseDate: attendee.purchaseDate
      .toISOString()
      .slice(0, 10),
    paymentStatus: attendee.paymentStatus,
    answers: formatCustomAnswers(
      attendee.customAnswers,
      attendee.event.customQuestions
    ),
  }));
}

/* ===============================================================
   UPDATE EVENT
=============================================================== */

export interface UpdateEventInput {
  title: string;
  description: string;
  state: string;
  venue: string;
  date: string;
  startTime: string;
  category: string;
  coverImageUrl?: string;
  tags?: string[];
  refundPolicy?: string;
  minAge?: number;

  ticketTypes: {
    id?: string;
    name: string;
    price: number;
    quantityTotal: number;
  }[];

  customQuestions: {
    id?: string;
    label: string;
    required?: boolean;
  }[];
}

export async function updateEvent(
  eventId: string,
  organiserId: string,
  input: UpdateEventInput
): Promise<EventItem> {
  /*
   * Always verify ownership first.
   *
   * This prevents an organiser from editing another organiser's
   * event simply by changing the event ID sent by the browser.
   */
  const existing = await prisma.event.findFirst({
    where: {
      id: eventId,
      organiserId,
    },

    include: {
      ticketTypes: true,
      customQuestions: true,
    },
  });

  if (!existing) {
    throw new Error("Event not found");
  }

  /*
   * -------------------------------------------------------------
   * VALIDATE TICKET TYPES
   * -------------------------------------------------------------
   *
   * Ticket types with existing sales cannot be removed because
   * attendees reference their ticketType IDs.
   */

  const existingTicketIds = new Set(
    existing.ticketTypes.map((ticket) => ticket.id)
  );

  const incomingTicketIds = new Set(
    input.ticketTypes
      .map((ticket) => ticket.id)
      .filter((id): id is string => Boolean(id))
  );

  const soldTicketsBeingRemoved = existing.ticketTypes.some(
    (ticket) =>
      ticket.quantitySold > 0 &&
      !incomingTicketIds.has(ticket.id)
  );

  if (soldTicketsBeingRemoved) {
    throw new Error(
      "A ticket type with tickets already sold cannot be removed."
    );
  }

  /*
   * Quantity cannot be reduced below the amount already sold.
   */

  for (const ticket of input.ticketTypes) {
    if (!ticket.id) {
      continue;
    }

    const existingTicket = existing.ticketTypes.find(
      (item) => item.id === ticket.id
    );

    if (
      existingTicket &&
      ticket.quantityTotal < existingTicket.quantitySold
    ) {
      throw new Error(
        `${existingTicket.name} cannot have its quantity reduced below ${existingTicket.quantitySold} tickets sold.`
      );
    }
  }

  /*
   * -------------------------------------------------------------
   * VALIDATE CUSTOM QUESTIONS
   * -------------------------------------------------------------
   */

  const existingQuestionIds = new Set(
    existing.customQuestions.map(
      (question) => question.id
    )
  );

  const incomingQuestionIds = new Set(
    input.customQuestions
      .map((question) => question.id)
      .filter((id): id is string => Boolean(id))
  );

  /*
   * -------------------------------------------------------------
   * UPDATE EVERYTHING IN ONE TRANSACTION
   * -------------------------------------------------------------
   */

  const result = await prisma.$transaction(async (tx) => {
    /*
     * Update the main event.
     *
     * We deliberately do not change the slug here.
     * This keeps existing public URLs stable if the organiser
     * changes the event title.
     */

    const event = await tx.event.update({
      where: {
        id: eventId,
      },

      data: {
        title: input.title,
        description: input.description,
        state: input.state,
        venue: input.venue,
        date: new Date(input.date),
        startTime: input.startTime,
        category: input.category,
        coverImageUrl: input.coverImageUrl || null,
        tags: input.tags ?? [],
        refundPolicy: input.refundPolicy || null,
        minAge: input.minAge ?? null,
      },
    });

    /*
     * -----------------------------------------------------------
     * UPDATE / CREATE TICKET TYPES
     * -----------------------------------------------------------
     */

    for (const ticket of input.ticketTypes) {
      if (
        ticket.id &&
        existingTicketIds.has(ticket.id)
      ) {
        await tx.ticketType.update({
          where: {
            id: ticket.id,
          },

          data: {
            name: ticket.name,
            price: ticket.price,
            quantityTotal: ticket.quantityTotal,
          },
        });
      } else {
        await tx.ticketType.create({
          data: {
            name: ticket.name,
            price: ticket.price,
            quantityTotal: ticket.quantityTotal,
            eventId,
          },
        });
      }
    }

    /*
     * -----------------------------------------------------------
     * DELETE UNUSED TICKET TYPES
     * -----------------------------------------------------------
     *
     * Only ticket types with zero sales can be removed.
     */

    for (const existingTicket of existing.ticketTypes) {
      if (
        !incomingTicketIds.has(existingTicket.id) &&
        existingTicket.quantitySold === 0
      ) {
        await tx.ticketType.delete({
          where: {
            id: existingTicket.id,
          },
        });
      }
    }

    /*
     * -----------------------------------------------------------
     * UPDATE / CREATE CUSTOM QUESTIONS
     * -----------------------------------------------------------
     */

    for (const question of input.customQuestions) {
      if (
        question.id &&
        existingQuestionIds.has(question.id)
      ) {
        await tx.customQuestion.update({
          where: {
            id: question.id,
          },

          data: {
            label: question.label,
            required: question.required ?? false,
          },
        });
      } else {
        await tx.customQuestion.create({
          data: {
            label: question.label,
            required: question.required ?? false,
            eventId,
          },
        });
      }
    }

    /*
     * -----------------------------------------------------------
     * DELETE UNUSED QUESTIONS
     * -----------------------------------------------------------
     *
     * Existing attendee answers reference question IDs.
     *
     * If attendees already exist, we preserve old questions so
     * their historical answers remain meaningful.
     */

    const attendeeCount = await tx.attendee.count({
      where: {
        eventId,
      },
    });

    if (attendeeCount === 0) {
      for (const existingQuestion of existing.customQuestions) {
        if (
          !incomingQuestionIds.has(existingQuestion.id)
        ) {
          await tx.customQuestion.delete({
            where: {
              id: existingQuestion.id,
            },
          });
        }
      }
    }

    return event;
  });

  /*
   * -------------------------------------------------------------
   * RELOAD COMPLETE EVENT
   * -------------------------------------------------------------
   *
   * The transaction above only returns the Event itself.
   * Reload it with all relations so mapEvent() receives the same
   * structure as every other event query.
   */

  const fullEvent = await prisma.event.findUnique({
    where: {
      id: result.id,
    },

    include: eventInclude,
  });

  if (!fullEvent) {
    throw new Error("Updated event could not be loaded.");
  }

  return mapEvent(fullEvent);
}

/* ===============================================================
   DELETE EVENT
=============================================================== */

export async function deleteEvent(
  eventId: string,
  organiserId: string
): Promise<void> {
  /*
   * Verify that the event belongs to this organiser.
   */

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      organiserId,
    },

    select: {
      id: true,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  /*
   * Do not allow deletion here if attendees exist.
   *
   * The API route also performs this check, but keeping the
   * protection in the data layer means the rule cannot be
   * bypassed by another server-side caller.
   */

  const attendeeCount = await prisma.attendee.count({
    where: {
      eventId,
    },
  });

  if (attendeeCount > 0) {
    throw new Error(
      "This event cannot be deleted because tickets have already been issued. Disable the event instead."
    );
  }

  /*
   * With no attendees, Prisma can safely cascade-delete the
   * event's ticket types, custom questions and listing fee record
   * according to the relations in the Prisma schema.
   */

  await prisma.event.delete({
    where: {
      id: event.id,
    },
  });
}