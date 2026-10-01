"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function EventShareLink({ slug }: { slug: string }) {
  const path = `/events/${encodeURIComponent(slug)}`;
  const [url, setUrl] = useState(path);
  const [message, setMessage] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUrl(new URL(path, window.location.origin).href);
    setMessage("");
  }, [path]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied!");
    } catch {
      input.current?.focus();
      input.current?.select();
      setMessage("Copy the selected link manually.");
    }
  }

  return (
    <div className="min-w-0 text-left">
      <p className="mb-2 text-xs font-semibold text-zinc-600">Event link</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          ref={input}
          aria-label="Event link"
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700"
        />
        <button type="button" onClick={copyLink} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-600">
          {message === "Link copied!" ? <Check size={16} /> : <Copy size={16} />}
          {message === "Link copied!" ? "Copied" : "Copy link"}
        </button>
      </div>
      <p role="status" className="mt-2 text-xs text-zinc-500">{message}</p>
    </div>
  );
}
