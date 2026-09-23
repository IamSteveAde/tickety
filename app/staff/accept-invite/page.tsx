import { Suspense } from "react";
import AcceptInviteClient from "@/components/staff/AcceptInviteClient";

function AcceptInviteLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F5F2] px-5">
      <div className="w-full max-w-md rounded-[28px] border border-black/[0.07] bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        <div className="mx-auto h-10 w-10 animate-pulse rounded-xl bg-violet-100" />

        <div className="mx-auto mt-5 h-5 w-40 animate-pulse rounded bg-zinc-100" />

        <div className="mx-auto mt-3 h-3 w-56 animate-pulse rounded bg-zinc-100" />
      </div>
    </main>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense fallback={<AcceptInviteLoading />}>
      <AcceptInviteClient />
    </Suspense>
  );
}