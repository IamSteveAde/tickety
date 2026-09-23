"use client";

import { useEffect, useRef, useState } from "react";
import type { Html5Qrcode } from "html5-qrcode";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ScanLine,
  Search,
  Ticket,
  UserRound,
  X,
} from "lucide-react";

type Result = {
  success: boolean;
  status: string;
  message: string;
  attendee?: {
    name: string;
    email: string;
    phone?: string;
    ticketType: string;
    ticketId: string;
    checkInTime?: string | null;
  };
};

type CheckInScannerProps = {
  eventId: string;
};

export default function CheckInScanner({
  eventId,
}: CheckInScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const qrScannerRef = useRef<Html5Qrcode | null>(null);

  const lastScanRef = useRef("");
  const startingScannerRef = useRef(false);

  const [ticketNumber, setTicketNumber] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerLoading, setScannerLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [cameraError, setCameraError] = useState("");

  async function checkIn(
    value: string,
    method: "qr" | "ticket"
  ) {
    const cleanValue = value.trim();

    if (!cleanValue || !eventId || submitting) {
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch(
        "/api/organiser/check-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId,
            method,
            value: cleanValue,
          }),
        }
      );

      let data: Result;

      try {
        data = (await response.json()) as Result;
      } catch {
        data = {
          success: false,
          status: "invalid_response",
          message:
            "Tickety returned an unexpected response. Please try again.",
        };
      }

      setResult(data);

      if (data.success) {
        setTicketNumber("");
      }
    } catch {
      setResult({
        success: false,
        status: "network_error",
        message:
          "We couldn't connect to Tickety. Check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  async function startScanner() {
    if (
      !eventId ||
      scannerOpen ||
      startingScannerRef.current
    ) {
      return;
    }

    startingScannerRef.current = true;

    setCameraError("");
    setResult(null);
    setScannerOpen(true);
    setScannerLoading(true);

    try {
      /*
       * -----------------------------------------------------------
       * CHECK CAMERA SUPPORT
       * -----------------------------------------------------------
       */

      if (typeof window === "undefined") {
        throw new Error(
          "Camera can only be used in a browser."
        );
      }

      if (!window.isSecureContext) {
        throw new Error(
          "Camera access requires a secure connection."
        );
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "This browser does not support camera access."
        );
      }

      /*
       * -----------------------------------------------------------
       * REQUEST CAMERA PERMISSION
       * -----------------------------------------------------------
       */

      let permissionStream: MediaStream | null = null;

      try {
        permissionStream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: {
                ideal: "environment",
              },
            },
            audio: false,
          });
      } catch (error) {
        console.error(
          "Camera permission error:",
          error
        );

        throw new Error(
          "Camera access was denied or unavailable."
        );
      } finally {
        if (permissionStream) {
          permissionStream
            .getTracks()
            .forEach((track) => track.stop());
        }
      }

      /*
       * -----------------------------------------------------------
       * LOAD HTML5-QRCODE
       * -----------------------------------------------------------
       */

      const { Html5Qrcode } = await import(
        "html5-qrcode"
      );

      /*
       * Give React time to mount the scanner container.
       */

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 100);
      });

      if (!scannerRef.current) {
        throw new Error(
          "The scanner could not be initialized."
        );
      }

      /*
       * Clean up any previous scanner.
       */

      if (qrScannerRef.current) {
        try {
          await qrScannerRef.current.stop();
        } catch {
          // Already stopped.
        }

        try {
          qrScannerRef.current.clear();
        } catch {
          // Already cleared.
        }

        qrScannerRef.current = null;
      }

      /*
       * -----------------------------------------------------------
       * CREATE SCANNER
       * -----------------------------------------------------------
       */

      const scanner = new Html5Qrcode(
        "tickety-qr-reader"
      );

      qrScannerRef.current = scanner;

      /*
       * -----------------------------------------------------------
       * FIND CAMERAS
       * -----------------------------------------------------------
       */

      const cameras = await Html5Qrcode.getCameras();

      if (!cameras || cameras.length === 0) {
        throw new Error(
          "No camera was found on this device."
        );
      }

      /*
       * Prefer the rear camera.
       */

      const rearCamera =
        cameras.find((camera) => {
          const label = camera.label.toLowerCase();

          return (
            label.includes("back") ||
            label.includes("rear") ||
            label.includes("environment") ||
            label.includes("wide")
          );
        }) ?? cameras[0];

      /*
       * -----------------------------------------------------------
       * START SCANNER
       * -----------------------------------------------------------
       */

      const startPromise = scanner.start(
        rearCamera.id,
        {
          fps: 10,
          qrbox: {
            width: 250,
            height: 250,
          },
          aspectRatio: 1,
        },
        async (decodedText) => {
          const normalized = decodedText.trim();

          if (
            !normalized ||
            normalized === lastScanRef.current
          ) {
            return;
          }

          lastScanRef.current = normalized;

          await stopScanner();

          await checkIn(normalized, "qr");

          window.setTimeout(() => {
            lastScanRef.current = "";
          }, 1500);
        },
        () => {
          /*
           * html5-qrcode continuously calls this while it
           * searches for a QR code. Ignore those failures.
           */
        }
      );

      /*
       * Don't allow the UI to remain stuck indefinitely.
       */

      await Promise.race([
        startPromise,
        new Promise<never>((_, reject) => {
          window.setTimeout(() => {
            reject(
              new Error(
                "The camera took too long to start."
              )
            );
          }, 12000);
        }),
      ]);
    } catch (error) {
      console.error(
        "QR scanner failed to start:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "";

      if (
        message.includes("secure connection")
      ) {
        setCameraError(
          "Camera access requires HTTPS. Open Tickety using its secure HTTPS address."
        );
      } else if (
        message.includes("No camera")
      ) {
        setCameraError(
          "No camera was detected on this device."
        );
      } else if (
        message.includes("denied") ||
        message.includes("permission")
      ) {
        setCameraError(
          "Camera access was denied. Allow camera access for Tickety in your browser settings, then try again."
        );
      } else {
        setCameraError(
          "Camera access couldn't be started. Allow camera access in your browser, or enter the ticket number manually."
        );
      }

      /*
       * Clean up partially initialized scanner.
       */

      const scanner = qrScannerRef.current;

      qrScannerRef.current = null;

      if (scanner) {
        try {
          await scanner.stop();
        } catch {
          // Already stopped.
        }

        try {
          scanner.clear();
        } catch {
          // Already cleared.
        }
      }

      setScannerOpen(false);
    } finally {
      startingScannerRef.current = false;
      setScannerLoading(false);
    }
  }

  async function stopScanner() {
    const scanner = qrScannerRef.current;

    qrScannerRef.current = null;

    setScannerOpen(false);
    setScannerLoading(false);

    startingScannerRef.current = false;

    if (!scanner) {
      return;
    }

    try {
      await scanner.stop();
    } catch {
      // Camera may already be stopped.
    }

    try {
      scanner.clear();
    } catch {
      // Scanner may already be cleared.
    }
  }

  /*
   * ---------------------------------------------------------------
   * COMPONENT CLEANUP
   * ---------------------------------------------------------------
   */

  useEffect(() => {
    return () => {
      const scanner = qrScannerRef.current;

      qrScannerRef.current = null;
      startingScannerRef.current = false;

      if (scanner) {
        scanner
          .stop()
          .then(() => {
            try {
              scanner.clear();
            } catch {
              // Already cleared.
            }
          })
          .catch(() => {
            // Already stopped.
          });
      }
    };
  }, []);

  /*
   * ---------------------------------------------------------------
   * RESET WHEN EVENT CHANGES
   * ---------------------------------------------------------------
   */

  useEffect(() => {
    setResult(null);
    setTicketNumber("");
    setCameraError("");
    lastScanRef.current = "";

    if (scannerOpen) {
      void stopScanner();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  function formatCheckInTime(
    value?: string | null
  ) {
    if (!value) {
      return "Just now";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Just now";
    }

    return new Intl.DateTimeFormat("en-NG", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  const resultIsSuccess = result?.success;

  const resultIsAlreadyUsed =
    result?.status === "already_checked_in";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* ==========================================================
          MAIN CHECK-IN PANEL
      =========================================================== */}

      <section className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#0B0910] shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
        <div className="border-b border-white/[0.07] px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#7C3AED]/15">
                <ScanLine
                  size={17}
                  className="text-[#C084FC]"
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  Gate check-in
                </p>

                <p className="mt-0.5 text-[9px] text-white/30">
                  Scan or enter a ticket number
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#25D366]/10 bg-[#25D366]/[0.05] px-2.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              </span>

              <span className="text-[8px] font-medium text-white/45">
                Ready
              </span>
            </div>
          </div>
        </div>

        {/* Scanner */}

        <div className="px-5 py-7 sm:px-7 sm:py-8">
          {scannerOpen ? (
            <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-[#111014]">
              <div
                id="tickety-qr-reader"
                ref={scannerRef}
                className="min-h-[330px] overflow-hidden [&>div]:!border-0"
              />

              {scannerLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0B0910]/80 backdrop-blur-sm">
                  <div className="text-center">
                    <Loader2
                      size={24}
                      className="mx-auto animate-spin text-[#C084FC]"
                    />

                    <p className="mt-3 text-xs font-semibold text-white">
                      Starting camera
                    </p>

                    <p className="mt-1 text-[10px] text-white/35">
                      Allow camera access when prompted.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  void stopScanner()
                }
                className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 backdrop-blur-md transition hover:bg-black/80 hover:text-white"
                aria-label="Close scanner"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                void startScanner()
              }
              disabled={
                !eventId ||
                scannerLoading
              }
              className="group relative mx-auto block aspect-square w-full max-w-[390px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0E0C14] text-center transition hover:border-[#8B5CF6]/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                  backgroundSize: "35px 35px",
                }}
              />

              <div className="absolute inset-[15%] rounded-[34px] border border-white/[0.06]" />

              <div className="absolute left-[15%] top-[15%] h-10 w-10 border-l-2 border-t-2 border-[#A78BFA]/80" />

              <div className="absolute right-[15%] top-[15%] h-10 w-10 border-r-2 border-t-2 border-[#A78BFA]/80" />

              <div className="absolute bottom-[15%] left-[15%] h-10 w-10 border-b-2 border-l-2 border-[#A78BFA]/80" />

              <div className="absolute bottom-[15%] right-[15%] h-10 w-10 border-b-2 border-r-2 border-[#A78BFA]/80" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/[0.08] bg-white/[0.035] transition-transform duration-300 group-hover:-translate-y-1">
                  <Camera
                    size={30}
                    strokeWidth={1.5}
                    className="text-white/50"
                  />
                </div>

                <p className="mt-6 text-sm font-semibold text-white">
                  Scan QR code
                </p>

                <p className="mt-1.5 max-w-[220px] text-[10px] leading-4 text-white/30">
                  Open the camera and point it at
                  the attendee&apos;s ticket QR.
                </p>
              </div>
            </button>
          )}

          {cameraError && (
            <div className="mx-auto mt-4 flex max-w-[390px] items-start gap-2.5 rounded-[14px] border border-amber-400/15 bg-amber-400/[0.05] px-3.5 py-3">
              <AlertCircle
                size={14}
                className="mt-0.5 shrink-0 text-amber-300"
              />

              <div className="min-w-0">
                <p className="text-[11px] leading-5 text-amber-200/70">
                  {cameraError}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setCameraError("");
                    void startScanner();
                  }}
                  className="mt-2 text-[10px] font-semibold text-amber-200 underline underline-offset-2"
                >
                  Try camera again
                </button>
              </div>
            </div>
          )}

          <div className="mx-auto my-6 flex max-w-[390px] items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.07]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/20">
              or
            </span>

            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Manual ticket */}

          <form
            className="mx-auto max-w-[390px]"
            onSubmit={(event) => {
              event.preventDefault();
              void checkIn(
                ticketNumber,
                "ticket"
              );
            }}
          >
            <label
              htmlFor="tickety-ticket-number"
              className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30"
            >
              Ticket number
            </label>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Ticket
                  size={14}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20"
                />

                <input
                  id="tickety-ticket-number"
                  value={ticketNumber}
                  onChange={(event) =>
                    setTicketNumber(
                      event.target.value
                    )
                  }
                  placeholder="TCK-88213"
                  autoComplete="off"
                  spellCheck={false}
                  className="h-12 w-full rounded-[14px] border border-white/10 bg-white/[0.045] pl-10 pr-4 font-mono text-xs uppercase text-white outline-none transition placeholder:text-white/20 focus:border-[#8B5CF6]/50 focus:bg-white/[0.065]"
                />
              </div>

              <button
                type="submit"
                disabled={
                  !ticketNumber.trim() ||
                  submitting ||
                  !eventId
                }
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[14px] bg-white px-5 text-xs font-semibold text-[#111014] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? (
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />
                ) : (
                  <Search size={14} />
                )}

                Check in
              </button>
            </div>
          </form>
        </div>

        {/* Result */}

        {result && (
          <div className="border-t border-white/[0.07] p-5 sm:p-7">
            <ResultCard
              result={result}
              success={Boolean(
                resultIsSuccess
              )}
              alreadyUsed={
                resultIsAlreadyUsed
              }
              formatCheckInTime={
                formatCheckInTime
              }
            />
          </div>
        )}
      </section>

      {/* ==========================================================
          SIDE INFORMATION
      =========================================================== */}

      <aside className="space-y-4">
        <div className="rounded-[24px] border border-black/[0.07] bg-white p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#7C3AED]/10 text-[#6D28D9]">
              <Ticket size={15} />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#111014]">
                Gate check-in
              </p>

              <p className="mt-0.5 text-[10px] text-black/35">
                Scan a valid Tickety ticket
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-black/[0.06] pt-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-[10px] font-semibold text-black/45">
                1
              </div>

              <div>
                <p className="text-xs font-semibold text-[#111014]">
                  Scan the attendee&apos;s QR
                </p>

                <p className="mt-1 text-[10px] leading-4 text-black/35">
                  Point the camera at the QR displayed
                  on their ticket.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-[10px] font-semibold text-black/45">
                2
              </div>

              <div>
                <p className="text-xs font-semibold text-[#111014]">
                  Or enter the ticket number
                </p>

                <p className="mt-1 text-[10px] leading-4 text-black/35">
                  Use this when the attendee&apos;s QR
                  cannot be scanned.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/10 text-[10px] font-semibold text-[#6D28D9]">
                3
              </div>

              <div>
                <p className="text-xs font-semibold text-[#111014]">
                  Let Tickety verify it
                </p>

                <p className="mt-1 text-[10px] leading-4 text-black/35">
                  Only paid, active tickets belonging to
                  this event can be checked in.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-black/[0.07] bg-[#111014] p-5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-white/[0.06]">
              <UserRound
                size={15}
                className="text-[#C084FC]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold">
                Gate staff tip
              </p>

              <p className="mt-0.5 text-[10px] text-white/30">
                Keep this page open during entry.
              </p>
            </div>
          </div>

          <p className="mt-5 text-[11px] leading-5 text-white/40">
            A successful scan immediately marks the
            ticket as used. If the same ticket is
            scanned again, Tickety will show that it
            has already been checked in.
          </p>
        </div>
      </aside>
    </div>
  );
}

