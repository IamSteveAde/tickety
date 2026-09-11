import {
  CalendarDays,
  Mail,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { OrganiserSummary } from "@/lib/data";

export default function AdminOrganisersTable({
  organisers,
}: {
  organisers: OrganiserSummary[];
}) {
  return (
    <div className="w-full">
      {/* ========================================================
          DESKTOP
      ======================================================== */}

      <div className="hidden overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_12px_45px_rgba(17,16,20,0.05)] md:block">
        {/* Header */}

        <div className="border-b border-black/[0.06] bg-[#FAFAF9] px-5 py-4">
          <div className="grid grid-cols-[minmax(260px,1.4fr)_minmax(280px,1fr)_120px_80px] items-center gap-6">
            <TableHeading>
              Organiser
            </TableHeading>

            <TableHeading>
              Contact
            </TableHeading>

            <TableHeading>
              Events
            </TableHeading>

            <span />
          </div>
        </div>

        {/* Rows */}

        {organisers.length === 0 ? (
          <EmptyState />
        ) : (
          <div>
            {organisers.map((organiser) => (
              <div
                key={organiser.id}
                className="
                  group
                  border-b
                  border-black/[0.055]
                  px-5
                  py-4
                  last:border-0
                  transition-colors
                  hover:bg-[#FAFAF9]/70
                "
              >
                <div className="grid grid-cols-[minmax(260px,1.4fr)_minmax(280px,1fr)_120px_80px] items-center gap-6">
                  {/* ORGANISER */}

                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar name={organiser.name} />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold tracking-[-0.01em] text-[#111014]">
                        {organiser.name}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-black/30">
                        Organiser ID · {organiser.id}
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}

                  <div className="flex min-w-0 items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-black/[0.035]">
                      <Mail
                        size={13}
                        className="text-black/35"
                      />
                    </div>

                    <p className="truncate text-xs text-black/55">
                      {organiser.email}
                    </p>
                  </div>

                  {/* EVENTS */}

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#7C3AED]/[0.07]">
                      <CalendarDays
                        size={13}
                        className="text-[#7C3AED]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#111014]">
                        {organiser.eventCount}
                      </p>

                      <p className="text-[9px] uppercase tracking-[0.1em] text-black/25">
                        Events
                      </p>
                    </div>
                  </div>

                  {/* ACTION */}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        text-black/20
                        opacity-0
                        transition-all
                        group-hover:bg-black/[0.04]
                        group-hover:text-black/50
                        group-hover:opacity-100
                      "
                      aria-label={`More options for ${organiser.name}`}
                    >
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          MOBILE
      ======================================================== */}

      <div className="space-y-3 md:hidden">
        {organisers.length === 0 ? (
          <EmptyState />
        ) : (
          organisers.map((organiser) => (
            <div
              key={organiser.id}
              className="
                overflow-hidden
                rounded-[22px]
                border
                border-black/[0.07]
                bg-white
                shadow-[0_8px_30px_rgba(17,16,20,0.045)]
              "
            >
              {/* Identity */}

              <div className="flex items-center gap-3 p-4">
                <Avatar name={organiser.name} />

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tracking-[-0.01em] text-[#111014]">
                    {organiser.name}
                  </p>

                  <p className="mt-0.5 truncate text-[11px] text-black/35">
                    {organiser.email}
                  </p>
                </div>
              </div>

              {/* Metrics */}

              <div className="grid grid-cols-2 border-t border-black/[0.055] bg-[#FAFAF9]">
                <div className="border-r border-black/[0.055] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Mail
                      size={13}
                      className="text-black/25"
                    />

                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/30">
                      Email
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs font-medium text-black/60">
                    {organiser.email}
                  </p>
                </div>

                <div className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={13}
                      className="text-[#7C3AED]"
                    />

                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/30">
                      Events
                    </span>
                  </div>

                  <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-[#111014]">
                    {organiser.eventCount}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ===============================================================
   AVATAR
=============================================================== */

function Avatar({ name }: { name: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <div
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-[13px]
        bg-gradient-to-br
        from-[#7C3AED]
        to-[#4C1D95]
        text-xs
        font-bold
        text-white
        shadow-[0_5px_15px_rgba(124,58,237,0.18)]
      "
    >
      {initials || <Users size={15} />}
    </div>
  );
}

/* ===============================================================
   TABLE HEADING
=============================================================== */

function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/30">
      {children}
    </span>
  );
}

/* ===============================================================
   EMPTY STATE
=============================================================== */

function EmptyState() {
  return (
    <div className="rounded-[22px] border border-dashed border-black/10 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#7C3AED]/[0.07]">
        <Users
          size={19}
          className="text-[#7C3AED]"
        />
      </div>

      <p className="mt-4 text-sm font-semibold text-[#111014]">
        No organisers yet
      </p>

      <p className="mt-1 text-xs text-black/35">
        Organisers will appear here once they
        create an account.
      </p>
    </div>
  );
}