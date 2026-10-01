import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function EmailPreferences({ params }: { params: { token: string } }) {
  const preference = await prisma.eventEmailPreference.findUnique({ where: { token: params.token }, include: { event: true } });
  if (!preference) notFound();
  async function unsubscribe() {
    "use server";
    await prisma.eventEmailPreference.updateMany({ where: { token: params.token }, data: { unsubscribedAt: new Date() } });
    redirect(`/email/preferences/${params.token}`);
  }
  return <main className="mx-auto min-h-[70vh] max-w-lg px-5 py-32"><div className="rounded-3xl border border-violet-100 bg-white p-8"><p className="text-xs font-semibold uppercase tracking-widest text-violet-700">Email preferences</p><h1 className="mt-4 text-3xl font-semibold text-zinc-900">{preference.unsubscribedAt ? "You’re unsubscribed." : "Your event. Your updates."}</h1><p className="mt-4 text-sm leading-6 text-zinc-500">{preference.unsubscribedAt ? `Countdown reminders and follow-ups for ${preference.event.title} are turned off.` : `Turn off countdown reminders and follow-ups for ${preference.event.title}. Booking receipts and tickets will still reach you.`}</p>{!preference.unsubscribedAt && <form action={unsubscribe}><button className="mt-6 rounded-full bg-violet-700 px-6 py-3 text-sm font-semibold text-white">Unsubscribe from event updates</button></form>}<Link href="/explore" className="mt-6 block text-sm font-semibold text-violet-700">Explore events →</Link></div></main>;
}
