import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  ShieldCheck,
} from "lucide-react";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import OrganiserNav from "@/components/organiser/OrganiserNav";
import PayoutSetupForm from "@/components/organiser/PayoutSetupForm";

export const dynamic = "force-dynamic";

export default async function OrganiserPayoutsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      name: true,
      email: true,
      paystackSubaccountCode: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const isConnected = Boolean(user.paystackSubaccountCode);

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#111014]">
      <OrganiserNav active="payouts" />

      <main>
        <section className="border-b border-black/[0.06] bg-white">
          <div className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 lg:px-10 lg:pb-12">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">
                  Organiser payouts
                </span>
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-[-0.055em] text-[#111014] sm:text-5xl">
                Get paid for your tickets.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                Connect the bank account where you want your event earnings
                settled. Tickety uses Paystack to securely handle your
                payouts.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white">
              {isConnected ? (
                <ConnectedState
                  name={user.name}
                  email={user.email}
                />
              ) : (
                <PayoutSetupForm />
              )}
            </div>

            <aside className="h-fit">
              <div className="rounded-[22px] border border-black/[0.07] bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#F5F5F4] text-black/55">
                  <ShieldCheck size={18} strokeWidth={1.7} />
                </div>

                <h2 className="mt-5 text-sm font-semibold tracking-[-0.015em]">
                  How payouts work
                </h2>

                <div className="mt-5 space-y-4">
                  <InfoItem
                    icon={<Landmark size={14} />}
                    title="Connect your bank"
                    description="Your account is verified before it can receive event earnings."
                  />

                  <InfoItem
                    icon={<CheckCircle2 size={14} />}
                    title="Sell your tickets"
                    description="Customers pay securely through Tickety using Paystack."
                  />

                  <InfoItem
                    icon={<ArrowRight size={14} />}
                    title="Receive your share"
                    description="Your share of each ticket sale is routed to your connected payout account."
                  />
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function ConnectedState({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#ECFDF3] text-[#16803C]">
        <CheckCircle2 size={23} strokeWidth={1.8} />
      </div>

      <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.18em] text-[#16803C]">
        Payouts connected
      </p>

      <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">
        Your payout account is ready.
      </h2>

      <p className="mt-2 max-w-lg text-sm leading-6 text-black/45">
        Your Paystack payout account is connected and can be used for eligible
        ticket sales.
      </p>

      <div className="mt-8 border-t border-black/[0.07] pt-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Detail
            label="Organiser"
            value={name}
          />

          <Detail
            label="Email"
            value={email}
          />
        </div>
      </div>

      <div className="mt-8 rounded-[16px] border border-black/[0.06] bg-[#FAFAF9] p-4">
        <p className="text-xs font-semibold text-[#111014]">
          Your payout details are managed securely through Paystack.
        </p>

        <p className="mt-1.5 text-xs leading-5 text-black/40">
          If you need to change the connected bank account, contact Tickety
          support so the existing payout connection can be reviewed before a
          new one is created.
        </p>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-[#F5F5F4] text-black/45">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold text-[#111014]">{title}</p>

        <p className="mt-1 text-[11px] leading-5 text-black/40">
          {description}
        </p>
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-black/30">
        {label}
      </p>

      <p className="mt-1.5 truncate text-sm font-medium text-[#111014]">
        {value}
      </p>
    </div>
  );
}