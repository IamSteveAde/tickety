import Button from "@/components/ui/Button";
import EventCard from "@/components/events/EventCard";
import { getMostBookedEvents } from "@/lib/data";
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default async function FeaturedEvents() {
  const topEvents = await getMostBookedEvents(3);

  if (topEvents.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#6D28D9] text-white">
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Quiet architectural lighting */}
        <div className="absolute -left-[15%] -top-[20%] h-[620px] w-[620px] rounded-full bg-[#A78BFA]/20 blur-[130px]" />

        <div className="absolute -right-[15%] top-[5%] h-[520px] w-[520px] rounded-full bg-[#C4B5FD]/15 blur-[130px]" />

        <div className="absolute bottom-[-25%] left-[35%] h-[500px] w-[500px] rounded-full bg-[#3B0764]/30 blur-[130px]" />

        {/* Very subtle editorial grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)
            `,
            backgroundSize: "96px 96px",
          }}
        />

        {/* Fine vertical architectural line */}
        <div className="absolute left-[8%] top-0 hidden h-full w-px bg-white/[0.06] lg:block" />
        <div className="absolute right-[8%] top-0 hidden h-full w-px bg-white/[0.06] lg:block" />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* ============================================================
            HEADER
        ============================================================ */}

        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <TrendingUp
                  size={15}
                  strokeWidth={1.8}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                  Trending right now
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                  <span className="text-[10px] font-medium text-white/70">
                    Most booked on Tickety
                  </span>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="max-w-[850px] text-[3.5rem] font-semibold leading-[0.92] tracking-[-0.065em] sm:text-[4.8rem] lg:text-[6rem] xl:text-[6.7rem]">
              The events
              <br />
              everyone&apos;s
              <br />
              <span className="text-white/40">talking about.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-7">
              Discover what people are booking, sharing and looking forward to
              right now.
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Button
              href="/explore"
              variant="ghost"
              icon={<ArrowUpRight size={16} />}
              className="group h-12 rounded-full border border-white/15 bg-white px-5 text-sm font-semibold text-[#5B21B6] shadow-[0_14px_35px_rgba(38,10,70,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#4C1D95] hover:shadow-[0_18px_45px_rgba(38,10,70,0.28)]"
            >
              Explore all events
            </Button>
          </div>
        </header>

        {/* ============================================================
            DIVIDER / META
        ============================================================ */}

        <div className="mt-14 flex items-center gap-4 border-t border-white/15 pt-5">
          <div className="flex shrink-0 items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-300/50" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
            </span>

            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60">
              Live booking activity
            </span>
          </div>

          <div className="h-px flex-1 bg-white/10" />

          <span className="hidden text-[9px] font-medium uppercase tracking-[0.15em] text-white/30 sm:block">
            {String(topEvents.length).padStart(2, "0")} events
          </span>
        </div>

        {/* ============================================================
            EVENTS
        ============================================================ */}

        <div className="mt-9 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topEvents.map((event, index) => (
            <FeaturedEventCard
              key={event.id}
              event={event}
              index={index}
              total={topEvents.length}
            />
          ))}
        </div>

        {/* ============================================================
            BOTTOM
        ============================================================ */}

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#6D28D9] bg-white text-[#6D28D9]">
                <Sparkles size={10} />
              </div>

              <div className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#6D28D9] bg-white/75 text-[#6D28D9]">
                <Sparkles size={9} />
              </div>

              <div className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#6D28D9] bg-white/45 text-white">
                <Sparkles size={9} />
              </div>
            </div>

            <p className="text-[11px] text-white/40">
              Discover what people are choosing on Tickety.
            </p>
          </div>

          <a
            href="/explore"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-white transition-opacity hover:opacity-75"
          >
            See everything happening
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   EVENT CARD
================================================================ */

function FeaturedEventCard({
  event,
  index,
  total,
}: {
  event: any;
  index: number;
  total: number;
}) {
  const isFeatured = index === 0;

  return (
    <article className="group flex h-full min-w-0 flex-col">
      {/* ============================================================
          CARD HEADER
      ============================================================ */}

      <div className="mb-4 flex h-8 shrink-0 items-center justify-between px-1">
        <div className="flex min-w-0 items-center gap-3">
          {/* Rank */}
          <span className="w-5 shrink-0 text-[11px] font-semibold tracking-[-0.02em] text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-7 shrink-0 bg-white/20" />

          {/* Status */}
          <div className="min-w-0">
            {isFeatured ? (
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-white px-2.5 text-[8px] font-bold uppercase tracking-[0.13em] text-[#6D28D9] shadow-sm">
                <Flame size={9} strokeWidth={2.7} />
                Most booked
              </span>
            ) : (
              <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/35">
                Popular
              </span>
            )}
          </div>
        </div>

        <span className="shrink-0 text-[8px] font-medium uppercase tracking-[0.14em] text-white/30">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ============================================================
          CARD FRAME
      ============================================================ */}

      <div
        className={[
          "relative flex h-full min-h-0 flex-1 overflow-hidden p-px transition-all duration-300",
          "group-hover:-translate-y-1",
          isFeatured
            ? "rounded-[28px] bg-white shadow-[0_25px_70px_rgba(35,8,60,0.22)]"
            : "rounded-[28px] bg-white/90 shadow-[0_20px_55px_rgba(35,8,60,0.16)]",
        ].join(" ")}
      >
        {/* Inner frame */}
        <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden rounded-[27px] bg-white">
          {/* Featured top accent */}
          {isFeatured && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-[#7C3AED]/10 to-transparent"
            />
          )}

          {/* Featured badge */}
          {isFeatured && (
            <div className="pointer-events-none absolute left-5 top-5 z-30 flex h-9 items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F3E8FF]">
                <Sparkles
                  size={9}
                  className="text-[#6D28D9]"
                  fill="currentColor"
                />
              </span>

              <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#5B21B6]">
                Tickety pick
              </span>
            </div>
          )}

          {/* ========================================================
              EVENT CONTENT
          ======================================================== */}

          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <EventCard event={event} />

              {/* Soft hover treatment */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2E1065]/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Hover arrow */}
              <div
                className={[
                  "pointer-events-none absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-[0_8px_25px_rgba(0,0,0,0.15)]",
                  "translate-y-1 opacity-0 transition-all duration-300",
                  "group-hover:translate-y-0 group-hover:opacity-100",
                  isFeatured ? "top-[68px]" : "top-4",
                ].join(" ")}
              >
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          FEATURED FOOTER
      ============================================================ */}

      <div className="mt-4 flex h-5 shrink-0 items-center gap-2 px-1">
        {isFeatured ? (
          <>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E9D5FF]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#C4B5FD]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
            </div>

            <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/40">
              This week&apos;s standout
            </span>
          </>
        ) : (
          <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-transparent">
            This week&apos;s standout
          </span>
        )}
      </div>
    </article>
  );
}