"use client";

import { useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteEventButton({
  eventId,
}: {
  eventId: string;
}) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to delete this event."
        );
      }

      setOpen(false);

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete this event."
      );

      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3.5 text-[10px] font-semibold text-red-500 transition-all hover:border-red-200 hover:bg-red-100 hover:text-red-600"
      >
        <Trash2 size={13} />
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-5 backdrop-blur-sm">
          <div className="w-full max-w-[440px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.20)]">
            <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-5">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-red-500">
                  Permanent action
                </p>

                <h2 className="mt-1 font-display text-xl font-semibold tracking-[-0.035em]">
                  Delete this event?
                </h2>
              </div>

              <button
                type="button"
                onClick={() => !deleting && setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-black/40 hover:bg-black/[0.07] hover:text-black"
              >
                <X size={16} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="rounded-[17px] border border-red-100 bg-red-50 px-4 py-4">
                <p className="text-sm font-semibold text-red-900">
                  This cannot be undone.
                </p>

                <p className="mt-1.5 text-xs leading-5 text-red-800/65">
                  Deleting the event removes the event and its
                  associated ticket, attendee and listing-fee
                  records.
                </p>
              </div>

              {error && (
                <p className="mt-4 rounded-[14px] bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={deleting}
                  onClick={() => setOpen(false)}
                  className="h-11 rounded-full border border-black/[0.08] px-5 text-xs font-semibold text-black/55 hover:text-black disabled:opacity-50"
                >
                  Keep event
                </button>

                <button
                  type="button"
                  disabled={deleting}
                  onClick={handleDelete}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-red-600 px-5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting ? (
                    <>
                      <Loader2
                        size={14}
                        className="animate-spin"
                      />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} />
                      Delete event
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
