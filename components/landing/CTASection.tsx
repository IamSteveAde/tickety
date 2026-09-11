import Button from "@/components/ui/Button";
import {
  ArrowUpRight,
  Check,
  MessageCircle,
  Sparkles,
  Ticket,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F7F5]">
      {/* =========================================================
          OUTER ATMOSPHERE
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[20%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#7C3AED]/[0.045] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* =======================================================
            CTA FRAME
        ======================================================= */}
        <div className="relative overflow-hidden rounded-[36px] bg-[#09070F] shadow-[0_35px_100px_rgba(0,0,0,0.15)]">
          {/* =====================================================
              BACKGROUND ATMOSPHERE
          ===================================================== */}
          <div className="pointer-events-none absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#241044_0%,#13091F_35%,#09070F_72%,#050509_100%)]" />

            {/* Main purple glow */}
            <div className="absolute -left-[10%] -top-[45%] h-[650px] w-[650px] rounded-full bg-[#7C3AED]/25 blur-[150px]" />

            {/* Right glow */}
            <div className="absolute -right-[15%] bottom-[-45%] h-[600px] w-[600px] rounded-full bg-[#9333EA]/20 blur-[160px]" />

            {/* Central glow */}
            <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A855F7]/[0.07] blur-[120px]" />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
              }}
            />

            {/* Grain */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          {/* =====================================================
              DECORATIVE ORBITS
          ===================================================== */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.035] lg:block" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[380px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.03] lg:block" />

          {/* =====================================================
              CONTENT
          ===================================================== */}
          <div className="relative px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 backdrop-blur-xl">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED]/20">
                <Sparkles
                  size={11}
                  className="text-[#C084FC]"
                />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Built for better events
              </span>
            </div>

            {/* Heading */}
            <h2 className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
              Your next event
              <br />
              <span className="text-white/45">
                deserves a better flow.
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              List your event in minutes. Let Tickety handle the ticketing
              conversation, while you focus on the experience.
            </p>

            {/* =================================================
                CTA
            ================================================= */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href="/organiser/events/new"
                size="lg"
                icon={<ArrowUpRight size={18} />}
                className="h-14 rounded-full bg-white px-7 font-semibold text-[#111014] shadow-[0_15px_45px_rgba(255,255,255,0.12)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_20px_55px_rgba(255,255,255,0.18)]"
              >
                Create your event
              </Button>

              <a
                href="/organiser/dashboard"
                className="flex h-14 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-7 text-sm font-medium text-white/65 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                See the dashboard
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* =================================================
                TRUST POINTS
            ================================================= */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <TrustPoint>
                No complicated setup
              </TrustPoint>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <TrustPoint>
                WhatsApp ticketing
              </TrustPoint>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <TrustPoint>
                Real-time check-ins
              </TrustPoint>
            </div>

            {/* =================================================
                MINI PRODUCT MARK
            ================================================= */}
            <div className="mx-auto mt-14 flex max-w-sm items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045]">
                <Ticket
                  size={15}
                  className="text-[#C084FC]"
                />
              </div>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
              Discover · Sell · Scan
            </p>
          </div>

          {/* =====================================================
              FLOATING DECORATIVE ELEMENTS
          ===================================================== */}

          {/* Left floating WhatsApp signal */}
          <div className="pointer-events-none absolute left-6 top-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.035] sm:flex lg:left-10 lg:top-14">
            <MessageCircle
              size={17}
              className="text-[#25D366]/60"
            />
          </div>

          {/* Right floating ticket signal */}
          <div className="pointer-events-none absolute bottom-10 right-6 hidden h-12 w-12 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.035] sm:flex lg:bottom-14 lg:right-10">
            <Ticket
              size={17}
              className="text-[#C084FC]/60"
            />
          </div>

          {/* Tiny glow points */}
          <div className="pointer-events-none absolute left-[15%] top-[22%] h-1.5 w-1.5 rounded-full bg-[#C084FC]/60 shadow-[0_0_20px_rgba(192,132,252,0.8)]" />

          <div className="pointer-events-none absolute bottom-[25%] right-[18%] h-1.5 w-1.5 rounded-full bg-[#A78BFA]/50 shadow-[0_0_20px_rgba(167,139,250,0.7)]" />
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