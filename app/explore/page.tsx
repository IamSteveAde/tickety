import { getEvents } from "@/lib/data";
import ExploreClient from "@/components/events/ExploreClient";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const events = await getEvents();
  return <ExploreClient events={events} />;
}
