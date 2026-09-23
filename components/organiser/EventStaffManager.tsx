"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Mail,
  UserPlus,
  UserRound,
  Clock3,
  Trash2,
  RefreshCw,
  Copy,
  Check,
  X,
} from "lucide-react";

type StaffMember = {
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ORGANISER" | "CHECKIN_STAFF" | "ADMIN";
  };
};

type StaffInvitation = {
  id: string;
  email: string;
  expiresAt: string;
  createdAt: string;
};

type EventStaffManagerProps = {
  eventId: string;
};

export default function EventStaffManager({
  eventId,
}: EventStaffManagerProps) {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [invitations, setInvitations] = useState<StaffInvitation[]>([]);

  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [invitationUrl, setInvitationUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function loadStaff() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/organiser/events/${eventId}/staff`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load event staff."
        );
      }

      setStaff(data.staff ?? []);
      setInvitations(data.invitations ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load event staff."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, [eventId]);

  async function inviteStaff() {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Enter the staff member's email address.");
      return;
    }

    try {
      setInviteLoading(true);
      setError("");
      setSuccess("");
      setInvitationUrl("");
      setCopied(false);

      const response = await fetch(
        `/api/organiser/events/${eventId}/staff`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to invite staff."
        );
      }

      setSuccess(
        "Invitation created. Copy the invitation link and send it to the staff member."
      );

      setInvitationUrl(data.invitationUrl || "");

      setEmail("");

      await loadStaff();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to invite staff."
      );
    } finally {
      setInviteLoading(false);
    }
  }

  async function removeStaff(userId: string) {
    const confirmed = window.confirm(
      "Remove this staff member from the event?"
    );

    if (!confirmed) return;

    try {
      setRemovingId(userId);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/organiser/events/${eventId}/staff`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to remove staff."
        );
      }

      setSuccess("Staff member removed from this event.");

      await loadStaff();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to remove staff."
      );
    } finally {
      setRemovingId(null);
    }
  }

  async function copyInvitationLink() {
    if (!invitationUrl) return;

    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError(
        "Unable to copy the invitation link. Please copy it manually."
      );
    }
  }

  function closeModal() {
    if (inviteLoading) return;

    setShowInvite(false);
    setEmail("");
    setInvitationUrl("");
    setError("");
    setSuccess("");
    setCopied(false);
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  }

  function formatExpiry(date: string) {
    return new Intl.DateTimeFormat("en-NG", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  }

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">
            Staff
          </p>

          <p className="mt-1 max-w-xl text-sm leading-6 text-ink-light">
            Give trusted people access to check attendees into
            this event.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setSuccess("");
            setInvitationUrl("");
            setShowInvite(true);
          }}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#111014] px-4 text-sm font-semibold text-white transition hover:bg-[#242229]"
        >
          <UserPlus size={16} />
          Invite staff
        </button>
      </div>

      {error && !showInvite && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && !showInvite && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.08] bg-white">
        {loading ? (
          <div className="flex min-h-[160px] items-center justify-center">
            <Loader2
              size={20}
              className="animate-spin text-black/40"
            />
          </div>
        ) : staff.length === 0 && invitations.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F4]">
              <UserRound
                size={19}
                className="text-black/45"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-ink">
              No staff yet
            </p>

            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-ink-light">
              Invite someone you trust to help check attendees
              into this event.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {staff.map((member) => (
              <div
                key={member.id}
                className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F5F4]">
                    <UserRound
                      size={16}
                      className="text-black/50"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {member.user.name}
                    </p>

                    <p className="truncate text-xs text-ink-light">
                      {member.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-12 sm:pl-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeStaff(member.user.id)
                    }
                    disabled={removingId === member.user.id}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium text-black/40 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {removingId === member.user.id ? (
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={13} />
                    )}
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F5F4]">
                    <Mail
                      size={16}
                      className="text-black/50"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">
                      {invitation.email}
                    </p>

                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-black/40">
                      <Clock3 size={12} />
                      Expires{" "}
                      {formatExpiry(invitation.expiresAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-12 sm:pl-0">
                  <span className="text-xs font-medium text-amber-700">
                    Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showInvite && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-staff-title"
          >
            <div className="flex items-start justify-between border-b border-black/[0.07] px-5 py-5">
              <div>
                <h2
                  id="invite-staff-title"
                  className="text-base font-semibold text-ink"
                >
                  Invite staff
                </h2>

                <p className="mt-1 text-sm leading-5 text-ink-light">
                  Give someone access to check attendees into
                  this event.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={inviteLoading}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-black/40 transition hover:bg-black/[0.05] hover:text-black disabled:opacity-40"
              >
                <X size={17} />
              </button>
            </div>

            <div className="px-5 py-5">
              {!invitationUrl ? (
                <>
                  <label
                    htmlFor="staff-email"
                    className="text-xs font-semibold text-ink"
                  >
                    Email address
                  </label>

                  <div className="relative mt-2">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      id="staff-email"
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !inviteLoading
                        ) {
                          inviteStaff();
                        }
                      }}
                      placeholder="staff@example.com"
                      autoComplete="email"
                      autoFocus
                      className="h-11 w-full rounded-lg border border-black/[0.12] bg-white pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-black/25 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10"
                    />
                  </div>

                  {error && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-5 text-red-700">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-xs leading-5 text-green-700">
                      {success}
                    </div>
                  )}

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={inviteLoading}
                      className="h-10 rounded-lg px-4 text-sm font-medium text-black/50 transition hover:bg-black/[0.04] disabled:opacity-40"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={inviteStaff}
                      disabled={
                        inviteLoading || !email.trim()
                      }
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#111014] px-4 text-sm font-semibold text-white transition hover:bg-[#242229] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {inviteLoading ? (
                        <>
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus size={15} />
                          Create invitation
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                    <p className="text-sm font-semibold text-green-800">
                      Invitation created
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-700">
                      Send this link to the staff member. It will
                      expire in 48 hours.
                    </p>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="invitation-url"
                      className="text-xs font-semibold text-ink"
                    >
                      Invitation link
                    </label>

                    <div className="mt-2 flex gap-2">
                      <input
                        id="invitation-url"
                        type="text"
                        value={invitationUrl}
                        readOnly
                        className="h-10 min-w-0 flex-1 rounded-lg border border-black/[0.1] bg-[#FAFAF9] px-3 text-xs text-black/60 outline-none"
                      />

                      <button
                        type="button"
                        onClick={copyInvitationLink}
                        className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#111014] px-3 text-xs font-semibold text-white transition hover:bg-[#242229]"
                      >
                        {copied ? (
                          <>
                            <Check size={14} />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="h-10 rounded-lg bg-[#111014] px-4 text-sm font-semibold text-white transition hover:bg-[#242229]"
                    >
                      Done
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}