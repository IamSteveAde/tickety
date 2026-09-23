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
  const qrScannerRef = useRef<Html5Qrcode | null>(null);
  const startingRef = useRef(false);
  const scanningRef = useRef(false);
  const lastScanRef = useRef("");

  const [ticketNumber, setTicketNumber] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannerLoading, setScannerLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [cameraError, setCameraError] = useState("");

  /*
   * ==============================================================
   * CHECK IN
   * ==============================================================
   */

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

  /*
   * ==============================================================
   * OPEN CAMERA
   *
   * html5-qrcode owns the camera directly.
   * There is no temporary getUserMedia stream.
   * ==============================================================
   */

  async function openCamera() {
    if (
      !eventId ||
      startingRef.current ||
      scannerOpen
    ) {
      return;
    }

    startingRef.current = true;
    scanningRef.current = false;

    setCameraError("");
    setResult(null);
    setScannerLoading(true);

    try {
      /*
       * Camera APIs require HTTPS in production.
       */

      if (
        typeof window !== "undefined" &&
        !window.isSecureContext
      ) {
        throw new Error(
          "SECURE_CONNECTION_REQUIRED"
        );
      }

      /*
       * Dynamically load html5-qrcode so it never gets
       * executed during Next.js server rendering.
       */

      const { Html5Qrcode } = await import(
        "html5-qrcode"
      );

      /*
       * Tell React to render the camera container first.
       */

      setScannerOpen(true);

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 150);
      });

      const element =
        document.getElementById(
          "tickety-qr-reader"
        );

      if (!element) {
        throw new Error(
          "CAMERA_CONTAINER_NOT_FOUND"
        );
      }

      /*
       * Clean up an old scanner if one somehow exists.
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
       * Create the scanner.
       */

      const scanner = new Html5Qrcode(
        "tickety-qr-reader"
      );

      qrScannerRef.current = scanner;

      /*
       * ------------------------------------------------------------
       * GET AVAILABLE CAMERAS
       * ------------------------------------------------------------
       */

      let cameras;

      try {
        cameras =
          await Html5Qrcode.getCameras();
      } catch (error) {
        console.error(
          "Unable to get cameras:",
          error
        );

        throw new Error(
          "CAMERA_PERMISSION_FAILED"
        );
      }

      if (!cameras || cameras.length === 0) {
        throw new Error("NO_CAMERA_FOUND");
      }

      /*
       * Prefer the rear-facing camera.
       */

      const rearCamera =
        cameras.find((camera) => {
          const label =
            camera.label.toLowerCase();

          return (
            label.includes("back") ||
            label.includes("rear") ||
            label.includes("environment") ||
            label.includes("wide")
          );
        }) ?? cameras[0];

      /*
       * ------------------------------------------------------------
       * START CAMERA
       * ------------------------------------------------------------
       */

      await scanner.start(
        rearCamera.id,
        {
          fps: 10,

          qrbox: {
            width: 250,
            height: 250,
          },

          aspectRatio: 1,

          disableFlip: false,
        },

        async (decodedText) => {
          /*
           * Ignore scans while another check-in is being
           * processed.
           */

          if (scanningRef.current) {
            return;
          }

          const normalized =
            decodedText.trim();

          if (!normalized) {
            return;
          }

          /*
           * Prevent the same QR from firing multiple times.
           */

          if (
            normalized === lastScanRef.current
          ) {
            return;
          }

          lastScanRef.current = normalized;
          scanningRef.current = true;

          /*
           * Stop camera immediately after a valid QR.
           */

          await closeCamera();

          /*
           * Verify ticket.
           */

          await checkIn(
            normalized,
            "qr"
          );

          /*
           * Allow another scan after a short delay.
           */

          window.setTimeout(() => {
            lastScanRef.current = "";
            scanningRef.current = false;
          }, 1200);
        },

        () => {
          /*
           * html5-qrcode calls this repeatedly while
           * searching for a QR code.
           *
           * We intentionally don't display these errors.
           */
        }
      );

      /*
       * Camera has successfully started.
       */

      setCameraError("");
    } catch (error) {
      console.error(
        "Failed to open camera:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "";

      /*
       * Clean up failed scanner.
       */

      const scanner =
        qrScannerRef.current;

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

      /*
       * Show useful error to the user.
       */

      if (
        message ===
        "SECURE_CONNECTION_REQUIRED"
      ) {
        setCameraError(
          "Camera access requires HTTPS. Open Tickety using its secure HTTPS address."
        );
      } else if (
        message === "NO_CAMERA_FOUND"
      ) {
        setCameraError(
          "No camera was found on this device. You can enter the ticket number manually below."
        );
      } else if (
        message ===
        "CAMERA_PERMISSION_FAILED"
      ) {
        setCameraError(
          "Tickety couldn't access your camera. Please allow camera access for this site in your browser settings, then tap Open camera again."
        );
      } else if (
        message ===
        "CAMERA_CONTAINER_NOT_FOUND"
      ) {
        setCameraError(
          "The camera could not be initialized. Please try again."
        );
      } else {
        setCameraError(
          "The camera couldn't be opened. Please allow camera access for Tickety and try again."
        );
      }
    } finally {
      startingRef.current = false;
      setScannerLoading(false);
    }
  }

  /*
   * ==============================================================
   * CLOSE CAMERA
   * ==============================================================
   */

  async function closeCamera() {
    const scanner =
      qrScannerRef.current;

    qrScannerRef.current = null;

    setScannerOpen(false);
    setScannerLoading(false);

    if (!scanner) {
      return;
    }

    try {
      await scanner.stop();
    } catch {
      // Camera may already have stopped.
    }

    try {
      scanner.clear();
    } catch {
      // Scanner may already be cleared.
    }
  }

  /*
   * ==============================================================
   * CLEANUP
   * ==============================================================
   */

  useEffect(() => {
    return () => {
      const scanner =
        qrScannerRef.current;

      qrScannerRef.current = null;

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
   * ==============================================================
   * RESET WHEN EVENT CHANGES
   * ==============================================================
   */

  useEffect(() => {
    setTicketNumber("");
    setResult(null);
    setCameraError("");
    lastScanRef.current = "";
    scanningRef.current = false;

    if (scannerOpen) {
      void closeCamera();
    }

    // Intentionally reacting only to eventId.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  /*
   * ==============================================================
   * FORMAT CHECK-IN TIME
   * ==============================================================
   */

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

    return new Intl.DateTimeFormat(
      "en-NG",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    ).format(date);
  }

  const resultIsSuccess =
    result?.success === true;

  const resultIsAlreadyUsed =
    result?.status ===
    "already_checked_in";

  /*
   * ==============================================================
   * UI
   * ==============================================================
   */

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* ==========================================================
          MAIN CHECK-IN PANEL
      =========================================================== */}

      <section className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#0B0910] shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
        {/* Header */}

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

        {/* ========================================================
            CAMERA AREA
        ========================================================= */}

        <div className="px-5 py-7 sm:px-7 sm:py-8">
          {scannerOpen ? (
            /*
             * =====================================================
             * LIVE CAMERA
             * =====================================================
             */

            <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-black">
              <div
                id="tickety-qr-reader"
                className="min-h-[330px] w-full overflow-hidden [&>div]:!border-0"
              />

              {/* Camera loading */}

              {scannerLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0B0910]/85 backdrop-blur-sm">
                  <div className="text-center">
                    <Loader2
                      size={25}
                      className="mx-auto animate-spin text-[#C084FC]"
                    />

                    <p className="mt-3 text-xs font-semibold text-white">
                      Opening camera
                    </p>

                    <p className="mt-1 text-[10px] text-white/35">
                      Please allow camera access if
                      your browser asks.
                    </p>
                  </div>
                </div>
              )}

              {/* Close */}

              <button
                type="button"
                onClick={() =>
                  void closeCamera()
                }
                className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/80 backdrop-blur-md transition hover:bg-black hover:text-white"
                aria-label="Close camera"
              >
                <X size={16} />
              </button>

              {/* Scan guide */}

              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <div className="relative h-[250px] w-[250px]">
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#C084FC]" />

                  <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#C084FC]" />

                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-[#C084FC]" />

                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-[#C084FC]" />

                  <div className="absolute left-3 right-3 top-1/2 h-px bg-[#C084FC]/60" />
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-[10px] font-medium text-white/70 backdrop-blur-md">
                Point the camera at the QR code
              </div>
            </div>
          ) : (
            /*
             * =====================================================
             * OPEN CAMERA BUTTON
             * =====================================================
             */

            <div className="mx-auto w-full max-w-[390px]">
              <button
                type="button"
                onClick={() =>
                  void openCamera()
                }
                disabled={
                  !eventId ||
                  scannerLoading ||
                  startingRef.current
                }
                className="group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#0E0C14] text-center transition hover:border-[#8B5CF6]/40 hover:bg-[#110E18] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {/* Subtle grid */}

                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.025]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                    backgroundSize: "35px 35px",
                  }}
                />

                {/* Scan frame */}

                <div className="absolute inset-[15%] rounded-[34px] border border-white/[0.06]" />

                <div className="absolute left-[15%] top-[15%] h-10 w-10 border-l-2 border-t-2 border-[#A78BFA]" />

                <div className="absolute right-[15%] top-[15%] h-10 w-10 border-r-2 border-t-2 border-[#A78BFA]" />

                <div className="absolute bottom-[15%] left-[15%] h-10 w-10 border-b-2 border-l-2 border-[#A78BFA]" />

                <div className="absolute bottom-[15%] right-[15%] h-10 w-10 border-b-2 border-r-2 border-[#A78BFA]" />

                {/* Camera icon */}

                <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/[0.08] bg-white/[0.04] transition duration-300 group-hover:-translate-y-1 group-hover:bg-white/[0.06]">
                  <Camera
                    size={30}
                    strokeWidth={1.5}
                    className="text-white/60"
                  />
                </div>

                <p className="relative mt-6 text-sm font-semibold text-white">
                  Open camera
                </p>

                <p className="relative mt-2 max-w-[230px] text-[10px] leading-4 text-white/30">
                  Tap here to open your camera and scan
                  the attendee&apos;s QR ticket.
                </p>

                <div className="relative mt-5 inline-flex h-10 items-center gap-2 rounded-[12px] bg-white px-4 text-[11px] font-semibold text-[#111014] transition group-hover:bg-white/90">
                  <Camera size={14} />
                  Start scanning
                </div>
              </button>
            </div>
          )}

          {/* ========================================================
              CAMERA ERROR
          ========================================================= */}

          {cameraError && (
            <div className="mx-auto mt-4 max-w-[390px] rounded-[16px] border border-amber-400/15 bg-amber-400/[0.05] p-4">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-amber-300"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] leading-5 text-amber-200/80">
                    {cameraError}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCameraError("");
                      void openCamera();
                    }}
                    className="mt-3 inline-flex h-9 items-center gap-2 rounded-[10px] bg-amber-200 px-3 text-[10px] font-semibold text-[#241700] transition hover:bg-amber-100"
                  >
                    <RefreshCw size={12} />
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================
              MANUAL TICKET
          ========================================================= */}

          <div className="mx-auto my-6 flex max-w-[390px] items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.07]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/20">
              or
            </span>

            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

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

        {/* ========================================================
            RESULT
        ========================================================= */}

        {result && (
          <div className="border-t border-white/[0.07] p-5 sm:p-7">
            <ResultCard
              result={result}
              success={resultIsSuccess}
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
            <Step
              number="1"
              title="Open the camera"
              description="Tap Open camera and allow browser camera access."
            />

            <Step
              number="2"
              title="Scan the QR"
              description="Point the camera at the QR displayed on the attendee's ticket."
            />

            <Step
              number="3"
              title="Let Tickety verify it"
              description="Only paid, active tickets belonging to this event can be checked in."
              highlighted
            />
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
            ticket as used. If the same ticket is scanned
            again, Tickety will show that it has already
            been checked in.
          </p>
        </div>
      </aside>
    </div>
  );
}

/*
 * ================================================================
 * STEP
 * ================================================================
 */

function Step({
  number,
  title,
  description,
  highlighted = false,
}: {
  number: string;
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div className="mt-4 flex items-start gap-3 first:mt-0">
      <div
        className={[
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
          highlighted
            ? "bg-[#7C3AED]/10 text-[#6D28D9]"
            : "bg-black/[0.04] text-black/45",
        ].join(" ")}
      >
        {number}
      </div>

      <div>
        <p className="text-xs font-semibold text-[#111014]">
          {title}
        </p>

        <p className="mt-1 text-[10px] leading-4 text-black/35">
          {description}
        </p>
      </div>
    </div>
  );
}

/*
 * ================================================================
 * RESULT CARD
 * ================================================================
 */

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

/*
 * ================================================================
 * INFO
 * ================================================================
 */

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
        className={[
          "mt-1 truncate text-xs text-white/70",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}