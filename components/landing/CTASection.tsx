import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

const features = [
  "Create your event",
  "Sell tickets online",
  "Manage check-ins",
];

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F5FA]">
      <div className="mx-auto max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="relative isolate overflow-hidden rounded-[24px] bg-[#0A0711] text-white sm:rounded-[32px]">
          {/* Dark violet gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_10%,#39205D_0%,#1B1030_38%,#0A0711_80%)]" />

            <div className="absolute -right-32 -top-44 h-[480px] w-[480px] rounded-full bg-violet-600/15 blur-[110px]" />

            <div className="absolute -bottom-52 -left-32 h-[440px] w-[440px] rounded-full bg-purple-800/15 blur-[110px]" />
          </div>

          <div className="relative px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div className="mx-auto max-w-[790px] text-center">
              {/* Eyebrow */}
              <div className="mb-7 flex items-center justify-center gap-3">
                <span className="h-px w-7 bg-violet-400" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                  For event organisers
                </span>

                <span className="h-px w-7 bg-violet-400" />
              </div>

              {/* Main message */}
              <h2 className="text-[clamp(2.7rem,5.8vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.065em]">
                Your event.
                <br />
                <span className="text-[#C4A0FF]">
                  Everything in one place.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-[550px] text-[14px] leading-7 text-white/60 sm:text-[16px] sm:leading-8">
                Create your event, sell tickets online, track
                bookings, and manage entry with Tickety.
              </p>

              {/* Primary CTA */}
              <div className="mt-9 flex justify-center">
                <Link
                  href="/organiser/events/new"
                  className="group inline-flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-white px-7 text-[13px] font-semibold text-[#211137] transition-colors hover:bg-violet-100 sm:w-auto"
                >
                  Create your event

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>

              {/* Supporting features */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-7">
                {features.map((feature) => (
                  <span
                    key={feature}
                    className="flex items-center gap-2 text-[11px] font-medium text-white/50"
                  >
                    <Check
                      size={13}
                      strokeWidth={2.3}
                      className="text-violet-300"
                    />

                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}