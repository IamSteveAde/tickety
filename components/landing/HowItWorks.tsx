import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
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
    body: "Explore events by location, category, or what is happening around you. Find the experience first. Decide when you are ready.",
    icon: Compass,
  },
  {
    number: "02",
    label: "GET YOUR TICKET",
    title: "A simpler way to buy.",
    body: "Choose your ticket, answer a few questions, and complete your purchase through a familiar, straightforward flow.",
    icon: MessageCircle,
  },
  {
    number: "03",
    label: "SHOW UP",
    title: "Your ticket is ready when you are.",
    body: "Your ticket and QR code are ready for entry. When it is time, show it at the gate and enjoy the experience.",
    icon: ScanLine,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#FBFAFC] text-zinc-950">
      {/* Quiet editorial background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-violet-100/45 blur-[120px]" />
        <div className="absolute right-[-180px] top-[35%] h-[420px] w-[420px] rounded-full bg-violet-50/50 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/70 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <header className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-violet-600" />

              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-violet-700">
                How Tickety works
              </span>
            </div>

            <p className="mt-6 max-w-[300px] text-[12px] font-medium leading-6 tracking-[-0.01em] text-zinc-500">
              Three simple steps from discovering something you want to do to
              walking through the gate.
            </p>
          </div>

          <div>
            <h2 className="max-w-[880px] text-[3.15rem] font-semibold leading-[0.94] tracking-[-0.065em] text-zinc-950 sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.15rem]">
              Going out should
              <br />
              <span className="text-violet-600">feel this easy.</span>
            </h2>
          </div>
        </header>

        {/* =========================================================
            JOURNEY NAV
        ========================================================= */}
        <div className="mt-14 flex items-center gap-4 border-t border-zinc-200 pt-5 lg:mt-20">
          <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Your journey
          </span>

          <div className="h-px flex-1 bg-zinc-200" />

          <div className="hidden items-center gap-3 sm:flex">
            <JourneyLabel active>Discover</JourneyLabel>
            <ArrowRight size={11} className="text-zinc-300" />
            <JourneyLabel>Get your ticket</JourneyLabel>
            <ArrowRight size={11} className="text-zinc-300" />
            <JourneyLabel>Show up</JourneyLabel>
          </div>
        </div>

        {/* =========================================================
            STEPS
        ========================================================= */}
        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-3">
          {steps.map((step, index) => (
            <JourneyCard
              key={step.number}
              step={step}
              index={index}
            />
          ))}
        </div>

        {/* =========================================================
            BOTTOM BRAND STATEMENT
        ========================================================= */}
        <div className="mt-14 flex flex-col gap-5 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white">
              <Ticket size={15} strokeWidth={1.7} />
            </div>

            <p className="max-w-[520px] text-[11px] font-medium leading-5 tracking-[-0.01em] text-zinc-500">
              Discover on Tickety. Get your ticket simply. Show up ready.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <span>Simple by design</span>
            <ArrowRight size={12} className="text-violet-600" />
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyLabel({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={[
        "text-[9px] font-semibold uppercase tracking-[0.15em]",
        active ? "text-violet-600" : "text-zinc-400",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function JourneyCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[28px] border border-zinc-200/90 bg-white",
        "transition-all duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_24px_70px_rgba(24,24,27,0.08)]",
        index === 1 ? "lg:translate-y-8" : "",
      ].join(" ")}
    >
      {/* Card header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="text-[9px] font-bold tracking-[0.16em] text-zinc-300">
            {step.number}
          </span>

          <span className="h-px w-5 bg-zinc-200" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.17em] text-violet-600">
            {step.label}
          </span>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500 transition-colors duration-300 group-hover:border-violet-200 group-hover:bg-violet-50 group-hover:text-violet-600">
          <Icon size={14} strokeWidth={1.8} />
        </div>
      </div>

      {/* Product visual */}
      <div className="relative h-[260px] overflow-hidden bg-[#F8F7FA] sm:h-[280px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #E4E4E7 1px, transparent 1px), linear-gradient(to bottom, #E4E4E7 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-zinc-200/70" />

        {index === 0 && <DiscoverVisual />}
        {index === 1 && <ConversationVisual />}
        {index === 2 && <TicketVisual />}

        <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-300 group-hover:border-violet-600 group-hover:bg-violet-600 group-hover:text-white">
          <ArrowUpRight
            size={14}
            strokeWidth={1.8}
            className="text-zinc-400 transition-colors group-hover:text-white"
          />
        </div>
      </div>

      {/* Copy */}
      <div className="px-5 pb-7 pt-6 sm:px-7">
        <h3 className="max-w-[390px] text-[24px] font-semibold leading-[1.02] tracking-[-0.045em] text-zinc-900 sm:text-[27px]">
          {step.title}
        </h3>

        <p className="mt-4 max-w-[390px] text-[12px] font-medium leading-6 tracking-[-0.005em] text-zinc-500">
          {step.body}
        </p>
      </div>
    </article>
  );
}

function DiscoverVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[290px] sm:w-[320px]">
        {/* Main event card */}
        <div className="relative overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_24px_55px_rgba(24,24,27,0.09)]">
          <div className="h-[84px] bg-violet-600">
            <div className="flex h-full items-end justify-between p-4">
              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/65">
                Tonight
              </span>

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white">
                <Ticket size={15} strokeWidth={1.7} />
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-[14px] font-semibold tracking-[-0.035em] text-zinc-900">
              Afrobeats Picnic
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
              <span className="text-[8px] font-medium text-zinc-400">
                Lagos · 8:00 PM
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
              <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Music
              </span>

              <span className="text-[8px] font-semibold text-violet-600">
                View event
              </span>
            </div>
          </div>
        </div>

        {/* Search / discovery chip */}
        <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-[0_14px_35px_rgba(24,24,27,0.08)]">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <Compass size={12} strokeWidth={1.8} />
          </div>

          <span className="text-[8px] font-semibold text-zinc-600">
            Events near you
          </span>
        </div>
      </div>
    </div>
  );
}

function ConversationVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[285px] sm:w-[310px]">
        <div className="flex justify-start">
          <div className="max-w-[195px] rounded-[17px] rounded-tl-[5px] border border-zinc-200 bg-white px-3.5 py-3 shadow-[0_10px_28px_rgba(24,24,27,0.05)]">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 text-white">
                <MessageCircle size={10} strokeWidth={1.8} />
              </div>

              <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                Tickety
              </span>
            </div>

            <p className="text-[9px] font-medium leading-4 text-zinc-600">
              How many VIP tickets would you like?
            </p>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <div className="max-w-[145px] rounded-[17px] rounded-tr-[5px] bg-zinc-950 px-3.5 py-3 text-white">
            <p className="text-[9px] font-medium leading-4">
              Two tickets, please.
            </p>

            <div className="mt-2 flex justify-end">
              <span className="flex items-center gap-1 text-[6px] text-white/45">
                Sent
                <Check size={8} strokeWidth={2} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-start">
          <div className="max-w-[220px] rounded-[17px] rounded-tl-[5px] border border-zinc-200 bg-white px-3.5 py-3 shadow-[0_10px_28px_rgba(24,24,27,0.05)]">
            <p className="text-[9px] font-medium text-zinc-600">
              Perfect. Your total is:
            </p>

            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-violet-50 px-2.5 py-2.5">
              <span className="text-[7px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
                2 × VIP
              </span>

              <span className="text-[10px] font-bold tracking-[-0.02em] text-violet-600">
                ₦30,000
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="h-1.5 w-6 rounded-full bg-violet-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-300" />
        </div>
      </div>
    </div>
  );
}

function TicketVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[305px]">
        <div className="relative overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-[0_24px_55px_rgba(24,24,27,0.09)]">
          <div className="flex min-h-[145px]">
            <div className="flex w-[82px] shrink-0 flex-col items-center justify-center bg-violet-600 text-white">
              <Ticket size={24} strokeWidth={1.5} />

              <span className="mt-2 text-[7px] font-semibold uppercase tracking-[0.14em] text-white/55">
                Tickety
              </span>
            </div>

            <div className="flex flex-1 items-center justify-between px-4">
              <div>
                <p className="text-[7px] font-semibold uppercase tracking-[0.15em] text-zinc-400">
                  Your ticket
                </p>

                <p className="mt-1.5 text-[15px] font-semibold tracking-[-0.04em] text-zinc-900">
                  Afrobeats Picnic
                </p>

                <div className="mt-2.5 space-y-1">
                  <p className="text-[7px] font-medium text-zinc-400">
                    Saturday · 8:00 PM
                  </p>

                  <p className="text-[7px] font-medium text-zinc-400">
                    Lagos · 2 × VIP
                  </p>
                </div>
              </div>

              <MiniQR />
            </div>
          </div>

          <div className="border-t border-dashed border-zinc-200 px-4 py-2.5">
            <span className="text-[5px] font-semibold uppercase tracking-[0.14em] text-zinc-300">
              #TCK-88213
            </span>
          </div>
        </div>

        <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-[0_14px_35px_rgba(24,24,27,0.08)]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={10} strokeWidth={2.5} />
          </span>

          <span className="text-[8px] font-semibold text-zinc-600">
            Ready for entry
          </span>
        </div>
      </div>
    </div>
  );
}

function MiniQR() {
  const pattern = [
    1, 1, 0, 1, 1,
    1, 0, 1, 0, 1,
    0, 1, 1, 1, 0,
    1, 0, 1, 0, 1,
    1, 1, 0, 1, 1,
  ];

  return (
    <div
      aria-label="Ticket QR code preview"
      className="grid h-10 w-10 shrink-0 grid-cols-5 gap-[1px] rounded-md border border-zinc-200 bg-white p-1"
    >
      {pattern.map((value, index) => (
        <span
          key={index}
          className={value ? "bg-zinc-800" : "bg-transparent"}
        />
      ))}
    </div>
  );
}
