import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GetTicketButtonProps {
  eventSlug: string;
  eventTitle: string;
}

export default function GetTicketButton({
  eventSlug,
  eventTitle,
}: GetTicketButtonProps) {
  return (
    <Link
      href={`/events/${eventSlug}/checkout`}
      aria-label={`Get tickets for ${eventTitle}`}
      className="group flex h-12 w-full items-center justify-between rounded-[16px] bg-[#6D28D9] px-5 text-white transition-all duration-200 hover:bg-[#5B21B6] active:scale-[0.99]"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
        Get Ticket
      </span>

      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-200 group-hover:translate-x-0.5">
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4"
          strokeWidth={1.8}
        />
      </span>
    </Link>
  );
}