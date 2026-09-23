import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import OrganiserNav from "@/components/organiser/OrganiserNav";
import CheckInScanner from "@/components/organiser/CheckInScanner";

export const dynamic = "force-dynamic";

export default async function OrganiserCheckInPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const events = await prisma.event.findMany({
    where: {
      organiserId: session.user.id,
      status: {
        in: ["live", "pending", "disabled"],
      },
    },
    select: {
      id: true,
      title: true,
      date: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const eventOptions = events.map((event) => ({
    id: event.id,
    title: event.title,
    date: event.date.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#111014]">
      <OrganiserNav active="check-in" />

      <main>
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">
                Event entry
              </span>
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#111014] sm:text-4xl">
              Check-in
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
              Scan an attendee&apos;s QR code or enter their ticket number to verify and check them in.
            </p>
          </div>

          {eventOptions.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-black/10 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-[#111014]">
                No events available
              </p>
              <p className="mt-1 text-xs text-black/40">
                Create an event before checking attendees in.
              </p>
            </div>
          ) : (
           <CheckInScanner eventId={eventOptions[0].id} />
          )}
        </div>
      </main>
    </div>
  );
}
