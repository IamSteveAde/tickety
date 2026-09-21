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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <main className="min-h-[calc(100vh-73px)] bg-[#08070B]">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl lg:grid-cols-[1fr_460px] lg:gap-20 lg:px-10">
        {/* =========================================================
            DESKTOP BRAND MESSAGE
        ========================================================= */}

        <section className="hidden lg:flex lg:items-center">
          <div className="max-w-xl">
            <div className="mb-7 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Built for organisers
              </span>
            </div>

            <h1 className="font-display text-[4.5rem] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
              Put your event
              <br />
              <span className="text-white/30">in front of</span>
              <br />
              the right people.
            </h1>

            <p className="mt-7 max-w-md text-base leading-7 text-white/45">
              Create your organiser account and get everything you need to
              publish, sell and manage tickets from one place.
            </p>

            <div className="mt-10 space-y-4">
              <Benefit text="Create and publish events in minutes" />
              <Benefit text="Manage tickets and attendee information" />
              <Benefit text="Let attendees receive tickets through WhatsApp" />
            </div>

            <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.14em] text-white/20">
              <span className="h-px w-8 bg-white/10" />
              <span>One account. Every event.</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            SIGNUP AREA
        ========================================================= */}

        <section className="flex min-h-[calc(100vh-73px)] items-center px-5 py-10 sm:px-8 lg:px-0">
          <div className="mx-auto w-full max-w-[460px]">
            {/* Mobile brand */}

            <div className="mb-8 flex justify-center lg:hidden">
              <Link href="/" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#7C3AED] font-display text-sm font-bold text-white">
                  T
                </span>

                <span className="font-display text-base font-semibold text-white">
                  tickety
                  <span className="text-[#A78BFA]">.africa</span>
                </span>
              </Link>
            </div>

            {/* =====================================================
                FORM CARD
            ===================================================== */}

            <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-white">
              <div className="p-6 sm:p-9">
                {/* Header */}

                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#111014]">
                    <UserRound size={17} className="text-white" />
                  </div>

                  <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#111014]">
                    Create your account
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-black/40">
                    Start organising better events with Tickety.
                  </p>
                </div>

                {/* Error */}

                {error && (
                  <div className="mt-6 flex items-start gap-3 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />

                    <p className="text-xs leading-5 text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                >
                  {/* Name */}

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold text-[#111014]">
                      Full name
                    </span>

                    <div className="relative">
                      <UserRound
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25"
                      />

                      <input
                        required
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="
                          h-[52px]
                          w-full
                          rounded-[14px]
                          border
                          border-black/[0.09]
                          bg-[#FAFAF9]
                          pl-11
                          pr-4
                          text-sm
                          text-[#111014]
                          outline-none
                          placeholder:text-black/25
                          focus:border-[#7C3AED]/50
                          focus:bg-white
                          focus:ring-2
                          focus:ring-[#7C3AED]/10
                        "
                      />
                    </div>
                  </label>

                  {/* Email */}

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold text-[#111014]">
                      Email address
                    </span>

                    <div className="relative">
                      <Mail
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25"
                      />

                      <input
                        required
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="
                          h-[52px]
                          w-full
                          rounded-[14px]
                          border
                          border-black/[0.09]
                          bg-[#FAFAF9]
                          pl-11
                          pr-4
                          text-sm
                          text-[#111014]
                          outline-none
                          placeholder:text-black/25
                          focus:border-[#7C3AED]/50
                          focus:bg-white
                          focus:ring-2
                          focus:ring-[#7C3AED]/10
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

                    <div className="relative">
                      <LockKeyhole
                        size={16}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/25"
                      />

                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        minLength={8}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        className="
                          h-[52px]
                          w-full
                          rounded-[14px]
                          border
                          border-black/[0.09]
                          bg-[#FAFAF9]
                          pl-11
                          pr-12
                          text-sm
                          text-[#111014]
                          outline-none
                          placeholder:text-black/25
                          focus:border-[#7C3AED]/50
                          focus:bg-white
                          focus:ring-2
                          focus:ring-[#7C3AED]/10
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((value) => !value)
                        }
                        className="
                          absolute
                          right-2
                          top-1/2
                          flex
                          h-9
                          w-9
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          text-black/30
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
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-white" />

                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create account</span>
                        <ArrowRight size={16} />
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
                      className="font-semibold text-[#6D28D9]"
                    >
                      Log in
                    </Link>
                  </p>
                </div>

                {/* Security */}

                <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-black/25">
                  <ShieldCheck size={13} />

                  <span>Your organiser account is secure</span>
                </div>
              </div>
            </div>
          </div>
        </section>
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
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
        <Check
          size={13}
          className="text-[#A78BFA]"
          strokeWidth={2.5}
        />
      </div>

      <span className="text-sm text-white/45">{text}</span>
    </div>
  );
}