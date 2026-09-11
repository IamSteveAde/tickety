import Button from "@/components/ui/Button";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronUp,
  QrCode,
  Ticket,
  Users,
} from "lucide-react";

export default function ForOrganisers() {
  return (
    <section className="relative isolate overflow-hidden bg-[#08070B] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#241044_0%,#12091F_32%,#09070F_67%,#050509_100%)]" />

        {/* Violet atmosphere */}
        <div className="absolute -right-[15%] -top-[25%] h-[700px] w-[700px] rounded-full bg-[#7C3AED]/20 blur-[170px]" />

        <div className="absolute -left-[20%] bottom-[-35%] h-[650px] w-[650px] rounded-full bg-[#4C1D95]/20 blur-[160px]" />

        {/* Center glow */}
        <div className="absolute left-[55%] top-[35%] h-[350px] w-[350px] rounded-full bg-[#A855F7]/[0.06] blur-[120px]" />

        {/* Grid */}
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

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        {/* =======================================================
            MAIN LAYOUT
        ======================================================= */}
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* =====================================================
              LEFT — COPY
          ===================================================== */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-2 backdrop-blur-xl">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED]/20">
                <BarChart3
                  size={11}
                  className="text-[#C084FC]"
                />
              </span>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                For organisers
              </span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-4xl font-semibold leading-[0.94] tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.5rem]">
              Everything
              <br />
              <span className="text-white/45">under control.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Set your ticket types once. Every sale flows into one place,
              giving you a clear view of who's coming, what's selling and who's
              already through the door.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/organiser/dashboard"
                variant="whatsapp"
                size="lg"
                icon={<ArrowUpRight size={17} />}
                className="h-13 rounded-full px-6"
              >
                See a live dashboard
              </Button>

              <a
                href="/organiser"
                className="group flex h-13 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-6 text-sm font-medium text-white/65 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Learn more

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Small product statement */}
            <div className="mt-10 flex items-center gap-3">
              <div className="h-px w-8 bg-[#A78BFA]/50" />

              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
                One dashboard. Every sale.
              </span>
            </div>
          </div>

          {/* =====================================================
              RIGHT — DASHBOARD VISUAL
          ===================================================== */}
          <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
            {/* Large ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/15 blur-[120px]" />

            {/* =================================================
                DASHBOARD FRAME
            ================================================= */}
            <div className="relative rounded-[30px] border border-white/10 bg-[#111018]/90 p-2 shadow-[0_45px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              {/* Inner dashboard */}
              <div className="overflow-hidden rounded-[23px] border border-white/[0.07] bg-[#0D0C12]">
                {/* =============================================
                    DASHBOARD HEADER
                ============================================= */}
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#7C3AED]">
                      <span className="font-display text-sm font-semibold">
                        t
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold text-white">
                        Event dashboard
                      </p>

                      <p className="mt-0.5 text-[8px] text-white/30">
                        Afrobeats After Dark
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-[#25D366]/10 bg-[#25D366]/[0.05] px-2.5 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />

                    <span className="text-[8px] font-medium text-white/50">
                      Live
                    </span>
                  </div>
                </div>

                {/* =============================================
                    EVENT SUMMARY
                ============================================= */}
                <div className="border-b border-white/[0.07] px-5 py-5 sm:px-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
                        Saturday · 12 Sept
                      </p>

                      <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                        Afrobeats After Dark
                      </h3>
                    </div>

                    <button className="hidden items-center gap-1 text-[9px] font-medium text-white/35 sm:flex">
                      View event
                      <ArrowUpRight size={11} />
                    </button>
                  </div>
                </div>

                {/* =============================================
                    STATISTICS
                ============================================= */}
                <div className="grid grid-cols-3 border-b border-white/[0.07]">
                  {/* Tickets */}
                  <div className="border-r border-white/[0.07] px-4 py-5 sm:px-5">
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#7C3AED]/10">
                        <Ticket
                          size={13}
                          className="text-[#C084FC]"
                        />
                      </span>

                      <ChevronUp
                        size={12}
                        className="text-[#25D366]"
                      />
                    </div>

                    <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                      278
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/25">
                      Tickets sold
                    </p>
                  </div>

                  {/* Attendees */}
                  <div className="border-r border-white/[0.07] px-4 py-5 sm:px-5">
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#7C3AED]/10">
                        <Users
                          size={13}
                          className="text-[#C084FC]"
                        />
                      </span>

                      <ChevronUp
                        size={12}
                        className="text-[#25D366]"
                      />
                    </div>

                    <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                      1,024
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/25">
                      Attendees
                    </p>
                  </div>

                  {/* Check-ins */}
                  <div className="px-4 py-5 sm:px-5">
                    <div className="flex items-center justify-between">
                      <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#25D366]/10">
                        <QrCode
                          size={13}
                          className="text-[#25D366]"
                        />
                      </span>

                      <span className="text-[8px] font-semibold text-[#25D366]">
                        LIVE
                      </span>
                    </div>

                    <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.04em] text-white">
                      64%
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.12em] text-white/25">
                      Checked in
                    </p>
                  </div>
                </div>

                {/* =============================================
                    LOWER DASHBOARD
                ============================================= */}
                <div className="grid gap-0 sm:grid-cols-[1.1fr_.9fr]">
                  {/* Sales chart */}
                  <div className="border-b border-white/[0.07] px-5 py-5 sm:border-b-0 sm:border-r sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/25">
                          Ticket sales
                        </p>

                        <p className="mt-1 text-xs font-semibold text-white">
                          278 sold
                        </p>
                      </div>

                      <span className="rounded-full bg-[#25D366]/10 px-2 py-1 text-[8px] font-semibold text-[#25D366]">
                        +18.4%
                      </span>
                    </div>

                    {/* Graph */}
                    <div className="relative mt-7 h-[110px]">
                      {/* Horizontal guides */}
                      <div className="absolute inset-x-0 top-0 border-t border-white/[0.045]" />
                      <div className="absolute inset-x-0 top-1/2 border-t border-white/[0.045]" />
                      <div className="absolute inset-x-0 bottom-0 border-t border-white/[0.045]" />

                      {/* Chart line */}
                      <svg
                        viewBox="0 0 400 110"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full overflow-visible"
                      >
                        <defs>
                          <linearGradient
                            id="salesGradient"
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="#A78BFA"
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="100%"
                              stopColor="#A78BFA"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>

                        <path
                          d="M0 91 C35 87 45 79 70 82 C100 85 106 65 135 68 C165 72 175 54 205 59 C230 63 246 35 270 42 C295 49 302 27 325 31 C350 36 370 15 400 20 L400 110 L0 110 Z"
                          fill="url(#salesGradient)"
                        />

                        <path
                          d="M0 91 C35 87 45 79 70 82 C100 85 106 65 135 68 C165 72 175 54 205 59 C230 63 246 35 270 42 C295 49 302 27 325 31 C350 36 370 15 400 20"
                          fill="none"
                          stroke="#A78BFA"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Current point */}
                      <div className="absolute right-0 top-[12px] h-2.5 w-2.5 rounded-full border-2 border-[#0D0C12] bg-[#C084FC] shadow-[0_0_12px_rgba(192,132,252,0.7)]" />
                    </div>

                    <div className="mt-2 flex justify-between text-[7px] text-white/20">
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                      <span>SAT</span>
                    </div>
                  </div>

                  {/* Check-in activity */}
                  <div className="px-5 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/25">
                        Check-in activity
                      </p>

                      <QrCode
                        size={13}
                        className="text-white/20"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      <CheckInRow
                        name="David O."
                        time="2 min ago"
                      />

                      <CheckInRow
                        name="Sarah A."
                        time="4 min ago"
                      />

                      <CheckInRow
                        name="Michael K."
                        time="7 min ago"
                      />

                      <CheckInRow
                        name="Tolu B."
                        time="11 min ago"
                      />
                    </div>

                    <button className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-[9px] border border-white/[0.07] bg-white/[0.025] py-2 text-[8px] font-medium text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white/60">
                      View all attendees
                      <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                FLOATING ATTENDEE CARD
            ================================================= */}
            <div className="absolute -bottom-8 -left-10 z-30 hidden w-[190px] rounded-[20px] border border-white/10 bg-[#111018]/90 p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-white/25">
                    Latest check-in
                  </p>

                  <p className="mt-1.5 text-[11px] font-semibold text-white">
                    David O.
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10">
                  <Check
                    size={14}
                    className="text-[#25D366]"
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5">
                <span className="text-[8px] text-white/30">
                  VIP · #TCK-88213
                </span>

                <span className="text-[8px] text-[#25D366]">
                  Verified
                </span>
              </div>
            </div>

            {/* =================================================
                FLOATING SALES CARD
            ================================================= */}
            <div className="absolute -right-8 top-[18%] z-30 hidden rounded-[18px] border border-white/10 bg-[#111018]/90 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/15">
                  <Ticket
                    size={13}
                    className="text-[#C084FC]"
                  />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.13em] text-white/25">
                    Today's sales
                  </p>

                  <p className="mt-0.5 font-display text-sm font-semibold text-white">
                    ₦4.17m
                  </p>
                </div>

                <span className="ml-1 text-[8px] font-semibold text-[#25D366]">
                  +18%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM STATEMENT
        ======================================================= */}
        <div className="mt-20 border-t border-white/10 pt-8 lg:mt-24">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
                01
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Create your event and set your ticket types.
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
                02
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Sales from WhatsApp and the web land in one place.
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/30">
                03
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Search attendees, monitor check-ins and export when you need
                to.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   CHECK-IN ROW
   =============================================================== */

function CheckInRow({
  name,
  time,
}: {
  name: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366]/10">
        <Check
          size={10}
          className="text-[#25D366]"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[9px] font-medium text-white/65">
          {name}
        </p>

        <p className="mt-0.5 text-[7px] text-white/25">
          {time}
        </p>
      </div>

      <span className="text-[7px] font-medium uppercase tracking-[0.08em] text-[#25D366]/60">
        In
      </span>
    </div>
  );
}