import Link from "next/link";
import { EventItem } from "@/lib/types";
import {
  formatEventDate,
  formatNaira,
  priceFrom,
} from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Ticket,
} from "lucide-react";

export default function EventCard({
  event,
}: {
  event: EventItem;
}) {
  const from = priceFrom(event.ticketTypes);

  const isFree = event.ticketTypes[0]?.price === 0;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group relative block"
    >
      {/* =====================================================
          CARD
      ===================================================== */}
      <article className="relative overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.07)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_28px_75px_rgba(0,0,0,0.12)]">
        {/* ===================================================
            IMAGE FRAME

            IMPORTANT:
            No fixed image height.
            No object-cover.
            Entire image remains visible.
        =================================================== */}
        <div
          className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br ${event.coverGradient}`}
        >
          {/* Image */}
          {event.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={event.coverImageUrl}
              alt={event.title}
              className="relative block h-auto max-h-[620px] w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.012]"
            />
          ) : (
            /* Fallback */
            <div className="flex aspect-[4/5] w-full items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] border border-white/20 bg-black/10 text-white/60">
                  <Ticket size={20} />
                </div>

                <p className="mt-3 font-display text-sm font-semibold text-white/50">
                  {event.title}
                </p>
              </div>
            </div>
          )}

          {/* Very subtle image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.03] via-transparent to-black/[0.14]" />

          {/* =================================================
              TOP BADGES
          ================================================= */}
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            {event.trending && (
              <Badge tone="amber">
                Trending
              </Badge>
            )}

            {isFree && (
              <Badge tone="leaf">
                Free
              </Badge>
            )}
          </div>

          {/* =================================================
              CATEGORY
          ================================================= */}
          <div className="absolute bottom-4 left-4 z-10">
            <div className="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white backdrop-blur-xl">
              {event.category}
            </div>
          </div>

          {/* =================================================
              HOVER ARROW
          ================================================= */}
          <div className="absolute right-4 bottom-4 z-10 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* =====================================================
            TICKET SEPARATOR
        ===================================================== */}

        <div className="relative h-px">
          {/* Left notch */}
          <span className="absolute -left-[11px] -top-[10px] h-5 w-5 rounded-full border-r border-black/[0.07] bg-[#F5F1EB]" />

          {/* Right notch */}
          <span className="absolute -right-[11px] -top-[10px] h-5 w-5 rounded-full border-l border-black/[0.07] bg-[#F5F1EB]" />

          {/* Dashed ticket line */}
          <div className="mx-5 border-t border-dashed border-black/[0.09]" />
        </div>

        {/* =====================================================
            EVENT DETAILS
        ===================================================== */}
        <div className="flex flex-col px-5 pb-5 pt-4">
          {/* Title */}
          <h3 className="font-display text-xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#111014] transition-colors duration-300 group-hover:text-[#6D28D9]">
            {event.title}
          </h3>

          {/* Date */}
          <div className="mt-3 flex items-center gap-2 text-black/45">
            <CalendarDays
              size={13}
              strokeWidth={1.8}
              className="shrink-0 text-[#7C3AED]"
            />

            <span className="truncate text-[11px] font-medium">
              {formatEventDate(
                event.date,
                event.startTime
              )}
            </span>
          </div>

          {/* Location */}
          <div className="mt-2 flex items-start gap-2 text-black/40">
            <MapPin
              size={13}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-[#7C3AED]"
            />

            <span className="line-clamp-2 text-[11px] leading-5">
              {event.venue}, {event.state}
            </span>
          </div>

          {/* =================================================
              BOTTOM META
          ================================================= */}
          <div className="mt-5 flex items-end justify-between border-t border-black/[0.06] pt-4">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/25">
                Tickets
              </p>

              <p className="mt-1 font-display text-sm font-semibold tracking-[-0.02em] text-[#111014]">
                {from === 0
                  ? "Free"
                  : `From ${formatNaira(from)}`}
              </p>
            </div>

            {/* Small CTA */}
            <span className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/30 transition-colors group-hover:text-[#6D28D9]">
              View event

              <ArrowUpRight
                size={11}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>

        {/* =====================================================
            BOTTOM ACCENT
        ===================================================== */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </article>
    </Link>
  );
}