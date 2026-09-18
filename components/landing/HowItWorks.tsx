import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Compass,
  MessageCircle,
  ScanLine,
  Ticket,
} from "lucide-react";

const steps = [
  {
    number: "01",
    label: "DISCOVER",
    title: "Find something worth going to.",
    body: "Explore events by location, category, or what's happening around you. No account. No commitment. Just find your next experience.",
    icon: Compass,
  },
  {
    number: "02",
    label: "CONVERSATION",
    title: "Get your ticket without the friction.",
    body: "Tap Get Ticket and continue in a familiar conversation. Pick your ticket, answer a few questions and complete your purchase.",
    icon: MessageCircle,
  },
  {
    number: "03",
    label: "EXPERIENCE",
    title: "Your ticket is ready when you are.",
    body: "Your ticket and QR code arrive in the same conversation. When it's time, show it at the gate and walk in.",
    icon: ScanLine,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white text-[#18181B]">
      {/* Subtle atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #71717A 1px, transparent 1px),
              linear-gradient(to bottom, #71717A 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        <div className="absolute left-1/2 top-[38%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#F7F4FB] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1380px] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        {/* ============================================================
            HEADER
        ============================================================ */}

        <header className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end lg:gap-24">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#6D28D9]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#71717A]">
                How Tickety works
              </span>
            </div>

            <p className="mt-6 max-w-[320px] text-[13px] leading-6 text-[#71717A]">
              From finding an event to walking through the gate, everything
              stays simple.
            </p>
          </div>

          <div>
            <h2 className="max-w-[850px] text-[3.5rem] font-semibold leading-[0.93] tracking-[-0.06em] text-[#18181B] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.2rem]">
              Finding your next
              <br />
              experience should
              <br />
              <span className="text-[#6D28D9]">feel this easy.</span>
            </h2>
          </div>
        </header>

        {/* ============================================================
            JOURNEY HEADER
        ============================================================ */}

        <div className="mt-16 flex items-center gap-5 lg:mt-24">
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A1A1AA]">
            Your journey
          </span>

          <div className="h-px flex-1 bg-[#E4E4E7]" />

          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#6D28D9]">
              Discover
            </span>

            <ArrowRight size={11} className="text-[#A1A1AA]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#71717A]">
              Conversation
            </span>

            <ArrowRight size={11} className="text-[#A1A1AA]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#71717A]">
              Experience
            </span>
          </div>
        </div>

        {/* ============================================================
            TIMELINE
        ============================================================ */}

        <div className="relative mt-10 lg:mt-14">
          {/* Desktop journey line */}
          <div className="pointer-events-none absolute left-[16.666%] right-[16.666%] top-[54px] hidden lg:block">
            <div className="relative h-px bg-[#DDDDE1]">
              <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6D28D9] ring-8 ring-white" />

              <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6D28D9] ring-8 ring-white" />

              <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#6D28D9] ring-8 ring-white" />

              <div className="absolute left-0 top-0 h-px w-1/2 bg-gradient-to-r from-[#6D28D9] to-[#A78BFA]" />
            </div>
          </div>

          {/* Mobile / tablet vertical journey line */}
          <div className="pointer-events-none absolute bottom-10 left-[25px] top-8 w-px bg-[#DDDDE1] lg:hidden" />

          <div className="relative grid gap-12 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <JourneyStep
                  key={step.number}
                  step={step}
                  Icon={Icon}
                  index={index}
                />
              );
            })}
          </div>
        </div>

        {/* ============================================================
            BOTTOM STATEMENT
        ============================================================ */}

        <div className="mt-16 flex flex-col gap-5 border-t border-[#E4E4E7] pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DDDDE1] bg-white">
              <Ticket
                size={15}
                strokeWidth={1.7}
                className="text-[#6D28D9]"
              />
            </div>

            <p className="max-w-[500px] text-[11px] leading-5 text-[#71717A]">
              Your event discovery stays on Tickety. Your ticketing journey
              continues in conversation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#71717A]">
            <span>Ready when you are</span>

            <ArrowRight size={12} className="text-[#6D28D9]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   JOURNEY STEP
================================================================ */

