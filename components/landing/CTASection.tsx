import Button from "@/components/ui/Button";
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Sparkles,
  Star,
  Ticket,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F7F5FA]">
      {/* =========================================================
          SECTION ATMOSPHERE
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[18%] h-[420px] w-[420px] rounded-full bg-[#7C3AED]/[0.06] blur-[130px]" />
        <div className="absolute right-[8%] bottom-[5%] h-[380px] w-[380px] rounded-full bg-[#A855F7]/[0.055] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* =======================================================
            MAIN CTA
        ======================================================= */}
        <div className="relative overflow-hidden rounded-[32px] border border-[#7C3AED]/10 bg-[#0A0711] shadow-[0_40px_120px_rgba(38,20,68,0.18)] sm:rounded-[40px]">
          {/* =====================================================
              BACKGROUND
          ===================================================== */}
          <div className="pointer-events-none absolute inset-0">
            {/* Base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,#4C1D95_0%,#24103F_28%,#10091A_58%,#08060D_100%)]" />

            {/* Left purple atmosphere */}
            <div className="absolute -left-[15%] -top-[45%] h-[700px] w-[700px] rounded-full bg-[#7C3AED]/25 blur-[160px]" />

            {/* Right purple atmosphere */}
            <div className="absolute -right-[15%] -bottom-[45%] h-[650px] w-[650px] rounded-full bg-[#9333EA]/20 blur-[160px]" />

            {/* Center light */}
            <div className="absolute left-1/2 top-[35%] h-[420px] w-[600px] -translate-x-1/2 rounded-full bg-[#A855F7]/[0.06] blur-[130px]" />

            {/* Grid */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                `,
                backgroundSize: "72px 72px",
              }}
            />

            {/* Soft vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.28)_100%)]" />
          </div>

          {/* =====================================================
              DECORATIVE RINGS
          ===================================================== */}
          <div className="pointer-events-none absolute left-1/2 top-[42%] hidden h-[560px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] lg:block" />

          <div className="pointer-events-none absolute left-1/2 top-[42%] hidden h-[400px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.025] lg:block" />

          {/* =====================================================
              FLOATING BRAND DETAILS
          ===================================================== */}

          {/* Top left */}
          <div className="pointer-events-none absolute left-6 top-7 hidden sm:block lg:left-10 lg:top-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
              <MessageCircle
                size={17}
                strokeWidth={1.7}
                className="text-[#C084FC]/70"
              />
            </div>
          </div>

          {/* Top right */}
          <div className="pointer-events-none absolute right-6 top-7 hidden sm:block lg:right-10 lg:top-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
              <Ticket
                size={17}
                strokeWidth={1.7}
                className="text-[#C084FC]/70"
              />
            </div>
          </div>

          {/* =====================================================
              CONTENT
          ===================================================== */}
          <div className="relative px-6 py-14 sm:px-10 sm:py-20 lg:px-20 lg:py-24">
            {/* ===================================================
                EYEBROW
            =================================================== */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C084FC]/20 bg-[#7C3AED]/10 px-3.5 py-2 backdrop-blur-xl">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED]/20">
                  <Sparkles
                    size={11}
                    className="text-[#D8B4FE]"
                  />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                  Built for better events
                </span>
              </div>
            </div>

            {/* ===================================================
                HEADING
            =================================================== */}
            <div className="mx-auto mt-7 max-w-4xl text-center">
              <h2 className="font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl lg:text-7xl">
                Make your next event
                <br />
                <span className="bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#A78BFA] bg-clip-text text-transparent">
                  worth talking about.
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8 lg:text-lg">
                List your event in minutes. Let Tickety handle the ticketing
                conversation, payments and check-ins, while you focus on
                creating an experience people remember.
              </p>
            </div>

            {/* ===================================================
                ACTION AREA
            =================================================== */}
            <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
              {/* Primary */}
              <div className="group relative">
                <div className="absolute -inset-px rounded-[20px] bg-gradient-to-r from-[#A855F7] via-[#7C3AED] to-[#C084FC] opacity-70 blur-[2px] transition-opacity duration-300 group-hover:opacity-100" />

                <Button
                  href="/organiser/events/new"
                  size="lg"
                  icon={<ArrowUpRight size={18} />}
                  className="relative h-14 w-full rounded-[18px] bg-white px-6 font-semibold text-[#000] shadow-[0_18px_50px_rgba(255,255,255,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_65px_rgba(255,255,255,0.16)]"
                >
                  Create your event
                </Button>
              </div>

              {/* Secondary */}
              <a
                href="/organiser/dashboard"
                className="group flex h-14 items-center justify-center gap-2 rounded-[18px] border border-white/10 bg-white/[0.045] px-6 text-sm font-semibold text-white/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                Explore your dashboard

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* ===================================================
                TRUST POINTS
            =================================================== */}
            <div className="mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <TrustPoint>No complicated setup</TrustPoint>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <TrustPoint>WhatsApp ticketing</TrustPoint>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <TrustPoint>Real-time check-ins</TrustPoint>
            </div>

            {/* ===================================================
                PURPLE FEATURE STRIP
            =================================================== */}
            <div className="mx-auto mt-14 max-w-3xl">
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-1 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/10 via-transparent to-[#A855F7]/10" />

                <div className="relative flex flex-col items-center gap-4 px-5 py-5 sm:flex-row sm:justify-between sm:px-6">
                  {/* Brand mark */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] shadow-[0_8px_25px_rgba(124,58,237,0.3)]">
                      <Star
                        size={17}
                        fill="currentColor"
                        className="text-white"
                      />

                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#E9D5FF] shadow-[0_0_12px_rgba(233,213,255,0.8)]" />
                    </div>

                    <div className="text-left">
                      <p className="text-xs font-semibold text-white">
                        Everything connected.
                      </p>

                      <p className="mt-0.5 text-[11px] text-white/35">
                        From discovery to the door.
                      </p>
                    </div>
                  </div>

                  {/* Journey */}
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
                    <span>Discover</span>

                    <span className="text-[#A855F7]/70">→</span>

                    <span>Sell</span>

                    <span className="text-[#A855F7]/70">→</span>

                    <span>Scan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================
                BOTTOM MARK
            =================================================== */}
            <div className="mx-auto mt-12 flex max-w-sm items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />

              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.035]">
                <Ticket
                  size={14}
                  strokeWidth={1.6}
                  className="text-[#C084FC]"
                />

                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#C084FC] shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
              </div>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <p className="mt-4 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-white/20">
              Discover · Sell · Scan
            </p>
          </div>

          {/* =====================================================
              DECORATIVE STARS / LIGHT POINTS
          ===================================================== */}

          <div className="pointer-events-none absolute left-[12%] top-[28%]">
            <Star
              size={13}
              fill="currentColor"
              className="text-[#C084FC]/40"
            />
          </div>

          <div className="pointer-events-none absolute right-[13%] top-[34%]">
            <Sparkles
              size={15}
              className="text-[#A78BFA]/35"
            />
          </div>

          <div className="pointer-events-none absolute bottom-[20%] left-[18%] h-1.5 w-1.5 rounded-full bg-[#C084FC]/60 shadow-[0_0_20px_rgba(192,132,252,0.8)]" />

          <div className="pointer-events-none absolute bottom-[24%] right-[19%] h-1.5 w-1.5 rounded-full bg-[#A78BFA]/50 shadow-[0_0_20px_rgba(167,139,250,0.7)]" />
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   TRUST POINT
   =============================================================== */

function TrustPoint({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-2 text-[10px] font-medium text-white/40">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366]/10">
        <Check
          size={9}
          strokeWidth={2.5}
          className="text-[#25D366]"
        />
      </span>

      {children}
    </span>
  );
}