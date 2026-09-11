# Tickety.africa

A Nigerian event-discovery and ticketing platform where the website sells the
event and WhatsApp sells the ticket. Discovery, event pages, organiser
dashboard, admin panel, and gate check-in are all wired to a real Postgres
database via Prisma.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · PostgreSQL · lucide-react

## Getting started

1. **Get a Postgres database.** Easiest options:
   - Local via Docker: `docker run --name tickety-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`
   - Or a free hosted instance: Supabase, Neon, or Railway all work.

2. **Set your connection string.**
   ```bash
   cp .env.example .env
   # edit .env — DATABASE_URL should point at your database
   ```

3. **Install dependencies.**
   ```bash
   npm install
   ```

4. **Create the schema and seed demo data.**
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
   This creates all the tables from `prisma/schema.prisma` and loads the same
   demo events/attendees/transactions the app used to run on mock data —
   Afrobeats Picnic in Lagos, the Tech Founders Mixer in Abuja, and a few more.

5. **Run it.**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000.

Useful extras: `npm run db:studio` opens Prisma Studio (a GUI for browsing/
editing rows) at http://localhost:5555.

## What's here

| Route | What it is |
|---|---|
| `/` | Landing page — hero, how it works, featured events, hybrid model explainer, organiser pitch |
| `/explore` | Event discovery with state/category/price filters and search (server-fetched from Postgres) |
| `/events/[slug]` | Event detail page with ticket types and the "Get Ticket via WhatsApp" deep link |
| `/organiser/dashboard` | Sales stats + searchable, sortable attendee table, live from the database |
| `/organiser/events/new` | Event creation form — actually persists to Postgres via `POST /api/events` |
| `/admin` | Platform overview — events, approve/disable (persists via `PATCH /api/admin/events/[id]`), transactions, fee totals |
| `/checkin` | Gate scanner mock demonstrating the QR anti-fraud flow (one scan burns the ticket) |

## Data layer

- `prisma/schema.prisma` — the Ticket & Event Engine: Organiser, Event,
  TicketType, CustomQuestion, Attendee, Transaction. Field names and shapes
  mirror `lib/types.ts` closely on purpose.
- `lib/db.ts` — Prisma client singleton (avoids exhausting connections during
  Next.js dev hot reload).
- `lib/data.ts` — every database read/write the app needs, each one mapping
  Prisma's model shape back onto the types in `lib/types.ts`. This is the
  layer to extend as new features need new queries; components never talk to
  Prisma directly.
- `prisma/seed.ts` — loads the same demo dataset that used to live in
  `lib/mock-data.ts` (that file is now only used by the seed script).

## What's real vs. still stubbed

Now real: the database, the organiser "create event" flow (it actually
writes a row), and the admin disable/re-enable toggle (it actually persists).

Still stubbed, because it needs real infrastructure and credentials you'll
supply:

- **Paystack.** `app/api/webhooks/paystack/route.ts` documents the
  signature-verification and idempotency requirements inline, but has no live
  key or real payment link generation yet.
- **WhatsApp Business Cloud API.** `app/api/whatsapp/webhook/route.ts`
  handles Meta's verification handshake and stubs the incoming-message
  handler, but the actual bot conversation logic (ticket selection → custom
  questions → payment link → delivery) still needs to be built against the
  real API.
- **Auth.** Organiser and admin routes are open in this build — any event
  created goes to a placeholder "Demo Organiser" record (see
  `app/api/events/route.ts`). Add real auth before deploying, then swap that
  placeholder for the signed-in organiser's ID.

## Design notes

Brand palette: deep plum/purple represents the website half of the product
(discovery, dashboards), the green represents the WhatsApp half (checkout,
delivery) — the color split is a deliberate nod to the hybrid model itself.
Display type is Space Grotesk, body is Inter.

## Next steps, in priority order

1. Paystack — real payment links, webhook signature verification, idempotent
   handling.
2. WhatsApp bot conversation flow against the Cloud API.
3. Auth for organisers and admins.
4. Ticket resale/transfer, promo codes, and the rest of the Phase 2 list in
   the PRD are intentionally not in this build.
