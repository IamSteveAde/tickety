"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock3,
  QrCode,
  ScanLine,
  ShieldCheck,
  Ticket,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";

type ScanResult =
  | { state: "idle" }
  | { state: "valid"; name: string; ticketType: string }
  | { state: "rejected"; message: string; name?: string };

export default function CheckinScanner({
  eventId,
}: {
  eventId: string;
}) {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] = useState<ScanResult>({
    state: "idle",
  });
  const [loading, setLoading] = useState(false);

  async function handleCheck(id: string) {
    if (!id.trim() || loading) return;

    setLoading(true);
    setResult({ state: "idle" });

    try {
      const res = await fetch(
        `/api/events/${eventId}/checkin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticketId: id.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setResult({
          state: "rejected",
          message:
            data?.error ??
            "Couldn't check in this ticket.",
          name: data?.name,
        });

        return;
      }

      setResult({
        state: "valid",
        name: data.name,
        ticketType: data.ticketType,
      });

      setTicketId("");
    } catch {
      setResult({
        state: "rejected",
        message: "Network error — try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[520px]">
      {/* =========================================================
          SCANNER
      ========================================================= */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#09070F] shadow-[0_35px_90px_rgba(0,0,0,0.18)]">
        {/* Background atmosphere */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[30%] -top-[25%] h-[350px] w-[350px] rounded-full bg-[#7C3AED]/20 blur-[100px]" />

          <div className="absolute -bottom-[30%] -right-[20%] h-[300px] w-[300px] rounded-full bg-[#4C1D95]/15 blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
              `,
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        {/* =======================================================
            HEADER
        ======================================================= */}
        <div className="relative flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#7C3AED]/15">
              <ScanLine
                size={16}
                className="text-[#C084FC]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Gate check-in
              </p>

              <p className="mt-0.5 text-[9px] text-white/30">
                Scan or enter a ticket
              </p>
            </div>
          </div>

          {/* Live status */}
          <div className="flex items-center gap-2 rounded-full border border-[#25D366]/10 bg-[#25D366]/[0.05] px-2.5 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/50" />

              <span className="relative h-1.5 w-1.5 rounded-full bg-[#25D366]" />
            </span>

            <span className="text-[8px] font-medium text-white/45">
              Ready
            </span>
          </div>
        </div>

        {/* =======================================================
            SCANNER VIEWPORT
        ======================================================= */}
        <div className="relative px-5 py-7 sm:px-8 sm:py-9">
          <div className="relative mx-auto aspect-square w-full max-w-[330px]">
            {/* Outer glow */}
            <div className="pointer-events-none absolute inset-[12%] rounded-[32px] bg-[#7C3AED]/10 blur-[50px]" />

            {/* Scanner background */}
            <div className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 bg-[#0E0C14]">
              {/* Inner grid */}
              <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
                  `,
                  backgroundSize: "35px 35px",
                }}
              />

              {/* Center QR illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-[22px] border border-white/[0.07] bg-white/[0.025]">
                  <QrCode
                    size={70}
                    strokeWidth={1}
                    className="text-white/[0.22]"
                  />

                  {/* Center focus */}
                  <div className="absolute h-2 w-2 rounded-full bg-[#A78BFA] shadow-[0_0_20px_rgba(167,139,250,0.8)]" />
                </div>
              </div>

              {/* Scan line */}
              <div className="absolute left-[9%] right-[9%] top-[20%]">
                <div className="relative h-px bg-[#A78BFA]/80 shadow-[0_0_14px_rgba(167,139,250,0.9)]">
                  <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#C084FC] shadow-[0_0_12px_rgba(192,132,252,1)]" />

                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#C084FC] shadow-[0_0_12px_rgba(192,132,252,1)]" />
                </div>
              </div>

              {/* =================================================
                  SCANNER CORNERS
              ================================================= */}
              <ScannerCorner className="left-6 top-6" />

              <ScannerCorner className="right-6 top-6 rotate-90" />

              <ScannerCorner className="bottom-6 left-6 -rotate-90" />

              <ScannerCorner className="bottom-6 right-6 rotate-180" />

              {/* Bottom instruction */}
              <div className="absolute inset-x-0 bottom-5 text-center">
                <p className="text-[9px] font-medium uppercase tracking-[0.17em] text-white/30">
                  Camera scanning
                </p>

                <p className="mt-1 text-[8px] text-white/20">
                  Enter ticket ID below for now
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              STATUS
          ===================================================== */}
          <div className="mt-6 text-center">
            {result.state === "idle" && !loading && (
              <>
                <p className="text-sm font-medium text-white/70">
                  Ready to check in
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  Scan a QR code or enter the ticket ID
                </p>
              </>
            )}

            {loading && (
              <>
                <div className="mx-auto flex items-center justify-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#A78BFA]" />

                  <p className="text-sm font-medium text-white/70">
                    Verifying ticket...
                  </p>
                </div>

                <p className="mt-1 text-[10px] text-white/30">
                  Checking ticket status
                </p>
              </>
            )}
          </div>
        </div>

        {/* =======================================================
            TICKET INPUT
        ======================================================= */}
        <div className="relative border-t border-white/[0.07] bg-white/[0.02] px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Ticket
                size={14}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
              />

              <input
                value={ticketId}
                onChange={(e) =>
                  setTicketId(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCheck(ticketId);
                  }
                }}
                placeholder="TCK-88213"
                disabled={loading}
                className="h-12 w-full rounded-[14px] border border-white/10 bg-white/[0.045] pl-10 pr-3 text-sm font-medium text-white outline-none placeholder:text-white/20 transition-all focus:border-[#A78BFA]/40 focus:bg-white/[0.065] focus:ring-4 focus:ring-[#7C3AED]/10 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button
              variant="primary"
              onClick={() => handleCheck(ticketId)}
              disabled={loading || !ticketId.trim()}
              className="h-12 rounded-[14px] bg-white px-5 text-xs font-semibold text-[#111014] hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Checking..." : "Check in"}
            </Button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <ShieldCheck
              size={11}
              className="text-white/20"
            />

            <p className="text-[8px] text-white/25">
              Each ticket can only be used once
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          VALID RESULT
      ========================================================= */}
      {result.state === "valid" && (
        <div className="relative mt-4 overflow-hidden rounded-[24px] border border-[#25D366]/20 bg-[#07150D] shadow-[0_20px_60px_rgba(37,211,102,0.08)]">
          {/* Green glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#25D366]/10 blur-[60px]" />

          <div className="relative flex items-center gap-4 p-5">
            {/* Success icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#25D366]/10">
              <CheckCircle2
                size={25}
                className="text-[#25D366]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#25D366]/70">
                  Entry granted
                </p>

                <span className="h-1 w-1 rounded-full bg-[#25D366]/40" />
              </div>

              <p className="mt-1 truncate text-base font-semibold text-white">
                {result.name}
              </p>

              <p className="mt-1 text-[10px] text-white/35">
                {result.ticketType} · Ticket marked used
              </p>
            </div>

            <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#25D366]/15 bg-[#25D366]/[0.05] sm:flex">
              <Check
                size={15}
                className="text-[#25D366]"
                strokeWidth={2.5}
              />
            </div>
          </div>

          {/* Bottom confirmation */}
          <div className="flex items-center justify-between border-t border-[#25D366]/10 px-5 py-3">
            <div className="flex items-center gap-2">
              <UserRound
                size={11}
                className="text-white/20"
              />

              <span className="text-[8px] text-white/30">
                Attendee verified
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3
                size={10}
                className="text-white/20"
              />

              <span className="text-[8px] text-white/30">
                Just now
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          REJECTED RESULT
      ========================================================= */}
      {result.state === "rejected" && (
        <div className="relative mt-4 overflow-hidden rounded-[24px] border border-red-500/20 bg-[#16090B] shadow-[0_20px_60px_rgba(239,68,68,0.06)]">
          {/* Red glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-500/[0.08] blur-[60px]" />

          <div className="relative flex items-center gap-4 p-5">
            {/* Error icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-red-500/10">
              <XCircle
                size={25}
                className="text-red-400"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-red-400/70">
                  Entry rejected
                </p>

                <span className="h-1 w-1 rounded-full bg-red-400/40" />
              </div>

              <p className="mt-1 text-sm font-semibold text-white">
                {result.message}
              </p>

              {result.name && (
                <p className="mt-1 text-[10px] text-white/35">
                  {result.name}
                </p>
              )}
            </div>

            <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-red-500/15 bg-red-500/[0.05] sm:flex">
              <AlertTriangle
                size={14}
                className="text-red-400"
              />
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-center gap-2 border-t border-red-500/10 px-5 py-3">
            <X
              size={10}
              className="text-red-400/50"
            />

            <span className="text-[8px] text-white/30">
              Do not allow entry until the ticket is verified.
            </span>
          </div>
        </div>
      )}

      {/* =========================================================
          SMALL FOOTNOTE
      ========================================================= */}
      <div className="mt-5 flex items-center justify-center gap-2">
        <div className="h-px w-8 bg-black/[0.07]" />

        <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/25">
          Tickety Gate
        </p>

        <div className="h-px w-8 bg-black/[0.07]" />
      </div>
    </div>
  );
}

/* ===============================================================
   SCANNER CORNER
   =============================================================== */

function ScannerCorner({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute h-8 w-8 border-l border-t border-[#A78BFA]/60 ${className ?? ""}`}
    />
  );
}