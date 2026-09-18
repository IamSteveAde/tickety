"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function SiteNavigation() {
  const pathname = usePathname();

  const isOrganiserRoute = pathname.startsWith("/organiser");

  if (isOrganiserRoute) {
    return null;
  }

  return <Navbar />;
}