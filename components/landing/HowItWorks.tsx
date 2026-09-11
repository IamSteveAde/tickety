import SectionHeading from "@/components/ui/SectionHeading";
import {
  ArrowUpRight,
  Compass,
  MessageCircle,
  ScanLine,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find your event",
    body: "Browse by state, category, or what's trending near you. No login needed to look around.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Tap Get Ticket",
    body: "Start a WhatsApp conversation that already knows the event and shows you what's available.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Pay & walk in",
    body: "Your QR ticket lands in the same chat. It activates before the event and is validated at the gate.",
    icon: ScanLine,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#7C3AED]/[0.035] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-[#7C3AED]/10 bg-[#7C3AED]/[0.045] px-3 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6D28D9]">
              How Tickety works
            </span>
          </div>

          <SectionHeading
            title="From scrolling to scanned in."
            subtitle="Three simple moments. One seamless journey."
          />
        </div>

        {/* =====================================================
            DESKTOP TIMELINE
        ===================================================== */}
        <div className="relative mt-20 hidden lg:block">
          {/* Main timeline */}
          <div className="absolute left-[16.66%] right-[16.66%] top-[31px] h-px">
            <div className="h-full w-full bg-gradient-to-r from-[#7C3AED]/10 via-[#7C3AED]/35 to-[#7C3AED]/10" />

            {/* animated-looking progress */}
            <div className="absolute left-0 top-0 h-px w-[50%] bg-gradient-to-r from-[#7C3AED] to-[#A78BFA]" />
          </div>

          <div className="grid grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative flex flex-col items-center text-center"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[#7C3AED]/20 bg-white shadow-[0_8px_30px_rgba(124,58,237,0.08)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#7C3AED]/40 group-hover:shadow-[0_15px_40px_rgba(124,58,237,0.14)]">
                    {/* Inner dot */}
                    <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#08070B] transition-all duration-500 group-hover:bg-[#7C3AED]">
                      <Icon
                        size={18}
                        strokeWidth={1.7}
                        className="text-white"
                      />
                    </div>
                  </div>

                  {/* Number */}
                  <div className="mt-7 text-[10px] font-semibold tracking-[0.18em] text-[#7C3AED]/50">
                    STEP {step.number}
                  </div>

                  {/* Content */}
                  <div className="mt-3 max-w-[280px]">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.025em] text-[#111014]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#111014]/50">
                      {step.body}
                    </p>
                  </div>

                  {/* Connector arrow */}
                  {index < steps.length - 1 && (
                    <div className="absolute right-[-9px] top-[23px] z-20 flex h-4 w-4 items-center justify-center bg-white">
                      <ArrowUpRight
                        size={13}
                        className="rotate-45 text-[#7C3AED]/35"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            MOBILE TIMELINE
        ===================================================== */}
        <div className="relative mt-14 lg:hidden">
          {/* Vertical line */}
          <div className="absolute bottom-8 left-[25px] top-8 w-px bg-gradient-to-b from-[#7C3AED]/30 via-[#7C3AED]/15 to-transparent" />

          <div className="space-y-12">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative flex gap-6"
                >
                  {/* Dot */}
                  <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-[#7C3AED]/15 bg-white shadow-[0_8px_25px_rgba(124,58,237,0.08)]">
                    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#08070B]">
                      <Icon
                        size={16}
                        strokeWidth={1.7}
                        className="text-white"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1">
                    <div className="text-[9px] font-semibold tracking-[0.18em] text-[#7C3AED]/50">
                      STEP {step.number}
                    </div>

                    <h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.025em] text-[#111014]">
                      {step.title}
                    </h3>

                    <p className="mt-2.5 max-w-md text-sm leading-6 text-[#111014]/50">
                      {step.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            BOTTOM JOURNEY LABEL
        ===================================================== */}
        <div className="mt-20 flex justify-center sm:mt-24">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/[0.07] bg-[#FAFAFA] px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.035)]">
            <span className="text-[10px] font-medium text-black/40">
              DISCOVER
            </span>

            <span className="h-1 w-1 rounded-full bg-[#7C3AED]/40" />

            <span className="text-[10px] font-medium text-black/40">
              CHAT
            </span>

            <span className="h-1 w-1 rounded-full bg-[#7C3AED]/40" />

            <span className="text-[10px] font-medium text-black/40">
              PAY
            </span>

            <span className="h-1 w-1 rounded-full bg-[#7C3AED]/40" />

            <span className="text-[10px] font-medium text-black/40">
              EXPERIENCE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}