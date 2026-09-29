import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  Ticket,
} from "lucide-react";

import {
  getAttendeesForEventSlug,
  getEventBySlug,
} from "@/lib/data";

import ScannerMock from "@/components/checkin/ScannerMock";

export const dynamic = "force-dynamic";

const DEMO_EVENT_SLUG = "afrobeats-picnic-lagos";

export default async function CheckinPage() {
  const [event, attendees] = await Promise.all([
    getEventBySlug(DEMO_EVENT_SLUG),
    getAttendeesForEventSlug(DEMO_EVENT_SLUG),
  ]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF9FD] text-[#18131F]">
      {/* Subtle background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-48 top-12 h-[480px] w-[480px] rounded-full bg-violet-100/50 blur-[120px]" />

        <div className="absolute -left-48 top-[550px] h-[400px] w-[400px] rounded-full bg-purple-100/35 blur-[110px]" />
      </div>

      {/*
        Extra top spacing keeps the content below the
        floating / fixed navbar.
      */}
      <div className="relative mx-auto max-w-[1160px] px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 lg:px-12 lg:pt-44">
        {/* TOP NAVIGATION */}
        <div className="mb-10 flex items-center justify-between gap-4 sm:mb-12">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 text-[12px] font-medium text-[#81798B] transition-colors hover:text-[#6D28D9]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to events
          </Link>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#6D28D9]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8193]">
              Tickety Check-in
            </span>
          </div>
        </div>

        {/* PAGE HEADER */}
        <header className="mb-10 max-w-[780px] sm:mb-12">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#6D28D9]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6D28D9]">
              Gate management
            </span>
          </div>

          <h1 className="max-w-[760px] text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-[#18131F]">
            Event{" "}
            <span className="text-[#6D28D9]">
              check-in.
            </span>
          </h1>

          <p className="mt-5 max-w-[640px] text-[14px] leading-7 text-[#766F7F] sm:text-[16px] sm:leading-8">
            Scan attendee tickets, confirm entry, and keep
            your event check-in organised in one place.
          </p>
        </header>

        {/* EVENT SUMMARY */}
        <div className="mb-8 flex flex-col gap-5 border-y border-[#E5E0EA] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEE7FB] text-[#6D28D9]">
              <Ticket size={22} strokeWidth={1.7} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9A91A2]">
                Selected event
              </p>

              <h2 className="mt-1 truncate text-[18px] font-semibold tracking-[-0.035em] text-[#21182A] sm:text-[20px]">
                {event?.title ?? "Event"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-[#DDD1F4] bg-[#F1EBFC] px-3 py-2 sm:self-auto">
            <CheckCircle2
              size={14}
              className="text-[#6D28D9]"
            />

            <span className="text-[11px] font-semibold text-[#5B21B6]">
              Ready for check-in
            </span>
          </div>
        </div>

        {/* SCANNER SECTION */}
        <section
          aria-labelledby="scanner-heading"
          className="overflow-hidden rounded-[24px] border border-[#E9E4EF] bg-white shadow-[0_24px_75px_-45px_rgba(49,24,91,0.2)] sm:rounded-[30px]"
        >
          {/* Scanner heading */}
          <div className="flex flex-col gap-4 border-b border-[#F0ECF3] px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#6D28D9] text-white">
                <ScanLine size={21} strokeWidth={1.8} />
              </div>

              <div>
                <h2
                  id="scanner-heading"
                  className="text-[17px] font-semibold tracking-[-0.035em] text-[#201729]"
                >
                  Ticket scanner
                </h2>

                <p className="mt-1 text-[12px] text-[#8C8493]">
                  Verify attendee entry
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 text-[11px] font-medium text-[#8C8493]">
              <LockKeyhole size={13} />
              Server-verified tickets
            </span>
          </div>

          {/* Existing scanner functionality */}
          <div className="px-4 py-6 sm:px-8 sm:py-8">
            <div className="mx-auto max-w-[840px]">
              <ScannerMock attendees={attendees} />
            </div>
          </div>
        </section>

        {/* SECURITY / CHECK-IN EXPLANATION */}
        <div className="mt-8 grid gap-5 border-t border-[#E5E0EA] pt-7 sm:grid-cols-2 sm:gap-8">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={19}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-[#6D28D9]"
            />

            <div>
              <h3 className="text-[13px] font-semibold text-[#241B2D]">
                Verified at the gate
              </h3>

              <p className="mt-1.5 text-[12px] leading-6 text-[#81798A]">
                Each scan is validated by the server before
                a ticket is accepted for entry.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2
              size={19}
              strokeWidth={1.7}
              className="mt-0.5 shrink-0 text-[#6D28D9]"
            />

            <div>
              <h3 className="text-[13px] font-semibold text-[#241B2D]">
                One ticket, one entry
              </h3>

              <p className="mt-1.5 text-[12px] leading-6 text-[#81798A]">
                Once a ticket has been successfully scanned,
                another scan of that same ticket is rejected.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[#E5E0EA] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-[#9A92A1]">
            Tickety · Event entry management
          </p>

          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold text-[#6D28D9]"
          >
            Explore events

            <ArrowLeft
              size={13}
              className="rotate-180 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}