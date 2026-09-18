"use client";

import { useEffect, useState, type ReactNode } from "react";

type BubbleProps = {
  children: ReactNode;
  side?: "left" | "right";
  className?: string;
};

function Bubble({
  children,
  side = "left",
  className = "",
}: BubbleProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const isRight = side === "right";

  return (
    <div
      className={[
        "max-w-[88%] sm:max-w-[360px]",
        isRight ? "ml-auto" : "mr-auto",
        className,
      ].join(" ")}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0) scale(1)"
          : "translate3d(0, 16px, 0) scale(0.96)",
        transition:
          "opacity 420ms ease, transform 620ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

function TicketyBubble({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Bubble
      side="left"
      className={[
        "rounded-[24px] rounded-tl-[7px] border border-zinc-200/90 bg-white px-5 py-4 shadow-[0_18px_55px_rgba(24,24,27,0.09)]",
        className,
      ].join(" ")}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
          T
        </div>

        <span className="text-[11px] font-semibold tracking-wide text-zinc-400">
          TICKETY
        </span>
      </div>

      <div className="text-sm leading-6 text-zinc-700">{children}</div>
    </Bubble>
  );
}

function UserBubble({ children }: { children: ReactNode }) {
  return (
    <Bubble
      side="right"
      className="rounded-[24px] rounded-tr-[7px] bg-zinc-950 px-5 py-4 text-sm leading-6 text-white shadow-[0_18px_45px_rgba(24,24,27,0.16)]"
    >
      {children}
    </Bubble>
  );
}

function TypingBubble() {
  return (
    <Bubble
      side="left"
      className="rounded-[22px] rounded-tl-[7px] border border-zinc-200/90 bg-white px-5 py-4 shadow-[0_18px_55px_rgba(24,24,27,0.08)]"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
          T
        </div>

        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
        </div>
      </div>
    </Bubble>
  );
}

function MiniTicket() {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/70">
      <div className="flex items-center gap-3 p-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
          >
            <path
              d="M7 4v2M17 4v2M4 9h16M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-zinc-800">
            The Experience
          </p>

          <p className="mt-0.5 text-[10px] text-zinc-500">
            VIP · 2 tickets
          </p>
        </div>

        <div className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
          <div className="grid grid-cols-4 gap-[2px]">
            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-white" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />

            <span className="h-1.5 w-1.5 bg-white" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-white" />

            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-white" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />

            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-white" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />
            <span className="h-1.5 w-1.5 bg-zinc-900" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroConversation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [
      1900,
      1500,
      1100,
      2200,
      1400,
      5200,
    ];

    const timeout = window.setTimeout(() => {
      setStep((current) => (current >= 5 ? 0 : current + 1));
    }, delays[step]);

    return () => window.clearTimeout(timeout);
  }, [step]);

  return (
<div className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-[520px] -translate-y-[44%] px-3 sm:px-6">
      {/* =========================================================
          CONTEXT LABEL
      ========================================================= */}
      <div className="mb-5 ml-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 sm:mb-6 sm:ml-8">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />

        <span>A better way to get your ticket</span>
      </div>

      {/* =========================================================
          CONVERSATION STAGE
          
          IMPORTANT:
          The height now accounts for the entire final ticket.
          This prevents the following section from cutting through
          the conversation on smaller screens.
      ========================================================= */}
      <div
        className="
          relative
          min-h-[650px]
          sm:min-h-[610px]
          lg:min-h-[500px]
        "
      >
        {/* =======================================================
            MESSAGE 1
        ======================================================= */}
        {step >= 0 && (
          <div className="absolute left-0 top-0 w-[88%] sm:left-[5%] sm:w-[72%]">
            <TicketyBubble>
              <p>
                Hi Ada 👋
                <br />

                <span className="text-zinc-500">
                  I found something you might love.
                </span>
              </p>

              <div className="mt-3 rounded-xl bg-zinc-50 px-3 py-2.5">
                <p className="text-xs font-semibold text-zinc-800">
                  The Experience
                </p>

                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Saturday · Lagos
                </p>
              </div>
            </TicketyBubble>
          </div>
        )}

        {/* =======================================================
            MESSAGE 2
        ======================================================= */}
        {step >= 1 && (
          <div className="absolute right-0 top-[120px] w-[76%] sm:right-[4%] sm:w-[62%]">
            <UserBubble>
              I&apos;d like two VIP tickets.
            </UserBubble>
          </div>
        )}

        {/* =======================================================
            TYPING
        ======================================================= */}
        {step === 2 && (
          <div className="absolute left-[3%] top-[192px] w-[58%] sm:left-[10%]">
            <TypingBubble />
          </div>
        )}

        {/* =======================================================
            MESSAGE 3
        ======================================================= */}
        {step >= 3 && (
          <div className="absolute left-0 top-[192px] w-[90%] sm:left-[5%] sm:w-[72%]">
            <TicketyBubble>
              <p>
                Perfect.{" "}
                <span className="font-semibold text-zinc-900">
                  2 × VIP = ₦30,000.
                </span>
              </p>

              <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-violet-50 px-3.5 py-3">
                <div>
                  <p className="text-[10px] font-medium text-violet-500">
                    Total
                  </p>

                  <p className="text-sm font-bold text-zinc-900">
                    ₦30,000
                  </p>
                </div>

                <div className="shrink-0 rounded-full bg-violet-600 px-3 py-1.5 text-[10px] font-semibold text-white">
                  Pay securely
                </div>
              </div>
            </TicketyBubble>
          </div>
        )}

        {/* =======================================================
            MESSAGE 4
        ======================================================= */}
        {step >= 4 && (
          <div className="absolute right-0 top-[325px] w-[66%] sm:right-[4%] sm:w-[52%]">
            <UserBubble>Paid ✓</UserBubble>
          </div>
        )}

        {/* =======================================================
            MESSAGE 5
        ======================================================= */}
        {step >= 5 && (
          <div className="absolute left-0 top-[390px] w-[92%] sm:left-[5%] sm:w-[72%]">
            <TicketyBubble>
              <p className="font-semibold text-zinc-900">
                ✓ You&apos;re all set 🎉
              </p>

              <p className="mt-1 text-zinc-500">
                Your tickets are ready.
              </p>

              <MiniTicket />
            </TicketyBubble>
          </div>
        )}
      </div>

      {/* =========================================================
          PROGRESS
      ========================================================= */}
      <div className="mt-2 flex items-center justify-center gap-1.5 sm:mt-5">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <span
            key={item}
            className={[
              "h-1 rounded-full transition-all duration-500",
              item <= step
                ? "w-5 bg-violet-500"
                : "w-1.5 bg-zinc-200",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}