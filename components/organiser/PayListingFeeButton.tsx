"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function PayListingFeeButton({
  eventId,
}: {
  eventId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/events/${eventId}/listing-fee`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error ?? "Something went wrong"
        );
      }

      if (!data?.redirectUrl) {
        throw new Error(
          "Payment link could not be created."
        );
      }

      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );

      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div
        className="
          relative
          overflow-hidden
          rounded-[24px]
          border
          border-black/[0.08]
          bg-white
          shadow-[0_15px_50px_rgba(17,16,20,0.07)]
        "
      >
        {/* Ambient glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-[#7C3AED]/[0.07]
            blur-[60px]
          "
        />

        <div className="relative p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-[14px]
                  bg-[#7C3AED]/[0.08]
                "
              >
                <CreditCard
                  size={18}
                  className="text-[#7C3AED]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-[-0.015em] text-[#111014]">
                  Publish your event
                </p>

                <p className="mt-0.5 text-[11px] text-black/35">
                  One-time listing fee
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-full bg-[#F5F3FF] px-3 py-1.5">
              <span className="text-[11px] font-bold text-[#6D28D9]">
                ₦50,000
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-black/[0.06]" />

          {/* Benefits */}
          <div className="space-y-3">
            <Benefit text="Your event goes live on Tickety" />

            <Benefit text="Attendees can discover and book" />

            <Benefit text="WhatsApp ticket flow is activated" />
          </div>

          {/* Payment button */}
          <div className="mt-6">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={handleClick}
              disabled={loading}
              className="
                h-[52px]
                w-full
                rounded-full
                bg-[#111014]
                px-6
                text-sm
                font-semibold
                text-white
                shadow-[0_8px_25px_rgba(17,16,20,0.16)]
                transition-all
                hover:-translate-y-0.5
                hover:bg-[#25113F]
                hover:shadow-[0_12px_30px_rgba(17,16,20,0.20)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />

                  <span>
                    Redirecting to payment...
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>
                    Pay ₦50,000 to publish
                  </span>

                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                  />
                </div>
              )}
            </Button>
          </div>

          {/* Security note */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-black/30">
            <ShieldCheck size={13} />

            <span>
              Secure payment · Your event stays private
              until payment
            </span>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
                mt-4
                flex
                items-start
                gap-2
                rounded-[12px]
                border
                border-red-200
                bg-red-50
                px-3.5
                py-3
              "
            >
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />

              <p className="text-xs leading-5 text-red-600">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#25D366]/10
        "
      >
        <CheckCircle2
          size={13}
          className="text-[#16A34A]"
        />
      </div>

      <span className="text-xs text-black/55">
        {text}
      </span>
    </div>
  );
}