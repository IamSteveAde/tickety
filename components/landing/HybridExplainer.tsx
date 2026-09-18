import {
  ArrowRight,
  Check,
  Globe2,
  MessageCircle,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";

const rows = [
  "Browse and discover events",
  "Search by location & category",
  "Choose your ticket",
  "Pay without unnecessary friction",
  "Receive your ticket instantly",
];

function CheckMark() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/10">
      <Check
        size={13}
        strokeWidth={2.5}
        className="text-[#7C3AED]"
      />
    </span>
  );
}

export default function HybridExplainer() {
  return (
    <section className="relative overflow-hidden bg-[#F7F5FA]">
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Purple atmosphere */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.16),transparent_35%),radial-gradient(circle_at_0%_60%,rgba(168,85,247,0.08),transparent_30%),radial-gradient(circle_at_100%_65%,rgba(109,40,217,0.08),transparent_30%)]" />

        {/* Large central glow */}

        <div className="absolute left-1/2 top-[35%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#C4B5FD]/10 blur-[150px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #6D28D9 1px, transparent 1px),
              linear-gradient(to bottom, #6D28D9 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* Decorative stars */}

        <Star
          className="absolute left-[5%] top-[12%] rotate-12 text-[#7C3AED]/10"
          size={110}
          strokeWidth={0.8}
        />

        <Sparkles
          className="absolute bottom-[12%] right-[6%] text-[#7C3AED]/10"
          size={130}
          strokeWidth={0.8}
        />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        {/* ============================================================
            HEADER
        ============================================================ */}

        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow */}

          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#7C3AED]/10 bg-white/80 px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED] text-white">
              <Sparkles
                size={10}
                fill="currentColor"
              />
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#6D28D9]">
              Built around how people actually buy
            </span>
          </div>

          {/* Heading */}

          <h2 className="text-[3.4rem] font-semibold leading-[0.92] tracking-[-0.065em] text-[#18181B] sm:text-[4.8rem] lg:text-[6rem] xl:text-[6.6rem]">
            Discover here.
            <br />
            <span className="text-[#A1A1AA]">Continue there.</span>
            <br />
            <span className="text-[#7C3AED]">Never lose the moment.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#71717A] sm:text-base">
            Tickety brings event discovery and ticket purchase together without
            forcing the entire experience into one place.
          </p>
        </div>

        {/* ============================================================
            MAIN EXPERIENCE
        ============================================================ */}

        <div className="relative mt-16 lg:mt-20">
          {/* Connection line */}

          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[132px] hidden h-px bg-gradient-to-r from-transparent via-[#7C3AED]/25 to-transparent lg:block" />

          <div className="grid gap-5 lg:grid-cols-3">
            {/* ========================================================
                01 — DISCOVER
            ======================================================== */}

            <ExperienceCard
              number="01"
              label="DISCOVER"
              title="Start where discovery feels natural."
              description="Browse events, explore what's happening and find somewhere worth showing up."
              featured
            >
              <DiscoverVisual />
            </ExperienceCard>

            {/* ========================================================
                02 — CONVERSATION
            ======================================================== */}

            <ExperienceCard
              number="02"
              label="CONVERSATION"
              title="Continue in a conversation."
              description="When you're ready to buy, move into a familiar experience where everything is simple."
            >
              <ConversationVisual />
            </ExperienceCard>

            {/* ========================================================
                03 — TICKET
            ======================================================== */}

            <ExperienceCard
              number="03"
              label="EXPERIENCE"
              title="Arrive with your ticket ready."
              description="Your ticket and QR code are waiting when you need them. Just show up."
            >
              <TicketVisual />
            </ExperienceCard>
          </div>
        </div>

        {/* ============================================================
            WHAT EACH SURFACE DOES BEST
        ============================================================ */}

        <div className="mt-16 overflow-hidden rounded-[30px] border border-black/[0.06] bg-white/85 shadow-[0_25px_90px_rgba(24,24,27,0.06)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            {/* Left */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#4C1D95] via-[#6D28D9] to-[#7C3AED] p-7 text-white sm:p-9 lg:p-11">
              {/* Glow */}

              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/15 blur-[80px]" />

              {/* Star */}

              <Star
                className="absolute right-8 top-8 rotate-12 text-white/15"
                size={90}
                strokeWidth={0.8}
              />

              <div className="relative">
                <div className="mb-7 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <Sparkles
                    size={16}
                    fill="currentColor"
                  />
                </div>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/55">
                  The Tickety approach
                </p>

                <h3 className="mt-5 max-w-md text-3xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-4xl">
                  Each part of the journey has a place.
                </h3>

                <p className="mt-5 max-w-md text-sm leading-6 text-white/65">
                  Instead of making one platform do everything, Tickety lets
                  discovery stay visual and ticketing stay conversational.
                </p>

                {/* Mini journey */}

                <div className="mt-9 flex items-center gap-2">
                  <div className="rounded-full bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-[#6D28D9]">
                    Discover
                  </div>

                  <ArrowRight
                    size={13}
                    className="text-white/35"
                  />

                  <div className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-white/75">
                    Chat
                  </div>

                  <ArrowRight
                    size={13}
                    className="text-white/35"
                  />

                  <div className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.1em] text-white/75">
                    Enter
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="p-7 sm:p-9 lg:p-11">
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#A1A1AA]">
                    What matters
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[#27272A]">
                    Everything important stays simple.
                  </h3>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#F1ECF7] sm:flex">
                  <Check
                    size={16}
                    className="text-[#7C3AED]"
                  />
                </div>
              </div>

              <div className="divide-y divide-black/[0.055]">
                {rows.map((row) => (
                  <div
                    key={row}
                    className="flex items-center gap-3 py-4"
                  >
                    <CheckMark />

                    <span className="text-sm font-medium text-[#52525B]">
                      {row}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            FINAL STATEMENT
        ============================================================ */}

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#18181B] text-white shadow-lg">
            <span className="text-sm font-semibold">t</span>
          </div>

          <p className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.04em] text-[#18181B] sm:text-3xl">
            The shortest path from{" "}
            <span className="text-[#7C3AED]">“I want to go”</span> to{" "}
            <span className="text-[#7C3AED]">“I&apos;m there.”</span>
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.16em] text-[#A1A1AA]">
            <span>Discover</span>

            <ArrowRight
              size={12}
              className="text-[#7C3AED]"
            />

            <span>Choose</span>

            <ArrowRight
              size={12}
              className="text-[#7C3AED]"
            />

            <span>Pay</span>

            <ArrowRight
              size={12}
              className="text-[#7C3AED]"
            />

            <span>Go</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   EXPERIENCE CARD
================================================================ */

function ExperienceCard({
  number,
  label,
  title,
  description,
  children,
  featured = false,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[30px] transition-all duration-500 hover:-translate-y-1.5",
        featured
          ? "bg-gradient-to-br from-[#E9D5FF] via-[#A855F7] to-[#581C87] p-[2px] shadow-[0_30px_80px_rgba(76,29,149,0.18)]"
          : "border border-black/[0.07] bg-white shadow-[0_20px_65px_rgba(24,24,27,0.06)]",
      ].join(" ")}
    >
      <div
        className={[
          "relative h-full overflow-hidden",
          featured
            ? "rounded-[28px] bg-white"
            : "rounded-[30px]",
        ].join(" ")}
      >
        {/* Featured star */}

        {featured && (
          <div className="absolute right-5 top-5 z-30 flex h-11 w-11 rotate-6 items-center justify-center rounded-full bg-[#6D28D9] text-white shadow-[0_10px_30px_rgba(109,40,217,0.3)] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105">
            <Star
              size={18}
              fill="currentColor"
              strokeWidth={1.4}
            />
          </div>
        )}

        {/* Visual */}

        <div className="relative h-[250px] overflow-hidden bg-[#FAFAFA]">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #6D28D9 1px, transparent 1px),
                linear-gradient(to bottom, #6D28D9 1px, transparent 1px)
              `,
              backgroundSize: "45px 45px",
            }}
          />

          <div className="absolute left-6 top-6 z-20">
            <span className="text-[10px] font-semibold tracking-[0.15em] text-[#A1A1AA]">
              {number}
            </span>
          </div>

          {children}
        </div>

        {/* Content */}

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2">
            <span
              className={[
                "h-1.5 w-1.5 rounded-full",
                featured ? "bg-[#7C3AED]" : "bg-[#A1A1AA]",
              ].join(" ")}
            />

            <span className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#A1A1AA]">
              {label}
            </span>
          </div>

          <h3 className="mt-5 text-[25px] font-semibold leading-[1.03] tracking-[-0.045em] text-[#27272A]">
            {title}
          </h3>

          <p className="mt-4 text-[13px] leading-6 text-[#71717A]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ================================================================
   DISCOVER VISUAL
================================================================ */

function DiscoverVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Purple glow */}

      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/10 blur-[55px]" />

      <div className="relative h-[150px] w-[270px]">
        {/* Back ticket */}

        <div className="absolute left-9 top-8 h-[105px] w-[225px] rotate-[-7deg] rounded-[17px] border border-[#E4E4E7] bg-white" />

        {/* Middle */}

        <div className="absolute left-4 top-4 h-[105px] w-[225px] rotate-[3deg] rounded-[17px] border border-[#DDD6E5] bg-[#F5F3F7]" />

        {/* Main */}

        <div className="absolute left-0 top-0 h-[105px] w-[225px] overflow-hidden rounded-[17px] border border-[#D8CBE4] bg-white shadow-[0_20px_45px_rgba(76,29,149,0.1)]">
          {/* Purple panel */}

          <div className="absolute bottom-0 left-0 top-0 w-[72px] bg-gradient-to-b from-[#7C3AED] to-[#5B21B6]" />

          {/* Notches */}

          <span className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

          <span className="absolute left-[62px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

          <div className="relative flex h-full">
            <div className="flex w-[72px] items-center justify-center">
              <Ticket
                size={25}
                strokeWidth={1.4}
                className="text-white"
              />
            </div>

            <div className="flex flex-1 flex-col justify-center px-4">
              <span className="text-[7px] font-bold uppercase tracking-[0.15em] text-[#A1A1AA]">
                Tonight
              </span>

              <p className="mt-1.5 text-[13px] font-semibold tracking-[-0.03em] text-[#27272A]">
                Find something
              </p>

              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />

                <span className="text-[7px] text-[#A1A1AA]">
                  Lagos · 8:00 PM
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 left-[72px] right-3 border-t border-dashed border-[#E4E4E7]" />
        </div>
      </div>

      {/* Floating label */}

      <div className="absolute bottom-5 left-5 rounded-full border border-[#E4E4E7] bg-white px-3 py-2 shadow-sm">
        <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#71717A]">
          Music · Lagos
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   CONVERSATION VISUAL
================================================================ */

function ConversationVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[280px]">
        {/* Conversation glow */}

        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D366]/[0.04] blur-[50px]" />

        {/* Incoming */}

        <div className="relative flex justify-start">
          <div className="max-w-[185px] rounded-[16px] rounded-tl-[4px] border border-[#E4E4E7] bg-white px-3.5 py-3 shadow-[0_8px_25px_rgba(24,24,27,0.04)]">
            <p className="text-[9px] leading-4 text-[#52525B]">
              Hi 👋 Two VIP tickets?
            </p>

            <p className="mt-1 text-right text-[6px] text-[#A1A1AA]">
              10:03
            </p>
          </div>
        </div>

        {/* Outgoing */}

        <div className="relative mt-3 flex justify-end">
          <div className="max-w-[160px] rounded-[16px] rounded-tr-[4px] bg-[#EDE7F4] px-3.5 py-3">
            <p className="text-[9px] leading-4 text-[#5F5668]">
              Yes, two please.
            </p>

            <div className="mt-1 flex items-center justify-end gap-1">
              <span className="text-[6px] text-[#A1A1AA]">
                10:04
              </span>

              <Check
                size={9}
                className="text-[#7C3AED]"
              />
            </div>
          </div>
        </div>

        {/* Price */}

        <div className="relative mt-3 flex justify-start">
          <div className="max-w-[215px] rounded-[16px] rounded-tl-[4px] border border-[#E4E4E7] bg-white px-3.5 py-3 shadow-[0_8px_25px_rgba(24,24,27,0.04)]">
            <p className="text-[9px] text-[#52525B]">
              Perfect. Your total is:
            </p>

            <div className="mt-2.5 flex items-center justify-between rounded-[9px] bg-[#F5F2F8] px-2.5 py-2">
              <span className="text-[7px] font-medium text-[#71717A]">
                2 × VIP
              </span>

              <span className="text-[9px] font-semibold text-[#6D28D9]">
                ₦30,000
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   TICKET VISUAL
================================================================ */

function TicketVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Glow */}

        <div className="absolute left-1/2 top-1/2 h-36 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/10 blur-[50px]" />

        {/* Ticket */}

        <div className="relative h-[130px] w-[290px] overflow-hidden rounded-[17px] border border-[#DDD6E5] bg-white shadow-[0_20px_50px_rgba(76,29,149,0.1)]">
          {/* Purple */}

          <div className="absolute bottom-0 left-0 top-0 w-[82px] bg-gradient-to-b from-[#7C3AED] to-[#5B21B6]">
            <div className="flex h-full flex-col items-center justify-center">
              <Ticket
                size={26}
                strokeWidth={1.4}
                className="text-white"
              />

              <span className="mt-2 text-[6px] font-bold uppercase tracking-[0.14em] text-white/55">
                TICKETY
              </span>
            </div>
          </div>

          {/* Notches */}

          <span className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

          <span className="absolute left-[72px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

          <span className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#FAFAFA]" />

          {/* Perforation */}

          <div className="absolute bottom-3 left-[82px] top-3 border-l border-dashed border-[#DDD6E5]" />

          {/* Info */}

          <div className="absolute bottom-0 left-[82px] right-0 top-0 flex items-center justify-between px-4">
            <div>
              <p className="text-[6px] font-bold uppercase tracking-[0.14em] text-[#A1A1AA]">
                Your ticket
              </p>

              <p className="mt-1.5 text-[14px] font-semibold tracking-[-0.04em] text-[#27272A]">
                Afrobeats Picnic
              </p>

              <div className="mt-2 space-y-1">
                <p className="text-[6.5px] text-[#A1A1AA]">
                  Saturday · 8:00 PM
                </p>

                <p className="text-[6.5px] text-[#A1A1AA]">
                  Lagos · 2 × VIP
                </p>
              </div>
            </div>

            <MiniQR />
          </div>
        </div>

        {/* Status */}

        <div className="absolute -bottom-4 left-5 flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-white px-3 py-2 shadow-[0_8px_25px_rgba(0,0,0,0.08)]">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#ECF7EF]">
            <Check
              size={9}
              className="text-[#27804A]"
            />
          </span>

          <span className="text-[7px] font-bold uppercase tracking-[0.1em] text-[#6E8174]">
            Ready for entry
          </span>
        </div>
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
    <div className="grid h-9 w-9 grid-cols-5 gap-[1px] rounded-[4px] border border-[#EEEEF0] bg-white p-1">
      {pattern.map((value, index) => (
        <span
          key={index}
          className={value ? "bg-[#3F3F46]" : "bg-transparent"}
        />
      ))}
    </div>
  );
}