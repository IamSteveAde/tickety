"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  LogIn,
  ShieldCheck,
  UserPlus,
  XCircle,
} from "lucide-react";

type InvitationStatus =
  | "ready"
  | "invalid"
  | "expired"
  | "revoked"
  | "accepted"
  | "restricted";

type Props = {
  token: string;
  status: InvitationStatus;
  email?: string;
  eventTitle?: string;
  venue?: string;
  eventDate?: string;
  inviterName?: string;
  existingUser?: boolean;
  existingUserName?: string | null;
};

export default function StaffInvitationClient({
  token,
  status,
  email,
  eventTitle,
  venue,
  eventDate,
  inviterName,
  existingUser = false,
  existingUserName,
}: Props) {
  const [name, setName] = useState(existingUserName ?? "");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      /*
       * Existing account:
       *
       * First sign the person into their existing Tickety account.
       * Then accept the invitation.
       */
      if (existingUser) {
        if (!password) {
          throw new Error("Enter your password.");
        }

        const signInResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (!signInResult || signInResult.error) {
          throw new Error(
            "The email or password is incorrect."
          );
        }
      } else {
        if (!name.trim()) {
          throw new Error("Enter your name.");
        }

        if (password.length < 8) {
          throw new Error(
            "Your password must be at least 8 characters."
          );
        }
      }

      /*
       * Accept the invitation.
       *
       * For new users this also creates the account.
       */
      const response = await fetch(
        `/api/staff/invite/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to accept this invitation."
        );
      }

      if (data.requiresLogin) {
  const loginResult = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (!loginResult || loginResult.error) {
    setSuccess(true);

    window.setTimeout(() => {
      window.location.href = "/login";
    }, 900);

    return;
  }
}

setSuccess(true);

window.setTimeout(() => {
  window.location.href = "/staff/check-in";
}, 900);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  if (status !== "ready") {
    const content = {
      invalid: {
        icon: <XCircle size={22} />,
        title: "Invitation not found",
        description:
          "This staff invitation is invalid or no longer exists.",
      },
      expired: {
        icon: <Clock3 size={22} />,
        title: "Invitation expired",
        description:
          "This invitation has expired. Ask the event organiser to send you a new invitation.",
      },
      revoked: {
        icon: <XCircle size={22} />,
        title: "Invitation revoked",
        description:
          "This invitation is no longer active. Contact the event organiser if you still need access.",
      },
      accepted: {
        icon: <CheckCircle2 size={22} />,
        title: "Invitation already accepted",
        description:
          "This invitation has already been accepted.",
      },
      restricted: {
        icon: <ShieldCheck size={22} />,
        title: "Account cannot be assigned",
        description:
          "This email belongs to an organiser or administrator account and cannot be used as check-in staff.",
      },
    }[status];

    return (
      <PageShell>
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05] text-black/60">
            {content.icon}
          </div>

          <h1 className="mt-5 text-xl font-semibold tracking-tight text-[#111014]">
            {content.title}
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-black/50">
            {content.description}
          </p>

          <a
            href="/"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[#111014] px-5 text-sm font-semibold text-white transition hover:bg-[#242229]"
          >
            Go to Tickety
          </a>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
          <ShieldCheck size={15} />
          Staff invitation
        </div>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[#111014] sm:text-3xl">
          You’ve been invited to check in guests
        </h1>

        <p className="mt-2 text-sm leading-6 text-black/50">
          {inviterName
            ? `${inviterName} invited you to help manage check-in for this event.`
            : "You’ve been invited to help manage check-in for this event."}
        </p>

        <div className="mt-6 rounded-xl border border-black/[0.08] bg-[#FAFAF9] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/35">
            Event
          </p>

          <p className="mt-1 text-base font-semibold text-[#111014]">
            {eventTitle}
          </p>

          {venue && (
            <p className="mt-1 text-sm text-black/45">
              {venue}
            </p>
          )}

          {eventDate && (
            <p className="mt-2 text-xs text-black/40">
              {new Intl.DateTimeFormat("en-NG", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(eventDate))}
            </p>
          )}
        </div>

        {success ? (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-green-600"
              />

              <div>
                <p className="text-sm font-semibold text-green-800">
                  Invitation accepted
                </p>

                <p className="mt-1 text-sm leading-5 text-green-700">
                  Your staff access is ready. Taking you to
                  check-in...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >
            <div>
              <label className="text-xs font-semibold text-[#111014]">
                Email
              </label>

              <input
                type="email"
                value={email ?? ""}
                readOnly
                className="mt-2 h-11 w-full rounded-lg border border-black/[0.1] bg-[#F7F7F6] px-3 text-sm text-black/55 outline-none"
              />
            </div>

            {!existingUser && (
              <div className="mt-4">
                <label
                  htmlFor="staff-name"
                  className="text-xs font-semibold text-[#111014]"
                >
                  Your name
                </label>

                <input
                  id="staff-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="John Doe"
                  autoComplete="name"
                  className="mt-2 h-11 w-full rounded-lg border border-black/[0.12] bg-white px-3 text-sm text-[#111014] outline-none transition placeholder:text-black/25 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                />
              </div>
            )}

            <div className="mt-4">
              <label
                htmlFor="staff-password"
                className="text-xs font-semibold text-[#111014]"
              >
                {existingUser
                  ? "Password"
                  : "Create a password"}
              </label>

              <input
                id="staff-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder={
                  existingUser
                    ? "Enter your password"
                    : "At least 8 characters"
                }
                autoComplete={
                  existingUser
                    ? "current-password"
                    : "new-password"
                }
                className="mt-2 h-11 w-full rounded-lg border border-black/[0.12] bg-white px-3 text-sm text-[#111014] outline-none transition placeholder:text-black/25 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
              />
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#111014] px-4 text-sm font-semibold text-white transition hover:bg-[#242229] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  {existingUser
                    ? "Accepting invitation..."
                    : "Creating account..."}
                </>
              ) : existingUser ? (
                <>
                  <LogIn size={16} />
                  Sign in & accept invitation
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create account & accept
                </>
              )}
            </button>

            {existingUser && (
              <p className="mt-3 text-center text-xs leading-5 text-black/40">
                Use the Tickety password associated with this
                email address.
              </p>
            )}
          </form>
        )}
      </div>
    </PageShell>
  );
}

function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#FAFAF9] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <a
          href="/"
          className="text-sm font-bold tracking-tight text-[#111014]"
        >
          tickety.africa
        </a>

        <div className="mt-8 rounded-2xl border border-black/[0.08] bg-white p-6 shadow-[0_16px_50px_rgba(17,16,20,0.06)] sm:p-7">
          {children}
        </div>
      </div>
    </main>
  );
}