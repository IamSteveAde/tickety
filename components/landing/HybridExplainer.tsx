import {
  ArrowRight,
  Check,
  Globe2,
  MessageCircle,
  Minus,
  Sparkles,
  X,
} from "lucide-react";

type Row = {
  label: string;
  website: "yes" | "no" | "partial";
  whatsapp: "yes" | "no" | "partial";
};

const rows: Row[] = [
  {
    label: "Good for browsing and discovery",
    website: "yes",
    whatsapp: "no",
  },
  {
    label: "Zero-friction checkout",
    website: "no",
    whatsapp: "yes",
  },
  {
    label: "Ticket delivery you can't miss",
    website: "no",
    whatsapp: "yes",
  },
  {
    label: "Organiser dashboards & attendee tables",
    website: "yes",
    whatsapp: "no",
  },
  {
    label: "Familiar to how Nigerians already buy things",
    website: "partial",
    whatsapp: "yes",
  },
];

function Mark({
  value,
}: {
  value: "yes" | "no" | "partial";
}) {
  if (value === "yes") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/10">
        <Check
          size={15}
          strokeWidth={2.5}
          className="text-[#7C3AED]"
        />
      </span>
    );
  }

  if (value === "no") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.035]">
        <X
          size={14}
          strokeWidth={2}
          className="text-black/20"
        />
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F59E0B]/10">
      <Minus
        size={15}
        strokeWidth={2.5}
        className="text-[#D97706]"
      />
    </span>
  );
}

