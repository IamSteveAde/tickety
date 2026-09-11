import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/data";
import { formatEventDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import TicketTypeCard from "@/components/events/TicketTypeCard";
import GetTicketButton from "@/components/events/GetTicketButton";
import { MapPin, Share2, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <div className={`relative h-56 w-full overflow-hidden rounded-3xl bg-gradient-to-br ${event.coverGradient} sm:h-72`}>
        {event.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.coverImageUrl} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
      <div className="mt-8 flex flex-col gap-8 sm:flex-row">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge tone="plum">{event.category}</Badge>
              {event.trending && <Badge tone="amber">Trending</Badge>}
            </div>
            <button className="flex items-center gap-1.5 text-sm text-ink-light hover:text-ink">
              <Share2 size={15} /> Share
            </button>
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {event.title}
          </h1>

          <div className="mt-4 flex flex-col gap-2 text-sm text-ink-light">
            <p>{formatEventDate(event.date, event.startTime)}</p>
            <p className="flex items-center gap-1.5">
              <MapPin size={15} /> {event.venue}, {event.state}
            </p>
            <p className="flex items-center gap-1.5">
              <User size={15} /> Organised by {event.organiserName}
            </p>
          </div>

          <p className="mt-6 text-ink-light">{event.description}</p>

          <div className="mt-8 border-t border-sand-200 pt-6 text-sm text-ink-light">
            <p className="font-medium text-ink">Also on this page</p>
            <p className="mt-2">Map &amp; directions · Event policies · Contact organiser</p>
          </div>
        </div>

        <div className="w-full sm:w-80">
          <div className="sticky top-24 rounded-2xl border border-sand-200 bg-white p-5 shadow-card">
            <p className="text-sm font-semibold text-ink">Ticket options</p>
            <div className="mt-3 flex flex-col gap-2">
              {event.ticketTypes.map((ticket) => (
                <TicketTypeCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
            <div className="mt-5">
              <GetTicketButton eventSlug={event.slug} eventTitle={event.title} />
            </div>
            <p className="mt-3 text-center text-xs text-ink-light">
              Opens WhatsApp — the bot already knows which event you mean.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
