import { buildWhatsAppDeepLink } from "@/lib/utils";
import {
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

export default function GetTicketButton({
  eventSlug,
  eventTitle,
}: {
  eventSlug: string;
  eventTitle: string;
}) {
  const href = buildWhatsAppDeepLink(
    eventSlug,
    eventTitle
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get ${eventTitle} ticket via WhatsApp`}
      className="group relative inline-flex w-full items-center justify-center sm:w-auto"
    >
      {/* =====================================================
          GREEN GLOW
      ===================================================== */}
      <span className="pointer-events-none absolute -inset-1 rounded-[18px] bg-[#25D366]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* =====================================================
          BUTTON
      ===================================================== */}
      <span className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-[16px] border border-[#25D366]/30 bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-[#062B15] shadow-[0_12px_35px_rgba(37,211,102,0.16)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#2BE36F] group-hover:shadow-[0_18px_45px_rgba(37,211,102,0.23)] sm:w-auto sm:px-7 sm:text-base">
        {/* Shimmer */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* WhatsApp icon */}
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#062B15]/10">
          <MessageCircle
            size={17}
            strokeWidth={2.2}
            fill="currentColor"
            className="text-[#062B15]"
          />
        </span>

        {/* Copy */}
        <span className="relative">
          Get Ticket
        </span>

        {/* Arrow */}
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#062B15]/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight
            size={14}
            strokeWidth={2.3}
          />
        </span>
      </span>
    </a>
  );
}