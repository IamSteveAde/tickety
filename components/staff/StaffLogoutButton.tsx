"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function StaffLogoutButton() {
  return (
    <button
      type="button"
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 text-xs font-semibold text-black/55 transition hover:border-black/[0.12] hover:bg-black/[0.025] hover:text-black"
    >
      <LogOut size={14} />
      <span className="hidden sm:inline">Log out</span>
    </button>
  );
}