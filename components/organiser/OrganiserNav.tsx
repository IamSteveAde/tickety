import Link from "next/link";
import { ArrowRight, LayoutDashboard, Plus, Users } from "lucide-react";

export default function OrganiserNav({
  active,
}: {
  active: "dashboard" | "new-event" | "contacts";
}) {
  const icon =
    active === "dashboard" ? (
      <LayoutDashboard size={15} className="text-white/75" />
    ) : active === "contacts" ? (
      <Users size={15} className="text-white/75" />
    ) : (
      <Plus size={17} className="text-white/75" />
    );

  const title =
    active === "dashboard"
      ? "Your events"
      : active === "contacts"
        ? "Contacts"
        : "Create an event";

  return (
    <div className="border-b border-black/[0.07] bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-[72px] items-center justify-between">
          {/* Left — section identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#111014]">
              {icon}
            </div>

            <div className="hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
                Organiser
              </p>

              <p className="mt-0.5 text-sm font-semibold tracking-[-0.015em] text-[#111014]">
                {title}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 rounded-full border border-black/[0.07] bg-[#FAFAF9] p-1">
            <Link
              href="/organiser/dashboard"
              className={[
                "group flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all",
                active === "dashboard"
                  ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <LayoutDashboard size={14} />

              <span>Dashboard</span>
            </Link>

            <Link
              href="/organiser/contacts"
              className={[
                "group flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all",
                active === "contacts"
                  ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <Users size={14} />

              <span>Contacts</span>
            </Link>

            <Link
              href="/organiser/events/new"
              className={[
                "group flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all",
                active === "new-event"
                  ? "bg-[#7C3AED] text-white shadow-[0_4px_14px_rgba(124,58,237,0.18)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <Plus size={14} />

              <span>Create event</span>

              {active !== "new-event" && (
                <ArrowRight
                  size={13}
                  className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
                />
              )}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}