"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  ArrowRight,
  Compass,
  LayoutDashboard,
  LogOut,
  Plus,
  Users,
  WalletCards,
  ScanLine,
} from "lucide-react";

export default function OrganiserNav({
  active,
}: {
  active:
    | "dashboard"
    | "new-event"
    | "contacts"
    | "payouts"
    | "check-in";
}) {
  const icon =
    active === "dashboard" ? (
      <LayoutDashboard size={15} className="text-white/75" />
    ) : active === "contacts" ? (
      <Users size={15} className="text-white/75" />
    ) : active === "payouts" ? (
      <WalletCards size={15} className="text-white/75" />
    ) : active === "check-in" ? (
      <ScanLine size={15} className="text-white/75" />
    ) : (
      <Plus size={17} className="text-white/75" />
    );

  const title =
    active === "dashboard"
      ? "Your events"
      : active === "contacts"
        ? "Contacts"
        : active === "payouts"
          ? "Payouts"
          : active === "check-in"
            ? "Check-in"
            : "Create an event";

  return (
    <div className="border-b border-black/[0.07] bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          {/* Left — section identity */}
          <div className="flex shrink-0 items-center gap-3">
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

          {/* Desktop navigation */}
          <div className="hidden items-center gap-3 md:flex">
            <nav className="flex items-center gap-1 rounded-full border border-black/[0.07] bg-[#FAFAF9] p-1">
              {/* Dashboard */}
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

              {/* Contacts */}
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

              {/* Payouts */}
              <Link
                href="/organiser/payouts"
                className={[
                  "group flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all",
                  active === "payouts"
                    ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                    : "text-black/40 hover:bg-white hover:text-black/75",
                ].join(" ")}
              >
                <WalletCards size={14} />
                <span>Payouts</span>
              </Link>

              {/* Check-in */}
              <Link
                href="/organiser/check-in"
                className={[
                  "group flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-all",
                  active === "check-in"
                    ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                    : "text-black/40 hover:bg-white hover:text-black/75",
                ].join(" ")}
              >
                <ScanLine size={14} />
                <span>Check-in</span>
              </Link>

              {/* Create event */}
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

            {/* Secondary navigation */}
            <div className="flex items-center gap-1">
              <Link
                href="/explore"
                className="flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-black/45 transition-all hover:bg-[#FAFAF9] hover:text-black/80"
              >
                <Compass size={14} />
                <span>Explore</span>
              </Link>

              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-black/40 transition-all hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={14} />
                <span>Log out</span>
              </button>
            </div>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 md:hidden">
            <Link
              href="/explore"
              aria-label="Explore events"
              className="flex h-10 w-10 items-center justify-center rounded-full text-black/50 transition-colors hover:bg-[#FAFAF9] hover:text-black"
            >
              <Compass size={17} />
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              aria-label="Log out"
              className="flex h-10 w-10 items-center justify-center rounded-full text-black/50 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>

        {/* Mobile organiser navigation */}
        <div className="overflow-x-auto pb-3 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <nav className="flex w-max items-center gap-1 rounded-full border border-black/[0.07] bg-[#FAFAF9] p-1">
            {/* Dashboard */}
            <Link
              href="/organiser/dashboard"
              className={[
                "flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-3.5 text-[11px] font-semibold transition-all",
                active === "dashboard"
                  ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <LayoutDashboard size={13} />
              <span>Dashboard</span>
            </Link>

            {/* Contacts */}
            <Link
              href="/organiser/contacts"
              className={[
                "flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-3.5 text-[11px] font-semibold transition-all",
                active === "contacts"
                  ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <Users size={13} />
              <span>Contacts</span>
            </Link>

            {/* Payouts */}
            <Link
              href="/organiser/payouts"
              className={[
                "flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-3.5 text-[11px] font-semibold transition-all",
                active === "payouts"
                  ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <WalletCards size={13} />
              <span>Payouts</span>
            </Link>

            {/* Check-in */}
            <Link
              href="/organiser/check-in"
              className={[
                "flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-3.5 text-[11px] font-semibold transition-all",
                active === "check-in"
                  ? "bg-[#111014] text-white shadow-[0_4px_14px_rgba(17,16,20,0.14)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <ScanLine size={13} />
              <span>Check-in</span>
            </Link>

            {/* Create event */}
            <Link
              href="/organiser/events/new"
              className={[
                "flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-3.5 text-[11px] font-semibold transition-all",
                active === "new-event"
                  ? "bg-[#7C3AED] text-white shadow-[0_4px_14px_rgba(124,58,237,0.18)]"
                  : "text-black/40 hover:bg-white hover:text-black/75",
              ].join(" ")}
            >
              <Plus size={13} />
              <span>Create event</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}