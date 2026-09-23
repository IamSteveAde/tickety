"use client";

import { useEffect, useRef, useState } from "react";
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

export default function CheckinScanner({
  eventId,
}: CheckInScannerProps) {
 const scannerRef = useRef<any>(null);
  const startingRef = useRef(false);
  const checkingInRef = useRef(false);
  const lastScanRef = useRef("");

  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStarting, setCameraStarting] =
    useState(false);
  const [cameraError, setCameraError] =
    useState("");

  const [ticketNumber, setTicketNumber] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [result, setResult] =
    useState<Result | null>(null);

  /*
   * ============================================================
   * CHECK IN TICKET
   * ============================================================
   */

  async function checkIn(
    value: string,
    method: "qr" | "ticket"
  ) {
    const cleanValue = value.trim();

    if (
      !cleanValue ||
      !eventId ||
      submitting
    ) {
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
        data =
          (await response.json()) as Result;
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
   * ============================================================
   * START CAMERA
   * ============================================================
   */

  async function startCamera() {
    if (
      startingRef.current ||
      scannerRef.current !== null
    ) {
      return;
    }

    if (!eventId) {
      setCameraError(
        "This event could not be identified."
      );
      return;
    }

    setCameraError("");
    setResult(null);
    startingRef.current = true;
    setCameraStarting(true);

    try {
      /*
       * Camera access requires HTTPS in production.
       */

      if (
        typeof window !== "undefined" &&
        !window.isSecureContext
      ) {
        throw new Error(
          "Camera access requires a secure HTTPS connection."
        );
      }

      /*
       * Make sure the browser supports cameras.
       */

      if (
        typeof navigator === "undefined" ||
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "This browser does not support camera access."
        );
      }

      /*
       * Dynamically load html5-qrcode.
       */

      const { Html5Qrcode } =
        await import("html5-qrcode");

      /*
       * Open the camera UI before starting the scanner.
       */

      setCameraOpen(true);

      /*
       * Wait for the scanner element to exist.
       */

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });

      const reader =
        document.getElementById(
          "tickety-qr-reader"
        );

      if (!reader) {
        throw new Error(
          "Camera viewer could not be created."
        );
      }

      /*
       * Make sure an old scanner isn't hanging around.
       */

      const existingScanner = scannerRef.current;

scannerRef.current = null;

if (existingScanner !== null) {
  const scanner = existingScanner as any;

  try {
    await existingScanner.stop();
  } catch {
    // Already stopped.
  }

  try {
    existingScanner.clear();
  } catch {
    // Already cleared.
  }
}

      const scanner = new Html5Qrcode("tickety-qr-reader");

scannerRef.current = scanner;

      /*
       * IMPORTANT:
       *
       * We are NOT calling getCameras().
       *
       * html5-qrcode will request the environment/rear
       * camera directly.
       */

      await scanner.start(
        {
          facingMode: "environment",
        },
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
          if (checkingInRef.current) {
            return;
          }

          const value =
            decodedText.trim();

          if (!value) {
            return;
          }

          /*
           * Prevent repeated reads of the same QR.
           */

          if (
            value === lastScanRef.current
          ) {
            return;
          }

          lastScanRef.current = value;
          checkingInRef.current = true;

          /*
           * Stop camera before checking in.
           */

          await stopCamera();

          /*
           * Verify the ticket.
           */

          await checkIn(value, "qr");

          /*
           * Allow another scan after a short delay.
           */

          window.setTimeout(() => {
            lastScanRef.current = "";
            checkingInRef.current = false;
          }, 1000);
        },

        /*
         * QR scanning errors happen constantly while
         * the camera is searching. Don't display them.
         */
        () => {}
      );

      setCameraError("");
    } catch (error) {
      console.error(
        "Tickety camera error:",
        error
      );

      /*
       * Clean up failed scanner.
       */

      const scanner = scannerRef.current;

      scannerRef.current = null;

      if (scanner !== null) {
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

      setCameraOpen(false);

      const message =
        error instanceof Error
          ? error.message
          : "";

      if (
        message.toLowerCase().includes(
          "permission"
        ) ||
        message.toLowerCase().includes(
          "notallowed"
        ) ||
        message.toLowerCase().includes(
          "denied"
        )
      ) {
        setCameraError(
          "Camera access was denied. Allow camera access for Tickety in your browser settings, then try again."
        );
      } else if (
        message.toLowerCase().includes(
          "secure"
        ) ||
        message.toLowerCase().includes(
          "https"
        )
      ) {
        setCameraError(
          "Camera access requires HTTPS. Open Tickety using its secure HTTPS address."
        );
      } else if (
        message.toLowerCase().includes(
          "notfound"
        ) ||
        message.toLowerCase().includes(
          "camera"
        ) &&
          message.toLowerCase().includes(
            "found"
          )
      ) {
        setCameraError(
          "No usable camera was found on this device."
        );
      } else {
        setCameraError(
          "Tickety couldn't open your camera. Check your browser camera permission and try again."
        );
      }
    } finally {
      startingRef.current = false;
      setCameraStarting(false);
    }
  }

  /*
   * ============================================================
   * STOP CAMERA
   * ============================================================
   */

  async function stopCamera() {
    const scanner = scannerRef.current;

    scannerRef.current = null;

    setCameraOpen(false);
    setCameraStarting(false);

    if (scanner === null) {
      return;
    }

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

  /*
   * ============================================================
   * CLEANUP
   * ============================================================
   */

  useEffect(() => {
    return () => {
      const scanner = scannerRef.current;

      scannerRef.current = null;

      if (scanner !== null) {
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
   * ============================================================
   * RESET WHEN EVENT CHANGES
   * ============================================================
   */

  useEffect(() => {
    setTicketNumber("");
    setResult(null);
    setCameraError("");
    lastScanRef.current = "";
    checkingInRef.current = false;

    if (scannerRef.current !== null) {
      void stopCamera();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  /*
   * ============================================================
   * FORMAT TIME
   * ============================================================
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

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* ========================================================
          MAIN SCANNER
      ========================================================= */}

      <section className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-[#0B0910] shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
        {/* Header */}

        <div className="border-b border-white/[0.07] px-5 py-4 sm:px-7">
          <div className="flex items-center justify-between">
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
                  Scan or enter a ticket
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

        {/* ======================================================
            CAMERA
        ======================================================= */}

        <div className="px-5 py-7 sm:px-7 sm:py-8">
          {cameraOpen ? (
            <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-black">
              <div
                id="tickety-qr-reader"
                className="min-h-[330px] w-full overflow-hidden [&>div]:!border-0"
              />

              {cameraStarting && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0B0910]/90">
                  <div className="text-center">
                    <Loader2
                      size={28}
                      className="mx-auto animate-spin text-[#C084FC]"
                    />

                    <p className="mt-4 text-sm font-semibold text-white">
                      Opening camera
                    </p>

                    <p className="mt-2 max-w-[220px] text-[10px] leading-4 text-white/35">
                      Your browser may ask for camera
                      permission.
                    </p>
                  </div>
                </div>
              )}

              {/* Close */}

              <button
                type="button"
                onClick={() =>
                  void stopCamera()
                }
                className="absolute right-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/75 text-white backdrop-blur-md"
                aria-label="Close camera"
              >
                <X size={16} />
              </button>

              {/* QR guide */}

              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                <div className="relative h-[250px] w-[250px]">
                  <div className="absolute left-0 top-0 h-9 w-9 border-l-2 border-t-2 border-[#C084FC]" />

                  <div className="absolute right-0 top-0 h-9 w-9 border-r-2 border-t-2 border-[#C084FC]" />

                  <div className="absolute bottom-0 left-0 h-9 w-9 border-b-2 border-l-2 border-[#C084FC]" />

                  <div className="absolute bottom-0 right-0 h-9 w-9 border-b-2 border-r-2 border-[#C084FC]" />

                  <div className="absolute left-4 right-4 top-1/2 h-px bg-[#C084FC]/50" />
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/75 px-4 py-2 text-[10px] font-medium text-white/70 backdrop-blur-md">
                Point camera at QR code
              </div>
            </div>
          ) : (
            /*
             * ===================================================
             * THIS IS THE CAMERA BUTTON
             * ===================================================
             */

            <div className="mx-auto w-full max-w-[390px]">
              <button
                type="button"
                onClick={() =>
                  void startCamera()
                }
                disabled={
                  cameraStarting ||
                  startingRef.current ||
                  !eventId
                }
                className="group relative flex min-h-[390px] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#0E0C14] px-6 text-center transition hover:border-[#8B5CF6]/40 hover:bg-[#110E18] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {/* Scan frame */}

                <div className="pointer-events-none absolute inset-[15%] rounded-[30px] border border-white/[0.05]" />

                <div className="pointer-events-none absolute left-[15%] top-[15%] h-9 w-9 border-l-2 border-t-2 border-[#A78BFA]" />

                <div className="pointer-events-none absolute right-[15%] top-[15%] h-9 w-9 border-r-2 border-t-2 border-[#A78BFA]" />

                <div className="pointer-events-none absolute bottom-[15%] left-[15%] h-9 w-9 border-b-2 border-l-2 border-[#A78BFA]" />

                <div className="pointer-events-none absolute bottom-[15%] right-[15%] h-9 w-9 border-b-2 border-r-2 border-[#A78BFA]" />

                {/* Camera */}

                <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/[0.08] bg-white/[0.04] transition duration-300 group-hover:-translate-y-1">
                  <Camera
                    size={32}
                    strokeWidth={1.5}
                    className="text-white/65"
                  />
                </div>

                <p className="relative mt-6 text-base font-semibold text-white">
                  Open camera
                </p>

                <p className="relative mt-2 max-w-[240px] text-[10px] leading-5 text-white/35">
                  Use your device camera to scan an
                  attendee&apos;s Tickety QR code.
                </p>

                <span className="relative mt-6 inline-flex h-11 items-center gap-2 rounded-[13px] bg-white px-5 text-xs font-semibold text-[#111014] transition group-hover:bg-white/90">
                  <Camera size={15} />
                  Start scanning
                </span>
              </button>
            </div>
          )}

          {/* ======================================================
              CAMERA ERROR
          ======================================================= */}

          {cameraError && (
            <div className="mx-auto mt-4 max-w-[390px] rounded-[16px] border border-red-400/15 bg-red-400/[0.05] p-4">
              <div className="flex items-start gap-3">
                <AlertCircle
                  size={16}
                  className="mt-0.5 shrink-0 text-red-300"
                />

                <div className="min-w-0">
                  <p className="text-[11px] leading-5 text-red-200/80">
                    {cameraError}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCameraError("");
                      void startCamera();
                    }}
                    className="mt-3 inline-flex h-9 items-center gap-2 rounded-[10px] bg-white px-3 text-[10px] font-semibold text-[#111014]"
                  >
                    <RefreshCw size={12} />
                    Try camera again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================
              MANUAL CHECK-IN
          ======================================================= */}

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
                  className="h-12 w-full rounded-[14px] border border-white/10 bg-white/[0.045] pl-10 pr-4 font-mono text-xs uppercase text-white outline-none placeholder:text-white/20 focus:border-[#8B5CF6]/50"
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

        {/* ======================================================
            RESULT
        ======================================================= */}

        {result && (
          <div className="border-t border-white/[0.07] p-5 sm:p-7">
            <ResultCard
              result={result}
              formatCheckInTime={
                formatCheckInTime
              }
            />
          </div>
        )}
      </section>

      {/* ========================================================
          SIDE PANEL
      ========================================================= */}

      <aside className="space-y-4">
        <div className="rounded-[24px] border border-black/[0.07] bg-white p-5 shadow-[0_15px_45px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#7C3AED]/10 text-[#6D28D9]">
              <ScanLine size={15} />
            </div>

            <div>
              <p className="text-xs font-semibold text-[#111014]">
                Quick check-in
              </p>

              <p className="mt-0.5 text-[10px] text-black/35">
                Three simple steps
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-black/[0.06] pt-5">
            <Step
              number="1"
              title="Open the camera"
              description="Tap the button and allow camera access."
            />

            <Step
              number="2"
              title="Scan the QR"
              description="Point the camera at the QR code on the attendee's ticket."
            />

            <Step
              number="3"
              title="Confirm entry"
              description="Tickety verifies the ticket and marks it as checked in."
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
                Gate staff
              </p>

              <p className="mt-0.5 text-[10px] text-white/30">
                Keep this page open during entry.
              </p>
            </div>
          </div>

          <p className="mt-5 text-[11px] leading-5 text-white/40">
            A ticket can only be checked in once.
            Scanning an already-used ticket will show
            its previous check-in status.
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
 * RESULT
 * ================================================================
 */

function ResultCard({
  result,
  formatCheckInTime,
}: {
  result: Result;
  formatCheckInTime: (
    value?: string | null
  ) => string;
}) {
  const success = result.success;

  const alreadyUsed =
    result.status ===
    "already_checked_in";

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

          <div>
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
            value={
              result.attendee.ticketType
            }
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

        <div>
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