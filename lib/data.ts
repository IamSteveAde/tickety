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

type EventWithRelations = Prisma.EventGetPayload<{ include: typeof eventInclude }>;

const COVER_GRADIENTS = [
  "from-plum-700 via-plum-600 to-leaf-600",
  "from-plum-800 via-plum-700 to-plum-500",
  "from-leaf-700 via-leaf-600 to-plum-600",
  "from-plum-600 via-leaf-600 to-leaf-500",
  "from-plum-500 via-plum-700 to-plum-900",
  "from-leaf-600 via-plum-600 to-plum-800",
];

function randomCoverGradient(): string {
  return COVER_GRADIENTS[Math.floor(Math.random() * COVER_GRADIENTS.length)];
}

function formatCustomAnswers(
  customAnswers: Prisma.JsonValue | null,
  questions: { id: string; label: string }[]
): string {
  if (!customAnswers || typeof customAnswers !== "object") return "";
  const answers = customAnswers as Record<string, string>;
  return questions
    .map((q) => (answers[q.id] ? `${q.label}: ${answers[q.id]}` : null))
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
  a: Prisma.AttendeeGetPayload<{ include: { ticketType: true } }>,
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
    answers: formatCustomAnswers(a.customAnswers, customQuestions),
  };
}

// getEvents/getEventBySlug only return "live" events — a free event awaiting
// its listing fee sits at "pending" and stays invisible to the public until paid.
export async function getEvents(): Promise<EventItem[]> {
  const events = await prisma.event.findMany({
    where: { status: "live" },
    include: eventInclude,
    orderBy: { date: "asc" },
  });
  return events.map(mapEvent);
}

export async function getMostBookedEvents(limit = 3): Promise<EventItem[]> {
  const events = await prisma.event.findMany({
    where: { status: "live" },
    include: eventInclude,
  });

  const ranked = events
    .map((event) => ({
      event,
      sold: event.ticketTypes.reduce((sum, t) => sum + t.quantitySold, 0),
    }))
    .sort((a, b) => b.sold - a.sold);

  return ranked.slice(0, limit).map((r) => mapEvent(r.event));
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const event = await prisma.event.findUnique({
    where: { slug },
    include: eventInclude,
  });
  return event ? mapEvent(event) : null;
}

export async function getEventById(id: string): Promise<EventItem | null> {
  const event = await prisma.event.findUnique({
    where: { id },
    include: eventInclude,
  });
  return event ? mapEvent(event) : null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  const events = await prisma.event.findMany({ where: { status: "live" }, select: { slug: true } });
  return events.map((e) => e.slug);
}

export async function getAttendeesForEventSlug(slug: string): Promise<Attendee[]> {
  const event = await prisma.event.findUnique({ where: { slug }, include: { customQuestions: true } });
  if (!event) return [];

  const attendees = await prisma.attendee.findMany({
    where: { eventId: event.id },
    include: { ticketType: true },
    orderBy: { purchaseDate: "desc" },
  });
  return attendees.map((a) => mapAttendee(a, event.customQuestions));
}

export async function getAttendeesForEventId(eventId: string): Promise<Attendee[]> {
  const event = await prisma.event.findUnique({ where: { id: eventId }, include: { customQuestions: true } });
  if (!event) return [];

  const attendees = await prisma.attendee.findMany({
    where: { eventId },
    include: { ticketType: true },
    orderBy: { purchaseDate: "desc" },
  });
  return attendees.map((a) => mapAttendee(a, event.customQuestions));
}

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await prisma.transaction.findMany({
    include: { attendee: { include: { event: { include: { organiser: true } } } } },
    orderBy: { date: "desc" },
  });

  return transactions.map((t) => ({
    id: t.id,
    eventTitle: t.attendee.event.title,
    organiserName: t.attendee.event.organiser.name,
    amount: t.amount,
    platformFee: t.platformFee,
    date: t.date.toISOString().slice(0, 10),
    status: t.status,
  }));
}

export async function getAdminEvents(): Promise<AdminEventSummary[]> {
  const events = await prisma.event.findMany({
    include: { organiser: true, attendees: true },
  });

  return events.map((event) => {
    const paidAttendees = event.attendees.filter((a) => a.paymentStatus === "paid");
    return {
      id: event.id,
      title: event.title,
      organiserName: event.organiser.name,
      status: event.status,
      ticketsSold: event.attendees.length,
      gross: paidAttendees.reduce((sum, a) => sum + a.amountPaid, 0),
    };
  });
}

