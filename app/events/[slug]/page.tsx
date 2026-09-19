import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/data";
import { formatEventDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import TicketTypeCard from "@/components/events/TicketTypeCard";
import GetTicketButton from "@/components/events/GetTicketButton";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Share2,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);

  if (!event) notFound();

  return (
    <main className="min-h-screen bg-[#FBFAFC] text-zinc-950">
      {/* The global navbar is fixed, so the page starts deliberately below it. */}
      <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-10 lg:pt-40">
        {/* =========================================================
            TOP NAV / BACK
        ========================================================= */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-violet-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white transition-all group-hover:border-violet-200 group-hover:bg-violet-50">
              <ArrowLeft
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
            </span>
            Back to events
          </Link>

          <button
            type="button"
            aria-label="Share event"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-all hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
          >
            <Share2 aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {/* =========================================================
            EVENT HEADER
        ========================================================= */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.65fr)] lg:gap-12 xl:gap-16">
          {/* Flyer */}
          <div className="relative">
            <div
              className={`relative aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-gradient-to-br ${event.coverGradient} shadow-[0_28px_80px_rgba(24,24,27,0.10)] sm:rounded-[34px]`}
            >
              {event.coverImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.coverImageUrl}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                <div className="flex items-center gap-2 rounded-full border border-white/25 bg-black/15 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {event.category}
                </div>
              </div>
            </div>

            {/* Small visual caption */}
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-300">
                Event / {event.category}
              </span>

              <span className="text-[9px] font-medium text-zinc-400">
                {event.trending ? "Trending now" : "Open for tickets"}
              </span>
            </div>
          </div>

          {/* Event identity */}
          <div className="flex flex-col justify-center lg:pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="plum">{event.category}</Badge>

              {event.trending && <Badge tone="amber">Trending</Badge>}
            </div>

            <h1 className="mt-5 max-w-[700px] text-[2.8rem] font-semibold leading-[0.94] tracking-[-0.065em] text-zinc-950 sm:text-[3.8rem] lg:text-[4.5rem] xl:text-[5.1rem]">
              {event.title}
            </h1>

            <div className="mt-7 space-y-3.5">
              <EventMeta
                icon={CalendarDays}
                label={formatEventDate(event.date, event.startTime)}
              />

              <EventMeta
                icon={MapPin}
                label={`${event.venue}, ${event.state}`}
              />

              <EventMeta
                icon={UserRound}
                label={`Organised by ${event.organiserName}`}
              />
            </div>

            <div className="mt-8 h-px w-full bg-zinc-200" />

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Clock3 aria-hidden="true" className="h-4 w-4" strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                  Ticketing
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-zinc-600">
                  Simple checkout. Instant ticket delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            CONTENT + TICKETS
        ========================================================= */}
        <section className="mt-14 grid items-start gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_410px]">
          {/* Description */}
          <div className="max-w-[760px]">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-violet-600" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-violet-700">
                About the event
              </span>
            </div>

            <p className="mt-6 whitespace-pre-line text-[15px] font-medium leading-8 tracking-[-0.015em] text-zinc-600 sm:text-[17px] sm:leading-9">
              {event.description}
            </p>

            {/* Event information */}
            <div className="mt-12 border-t border-zinc-200 pt-7">
              <div className="flex items-center justify-between">
                <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-900">
                  Event details
                </h2>

                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-300">
                  01
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DetailRow
                  icon={CalendarDays}
                  label="Date & time"
                  value={formatEventDate(event.date, event.startTime)}
                />

                <DetailRow
                  icon={MapPin}
                  label="Location"
                  value={`${event.venue}, ${event.state}`}
                />

                <DetailRow
                  icon={UserRound}
                  label="Organiser"
                  value={event.organiserName}
                />

                <DetailRow
                  icon={Check}
                  label="Ticket delivery"
                  value="Instant after purchase"
                />
              </div>
            </div>

            {/* Simple reassurance */}
            <div className="mt-10 rounded-[22px] border border-zinc-200 bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[12px] font-semibold tracking-[-0.02em] text-zinc-900">
                    Ready to go?
                  </p>

                  <p className="mt-1 text-[11px] font-medium leading-5 text-zinc-500">
                    Select your ticket and continue through the simple Tickety
                    checkout flow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              TICKET PANEL
          ========================================================= */}
          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(24,24,27,0.07)]">
              <div className="border-b border-zinc-100 px-5 py-5 sm:px-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-violet-600">
                      Tickets
                    </p>

                    <h2 className="mt-1.5 text-[21px] font-semibold tracking-[-0.04em] text-zinc-900">
                      Choose your ticket
                    </h2>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white">
                    <TicketIcon />
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 p-4 sm:p-5">
                {event.ticketTypes.map((ticket) => (
                  <TicketTypeCard key={ticket.id} ticket={ticket} />
                ))}

                <div className="pt-2">
                  <GetTicketButton
                    eventSlug={event.slug}
                    eventTitle={event.title}
                  />
                </div>

                <div className="flex items-start gap-2.5 px-1 pt-1">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600"
                    strokeWidth={2.3}
                  />

                  <p className="text-[10px] font-medium leading-5 text-zinc-400">
                    Your ticket is delivered after checkout. The experience
                    stays simple from start to finish.
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary organiser affordance */}
            <div className="mt-4 flex items-center justify-between px-1">
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
                Need help?
              </span>

              <button
                type="button"
                className="group inline-flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500 transition-colors hover:text-violet-600"
              >
                Contact organiser
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function EventMeta({
  icon: Icon,
  label,
}: {
  icon: typeof CalendarDays;
  label: string;
}) {
  return (
    <div className="flex items-start gap-3 text-zinc-500">
      <Icon
        aria-hidden="true"
        className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
        strokeWidth={1.7}
      />

      <span className="text-[12px] font-medium leading-5 tracking-[-0.01em]">
        {label}
      </span>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-zinc-200/80 bg-white p-4">
      <div className="flex items-center gap-2">
        <Icon
          aria-hidden="true"
          className="h-3.5 w-3.5 text-violet-600"
          strokeWidth={1.8}
        />

        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
          {label}
        </span>
      </div>

      <p className="mt-2 text-[11px] font-semibold leading-5 tracking-[-0.01em] text-zinc-700">
        {value}
      </p>
    </div>
  );
}

function TicketIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M4 7.5A2.5 2.5 0 0 0 6.5 5h11A2.5 2.5 0 0 0 20 7.5v1a2.5 2.5 0 0 0 0 5v1A2.5 2.5 0 0 0 17.5 17h-11A2.5 2.5 0 0 0 4 14.5v-1a2.5 2.5 0 0 0 0-5v-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13 7v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
    </svg>
  );
}
