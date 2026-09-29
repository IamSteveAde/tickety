"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  MapPin,
  ScanLine,
  Ticket,
  Users,
} from "lucide-react";

const capabilities = [
  {
    number: "01",
    title: "Put your event out there.",
    description: "Create your event and publish your ticket options.",
  },
  {
    number: "02",
    title: "Stay close to every sale.",
    description: "Track bookings and see who's coming.",
  },
  {
    number: "03",
    title: "Own the moment at the door.",
    description: "Verify tickets and manage entry from one place.",
  },
];

function EventPass() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* Editorial label */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
          The event experience
        </span>

        <span className="flex items-center gap-2 text-[10px] font-medium text-white/45">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C4A0FF]" />
          Powered by Tickety
        </span>
      </div>

      {/* Premium event pass */}
      <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-[#24123F] shadow-[0_35px_100px_rgba(0,0,0,0.4)]">
        {/* Main artwork */}
        <div className="relative flex h-[335px] flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_75%_20%,#9F67FF_0%,#6D28D9_28%,#32115B_65%,#170D29_100%)] p-7 text-white sm:h-[390px] sm:p-9">
          {/* Decorative event graphics */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -right-[110px] -top-[120px] h-[380px] w-[380px] rounded-full border-[65px] border-white/[0.12]" />

            <div className="absolute -right-[65px] -top-[70px] h-[280px] w-[280px] rounded-full border border-white/25" />

            <div className="absolute bottom-[-170px] left-[-160px] h-[370px] w-[370px] rounded-full border-[75px] border-[#B78AFF]/20" />

            <div className="absolute left-[42%] top-[-20%] h-[150%] w-px rotate-[28deg] bg-white/[0.08]" />
          </div>

          {/* Top of pass */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/25 bg-white/10">
                <Ticket size={16} strokeWidth={1.7} />
              </span>

              <span className="text-[12px] font-bold tracking-[-0.045em]">
                tickety<span className="text-[#D7BDFF]">.</span>
              </span>
            </div>

            <span className="text-right text-[9px] font-semibold uppercase leading-4 tracking-[0.18em] text-white/60">
              The city
              <br />
              comes alive
            </span>
          </div>

          {/* Main event typography */}
          <div className="relative z-10">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E3D0FF]">
              A night to remember
            </p>

            <h3 className="max-w-[360px] text-[clamp(3.6rem,10vw,5.5rem)] font-black uppercase leading-[0.79] tracking-[-0.09em] text-white">
              AFTER
              <br />
              DARK
              <span className="text-[#D5B6FF]">.</span>
            </h3>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-9 bg-white/65" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Lagos edition
              </span>
            </div>
          </div>

          {/* Event date */}
          <div className="relative z-10 flex items-end justify-between">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">
                The date
              </p>

              <p className="mt-1 text-[15px] font-semibold tracking-[-0.025em]">
                24 October
              </p>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/50">
                The location
              </p>

              <p className="mt-1 text-[15px] font-semibold tracking-[-0.025em]">
                Victoria Island
              </p>
            </div>
          </div>
        </div>

        {/* Ticket tear line */}
        <div className="relative border-t border-dashed border-white/25 bg-[#170D29]">
          <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-white/15 bg-[#10091F]" />
          <div className="absolute -right-3 -top-3 h-6 w-6 rounded-full border border-white/15 bg-[#10091F]" />

          <div className="flex items-center justify-between gap-4 px-7 py-5 sm:px-9">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35">
                Admission
              </p>

              <p className="mt-1 text-[13px] font-semibold text-white">
                General access
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-right text-[9px] font-medium uppercase leading-4 tracking-[0.13em] text-white/40">
                Your event
                <br />
                starts here
              </span>

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#25123F]">
                <Ticket size={19} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting line */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className="text-[10px] font-medium text-white/35">
          Create the experience.
        </span>

        <span className="text-[10px] font-medium text-white/55">
          We'll help you manage the entry.
        </span>
      </div>
    </div>
  );
}

export default function ForOrganisers() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="for-organisers"
      className="relative isolate overflow-hidden bg-[#08070B] text-white"
    >
      {/* KEEPING YOUR EXISTING DARK GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#241044_0%,#12091F_32%,#09070F_67%,#050509_100%)]" />

        <div className="absolute -right-[15%] -top-[25%] h-[700px] w-[700px] rounded-full bg-[#7C3AED]/20 blur-[170px]" />

        <div className="absolute -left-[20%] bottom-[-35%] h-[650px] w-[650px] rounded-full bg-[#4C1D95]/20 blur-[160px]" />

        <div className="absolute left-[55%] top-[35%] h-[350px] w-[350px] rounded-full bg-[#A855F7]/[0.06] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        {/* Intro */}
        <div className="mb-14 flex flex-col gap-5 border-b border-white/10 pb-9 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C4A0FF]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D3B7FF]">
                For the people behind the experience
              </span>
            </div>

            <h2 className="mt-5 max-w-[850px] text-[clamp(2.8rem,5.7vw,5.6rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-white">
              You bring the vision.
              <br />
              <span className="text-[#B58BFF]">
                We bring the structure.
              </span>
            </h2>
          </div>

          <p className="max-w-[320px] text-[13px] leading-7 text-white/50 sm:text-[14px]">
            From the first ticket sold to the last guest
            checked in, keep the moving parts of your
            event together.
          </p>
        </div>

        {/* Main editorial layout */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* LEFT — EDITORIAL CAPABILITIES */}
          <div
            className={[
              "min-w-0 transition-all duration-1000 ease-out",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
            ].join(" ")}
          >
            <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Built for organisers
            </p>

            <div className="border-t border-white/15">
              {capabilities.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-[35px_minmax(0,1fr)] gap-4 border-b border-white/15 py-6 sm:gap-5 sm:py-7"
                >
                  <span className="pt-1 text-[10px] font-semibold tracking-[0.12em] text-[#B58BFF]">
                    {item.number}
                  </span>

                  <div>
                    <h3 className="text-[19px] font-semibold tracking-[-0.045em] text-white sm:text-[23px]">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-[360px] text-[12px] leading-6 text-white/45 sm:text-[13px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/organiser/events/new"
                className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-xl bg-white px-6 text-[12px] font-semibold text-[#211137] transition-colors hover:bg-[#EDE4FF]"
              >
                Create your event

                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/organiser"
                className="group inline-flex h-[50px] items-center gap-2 text-[12px] font-semibold text-white/70 transition-colors hover:text-white"
              >
                Explore organiser tools

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 text-[10px] text-white/40">
                <Ticket
                  size={13}
                  className="text-[#C4A0FF]"
                />
                Ticket management
              </span>

              <span className="flex items-center gap-2 text-[10px] text-white/40">
                <Users
                  size={13}
                  className="text-[#C4A0FF]"
                />
                Attendee records
              </span>

              <span className="flex items-center gap-2 text-[10px] text-white/40">
                <ScanLine
                  size={13}
                  className="text-[#C4A0FF]"
                />
                Check-in
              </span>
            </div>
          </div>

          {/* RIGHT — PREMIUM EVENT PASS */}
          <div
            className={[
              "relative min-w-0 transition-all duration-1000 delay-150 ease-out",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0",
            ].join(" ")}
          >
            <EventPass />
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Made for moments that matter
          </span>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-white/50">
              From planning to the door.
            </span>

            <ArrowRight
              size={14}
              className="text-[#B58BFF]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}