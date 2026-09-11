import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEventById } from "@/lib/data";
import CheckinScanner from "@/components/checkin/CheckinScanner";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventCheckinPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const event = await getEventById(params.id);
  if (!event) notFound();

  if (session.user.role !== "ADMIN" && event.organiserId !== session.user.id) {
    redirect("/organiser/dashboard");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href={`/organiser/events/${event.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-light hover:text-ink"
      >
        <ArrowLeft size={15} /> Back to dashboard
      </Link>
      <p className="mt-4 text-sm text-ink-light">Gate check-in</p>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{event.title}</h1>
      <p className="mt-1 text-ink-light">
        Each ticket ID can only be checked in once — a second attempt is rejected automatically.
      </p>
      <div className="mt-8">
        <CheckinScanner eventId={event.id} />
      </div>
    </div>
  );
}