function ResultCard({
  result,
  success,
  alreadyUsed,
  formatCheckInTime,
}: {
  result: Result;
  success: boolean;
  alreadyUsed: boolean;
  formatCheckInTime: (
    value?: string | null
  ) => string;
}) {
  if (success && result.attendee) {
    return (
      <div className="rounded-[20px] border border-[#25D366]/15 bg-[#25D366]/[0.05] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#25D366]/10">
            <CheckCircle2
              size={19}
              className="text-[#5EEA91]"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">
              Check-in successful
            </p>

            <p className="mt-1 text-[10px] text-white/35">
              The ticket has been marked as used.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Info
            label="Attendee"
            value={result.attendee.name}
          />

          <Info
            label="Ticket"
            value={result.attendee.ticketId}
            mono
          />

          <Info
            label="Ticket type"
            value={result.attendee.ticketType}
          />

          <Info
            label="Checked in"
            value={formatCheckInTime(
              result.attendee.checkInTime
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "rounded-[20px] border p-5",
        alreadyUsed
          ? "border-amber-400/15 bg-amber-400/[0.05]"
          : "border-red-400/15 bg-red-400/[0.05]",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]",
            alreadyUsed
              ? "bg-amber-400/10"
              : "bg-red-400/10",
          ].join(" ")}
        >
          {alreadyUsed ? (
            <RefreshCw
              size={18}
              className="text-amber-300"
            />
          ) : (
            <AlertCircle
              size={19}
              className="text-red-300"
            />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">
            {result.message}
          </p>

          {result.attendee && (
            <p className="mt-1 text-[10px] text-white/35">
              {result.attendee.name} ·{" "}
              {result.attendee.ticketType}
            </p>
          )}
        </div>
      </div>

      {alreadyUsed &&
        result.attendee?.checkInTime && (
          <div className="mt-4 rounded-[12px] bg-white/[0.04] px-3.5 py-3">
            <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
              Previous check-in
            </p>

            <p className="mt-1 text-xs text-white/60">
              {formatCheckInTime(
                result.attendee.checkInTime
              )}
            </p>
          </div>
        )}
    </div>
  );
}

function Info({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-[12px] bg-white/[0.035] px-3.5 py-3">
      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/20">
        {label}
      </p>

      <p
        className={`mt-1 truncate text-xs text-white/70 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}