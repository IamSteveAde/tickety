import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, CircleArrowOutUpRight, Radio } from "lucide-react";
import HeroConversation from "./HeroConversation";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fcfbff]">
      {/* =========================================================
          EDITORIAL BACKDROP
      ========================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Soft violet atmosphere */}
        <div className="absolute left-[46%] top-[-280px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-100/50 blur-[120px]" />

        {/* Large architectural curve */}
        <div className="absolute left-[58%] top-[70px] h-[820px] w-[820px] -translate-x-1/2 rounded-full border border-violet-200/45" />

        <div className="absolute left-[58%] top-[140px] h-[680px] w-[680px] -translate-x-1/2 rounded-full border border-zinc-200/60" />

        {/* Quiet bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#fcfbff] to-transparent" />
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(500px,0.9fr)] lg:gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(560px,0.9fr)]">
          {/* =====================================================
              LEFT — EDITORIAL COPY
          ===================================================== */}
          <div className="relative z-10 max-w-[720px]">
            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-violet-500" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-700">
                The new way to go out
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[760px] text-[2.7rem] font-semibold leading-[0.91] tracking-[-0.065em] text-zinc-950 sm:text-[4.2rem] md:text-[4rem] lg:text-[4.35rem] xl:text-[4rem]">
              Find something
              <br />
              worth{" "}
              <span className="relative inline-block text-violet-600">
                showing up
                <svg
                  aria-hidden="true"
                  viewBox="0 0 260 18"
                  className="absolute -bottom-1 left-0 h-3 w-full sm:-bottom-2 sm:h-3.5"
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
              </span>
              <br />
              for.
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-[570px] text-[15px] font-medium leading-7 tracking-[-0.015em] text-zinc-500 sm:mt-9 sm:text-[17px] sm:leading-8">
              Discover what&apos;s happening around you, choose your moment,
              and get your ticket without the usual checkout friction.
            </p>

            {/* CTA row */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/explore"
                className="group inline-flex h-[58px] items-center justify-center gap-3 rounded-[18px] bg-zinc-950 px-7 text-[13px] font-semibold tracking-[-0.01em] text-white shadow-[0_18px_45px_rgba(24,24,27,0.14)] transition-all duration-300 hover:-translate-y-1 hover:bg-violet-600 hover:shadow-[0_20px_45px_rgba(124,58,237,0.22)]"
              >
                Explore events
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-white/15">
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    strokeWidth={1.8}
                  />
                </span>
              </Link>

              <Link
                href="/organiser/events/new"
                className="group inline-flex h-[58px] items-center justify-center gap-2 rounded-[18px] border border-zinc-200 bg-white/80 px-7 text-[13px] font-semibold tracking-[-0.01em] text-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white"
              >
                Create an event
                <span className="text-zinc-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-violet-500">
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </Link>
            </div>

            {/* Trust / product promise */}
            <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-4">
              {[
                "Discover faster",
                "Simple checkout",
                "Instant tickets",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <Check aria-hidden="true" className="h-3 w-3" strokeWidth={2.5} />
                  </span>

                  <span className="text-[11px] font-semibold tracking-[-0.01em] text-zinc-500">
                    {item}
                  </span>

                  {index < 2 && (
                    <span className="ml-4 hidden h-3 w-px bg-zinc-200 sm:block" />
                  )}
                </div>
              ))}
            </div>

            {/* Small editorial index */}
            <div className="mt-12 hidden items-center gap-4 lg:flex">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300">
                01
              </span>
              <span className="h-px w-12 bg-zinc-200" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Discover · Choose · Go
              </span>
            </div>
          </div>

          {/* =====================================================
              RIGHT — CONVERSATION / PRODUCT MOMENT
          ===================================================== */}
          <div className="relative min-h-[540px] lg:min-h-[600px]">
            {/* Visual stage */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/50 blur-[95px]"
            />

            {/* Floating status */}
            <div className="pointer-events-none absolute right-[2%] top-[3%] z-20 hidden rotate-2 items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-[0_14px_40px_rgba(24,24,27,0.07)] sm:flex">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Radio aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </span>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                  Happening now
                </p>
                <p className="mt-0.5 text-[11px] font-semibold tracking-[-0.02em] text-zinc-800">
                  Events in Lagos
                </p>
              </div>
            </div>

            {/* Floating ticket status */}
            <div className="pointer-events-none absolute bottom-[5%] left-[0%] z-20 hidden -rotate-3 items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-[0_14px_40px_rgba(24,24,27,0.07)] sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-white">
                <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                  Ticket secured
                </p>
                <p className="mt-0.5 text-[11px] font-semibold tracking-[-0.02em] text-zinc-800">
                  You&apos;re going
                </p>
              </div>
            </div>

            {/* Conversation */}
            <HeroConversation />
          </div>
        </div>
      </div>
    </section>
  );
}
