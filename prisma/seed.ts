import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { events, attendees, transactions, adminEvents } from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  await prisma.transaction.deleteMany();
  await prisma.attendee.deleteMany();
  await prisma.customQuestion.deleteMany();
  await prisma.ticketType.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Demo password for every seeded organiser account. Change these before
  // using this seed data anywhere but local development.
  const demoPasswordHash = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      name: "Tickety Admin",
      email: "admin@tickety.africa",
      passwordHash: await bcrypt.hash("admin12345", 10),
      role: "ADMIN",
    },
  });

  const organiserNames = Array.from(new Set(events.map((e) => e.organiserName)));
  const organisersByName = new Map<string, string>();

  for (const name of organiserNames) {
    const email = `${name.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@tickety.africa`;
    const organiser = await prisma.user.create({
      data: { name, email, passwordHash: demoPasswordHash, role: "ORGANISER" },
    });
    organisersByName.set(name, organiser.id);
  }

  // Track created ticket type ids by "eventSlug::ticketTypeName" so the mock
  // attendee records (which reference ticket types by name) can be linked up.
  const ticketTypeIdByKey = new Map<string, string>();

  for (const event of events) {
    const created = await prisma.event.create({
      data: {
        slug: event.slug,
        title: event.title,
        description: event.description,
        state: event.state,
        venue: event.venue,
        date: new Date(event.date),
        startTime: event.startTime,
        category: event.category,
        featured: event.featured,
        trending: event.trending,
        coverGradient: event.coverGradient,
        organiserId: organisersByName.get(event.organiserName)!,
        ticketTypes: {
          create: event.ticketTypes.map((t) => ({
            name: t.name,
            price: t.price,
            quantityTotal: t.quantityTotal,
            quantitySold: t.quantitySold,
          })),
        },
        customQuestions: {
          create: event.customQuestions.map((q) => ({
            label: q.label,
            type: q.type,
            options: q.options ?? [],
            required: q.required,
          })),
        },
      },
      include: { ticketTypes: true },
    });

    for (const t of created.ticketTypes) {
      ticketTypeIdByKey.set(`${event.slug}::${t.name}`, t.id);
    }

    const adminOverride = adminEvents.find((a) => a.title === event.title);
    if (adminOverride && adminOverride.status !== "live") {
      await prisma.event.update({
        where: { id: created.id },
        data: { status: adminOverride.status },
      });
    }
  }

  const demoEventSlug = "afrobeats-picnic-lagos";
  const createdAttendeeIds = new Map<string, string>();

  for (const attendee of attendees) {
    const ticketTypeId = ticketTypeIdByKey.get(`${demoEventSlug}::${attendee.ticketType}`);
    if (!ticketTypeId) continue;

    const created = await prisma.attendee.create({
      data: {
        name: attendee.name,
        email: attendee.email,
        phone: attendee.phone,
        ticketId: attendee.ticketId,
        amountPaid: attendee.amountPaid,
        purchaseDate: new Date(attendee.purchaseDate),
        paymentStatus: attendee.paymentStatus,
        checkInStatus: attendee.checkInStatus,
        checkInTime: attendee.checkInTime ? new Date(attendee.checkInTime) : null,
        ticketStatus: attendee.ticketStatus,
        eventId: (await prisma.event.findUniqueOrThrow({ where: { slug: demoEventSlug } })).id,
        ticketTypeId,
      },
    });
    createdAttendeeIds.set(attendee.ticketId, created.id);
  }

  for (const txn of transactions) {
    const candidate = attendees.find(
      (a) => a.amountPaid === txn.amount && createdAttendeeIds.has(a.ticketId)
    );
    if (!candidate) continue;

    await prisma.transaction.create({
      data: {
        amount: txn.amount,
        platformFee: txn.platformFee,
        status: txn.status,
        date: new Date(txn.date),
        attendeeId: createdAttendeeIds.get(candidate.ticketId)!,
      },
    });
  }

  console.log("Seed complete.");
  console.log("Log in with: admin@tickety.africa / admin12345 (admin)");
  console.log("Or any seeded organiser email / password123 (e.g. spotlite.events.co.@tickety.africa)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });