import Button from "@/components/ui/Button";
import EventCard from "@/components/events/EventCard";
import { getMostBookedEvents } from "@/lib/data";
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

export default async function FeaturedEvents() {
  const topEvents = await getMostBookedEvents(3);

  if (topEvents.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#3B0764] text-white">
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Main gradient */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(168,85,247,0.55),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.38),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(30,10,52,0.8),transparent_55%),linear-gradient(135deg,#4C1D95_0%,#6D28D9_45%,#4C1D95_100%)]" />

        {/* Soft light */}

        <div className="absolute -left-[15%] top-[15%] h-[500px] w-[500px] rounded-full bg-[#C4B5FD]/20 blur-[150px]" />

        <div className="absolute -right-[10%] top-[5%] h-[550px] w-[550px] rounded-full bg-[#E9D5FF]/15 blur-[150px]" />

        <div className="absolute bottom-[-30%] left-[35%] h-[600px] w-[600px] rounded-full bg-[#1E0535]/50 blur-[150px]" />

        {/* Editorial grid */}

        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* Large decorative star */}

        <div className="absolute right-[9%] top-[7%] hidden rotate-12 text-white/10 lg:block">
          <Star size={180} strokeWidth={0.7} />
        </div>

        <div className="absolute bottom-[4%] left-[7%] hidden text-white/[0.07] lg:block">
          <Sparkles size={130} strokeWidth={0.7} />
        </div>
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

            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-md">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#6D28D9]">
                <TrendingUp size={11} strokeWidth={2.5} />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                Trending right now
              </span>
            </div>

            {/* Heading */}

            <h2 className="max-w-[850px] text-[3.5rem] font-semibold leading-[0.91] tracking-[-0.06em] sm:text-[4.8rem] lg:text-[6rem] xl:text-[6.7rem]">
              The events
              <br />
              everyone&apos;s
              <br />
              <span className="text-white/45">talking about.</span>
            </h2>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
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
              className="group h-12 rounded-full border border-white/20 bg-white px-5 text-sm font-semibold text-[#5B21B6] shadow-[0_12px_40px_rgba(20,5,40,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#4C1D95] hover:shadow-[0_18px_45px_rgba(20,5,40,0.3)]"
            >
              Explore all events
            </Button>
          </div>
        </header>

        {/* ============================================================
            DIVIDER / META
        ============================================================ */}

        <div className="mt-14 flex items-center gap-4 border-t border-white/15 pt-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
              <span className="relative h-2 w-2 rounded-full bg-white" />
            </span>

            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/65">
              Most booked on Tickety
            </span>
          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />

          <span className="hidden text-[9px] font-medium uppercase tracking-[0.15em] text-white/35 sm:block">
            {String(topEvents.length).padStart(2, "0")} curated events
          </span>
        </div>

        {/* ============================================================
            EVENTS — SIDE BY SIDE
        ============================================================ */}

        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topEvents.map((event, index) => (
            <FeaturedEventCard
              key={event.id}
              event={event}
              index={index}
            />
          ))}
        </div>

        {/* ============================================================
            BOTTOM
        ============================================================ */}

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="h-7 w-7 rounded-full border-2 border-[#6D28D9] bg-white/90" />
              <div className="h-7 w-7 rounded-full border-2 border-[#6D28D9] bg-white/60" />
              <div className="h-7 w-7 rounded-full border-2 border-[#6D28D9] bg-white/30" />
            </div>

            <p className="text-[11px] text-white/45">
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
}: {
  event: any;
  index: number;
}) {
  const isFeatured = index === 0;

  return (
    <article
      className={[
        "group relative min-w-0",
        "transition-transform duration-500",
        "hover:-translate-y-1.5",
      ].join(" ")}
    >
      {/* ============================================================
          CARD LABEL
      ============================================================ */}

      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          {/* Number */}

          <span className="text-[11px] font-semibold tracking-[-0.02em] text-white/40">
            0{index + 1}
          </span>

          <span className="h-px w-7 bg-white/20" />

          {/* Featured label */}

          {isFeatured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.13em] text-[#6D28D9] shadow-sm">
              <Flame size={9} strokeWidth={2.7} />
              Most booked
            </span>
          ) : (
            <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/35">
              Popular
            </span>
          )}
        </div>

        <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/30">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(3).padStart(2, "0")}
        </span>
      </div>

      {/* ============================================================
          CARD FRAME
      ============================================================ */}

      <div
        className={[
          "relative overflow-hidden transition-all duration-500",
          isFeatured
            ? "rounded-[30px] bg-gradient-to-br from-[#E9D5FF] via-[#A855F7] to-[#581C87] p-[2px] shadow-[0_30px_90px_rgba(29,7,48,0.3)]"
            : "rounded-[28px] bg-white/95 p-[2px] shadow-[0_20px_60px_rgba(29,7,48,0.18)]",
        ].join(" ")}
      >
        {/* Inner card */}

        <div
          className={[
            "relative overflow-hidden bg-white",
            isFeatured ? "rounded-[28px]" : "rounded-[26px]",
          ].join(" ")}
        >
          {/* ========================================================
              FEATURED STAR
          ======================================================== */}

          {isFeatured && (
            <>
              {/* Purple top atmosphere */}

              <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-28 bg-gradient-to-b from-[#6D28D9]/15 to-transparent" />

              {/* Star badge */}

              <div className="absolute right-5 top-5 z-30 flex h-11 w-11 rotate-6 items-center justify-center rounded-full bg-[#6D28D9] text-white shadow-[0_10px_25px_rgba(109,40,217,0.3)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
                <Star
                  size={18}
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </div>

              {/* Small featured text */}

              <div className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
                <Sparkles
                  size={10}
                  className="text-[#6D28D9]"
                  fill="currentColor"
                />

                <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#5B21B6]">
                  Tickety pick
                </span>
              </div>
            </>
          )}

          {/* ========================================================
              EVENT
          ======================================================== */}

          <div className="relative">
            <EventCard event={event} />

            {/* Hover overlay */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2E1065]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Arrow */}

            <div
              className={[
                "absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#6D28D9] shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all duration-300",
                isFeatured ? "top-[68px]" : "top-4",
                "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
              ].join(" ")}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          FEATURED ACCENT
      ============================================================ */}

      {isFeatured && (
        <div className="mt-4 flex items-center gap-2 px-1">
          <div className="flex items-center gap-1">
            <Star
              size={9}
              fill="currentColor"
              className="text-[#E9D5FF]"
            />

            <Star
              size={9}
              fill="currentColor"
              className="text-[#C4B5FD]"
            />

            <Star
              size={9}
              fill="currentColor"
              className="text-[#A78BFA]"
            />
          </div>

          <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/40">
            This week&apos;s standout
          </span>
        </div>
      )}
    </article>
  );
}