export async function getEventsByOrganiserId(organiserId: string): Promise<AdminEventSummary[]> {
  const events = await prisma.event.findMany({
    where: { organiserId },
    include: { organiser: true, attendees: true },
    orderBy: { date: "asc" },
  });

  return events.map((event) => {
    const paidAttendees = event.attendees.filter((a) => a.paymentStatus === "paid");
    return {
      id: event.id,
      title: event.title,
      organiserName: event.organiser.name,
      status: event.status,
      ticketsSold: event.attendees.length,
      gross: paidAttendees.reduce((sum, a) => sum + a.amountPaid, 0),
    };
  });
}

export interface OrganiserSummary {
  id: string;
  name: string;
  email: string;
  eventCount: number;
}

export async function getOrganisersSummary(): Promise<OrganiserSummary[]> {
  const organisers = await prisma.user.findMany({
    where: { role: "ORGANISER" },
    include: { _count: { select: { events: true } } },
    orderBy: { createdAt: "desc" },
  });

  return organisers.map((o) => ({
    id: o.id,
    name: o.name,
    email: o.email,
    eventCount: o._count.events,
  }));
}

export async function setEventStatus(
  eventId: string,
  status: "live" | "pending" | "disabled"
): Promise<void> {
  await prisma.event.update({ where: { id: eventId }, data: { status } });
}

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
  ticketTypes: { name: string; price: number; quantityTotal: number }[];
  customQuestions: { label: string; required?: boolean }[];
}

export async function createEvent(input: CreateEventInput): Promise<EventItem> {
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
      coverGradient: input.coverGradient ?? randomCoverGradient(),
      coverImageUrl: input.coverImageUrl,
      tags: input.tags ?? [],
      refundPolicy: input.refundPolicy,
      minAge: input.minAge,
      ticketTypes: {
        create: input.ticketTypes.map((t) => ({
          name: t.name,
          price: t.price,
          quantityTotal: t.quantityTotal,
        })),
      },
      customQuestions: {
        create: input.customQuestions.map((q) => ({
          label: q.label,
          required: q.required ?? false,
        })),
      },
    },
    include: eventInclude,
  });

  return mapEvent(event);
}

/**
 * Called once Paystack confirms a free event's listing fee was actually
 * paid — either from the browser callback right after checkout, or from
 * the server-to-server webhook. Safe to call more than once for the same
 * event (idempotent), since both paths can fire for the same payment.
 */
export async function markListingFeePaid(eventId: string, paystackRef: string): Promise<void> {
  await prisma.listingFeePayment.upsert({
    where: { eventId },
    update: { status: "paid", paidAt: new Date(), paystackRef },
    create: {
      eventId,
      amount: LISTING_FEE_NAIRA,
      paystackRef,
      status: "paid",
      paidAt: new Date(),
    },
  });
  await prisma.event.update({ where: { id: eventId }, data: { status: "live" } });
}

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

export async function getContactsForOrganiser(organiserId: string): Promise<ContactRow[]> {
  const attendees = await prisma.attendee.findMany({
    where: { event: { organiserId } },
    include: { ticketType: true, event: { include: { customQuestions: true } } },
    orderBy: { purchaseDate: "desc" },
  });

  return attendees.map((a) => ({
    id: a.id,
    eventTitle: a.event.title,
    name: a.name,
    email: a.email,
    phone: a.phone,
    ticketType: a.ticketType.name,
    amountPaid: a.amountPaid,
    purchaseDate: a.purchaseDate.toISOString().slice(0, 10),
    paymentStatus: a.paymentStatus,
    answers: formatCustomAnswers(a.customAnswers, a.event.customQuestions),
  }));
}

export interface AdminContactRow extends ContactRow {
  organiserName: string;
}

export async function getAllContactsAdmin(): Promise<AdminContactRow[]> {
  const attendees = await prisma.attendee.findMany({
    include: {
      ticketType: true,
      event: { include: { customQuestions: true, organiser: true } },
    },
    orderBy: { purchaseDate: "desc" },
  });

  return attendees.map((a) => ({
    id: a.id,
    eventTitle: a.event.title,
    organiserName: a.event.organiser.name,
    name: a.name,
    email: a.email,
    phone: a.phone,
    ticketType: a.ticketType.name,
    amountPaid: a.amountPaid,
    purchaseDate: a.purchaseDate.toISOString().slice(0, 10),
    paymentStatus: a.paymentStatus,
    answers: formatCustomAnswers(a.customAnswers, a.event.customQuestions),
  }));
}
