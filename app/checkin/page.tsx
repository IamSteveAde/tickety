import { getAttendeesForEventSlug, getEventBySlug } from "@/lib/data";
import ScannerMock from "@/components/checkin/ScannerMock";

export const dynamic = "force-dynamic";

const DEMO_EVENT_SLUG = "afrobeats-picnic-lagos";

export default async function CheckinPage() {
  const [event, attendees] = await Promise.all([
    getEventBySlug(DEMO_EVENT_SLUG),
    getAttendeesForEventSlug(DEMO_EVENT_SLUG),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-sm text-ink-light">Gate check-in</p>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {event?.title ?? "Event"}
      </h1>
      <p className="mt-1 text-ink-light">
        Scans validate the signed QR token server-side and mark the ticket used immediately. A second
        scan of the same ticket is rejected, whichever device tries it.
      </p>
      <div className="mt-8">
        <ScannerMock attendees={attendees} />
      </div>
    </div>
  );
}