export default function HybridExplainer() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F5F1EB]">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        {/* Warm base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#F7F3EE_38%,#EEE8DF_100%)]" />

        {/* Purple glow */}
        <div className="absolute left-[35%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#7C3AED]/[0.045] blur-[130px]" />

        {/* Warm glow */}
        <div className="absolute -right-[15%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-[#F59E0B]/[0.035] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/70 px-3.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl">
            <Sparkles
              size={13}
              className="text-[#7C3AED]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/50">
              Built differently
            </span>
          </div>

          <h2 className="font-display text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-[#111014] sm:text-5xl lg:text-6xl">
            Why not just an app?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-black/50 sm:text-lg sm:leading-8">
            Because one surface shouldn't have to do everything. Tickety gives
            discovery to the web and checkout to WhatsApp.
          </p>
        </div>

        {/* =====================================================
            HYBRID VISUAL
        ===================================================== */}
        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-[18%] right-[18%] top-1/2 hidden h-px bg-gradient-to-r from-transparent via-[#7C3AED]/20 to-transparent lg:block" />

          <div className="relative grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
            {/* =================================================
                WEBSITE
            ================================================= */}
            <div className="relative overflow-hidden rounded-[30px] border border-black/[0.07] bg-white/75 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-8">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7C3AED]/[0.06] blur-[60px]" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#111014] text-white shadow-lg">
                      <Globe2 size={19} />
                    </div>

                    <div>
                      <p className="font-display text-lg font-semibold tracking-[-0.025em] text-[#111014]">
                        The website
                      </p>

                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-black/35">
                        Discovery
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#7C3AED]/[0.07] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#7C3AED]">
                    Best at
                  </span>
                </div>

                {/* Statement */}
                <div className="mt-9">
                  <p className="font-display text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#111014] sm:text-3xl">
                    Find something
                    <br />
                    worth going to.
                  </p>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-black/45">
                    Explore events, compare options and decide where you want
                    to be.
                  </p>
                </div>

                {/* Capabilities */}
                <div className="mt-8 space-y-3">
                  {[
                    "Browse and discover",
                    "Search by location & category",
                    "Compare events",
                    "Organiser dashboards",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[13px] border border-black/[0.055] bg-[#FAFAF9] px-3.5 py-3"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7C3AED]/10">
                        <Check
                          size={12}
                          className="text-[#7C3AED]"
                        />
                      </span>

                      <span className="text-xs font-medium text-black/60">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom label */}
                <div className="mt-7 border-t border-black/[0.06] pt-5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/25">
                    Where the journey begins
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                TICKETY CONNECTION
            ================================================= */}
            <div className="relative z-20 flex items-center justify-center py-5 lg:px-[-1px] lg:py-0">
              <div className="relative flex items-center justify-center">
                {/* Glow */}
                <div className="absolute h-28 w-28 rounded-full bg-[#7C3AED]/20 blur-[35px]" />

                {/* Connector */}
                <div className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/20 bg-[#100A19] shadow-[0_20px_60px_rgba(55,20,100,0.25)]">
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] shadow-[0_8px_30px_rgba(124,58,237,0.3)]">
                    <span className="font-display text-lg font-semibold text-white">
                      t
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                WHATSAPP
            ================================================= */}
            <div className="relative overflow-hidden rounded-[30px] border border-[#075E54]/10 bg-[#F7FAF8] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.06)] sm:p-8">
              {/* Green glow */}
              <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#25D366]/[0.07] blur-[60px]" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#25D366] text-white shadow-lg shadow-[#25D366]/10">
                      <MessageCircle
                        size={20}
                        fill="currentColor"
                      />
                    </div>

                    <div>
                      <p className="font-display text-lg font-semibold tracking-[-0.025em] text-[#111014]">
                        WhatsApp
                      </p>

                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-black/35">
                        Transaction
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#25D366]/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#128C7E]">
                    Best at
                  </span>
                </div>

                {/* Statement */}
                <div className="mt-9">
                  <p className="font-display text-2xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#111014] sm:text-3xl">
                    Get your ticket
                    <br />
                    without the friction.
                  </p>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-black/45">
                    Choose, pay and receive your ticket inside a conversation
                    you already know.
                  </p>
                </div>

                {/* Capabilities */}
                <div className="mt-8 space-y-3">
                  {[
                    "Choose your ticket",
                    "Pay without creating an account",
                    "Receive your QR ticket",
                    "Familiar Nigerian buying flow",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[13px] border border-[#25D366]/[0.08] bg-white/70 px-3.5 py-3"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]/10">
                        <Check
                          size={12}
                          className="text-[#128C7E]"
                        />
                      </span>

                      <span className="text-xs font-medium text-black/60">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom label */}
                <div className="mt-7 border-t border-black/[0.06] pt-5">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/25">
                    Where the journey converts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            COMPARISON
        ===================================================== */}
        <div className="mt-16 overflow-hidden rounded-[28px] border border-black/[0.07] bg-white/80 shadow-[0_25px_80px_rgba(0,0,0,0.05)] backdrop-blur-xl">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_100px_100px] border-b border-black/[0.07] sm:grid-cols-[1fr_140px_140px]">
            <div className="px-5 py-5 sm:px-7">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                What matters
              </span>
            </div>

            <div className="border-l border-black/[0.05] px-4 py-5 text-center sm:px-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/40">
                Website
              </span>
            </div>

            <div className="border-l border-black/[0.05] bg-[#25D366]/[0.025] px-4 py-5 text-center sm:px-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#128C7E]">
                WhatsApp
              </span>
            </div>
          </div>

          {/* Rows */}
          <div>
            {rows.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_140px_140px] ${
                  index !== rows.length - 1
                    ? "border-b border-black/[0.05]"
                    : ""
                }`}
              >
                <div className="flex items-center px-5 py-4 sm:px-7 sm:py-5">
                  <span className="text-xs font-medium leading-5 text-black/65 sm:text-sm">
                    {row.label}
                  </span>
                </div>

                <div className="flex items-center justify-center border-l border-black/[0.05] px-4 py-4 sm:px-6 sm:py-5">
                  <Mark value={row.website} />
                </div>

                <div className="flex items-center justify-center border-l border-black/[0.05] bg-[#25D366]/[0.02] px-4 py-4 sm:px-6 sm:py-5">
                  <Mark value={row.whatsapp} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            FINAL STATEMENT
        ===================================================== */}
        <div className="relative mx-auto mt-14 max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#111014] text-white shadow-lg">
            <span className="font-display text-sm font-semibold">
              t
            </span>
          </div>

          <p className="font-display text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#111014] sm:text-3xl">
            Two surfaces.
            <span className="text-[#7C3AED]"> One experience.</span>
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/45 sm:text-base sm:leading-7">
            Tickety lets each surface do what it does best. Discover on the
            web, continue in WhatsApp, and move from interest to entry without
            creating another account.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-black/30">
            <span>Website</span>

            <ArrowRight
              size={12}
              className="text-[#7C3AED]/50"
            />

            <span className="text-[#7C3AED]">Tickety</span>

            <ArrowRight
              size={12}
              className="text-[#7C3AED]/50"
            />

            <span className="text-[#128C7E]">WhatsApp</span>
          </div>
        </div>
      </div>
    </section>
  );
}