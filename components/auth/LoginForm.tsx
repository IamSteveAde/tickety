"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Ticket,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl =
    searchParams.get("callbackUrl") || "/organiser/dashboard";

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

    const res = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#08070B]">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl lg:grid-cols-[1fr_460px] lg:gap-20 lg:px-10">
        {/* =========================================================
            DESKTOP BRAND MESSAGE
        ========================================================= */}

        <section className="hidden lg:flex lg:items-center">
          <div className="max-w-xl">
            {/* Eyebrow */}

            <div className="mb-7 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Welcome back
              </span>
            </div>

            {/* Heading */}

            <h1 className="font-display text-[4.5rem] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
              Your events,
              <br />
              <span className="text-white/30">right where</span>
              <br />
              you left them.
            </h1>

            {/* Description */}

            <p className="mt-7 max-w-md text-base leading-7 text-white/45">
              Sign in to manage your events, track attendees, monitor ticket
              sales and keep everything moving.
            </p>

            {/* Features */}

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-3">
              <Feature
                icon={<Ticket size={15} />}
                title="Manage events"
                text="Everything in one place."
              />

              <Feature
                icon={<ShieldCheck size={15} />}
                title="Secure access"
                text="Your organiser account stays protected."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            LOGIN AREA
        ========================================================= */}

        <section className="flex items-start px-5 pb-12 pt-[124px] sm:px-8 sm:pb-16 sm:pt-[132px] lg:px-0 lg:pt-[132px]">
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
                LOGIN CARD
            ===================================================== */}

            <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-white">
              <div className="p-6 sm:p-9">
                {/* Header */}

                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#111014]">
                    <LockKeyhole size={17} className="text-white" />
                  </div>

                  <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-[#111014]">
                    Log in
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-black/40">
                    Sign in to manage your events.
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

                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-[#111014]">
                        Password
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
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
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

                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Log in</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                {/* Sign up */}

                <div className="mt-7 border-t border-black/[0.06] pt-6 text-center">
                  <p className="text-sm text-black/40">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-semibold text-[#6D28D9]"
                    >
                      Create one
                    </Link>
                  </p>
                </div>

                {/* Security */}

                <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-black/25">
                  <ShieldCheck size={13} />

                  <span>Secure organiser access</span>
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
   FEATURE
=============================================================== */

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[16px] border border-white/[0.08] bg-white/[0.035] p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white/[0.07] text-[#A78BFA]">
        {icon}
      </div>

      <p className="mt-3 text-xs font-semibold text-white/80">
        {title}
      </p>

      <p className="mt-1 text-[10px] leading-4 text-white/30">
        {text}
      </p>
    </div>
  );
}