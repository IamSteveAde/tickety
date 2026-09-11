"use client";

import { useState } from "react";
import { Attendee } from "@/lib/types";
import {
  AlertTriangle,
  ArrowUpRight,
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
  | {
      state: "valid";
      name: string;
      ticketType: string;
    }
  | {
      state: "already-used";
      name: string;
    };

export default function ScannerMock({
  attendees,
}: {
  attendees: Attendee[];
}) {
  const [ticketId, setTicketId] = useState("");
  const [result, setResult] =
    useState<ScanResult>({
      state: "idle",
    });

  const [usedIds, setUsedIds] = useState<string[]>(
    attendees
      .filter(
        (a) => a.ticketStatus === "used"
      )
      .map((a) => a.ticketId)
  );

  const demoTicketId =
    attendees[0]?.ticketId ?? "";

  function handleScan(id: string) {
    const normalizedId = id.trim();

    if (!normalizedId) return;

    const attendee = attendees.find(
      (a) => a.ticketId === normalizedId
    );

    if (!attendee) {
      setResult({ state: "idle" });
      return;
    }

    if (usedIds.includes(normalizedId)) {
      setResult({
        state: "already-used",
        name: attendee.name,
      });

      return;
    }

    setUsedIds((prev) => [
      ...prev,
      normalizedId,
    ]);

    setResult({
      state: "valid",
      name: attendee.name,
      ticketType: attendee.ticketType,
    });

    setTicketId("");
  }

  return (
    <div className="mx-auto w-full max-w-[520px]">
      {/* =========================================================
          SCANNER TERMINAL
      ========================================================= */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#09070F] shadow-[0_35px_90px_rgba(0,0,0,0.2)]">
        {/* =====================================================
            AMBIENT BACKGROUND
        ===================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[30%] -top-[25%] h-[380px] w-[380px] rounded-full bg-[#7C3AED]/20 blur-[110px]" />

          <div className="absolute -bottom-[30%] -right-[20%] h-[320px] w-[320px] rounded-full bg-[#4C1D95]/15 blur-[110px]" />

          <div className="absolute left-1/2 top-1/2 h-[300px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A855F7]/[0.045] blur-[100px]" />

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

        {/* =====================================================
            TERMINAL HEADER
        ===================================================== */}
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
                Gate scanner
              </p>

              <p className="mt-0.5 text-[9px] text-white/30">
                Event access control
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
              Scanner ready
            </span>
          </div>
        </div>

        {/* =====================================================
            SCANNER AREA
        ===================================================== */}
        <div className="relative px-5 py-7 sm:px-8 sm:py-9">
          <div className="relative mx-auto aspect-square w-full max-w-[330px]">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-[12%] rounded-[32px] bg-[#7C3AED]/10 blur-[55px]" />

            {/* Scanner viewport */}
            <div className="absolute inset-0 overflow-hidden rounded-[30px] border border-white/10 bg-[#0E0C14]">
              {/* Grid */}
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

              {/* QR visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-[22px] border border-white/[0.07] bg-white/[0.025]">
                  <QrCode
                    size={70}
                    strokeWidth={1}
                    className="text-white/[0.22]"
                  />

                  <div className="absolute h-2 w-2 rounded-full bg-[#A78BFA] shadow-[0_0_20px_rgba(167,139,250,0.8)]" />
                </div>
              </div>

              {/* =================================================
                  SCANNING LINE
              ================================================= */}
              <div className="absolute left-[9%] right-[9%] top-[20%]">
                <div className="relative h-px bg-[#A78BFA]/80 shadow-[0_0_14px_rgba(167,139,250,0.9)]">
                  <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#C084FC] shadow-[0_0_12px_rgba(192,132,252,1)]" />

                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#C084FC] shadow-[0_0_12px_rgba(192,132,252,1)]" />
                </div>
              </div>

              {/* Scanner corners */}
              <ScannerCorner className="left-6 top-6" />

              <ScannerCorner className="right-6 top-6 rotate-90" />

              <ScannerCorner className="bottom-6 left-6 -rotate-90" />

              <ScannerCorner className="bottom-6 right-6 rotate-180" />

              {/* Bottom instructions */}
              <div className="absolute inset-x-0 bottom-5 text-center">
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">
                  QR scanner
                </p>

                <p className="mt-1 text-[8px] text-white/20">
                  Point the camera at a ticket
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              SCANNER STATUS
          ===================================================== */}
          <div className="mt-6 text-center">
            {result.state === "idle" && (
              <>
                <p className="text-sm font-medium text-white/70">
                  Ready to scan
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  Scan a QR ticket or use the demo below
                </p>
              </>
            )}

            {result.state === "valid" && (
              <>
                <p className="text-sm font-medium text-[#25D366]">
                  Ticket verified
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  Entry has been recorded
                </p>
              </>
            )}

            {result.state ===
              "already-used" && (
              <>
                <p className="text-sm font-medium text-red-400">
                  Ticket rejected
                </p>

                <p className="mt-1 text-[10px] text-white/30">
                  This ticket has already been scanned
                </p>
              </>
            )}
          </div>
        </div>

        {/* =====================================================
            DEMO ACTION
        ===================================================== */}
        <div className="relative border-t border-white/[0.07] bg-white/[0.02] px-5 py-5 sm:px-6">
          <button
            type="button"
            onClick={() =>
              handleScan(demoTicketId)
            }
            disabled={!demoTicketId}
            className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.055] text-xs font-semibold text-white/75 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <ScanLine
              size={15}
              className="relative text-[#A78BFA]"
            />

            <span className="relative">
              Simulate a scan
            </span>

            <ArrowUpRight
              size={13}
              className="relative text-white/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>

          <div className="mt-3 flex items-center justify-center gap-2">
            <ShieldCheck
              size={11}
              className="text-white/20"
            />

            <p className="text-[8px] text-white/25">
              Demo mode · Each ticket can only enter once
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          MANUAL TICKET ENTRY
      ========================================================= */}
      <div className="relative mt-4 overflow-hidden rounded-[24px] border border-black/[0.07] bg-white p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-[#111014]">
            <Ticket
              size={14}
              className="text-white"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-[#111014]">
              Manual check-in
            </p>

            <p className="mt-0.5 text-[9px] text-black/30">
              Can't scan? Enter the ticket ID.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Ticket
              size={13}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/20"
            />

            <input
              value={ticketId}
              onChange={(e) =>
                setTicketId(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleScan(ticketId);
                }
              }}
              placeholder="TCK-88213"
              className="h-11 w-full rounded-[13px] border border-black/[0.08] bg-[#F8F7F5] pl-10 pr-3 text-xs font-medium text-[#111014] outline-none transition-all placeholder:text-black/25 focus:border-[#7C3AED]/30 focus:bg-white focus:ring-4 focus:ring-[#7C3AED]/[0.06]"
            />
          </div>

          <Button
            variant="primary"
            onClick={() => handleScan(ticketId)}
            disabled={!ticketId.trim()}
            className="h-11 rounded-[13px] bg-[#111014] px-5 text-xs font-semibold text-white hover:bg-[#241044] disabled:cursor-not-allowed disabled:opacity-35"
          >
            Check
          </Button>
        </div>
      </div>

      {/* =========================================================
          VALID RESULT
      ========================================================= */}
      {result.state === "valid" && (
        <div className="relative mt-4 overflow-hidden rounded-[24px] border border-[#25D366]/20 bg-[#07150D] shadow-[0_20px_60px_rgba(37,211,102,0.08)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#25D366]/10 blur-[60px]" />

          <div className="relative flex items-center gap-4 p-5">
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
                {result.ticketType} · marked used
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
          ALREADY USED RESULT
      ========================================================= */}
      {result.state ===
        "already-used" && (
        <div className="relative mt-4 overflow-hidden rounded-[24px] border border-red-500/20 bg-[#16090B] shadow-[0_20px_60px_rgba(239,68,68,0.06)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-500/[0.08] blur-[60px]" />

          <div className="relative flex items-center gap-4 p-5">
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
                Ticket already used
              </p>

              <p className="mt-1 text-[10px] leading-5 text-white/35">
                {result.name}&apos;s ticket was scanned earlier.
                Entry denied.
              </p>
            </div>

            <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-red-500/15 bg-red-500/[0.05] sm:flex">
              <AlertTriangle
                size={14}
                className="text-red-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-red-500/10 px-5 py-3">
            <X
              size={10}
              className="text-red-400/50"
            />

            <span className="text-[8px] text-white/30">
              Do not allow entry.
            </span>
          </div>
        </div>
      )}

      {/* =========================================================
          FOOTER LABEL
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
      className={`absolute h-8 w-8 border-l border-t border-[#A78BFA]/60 ${
        className ?? ""
      }`}
    />
  );
}