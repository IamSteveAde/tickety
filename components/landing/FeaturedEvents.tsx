import Button from "@/components/ui/Button";
import EventCard from "@/components/events/EventCard";
import { getMostBookedEvents } from "@/lib/data";
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  TrendingUp,
} from "lucide-react";

export default async function FeaturedEvents() {
  const topEvents = await getMostBookedEvents(3);

  if (topEvents.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#09070F] text-white">
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#09070F_0%,#170B28_38%,#0D0818_68%,#050509_100%)]" />

        {/* Top left purple atmosphere */}
        <div className="absolute -left-[18%] -top-[28%] h-[760px] w-[760px] rounded-full bg-[#7C3AED]/20 blur-[170px]" />

        {/* Right purple atmosphere */}
        <div className="absolute -right-[20%] top-[0%] h-[680px] w-[680px] rounded-full bg-[#9333EA]/14 blur-[170px]" />

        {/* Bottom atmosphere */}
        <div className="absolute -bottom-[45%] left-[15%] h-[700px] w-[900px] rounded-full bg-[#4C1D95]/20 blur-[180px]" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-[18%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#A855F7]/[0.06] blur-[120px]" />

        {/* Subtle radial highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(168,85,247,0.08),transparent_40%)]" />

        {/* Fine grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        {/* =======================================================
            HEADER
        ======================================================= */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C084FC]/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C084FC]" />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                Moving fast
              </span>
            </div>

            <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
              Most booked.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              The events people are choosing right now.
            </p>
          </div>

          {/* Explore */}
          <div>
            <Button
              href="/explore"
              variant="ghost"
              icon={<ArrowUpRight size={16} />}
              className="h-12 rounded-full border border-white/15 bg-white/[0.055] px-5 text-white hover:border-white/25 hover:bg-white/[0.1] hover:text-white"
            >
              Explore all events
            </Button>
          </div>
        </div>

        {/* =======================================================
            TRENDING BAR
        ======================================================= */}
        <div className="mt-14 flex items-center gap-4">
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.055]">
              <TrendingUp
                size={15}
                strokeWidth={1.8}
                className="text-[#C084FC]"
              />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/70">
              Trending on Tickety
            </span>
          </div>

          <div className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/[0.07] to-transparent" />

          <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.15em] text-white/40 sm:block">
            Updated continuously
          </span>
        </div>

        {/* =======================================================
            DESKTOP
        ======================================================= */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-12 lg:gap-7">
          {topEvents.map((event, index) => (
            <article
              key={event.id}
              className={`group relative ${
                index === 0 ? "col-span-6" : "col-span-3"
              }`}
            >
              {/* Rank */}
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-semibold tracking-[-0.05em] text-white/55">
                    0{index + 1}
                  </span>

                  <span className="h-px w-8 bg-white/20" />

                  {index === 0 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C084FC]/20 bg-[#7C3AED]/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                      <Flame size={10} className="text-[#C084FC]" />
                      #1 right now
                    </span>
                  )}
                </div>

                {index === 0 && (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                    Most booked
                  </span>
                )}
              </div>

              {/* =================================================
                  CREATIVE FRAME

                  No styled-jsx.
                  No client component.
              ================================================= */}
              <div
                className={`relative ${
                  index === 0
                    ? "rounded-[32px] bg-gradient-to-br from-[#A855F7]/35 via-white/[0.09] to-transparent p-[1px]"
                    : "rounded-[28px] bg-gradient-to-br from-white/[0.13] via-white/[0.045] to-transparent p-[1px]"
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    index === 0
                      ? "rounded-[31px] bg-[#100D17]"
                      : "rounded-[27px] bg-[#0E0C13]"
                  }`}
                >
                  {/* Top architectural line */}
                  <div className="pointer-events-none absolute left-6 right-6 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Corner detail */}
                  <div className="pointer-events-none absolute left-0 top-0 z-20 h-12 w-12 border-l border-t border-white/10" />

                  <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-12 w-12 border-b border-r border-white/10" />

                  {/* Event */}
                  <EventCard event={event} />
                </div>
              </div>

              {/* #1 glow */}
              {index === 0 && (
                <div className="pointer-events-none absolute -bottom-10 left-[8%] right-[8%] h-20 rounded-full bg-[#7C3AED]/25 blur-[50px]" />
              )}
            </article>
          ))}
        </div>

        {/* =======================================================
            TABLET
        ======================================================= */}
        <div className="mt-10 hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:hidden">
          {topEvents.map((event, index) => (
            <article key={event.id} className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="font-display text-xl font-semibold tracking-[-0.04em] text-white/55">
                  0{index + 1}
                </span>

                <span className="h-px w-7 bg-white/20" />

                {index === 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C084FC]/20 bg-[#7C3AED]/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                    <Flame size={9} className="text-[#C084FC]" />
                    #1 right now
                  </span>
                )}
              </div>

              <div className="rounded-[28px] bg-gradient-to-br from-white/[0.13] via-white/[0.045] to-transparent p-[1px]">
                <div className="relative overflow-hidden rounded-[27px] bg-[#0E0C13]">
                  <div className="pointer-events-none absolute left-6 right-6 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <EventCard event={event} />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* =======================================================
            MOBILE
        ======================================================= */}
        <div className="mt-10 -mx-5 overflow-x-auto px-5 pb-6 sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max gap-5">
            {topEvents.map((event, index) => (
              <article
                key={event.id}
                className="relative w-[84vw] max-w-[360px]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-xl font-semibold tracking-[-0.04em] text-white/55">
                      0{index + 1}
                    </span>

                    <span className="h-px w-6 bg-white/20" />

                    {index === 0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C084FC]/20 bg-[#7C3AED]/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                        <Flame size={9} className="text-[#C084FC]" />
                        #1
                      </span>
                    )}
                  </div>

                  <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">
                    {index + 1} / {topEvents.length}
                  </span>
                </div>

                <div className="rounded-[28px] bg-gradient-to-br from-white/[0.13] via-white/[0.045] to-transparent p-[1px]">
                  <div className="relative overflow-hidden rounded-[27px] bg-[#0E0C13]">
                    <div className="pointer-events-none absolute left-5 right-5 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <EventCard event={event} />
                  </div>
                </div>

                {index === 0 && (
                  <div className="pointer-events-none absolute -bottom-8 left-[15%] right-[15%] h-16 rounded-full bg-[#7C3AED]/20 blur-[40px]" />
                )}
              </article>
            ))}
          </div>
        </div>

        {/* =======================================================
            FOOTER
        ======================================================= */}
        <div className="mt-14 border-t border-white/10 pt-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1.5">
                <div className="h-7 w-7 rounded-full border-2 border-[#130A21] bg-gradient-to-br from-[#C084FC] to-[#7C3AED]" />

                <div className="h-7 w-7 rounded-full border-2 border-[#130A21] bg-gradient-to-br from-[#A78BFA] to-[#4C1D95]" />

                <div className="h-7 w-7 rounded-full border-2 border-[#130A21] bg-white/20" />
              </div>

              <p className="text-xs text-white/60">
                Popular with people discovering events near them.
              </p>
            </div>

            <a
              href="/explore"
              className="group flex items-center gap-2 text-xs font-semibold text-white/65 transition-colors hover:text-white"
            >
              Discover something new

              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}