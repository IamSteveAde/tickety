"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const BRAND_PURPLE = "#6D28D9";

export default function PagePreloader() {
  const pathname = usePathname();

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setVisible(true);
    setExiting(false);

    let hideTimer: number | undefined;

    const minimumDisplay = window.setTimeout(() => {
      setExiting(true);

      hideTimer = window.setTimeout(() => {
        setVisible(false);
      }, 420);
    }, 520);

    return () => {
      window.clearTimeout(minimumDisplay);

      if (hideTimer !== undefined) {
        window.clearTimeout(hideTimer);
      }
    };
  }, [pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={[
        "fixed inset-0 z-[9999] flex items-center justify-center",
        "bg-white",
        "transition-[opacity,visibility] duration-500 ease-out",
        exiting
          ? "pointer-events-none invisible opacity-0"
          : "visible opacity-100",
      ].join(" ")}
    >
      {/* Quiet brand atmosphere */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[100px]"
        style={{
          backgroundColor: BRAND_PURPLE,
        }}
      />

      {/* Preloader content */}
      <div className="relative flex flex-col items-center">
        {/* Brand mark */}
        <div
          className={[
            "relative flex h-[82px] w-[82px] items-center justify-center",
            "rounded-[24px] bg-white",
            "shadow-[0_20px_70px_rgba(24,24,27,0.12)]",
            "transition-transform duration-700 ease-out",
            exiting ? "scale-95" : "scale-100",
          ].join(" ")}
        >
          {/* Outer border */}
          <div
            className="absolute inset-0 rounded-[24px] border"
            style={{
              borderColor: `${BRAND_PURPLE}20`,
            }}
          />

          {/* Inner brand tint */}
          <div
            className="absolute inset-[7px] rounded-[19px]"
            style={{
              backgroundColor: `${BRAND_PURPLE}0D`,
            }}
          />

          {/* Preloader image */}
          <Image
            src="/images/preloader.jpg"
            alt=""
            width={52}
            height={52}
            priority
            className="relative h-[52px] w-[52px] rounded-[14px] object-cover"
          />
        </div>

        {/* Brand wordmark */}
        <div className="mt-7 text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.34em]"
            style={{
              color: BRAND_PURPLE,
            }}
          >
            Tickety
          </p>

          <p className="mt-2 text-[9px] font-medium tracking-[0.12em] text-zinc-400">
            FIND · CHOOSE · GO
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 h-[2px] w-24 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="preloader-progress h-full w-full origin-left rounded-full"
            style={{
              backgroundColor: BRAND_PURPLE,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .preloader-progress {
          animation: preloaderProgress 520ms
            cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }

        @keyframes preloaderProgress {
          0% {
            transform: scaleX(0);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .preloader-progress {
            animation-duration: 1ms !important;
          }
        }
      `}</style>
    </div>
  );
}