"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));

        setError(
          body?.error ??
            "We couldn't create your account. Please try again."
        );

        setLoading(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      setLoading(false);

      if (signInRes?.error) {
        router.push("/login");
        return;
      }

      router.push("/organiser/dashboard");
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please check your connection and try again."
      );

      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[#08070B]">
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[18%] -top-[25%] h-[680px] w-[680px] rounded-full bg-[#7C3AED]/[0.14] blur-[150px]" />

        <div className="absolute -bottom-[30%] -left-[15%] h-[620px] w-[620px] rounded-full bg-[#25D366]/[0.045] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.13),transparent_45%)]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-20 lg:pt-36">
        {/* ===================================================
            LEFT — BRAND STORY
        =================================================== */}

        <div className="hidden lg:block">
          <div className="max-w-xl">
            {/* Eyebrow */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.045] px-3.5 py-2 backdrop-blur-xl">
              <Sparkles
                size={13}
                className="text-[#A78BFA]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                Built for organisers
              </span>
            </div>

            <h1 className="font-display text-[4.7rem] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
              Put your event
              <br />
              <span className="text-white/35">
                in front of
              </span>
              <br />
              the right people.
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-white/45">
              Create your organiser account and get
              everything you need to publish, sell and
              manage tickets from one place.
            </p>

            {/* Benefits */}

            <div className="mt-10 space-y-3">
              <Benefit text="Create and publish events in minutes" />

              <Benefit text="Manage tickets and attendee information" />

              <Benefit text="Let attendees receive tickets through WhatsApp" />
            </div>

            {/* Bottom statement */}

            <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-white/25">
              <span className="h-px w-8 bg-white/10" />

              <span>
                One account. Every event.
              </span>
            </div>
          </div>
        </div>

        {/* ===================================================
            SIGNUP CARD
        =================================================== */}

        <div className="mx-auto w-full max-w-[460px] lg:ml-auto">
          {/* Mobile brand */}

          <div className="mb-8 flex items-center justify-center lg:hidden">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#7C3AED] font-display text-sm font-bold text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)]">
                T
              </span>

              <span className="font-display text-base font-semibold text-white">
                tickety
                <span className="text-[#A78BFA]">
                  .africa
                </span>
              </span>
            </Link>
          </div>

          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/[0.09]
              bg-white
              shadow-[0_35px_100px_rgba(0,0,0,0.45)]
            "
          >
            {/* Card glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7C3AED]/[0.08] blur-[60px]" />

            <div className="relative p-6 sm:p-9">
              {/* Header */}

              <div>
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#111014]">
                  <UserRound
                    size={17}
                    className="text-white"
                  />
                </div>

                <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#111014]">
                  Create your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-black/40">
                  Start organising better events with
                  Tickety.
                </p>
              </div>

              {/* Error */}

              {error && (
                <div className="mt-6 flex items-start gap-3 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3.5">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />

                  <p className="text-xs leading-5 text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                {/* Name */}

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-[#111014]">
                    Full name
                  </span>

                  <div className="group relative">
                    <UserRound
                      size={16}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-black/25
                        transition-colors
                        group-focus-within:text-[#7C3AED]
                      "
                    />

                    <input
                      required
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Your full name"
                      className="
                        h-[52px]
                        w-full
                        rounded-[15px]
                        border
                        border-black/[0.09]
                        bg-[#FAFAF9]
                        pl-11
                        pr-4
                        text-sm
                        text-[#111014]
                        outline-none
                        transition-all
                        placeholder:text-black/25
                        focus:border-[#7C3AED]/40
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#7C3AED]/[0.07]
                      "
                    />
                  </div>
                </label>

                {/* Email */}

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold text-[#111014]">
                    Email address
                  </span>

                  <div className="group relative">
                    <Mail
                      size={16}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-black/25
                        transition-colors
                        group-focus-within:text-[#7C3AED]
                      "
                    />

                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      className="
                        h-[52px]
                        w-full
                        rounded-[15px]
                        border
                        border-black/[0.09]
                        bg-[#FAFAF9]
                        pl-11
                        pr-4
                        text-sm
                        text-[#111014]
                        outline-none
                        transition-all
                        placeholder:text-black/25
                        focus:border-[#7C3AED]/40
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#7C3AED]/[0.07]
                      "
                    />
                  </div>
                </label>

                {/* Password */}

                <label className="block">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#111014]">
                      Password
                    </span>

                    <span className="text-[10px] text-black/30">
                      8+ characters
                    </span>
                  </div>

                  <div className="group relative">
                    <LockKeyhole
                      size={16}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-black/25
                        transition-colors
                        group-focus-within:text-[#7C3AED]
                      "
                    />

                    <input
                      required
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Create a password"
                      className="
                        h-[52px]
                        w-full
                        rounded-[15px]
                        border
                        border-black/[0.09]
                        bg-[#FAFAF9]
                        pl-11
                        pr-12
                        text-sm
                        text-[#111014]
                        outline-none
                        transition-all
                        placeholder:text-black/25
                        focus:border-[#7C3AED]/40
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#7C3AED]/[0.07]
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-full
                        text-black/25
                        transition-colors
                        hover:bg-black/[0.04]
                        hover:text-black/60
                      "
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>

                  {/* Password requirements */}

                  <div className="mt-2 flex items-center gap-1.5">
                    <Check
                      size={12}
                      className={
                        password.length >= 8
                          ? "text-[#16A34A]"
                          : "text-black/15"
                      }
                    />

                    <span
                      className={
                        password.length >= 8
                          ? "text-[10px] text-[#16A34A]"
                          : "text-[10px] text-black/30"
                      }
                    >
                      At least 8 characters
                    </span>
                  </div>
                </label>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    flex
                    h-[54px]
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-[#111014]
                    px-6
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_10px_30px_rgba(17,16,20,0.16)]
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#24142F]
                    hover:shadow-[0_15px_35px_rgba(17,16,20,0.2)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />

                      <span>
                        Creating account...
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Create account
                      </span>

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Login */}

              <div className="mt-7 border-t border-black/[0.06] pt-6 text-center">
                <p className="text-sm text-black/40">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="
                      font-semibold
                      text-[#6D28D9]
                      transition-colors
                      hover:text-[#4C1D95]
                    "
                  >
                    Log in
                  </Link>
                </p>
              </div>

              {/* Security */}

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-black/25">
                <ShieldCheck size={13} />

                <span>
                  Your organiser account is secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ===============================================================
   BENEFIT
=============================================================== */

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366]/[0.09]">
        <Check
          size={13}
          className="text-[#25D366]"
          strokeWidth={2.5}
        />
      </div>

      <span className="text-sm text-white/45">
        {text}
      </span>
    </div>
  );
}