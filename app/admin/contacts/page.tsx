import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getAllContactsAdmin } from "@/lib/data";
import { formatNaira } from "@/lib/utils";
import { ArrowLeft, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  const contacts = await getAllContactsAdmin();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-ink-light hover:text-ink">
        <ArrowLeft size={15} /> Back to admin panel
      </Link>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-ink-light">Admin panel</p>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">All contacts</h1>
          <p className="mt-1 text-ink-light">
            Everyone who has bought a ticket or registered, across every organiser on the platform.
          </p>
        </div>
        <Button href="/api/admin/contacts/export" variant="primary" icon={<Download size={16} />}>
          Export CSV
        </Button>
      </div>

      {contacts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-sand-200 bg-white p-12 text-center">
          <p className="text-ink">No contacts yet.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-sand-200 bg-white shadow-card">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-sand-200 text-ink-light">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Organiser</th>
                <th className="px-4 py-3 font-medium">Event</th>
                <th className="px-4 py-3 font-medium">Ticket</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Answers</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id} className="border-b border-sand-100 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-xs text-ink-light">{c.email}</p>
                  </td>
                  <td className="px-4 py-3 text-ink">{c.phone}</td>
                  <td className="px-4 py-3 text-ink-light">{c.organiserName}</td>
                  <td className="px-4 py-3 text-ink-light">{c.eventTitle}</td>
                  <td className="px-4 py-3 text-ink">{c.ticketType}</td>
                  <td className="px-4 py-3 text-ink">{formatNaira(c.amountPaid)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={c.paymentStatus === "paid" ? "leaf" : c.paymentStatus === "pending" ? "amber" : "red"}>
                      {c.paymentStatus}
                    </Badge>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-ink-light" title={c.answers}>
                    {c.answers || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}