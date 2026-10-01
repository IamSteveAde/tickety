"use client";

import { useState } from "react";

export default function EventSubscriptionForm({ eventId }: { eventId: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage(""); setError(false);
    try {
      const res = await fetch(`/api/events/${eventId}/subscribe`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not subscribe. Please try again.");
      setMessage(data.message); setEmail("");
    } catch (err) { setError(true); setMessage(err instanceof Error ? err.message : "Could not subscribe. Please try again."); }
    finally { setBusy(false); }
  }

  return (
    <section className="mt-5 rounded-[22px] border border-violet-100 bg-violet-50/60 p-5">
      <h2 className="text-sm font-semibold text-zinc-900">Stay in the loop</h2>
      <p className="mt-2 text-xs leading-5 text-zinc-500">Get the event countdown and updates by email, even before you book.</p>
      <form onSubmit={subscribe} className="mt-4 space-y-3">
        <label className="block text-xs font-medium text-zinc-600" htmlFor="event-subscription-email">Email address</label>
        <input id="event-subscription-email" type="email" required maxLength={254} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500" />
        <button disabled={busy} className="w-full rounded-xl bg-violet-700 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-600 disabled:opacity-50">{busy ? "Subscribing…" : "Email me event updates"}</button>
        <p className="text-[11px] leading-5 text-zinc-500">We’ll email a confirmation link. Updates cover the countdown, event start, and follow-up. Unsubscribe anytime.</p>
        <p role="status" className={`text-xs leading-5 ${error ? "text-red-600" : "text-violet-700"}`}>{message}</p>
      </form>
    </section>
  );
}
