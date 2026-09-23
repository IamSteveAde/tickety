import { notFound } from "next/navigation";
import { getEventBySlug } from "@/lib/data";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FBFAFC] text-zinc-950">
      <div className="mx-auto max-w-[1180px] px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40">
        <CheckoutForm event={event} />
      </div>
    </main>
  );
}