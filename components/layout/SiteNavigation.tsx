"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import PagePreloader from "@/components/layout/PagePreloader";

export default function SiteNavigation() {
  const pathname = usePathname();
  const isOrganiserRoute = pathname.startsWith("/organiser");

  return (
    <>
      <PagePreloader />

      {!isOrganiserRoute && <Navbar />}
    </>
  );
}
