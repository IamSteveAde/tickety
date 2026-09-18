import Link from "next/link";
import HeroConversation from "./HeroConversation";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Very subtle top atmosphere */}
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-violet-100/35 blur-[110px]" />

        {/* Single quiet architectural arc */}
        <div className="absolute left-1/2 top-[110px] h-[720px] w-[720px] -translate-x-1/2 rounded-full border border-violet-200/30" />

        {/* Subtle fade toward the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      {/* =========================================================
          MAIN HERO
      ========================================================= */}
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32 lg:px-10 lg:pb-28 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(460px,0.8fr)] lg:gap-8">
          {/* =====================================================
              LEFT
          ===================================================== */}
          <div className="relative z-10 max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-violet-200/80 bg-violet-50/70 px-3.5 py-2 text-sm font-medium text-violet-700">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              <span>Events worth showing up for</span>
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-zinc-950 sm:text-6xl md:text-7xl lg:text-[5.6rem]">
              Find something
              <br />
              worth{" "}
              <span className="relative inline-block text-violet-600">
                showing up
                <svg
                  aria-hidden="true"
                  viewBox="0 0 260 18"
                  className="absolute -bottom-1 left-0 h-3 w-full"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 13.5C53 5.5 114 3.5 164 7.5C198 10.2 226 12 257 5"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              for.
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              Discover events on Tickety. Choose what you want, start a
              conversation and get your ticket without the usual checkout
              hassle.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/explore"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(24,24,27,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-600 hover:shadow-[0_16px_35px_rgba(124,58,237,0.2)]"
              >
                Explore events

                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <path
                    d="M4 10h11M11 5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="/organiser/events/new"
                className="inline-flex h-14 items-center justify-center rounded-full border border-zinc-200 bg-white px-7 text-sm font-semibold text-zinc-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-zinc-50"
              >
                Create an event
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  ✓
                </span>
                Discover faster
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  ✓
                </span>
                Simple checkout
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                  ✓
                </span>
                Instant tickets
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT — CONVERSATION
          ===================================================== */}
          <div className="relative min-h-[520px] lg:min-h-[590px]">
            {/* Quiet glow directly behind the product visual */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/45 blur-[90px]"
            />

            {/* Small contextual label */}
            <div className="pointer-events-none absolute right-[4%] top-[5%] hidden rotate-3 items-center gap-2 rounded-xl border border-zinc-200/70 bg-white px-3.5 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.05)] sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[10px] font-semibold text-zinc-500">
                Live events
              </span>
            </div>

            {/* Small ticket confirmation */}
            <div className="pointer-events-none absolute bottom-[7%] left-[1%] hidden -rotate-3 items-center gap-2.5 rounded-xl border border-zinc-200/70 bg-white px-3.5 py-2.5 shadow-[0_8px_25px_rgba(0,0,0,0.05)] sm:flex">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-50 text-xs text-violet-600">
                ✓
              </div>

              <div>
                <p className="text-[9px] font-medium text-zinc-400">
                  Ticket secured
                </p>

                <p className="text-[11px] font-semibold text-zinc-700">
                  You&apos;re going
                </p>
              </div>
            </div>

            <HeroConversation />
          </div>
        </div>
      </div>
    </section>
  );
}