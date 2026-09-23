"use client";

import { Printer } from "lucide-react";

export default function PrintTicketButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-800 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
    >
      <Printer
        className="h-4 w-4"
        strokeWidth={1.8}
      />
      Print / Save Ticket
    </button>
  );
}