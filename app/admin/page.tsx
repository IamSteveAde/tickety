import StatCard from "@/components/ui/StatCard";
import AdminEventsTable from "@/components/admin/AdminEventsTable";
import AdminTransactionsTable from "@/components/admin/AdminTransactionsTable";
import AdminOrganisersTable from "@/components/admin/AdminOrganisersTable";
import { getAdminEvents, getTransactions, getOrganisersSummary } from "@/lib/data";
import { formatNaira } from "@/lib/utils";
import { Building2, Receipt, TrendingUp, Users, Download, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [adminEvents, transactions, organisers] = await Promise.all([
    getAdminEvents(),
    getTransactions(),
    getOrganisersSummary(),
  ]);

  const totalFees = transactions.reduce((sum, t) => (t.status === "paid" ? sum + t.platformFee : sum), 0);
  const liveEvents = adminEvents.filter((e) => e.status === "live").length;
  const totalTicketsSold = adminEvents.reduce((sum, e) => sum + e.ticketsSold, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-ink-light">Admin panel</p>
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Platform overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard label="Live events" value={liveEvents.toString()} icon={<Building2 size={18} />} />
        <StatCard label="Organisers" value={organisers.length.toString()} icon={<Users size={18} />} />
        <StatCard label="Tickets sold, all events" value={totalTicketsSold.toString()} icon={<TrendingUp size={18} />} />
        <StatCard label="Platform fees collected" value={formatNaira(totalFees)} icon={<Receipt size={18} />} />
      </div>

      <div className="mt-10">
        <p className="mb-3 text-sm font-semibold text-ink">Events</p>
        <AdminEventsTable events={adminEvents} />
      </div>

            <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Organisers</p>
          <Button href="/api/admin/organisers/export" variant="ghost" size="md" icon={<Download size={14} />}>
            Export CSV
          </Button>
        </div>
        <AdminOrganisersTable organisers={organisers} />
      </div>

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Contacts</p>
          <Button href="/admin/contacts" variant="ghost" size="md" icon={<ArrowRight size={14} />} className="flex-row-reverse">
            View all contacts
          </Button>
        </div>
        <p className="text-sm text-ink-light">
          Every attendee across every organiser — names, phone numbers, and question answers, all exportable.
        </p>
      </div>

      <div className="mt-10">
        <p className="mb-3 text-sm font-semibold text-ink">Transactions</p>
        <AdminTransactionsTable transactions={transactions} />
      </div>
    </div>
  );
}