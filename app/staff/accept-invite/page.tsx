"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  CheckCircle2,
  Loader2,
  ScanLine,
} from "lucide-react";

export default function AcceptStaffInvitePage() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!token) {
      setError("This invitation link is invalid.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/staff/accept-invite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            name,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ??
            "We couldn't accept this invitation."
        );
        return;
      }

      setSuccess(true);

      const login = await signIn("credentials", {
        email: data.email,
        password,
        redirect: false,
      });

      if (login?.ok) {
        window.location.href = "/staff/check-in";
      } else {
        window.location.href = "/login";
      }
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F5F2] px-5">
        <div className="w-full max-w-md rounded-[28px] border border-black/[0.07] bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#7C3AED]/10">
            <CheckCircle2
              size={26}
              className="text-[#7C3AED]"
            />
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
            You're set
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/45">
            Your check-in staff account has been
            created. Taking you to the scanner...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5F2] px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#111014]">
            <ScanLine
              size={21}
              className="text-white"
            />
          </div>

          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">
            Join Tickety check-in
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/45">
            Create your staff account to check
            attendees in at the gate.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[26px] border border-black/[0.07] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8"
        >
          {error && (
            <div className="mb-5 rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <label className="block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-black/35">
              Full name
            </span>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              autoComplete="name"
              placeholder="John Doe"
              className="h-12 w-full rounded-[13px] border border-black/10 bg-[#FAFAF9] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-black/35">
              Password
            </span>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="h-12 w-full rounded-[13px] border border-black/10 bg-[#FAFAF9] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-black/35">
              Confirm password
            </span>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              minLength={8}
              autoComplete="new-password"
              placeholder="Repeat your password"
              className="h-12 w-full rounded-[13px] border border-black/10 bg-[#FAFAF9] px-4 text-sm outline-none transition focus:border-[#7C3AED]"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-[13px] bg-[#7C3AED] text-sm font-semibold text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Setting up...
              </>
            ) : (
              "Create staff account"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}