function JourneyStep({
  step,
  Icon,
  index,
}: {
  step: (typeof steps)[number];
  Icon: LucideIcon;
  index: number;
}) {
  return (
    <article className="group relative pl-[56px] lg:pl-0">
      {/* ==========================================================
          TIMELINE NODE
      ========================================================== */}

      <div
        className="
          absolute left-0 top-[20px]
          z-20
          flex h-[51px] w-[51px]
          items-center justify-center
          rounded-full
          border border-[#DDD6E5]
          bg-white
          shadow-[0_8px_25px_rgba(24,24,27,0.06)]
          lg:relative
          lg:left-auto
          lg:top-auto
          lg:mx-auto
          lg:mb-8
        "
      >
        <div
          className="
            flex h-9 w-9
            items-center justify-center
            rounded-full
            bg-[#F1ECF7]
            transition-all duration-300
            group-hover:bg-[#6D28D9]
          "
        >
          <Icon
            size={15}
            strokeWidth={1.8}
            className="text-[#6D28D9] transition-colors duration-300 group-hover:text-white"
          />
        </div>
      </div>

      {/* ==========================================================
          JOURNEY CONTENT
      ========================================================== */}

      <div
        className={[
          "relative",
          index === 1 ? "lg:translate-y-16" : "",
          index === 2 ? "lg:translate-y-2" : "",
        ].join(" ")}
      >
        {/* Number + label */}
        <div className="mb-5 flex items-center gap-3 lg:justify-center">
          <span className="text-[10px] font-semibold tracking-[0.15em] text-[#A1A1AA]">
            {step.number}
          </span>

          <span className="h-px w-6 bg-[#D4D4D8]" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6D28D9]">
            {step.label}
          </span>
        </div>

        {/* ========================================================
            VISUAL
        ======================================================== */}

        <div
          className="
            relative
            h-[265px]
            overflow-hidden
            rounded-[28px]
            border border-[#E4E4E7]
            bg-[#FAFAFA]
            transition-all duration-500
            group-hover:-translate-y-1
            group-hover:border-[#D4D4D8]
            group-hover:shadow-[0_25px_70px_rgba(24,24,27,0.07)]
            sm:h-[290px]
          "
        >
          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #71717A 1px, transparent 1px),
                linear-gradient(to bottom, #71717A 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />

          {/* Step marker */}
          <div className="absolute left-5 top-5 z-10">
            <span className="text-[9px] font-medium tracking-[0.15em] text-[#A1A1AA]">
              STEP {step.number}
            </span>
          </div>

          {index === 0 && <DiscoverVisual />}
          {index === 1 && <ConversationVisual />}
          {index === 2 && <TicketVisual />}

          {/* Hover action */}
          <div
            className="
              absolute bottom-5 right-5
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border border-[#E4E4E7]
              bg-white
              transition-all duration-300
              group-hover:border-[#6D28D9]
              group-hover:bg-[#6D28D9]
            "
          >
            <ArrowUpRightIcon />
          </div>
        </div>

        {/* ========================================================
            TEXT
        ======================================================== */}

        <div className="pt-6 lg:px-4 lg:text-center">
          <h3 className="text-[25px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#27272A] sm:text-[28px]">
            {step.title}
          </h3>

          <p className="mt-4 text-[13px] leading-6 text-[#71717A] lg:mx-auto lg:max-w-[360px]">
            {step.body}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ================================================================
   STEP 01 — DISCOVER
================================================================ */

function DiscoverVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[155px] w-[300px]">
        {/* Back ticket */}
        <div className="absolute left-10 top-7 h-[112px] w-[235px] rotate-[-7deg] rounded-[18px] border border-[#E4E4E7] bg-white" />

        {/* Middle ticket */}
        <div className="absolute left-5 top-4 h-[112px] w-[235px] rotate-[3deg] rounded-[18px] border border-[#DDDDE1] bg-[#F4F4F5]" />

        {/* Main ticket */}
        <div className="absolute left-0 top-0 h-[112px] w-[235px] overflow-hidden rounded-[18px] border border-[#DDD6E5] bg-white shadow-[0_20px_50px_rgba(24,24,27,0.08)]">
          {/* Purple panel */}
          <div className="absolute bottom-0 left-0 top-0 w-[76px] bg-[#6D28D9]" />

          {/* Notches */}
          <span className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

          <span className="absolute left-[66px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

          {/* Content */}
          <div className="relative flex h-full">
            <div className="flex w-[76px] items-center justify-center">
              <Ticket
                size={25}
                strokeWidth={1.5}
                className="text-white"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center px-4">
              <span className="text-[7px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
                Tonight
              </span>

              <p className="mt-1.5 text-[13px] font-semibold tracking-[-0.03em] text-[#27272A]">
                Find something
              </p>

              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />

                <span className="text-[7px] text-[#A1A1AA]">
                  Lagos · 8:00 PM
                </span>
              </div>
            </div>
          </div>

          {/* Perforation */}
          <div className="absolute bottom-3 left-[76px] right-3 border-t border-dashed border-[#E4E4E7]" />
        </div>
      </div>

      {/* Category */}
      <div className="absolute bottom-5 left-5 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-2 shadow-sm">
        <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#71717A]">
          Music · Lagos
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   STEP 02 — CONVERSATION
================================================================ */

function ConversationVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[300px]">
        {/* Message 1 */}
        <div className="flex justify-start">
          <div className="max-w-[190px] rounded-[16px] rounded-tl-[4px] border border-[#E4E4E7] bg-white px-3.5 py-3 shadow-[0_8px_25px_rgba(24,24,27,0.04)]">
            <p className="text-[9px] leading-4 text-[#52525B]">
              Hi 👋 Two VIP tickets?
            </p>

            <p className="mt-1 text-right text-[6px] text-[#A1A1AA]">
              10:03
            </p>
          </div>
        </div>

        {/* Message 2 */}
        <div className="mt-3 flex justify-end">
          <div className="max-w-[160px] rounded-[16px] rounded-tr-[4px] bg-[#EEE8F5] px-3.5 py-3">
            <p className="text-[9px] leading-4 text-[#5F5668]">
              Yes, two please.
            </p>

            <div className="mt-1 flex items-center justify-end gap-1">
              <span className="text-[6px] text-[#A1A1AA]">
                10:04
              </span>

              <CheckCheck
                size={9}
                className="text-[#53BDEB]"
              />
            </div>
          </div>
        </div>

        {/* Message 3 */}
        <div className="mt-3 flex justify-start">
          <div className="max-w-[220px] rounded-[16px] rounded-tl-[4px] border border-[#E4E4E7] bg-white px-3.5 py-3 shadow-[0_8px_25px_rgba(24,24,27,0.04)]">
            <p className="text-[9px] text-[#52525B]">
              Perfect. Your total is:
            </p>

            <div className="mt-2.5 flex items-center justify-between rounded-[9px] bg-[#F6F3F8] px-2.5 py-2">
              <span className="text-[7px] font-medium text-[#71717A]">
                2 × VIP
              </span>

              <span className="text-[9px] font-semibold text-[#6D28D9]">
                ₦30,000
              </span>
            </div>

            <p className="mt-1.5 text-[6px] text-[#A1A1AA]">
              Secure checkout ready
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />

          <span className="h-px w-10 bg-[#D8CDE2]" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#D4D4D8]" />

          <span className="h-px w-10 bg-[#E4E4E7]" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#D4D4D8]" />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   STEP 03 — EXPERIENCE
================================================================ */

function TicketVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Ticket */}
      <div className="relative h-[135px] w-[305px] overflow-hidden rounded-[18px] border border-[#DDD6E5] bg-white shadow-[0_20px_55px_rgba(24,24,27,0.08)]">
        {/* Purple panel */}
        <div className="absolute bottom-0 left-0 top-0 w-[86px] bg-[#6D28D9]">
          <div className="flex h-full flex-col items-center justify-center">
            <Ticket
              size={27}
              strokeWidth={1.5}
              className="text-white"
            />

            <span className="mt-2.5 text-[7px] font-semibold uppercase tracking-[0.13em] text-white/60">
              TICKETY
            </span>
          </div>
        </div>

        {/* Notches */}
        <span className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

        <span className="absolute left-[76px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

        <span className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

        {/* Perforation */}
        <div className="absolute bottom-3 left-[86px] top-3 border-l border-dashed border-[#DDD6E5]" />

        {/* Information */}
        <div className="absolute bottom-0 left-[86px] right-0 top-0 flex items-center justify-between px-4">
          <div>
            <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
              Your ticket
            </p>

            <p className="mt-1.5 text-[15px] font-semibold tracking-[-0.04em] text-[#27272A]">
              Afrobeats Picnic
            </p>

            <div className="mt-2.5 space-y-1">
              <p className="text-[7px] text-[#A1A1AA]">
                Saturday · 8:00 PM
              </p>

              <p className="text-[7px] text-[#A1A1AA]">
                Lagos · 2 × VIP
              </p>
            </div>
          </div>

          <MiniQR />
        </div>

        {/* Ticket ID */}
        <div className="absolute bottom-2.5 left-[100px]">
          <span className="text-[5px] uppercase tracking-[0.12em] text-[#A1A1AA]">
            #TCK-88213
          </span>
        </div>
      </div>

      {/* Entry status */}
      <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-[#E1E8E3] bg-white px-3.5 py-2 shadow-sm">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ECF7EF]">
          <Check
            size={9}
            className="text-[#27804A]"
          />
        </span>

        <span className="text-[7px] font-semibold uppercase tracking-[0.1em] text-[#6E8174]">
          Ready for entry
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   MINI QR
================================================================ */

function MiniQR() {
  const pattern = [
    1, 1, 0, 1, 1,
    1, 0, 1, 0, 1,
    0, 1, 1, 1, 0,
    1, 0, 1, 0, 1,
    1, 1, 0, 1, 1,
  ];

  return (
    <div className="grid h-10 w-10 grid-cols-5 gap-[1px] rounded-[5px] border border-[#EEEEF0] bg-white p-1">
      {pattern.map((value, index) => (
        <span
          key={index}
          className={value ? "bg-[#3F3F46]" : "bg-transparent"}
        />
      ))}
    </div>
  );
}

/* ================================================================
   ARROW ICON
================================================================ */

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 text-[#A1A1AA] transition-colors group-hover:text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}