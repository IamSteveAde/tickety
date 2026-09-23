import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CheckInScanner from "@/components/organiser/CheckInScanner";

export const dynamic = "force-dynamic";

export default async function StaffEventCheckInPage({
  params,
}: {
  params: { eventId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  if (session.user.role !== "CHECKIN_STAFF") {
    redirect("/organiser/check-in");
  }

  /*
   * SECURITY:
   *
   * We don't simply fetch the event by ID.
   *
   * We fetch it through EventStaff so a staff member
   * can only open an event they were actually assigned to.
   */
  const assignment = await prisma.eventStaff.findUnique({
    where: {
      eventId_userId: {
        eventId: params.eventId,
        userId: session.user.id,
      },
    },
    select: {
      event: {
        select: {
          id: true,
          title: true,
          venue: true,
          date: true,
          startTime: true,
          endTime: true,
          status: true,
        },
      },
    },
  });

  if (!assignment) {
    redirect("/staff/check-in");
  }

  const event = assignment.event;

  if (
    event.status === "disabled" ||
    event.status === "archived"
  ) {
    redirect("/staff/check-in");
  }

  const eventOption = {
    id: event.id,
    title: event.title,
    date: event.date.toISOString(),
  };

  return (
    <main className="min-h-screen bg-[#F7F5F2] text-[#111014]">
      <header className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex min-h-[72px] items-center justify-between gap-4">
            <div className="min-w-0">
              <Link
                href="/staff/check-in"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-black/40 transition hover:text-black/70"
              >
                <ArrowLeft size={13} />
                Your events
              </Link>

              <h1 className="mt-1 truncate text-lg font-semibold tracking-[-0.025em]">
                {event.title}
              </h1>
            </div>

            <div className="hidden items-center gap-4 text-xs text-black/40 sm:flex">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={13} />
                {new Intl.DateTimeFormat("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(event.date))}
              </span>

              {event.venue && (
                <span className="inline-flex max-w-[220px] items-center gap-1.5 truncate">
                  <MapPin size={13} />
                  {event.venue}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
            Gate check-in
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em]">
            Check in attendees
          </h2>

          <p className="mt-2 text-sm text-black/40">
            Scan a ticket QR code or enter the ticket number
            manually.
          </p>
        </div>

        <CheckInScanner events={[eventOption]} />
      </div>
    </main>
  );
}