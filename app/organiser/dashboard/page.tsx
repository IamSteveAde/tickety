import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import OrganiserNav from "@/components/organiser/OrganiserNav";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PayListingFeeButton from "@/components/organiser/PayListingFeeButton";
import { getEventsByOrganiserId } from "@/lib/data";
import { formatNaira } from "@/lib/utils";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OrganiserDashboardPage({
  searchParams,
}: {
  searchParams?: { fee?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const events = await getEventsByOrganiserId(session.user.id);

  const feeMessage =
    searchParams?.fee === "failed"
      ? "Payment didn't go through — you can retry from the table below."
      : searchParams?.fee === "error"
      ? "Something went wrong confirming your payment. Try again below."
      : null;

  return (
    <div>
      <OrganiserNav active="dashboard" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {feeMessage && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {feeMessage}
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-ink-light">Welcome back, {session.user.name}</p>
            <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">My events</h1>
          </div>
          <Button href="/organiser/events/new" variant="primary" icon={<Plus size={16} />}>
            Create event
          </Button>
        </div>

        {events.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-sand-200 bg-white p-12 text-center">
            <p className="text-ink">You haven&apos;t created any events yet.</p>
            <Button href="/organiser/events/new" variant="primary" className="mt-4">
              Create your first event
            </Button>
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-sand-200 bg-white shadow-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sand-200 text-ink-light">
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Sold</th>
                  <th className="px-4 py-3 font-medium">Gross</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-sand-100 last:border-0">
                    <td className="px-4 py-3 font-medium text-ink">{event.title}</td>
                    <td className="px-4 py-3">
                      <Badge
                        tone={
                          event.status === "live" ? "leaf" : event.status === "pending" ? "amber" : "red"
                        }
                      >
                        {event.status === "pending" ? "awaiting payment" : event.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-ink">{event.ticketsSold}</td>
                    <td className="px-4 py-3 text-ink">{formatNaira(event.gross)}</td>
                    <td className="px-4 py-3 text-right">
                      {event.status === "pending" ? (
                        <PayListingFeeButton eventId={event.id} />
                      ) : (
                        <Link
                          href={`/organiser/events/${event.id}`}
                          className="text-sm font-medium text-plum-700 hover:underline"
                        >
                          View dashboard
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}