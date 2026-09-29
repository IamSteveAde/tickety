import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Ticket,
} from "lucide-react";

import HeroConversation from "./HeroConversation";

const benefits = [
  "Discover great events",
  "Book securely online",
  "Access tickets instantly",
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FCFBFF]">
      {/* Subtle background detail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute right-[-180px] top-[-220px] h-[520px] w-[520px] rounded-full bg-violet-100/35 blur-[110px]" />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-zinc-200/60" />
      </div>

      <div className="mx-auto max-w-[1360px] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-16">
          {/* LEFT — BRAND MESSAGE */}
          <div className="relative z-10 min-w-0">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                <Ticket size={14} strokeWidth={1.8} />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-700">
                Your next experience starts here
              </span>
            </div>

            {/* Main headline */}
            <h1 className="max-w-[690px] text-[clamp(2.75rem,5vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.065em] text-zinc-950">
              Find something
              <br className="hidden sm:block" /> worth{" "}
              <span className="text-violet-600">
                showing up for.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[510px] text-[15px] leading-[1.85] text-zinc-500 sm:text-[16px]">
              Discover events worth experiencing, choose
              your tickets, and book directly on Tickety.
              From finding your next event to getting
              through the door, everything happens in
              one place.
            </p>

            {/* Primary actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/explore"
                className="group inline-flex h-[52px] items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-violet-700"
              >
                Explore events

                <ArrowRight
                  size={16}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/organiser/events/new"
                className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-[13px] font-semibold text-zinc-800 transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-50"
              >
                Create an event

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.8}
                  className="text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            {/* Product promises */}
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-zinc-200/80 pt-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2"
                >
                  <Check
                    size={14}
                    strokeWidth={2.4}
                    className="shrink-0 text-violet-600"
                  />

                  <span className="text-[11px] font-medium text-zinc-500">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — WEBSITE BOOKING PREVIEW */}
          <div className="relative min-w-0">
            <div className="relative mx-auto w-full max-w-[490px]">
              <HeroConversation />
            </div>
          </div>
        </div>

        {/* Quiet footer detail */}
        <div className="mt-10 flex items-center justify-between gap-4 border-t border-zinc-200/70 pt-5 lg:mt-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            Discover. Book. Experience.
          </span>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck size={13} strokeWidth={1.8} />

            <span className="text-[10px] font-medium">
              A seamless ticketing experience
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}