import OrganiserNav from "@/components/organiser/OrganiserNav";
import EventForm from "@/components/organiser/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <OrganiserNav active="new-event" />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Create an event</h1>
        <p className="mt-1 text-ink-light">
          Set it up once — ticket types, prices, and questions all flow straight into the WhatsApp bot.
        </p>
        <div className="mt-8">
          <EventForm />
        </div>
      </div>
    </div>
  );
}
