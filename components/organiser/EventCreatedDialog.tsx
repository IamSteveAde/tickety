"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import EventShareLink from "./EventShareLink";

export default function EventCreatedDialog({ event, redirectUrl }: {
  event: { id: string; slug: string; title: string; status: string };
  redirectUrl?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const dashboard = `/organiser/events/${event.id}`;

  useEffect(() => {
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
  }, []);

  return (
    <dialog ref={dialog} onCancel={(e) => { e.preventDefault(); window.location.assign(dashboard); }} className="w-[calc(100%_-_2rem)] max-w-xl rounded-3xl bg-white p-6 shadow-xl backdrop:bg-black/50 sm:p-8" aria-labelledby="event-created-title">
      <CheckCircle2 className="mb-4 text-green-600" size={36} />
      <h2 id="event-created-title" className="text-2xl font-semibold text-zinc-900">Event created!</h2>
      <p className="mb-6 mt-2 text-sm leading-6 text-zinc-500">
        {event.title}{event.status === "live" ? " is live. Copy the link to share with your audience." : " has been saved. Pay the listing fee to make it live."}
      </p>
      <EventShareLink slug={event.slug} />
      <div className="mt-6 flex flex-wrap gap-3">
        {redirectUrl && <a href={redirectUrl} className="rounded-full bg-violet-700 px-5 py-2.5 text-sm font-medium text-white">Continue to payment</a>}
        <Link href={dashboard} className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700">Go to event dashboard</Link>
      </div>
    </dialog>
  );
}
