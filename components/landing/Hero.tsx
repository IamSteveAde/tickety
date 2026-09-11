import Button from "@/components/ui/Button";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
  Ticket,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[850px] overflow-hidden bg-[#08070B] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main purple glow */}
        <div className="absolute -right-[15%] -top-[30%] h-[850px] w-[850px] rounded-full bg-[#6D28D9]/20 blur-[150px]" />

        <div className="absolute -bottom-[35%] left-[5%] h-[700px] w-[700px] rounded-full bg-[#7C3AED]/10 blur-[160px]" />

        {/* Central light */}
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#9333EA]/[0.08] blur-[130px]" />

        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_45%)]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}
      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-24 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* =====================================================
              LEFT — COPY
          ===================================================== */}
          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] px-3.5 py-2 backdrop-blur-xl">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED]/20">
                <Sparkles size={11} className="text-[#B794FF]" />
              </span>

              <span className="text-[11px] font-medium tracking-wide text-white/60">
                THE NEW WAY TO EXPERIENCE EVENTS
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-[3.7rem] font-semibold leading-[0.91] tracking-[-0.065em] sm:text-6xl lg:text-[6.15rem]">
              Find your
              <br />
              <span className="text-white/40">next moment.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
              Discover the events you’ll actually want to attend. Pick your
              ticket, pay and receive it — all through a conversation on
              WhatsApp.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/explore"
                variant="whatsapp"
                size="lg"
                icon={<ArrowUpRight size={18} />}
                className="h-14 rounded-full px-7 shadow-[0_12px_40px_rgba(37,211,102,0.12)]"
              >
                Explore events
              </Button>

              <Button
                href="/organiser/events/new"
                variant="secondary"
                size="lg"
                className="h-14 rounded-full border-white/10 bg-white/[0.035] px-7 text-white hover:border-white/20 hover:bg-white/[0.07]"
              >
                Host an event
              </Button>
            </div>

            {/* Micro proof */}
            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11px] font-medium text-white/30">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                No app required
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <span>Instant ticket delivery</span>

              <span className="hidden h-1 w-1 rounded-full bg-white/15 sm:block" />

              <span>Secure QR entry</span>
            </div>
          </div>

          {/* =====================================================
              RIGHT — WHATSAPP PRODUCT DEMO
          ===================================================== */}
          <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
            {/* Ambient glow behind phone */}
            <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C3AED]/15 blur-[100px]" />

            {/* Decorative orbit */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[510px] w-[510px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[610px] w-[610px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

            {/* =================================================
                PHONE
            ================================================= */}
            <div className="relative z-10 mx-auto w-[310px] sm:w-[345px]">
              {/* Phone shadow */}
              <div className="absolute -inset-5 rounded-[58px] bg-black/50 blur-3xl" />

              {/* Phone body */}
              <div className="relative rounded-[48px] border border-white/15 bg-[#111014] p-[7px] shadow-[0_45px_100px_rgba(0,0,0,0.65)]">
                {/* Screen */}
                <div className="relative overflow-hidden rounded-[41px] bg-[#E9DED5]">
                  {/* Dynamic island / speaker */}
                  <div className="absolute left-1/2 top-2 z-30 h-[25px] w-[105px] -translate-x-1/2 rounded-full bg-black" />

                  {/* WhatsApp header */}
                  <div className="relative z-20 flex h-[82px] items-end justify-between bg-[#075E54] px-5 pb-3.5 pt-8 text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-[13px] font-bold">
                        t
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold">
                          Tickety
                        </p>

                        <div className="mt-0.5 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                          <span className="text-[9px] text-white/60">
                            online
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-white/60">
                      <MessageCircle size={15} />
                      <span className="text-[18px]">•••</span>
                    </div>
                  </div>

                  {/* Chat area */}
                  <div className="relative min-h-[535px] bg-[#E7DDD5] px-3.5 py-4">
                    {/* WhatsApp wallpaper pattern */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.035]"
                      style={{
                        backgroundImage:
                          "radial-gradient(#222 1px, transparent 1px)",
                        backgroundSize: "14px 14px",
                      }}
                    />

                    {/* Date */}
                    <div className="relative z-10 mx-auto mb-3 w-fit rounded-full bg-[#F6EFEA] px-3 py-1 text-[8px] font-medium text-black/40 shadow-sm">
                      TODAY
                    </div>

                    {/* Bot message */}
                    <div className="relative z-10 mb-2.5 max-w-[245px] rounded-[13px] rounded-tl-[4px] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <p className="text-[10px] leading-[1.55] text-black/75">
                        Hi Ada 👋
                        <br />
                        <br />
                        You're going to{" "}
                        <span className="font-semibold">
                          Afrobeats After Dark
                        </span>
                        .
                        <br />
                        <br />
                        Here's what's available:
                      </p>

                      <div className="mt-2.5 space-y-1.5">
                        <TicketOption
                          name="Regular"
                          price="₦5,000"
                          remaining="240 left"
                        />

                        <TicketOption
                          name="VIP"
                          price="₦15,000"
                          remaining="32 left"
                          active
                        />

                        <TicketOption
                          name="Table for 4"
                          price="₦50,000"
                          remaining="6 left"
                        />
                      </div>

                      <div className="mt-2 text-right text-[8px] text-black/30">
                        10:02
                      </div>
                    </div>

                    {/* User response */}
                    <ChatBubble
                      side="right"
                      text="VIP"
                      time="10:02"
                    />

                    {/* Bot question */}
                    <ChatBubble
                      side="left"
                      text="Great choice. How many VIP tickets?"
                      time="10:03"
                    />

                    {/* User response */}
                    <ChatBubble
                      side="right"
                      text="2"
                      time="10:03"
                    />

                    {/* Bot summary */}
                    <div className="relative z-10 mb-2.5 max-w-[245px] rounded-[13px] rounded-tl-[4px] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <p className="text-[10px] leading-[1.55] text-black/75">
                        Perfect. <span className="font-semibold">2 × VIP</span>{" "}
                        = <span className="font-semibold">₦30,000</span>.
                      </p>

                      <p className="mt-2 text-[9px] leading-[1.5] text-black/45">
                        I just need your name and phone number to finish this.
                      </p>

                      <div className="mt-2 text-right text-[8px] text-black/30">
                        10:04
                      </div>
                    </div>

                    {/* User info */}
                    <ChatBubble
                      side="right"
                      text="Ada Chukwu · 0803 123 4567"
                      time="10:04"
                    />

                    {/* Payment message */}
                    <div className="relative z-10 mb-2.5 max-w-[250px] rounded-[13px] rounded-tl-[4px] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]/15">
                          <Check size={14} className="text-[#128C7E]" />
                        </div>

                        <div>
                          <p className="text-[9px] font-semibold text-black/70">
                            You're all set
                          </p>
                          <p className="text-[8px] text-black/40">
                            ₦30,000 · 2 VIP tickets
                          </p>
                        </div>
                      </div>

                      <button className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#25D366] py-2 text-[9px] font-semibold text-white">
                        Pay securely
                        <ArrowRight size={10} />
                      </button>

                      <div className="mt-1.5 text-right text-[8px] text-black/30">
                        10:05
                      </div>
                    </div>

                    {/* Bottom chat fade */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#E7DDD5] to-transparent" />
                  </div>

                  {/* Chat input */}
                  <div className="relative z-20 flex h-[50px] items-center gap-2 bg-[#F0F0F0] px-3">
                    <div className="flex-1 rounded-full bg-white px-4 py-2">
                      <span className="text-[9px] text-black/25">
                        Message
                      </span>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================
                  FLOATING SUCCESS CARD
              ================================================= */}
              <div className="absolute -bottom-7 -right-16 z-30 hidden w-[230px] rounded-[20px] border border-white/10 bg-[#121116]/90 p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#25D366]/10">
                    <Ticket size={18} className="text-[#25D366]" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-white">
                      Ticket delivered
                    </p>

                    <p className="mt-0.5 text-[9px] text-white/35">
                      Ready when you are
                    </p>
                  </div>

                  <CheckCheck
                    size={14}
                    className="ml-auto text-[#25D366]"
                  />
                </div>

                <div className="mt-3 rounded-[12px] bg-white/[0.045] p-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.14em] text-white/25">
                        Ticket
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-white">
                        #TCK-88213
                      </p>
                    </div>

                    {/* QR visual */}
                    <FakeQR />
                  </div>
                </div>
              </div>

              {/* =================================================
                  FLOATING STEP CARD
              ================================================= */}
              <div className="absolute -left-20 top-[22%] z-30 hidden w-[170px] rounded-[18px] border border-white/10 bg-[#121116]/85 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED]/15">
                    <MessageCircle
                      size={14}
                      className="text-[#B794FF]"
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold text-white">
                      One conversation
                    </p>

                    <p className="mt-0.5 text-[8px] text-white/30">
                      From ticket to entry
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            BOTTOM PRODUCT STATEMENT
        ======================================================= */}
        <div className="mt-20 border-t border-white/[0.08] pt-7 lg:mt-24">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#7C3AED]/10">
                <Ticket size={14} className="text-[#A78BFA]" />
              </div>

              <p className="text-xs text-white/35">
                Discover on Tickety. Buy on WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[10px] uppercase tracking-[0.14em] text-white/20">
              <span>Discover</span>
              <ChevronRight size={11} />
              <span>Choose</span>
              <ChevronRight size={11} />
              <span>Pay</span>
              <ChevronRight size={11} />
              <span>Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===============================================================
   SMALL COMPONENTS
   =============================================================== */

function TicketOption({
  name,
  price,
  remaining,
  active = false,
}: {
  name: string;
  price: string;
  remaining: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-[8px] border px-2.5 py-2 ${
        active
          ? "border-[#25D366]/30 bg-[#25D366]/[0.07]"
          : "border-black/[0.06] bg-black/[0.025]"
      }`}
    >
      <div>
        <p className="text-[9px] font-semibold text-black/65">{name}</p>
        <p className="mt-0.5 text-[7px] text-black/35">{remaining}</p>
      </div>

      <p className="text-[9px] font-semibold text-black/65">{price}</p>
    </div>
  );
}

function ChatBubble({
  side,
  text,
  time,
}: {
  side: "left" | "right";
  text: string;
  time: string;
}) {
  const isRight = side === "right";

  return (
    <div
      className={`relative z-10 mb-2.5 flex ${
        isRight ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[210px] rounded-[13px] px-3 py-2 ${
          isRight
            ? "rounded-tr-[4px] bg-[#D9FDD3]"
            : "rounded-tl-[4px] bg-white"
        } shadow-[0_1px_2px_rgba(0,0,0,0.06)]`}
      >
        <div className="flex items-end gap-2">
          <p className="text-[9px] leading-[1.45] text-black/65">{text}</p>

          <div className="flex shrink-0 items-center gap-0.5">
            <span className="text-[7px] text-black/25">{time}</span>

            {isRight && (
              <CheckCheck
                size={9}
                className="text-[#53BDEB]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FakeQR() {
  return (
    <div className="grid h-11 w-11 grid-cols-5 gap-[2px] rounded-[6px] bg-white p-1.5">
      {[
        1, 1, 0, 1, 1,
        1, 0, 0, 0, 1,
        0, 1, 1, 1, 0,
        1, 0, 1, 0, 1,
        1, 1, 0, 1, 1,
      ].map((item, index) => (
        <span
          key={index}
          className={item ? "bg-black" : "bg-transparent"}
        />
      ))}
    </div>
  );
}