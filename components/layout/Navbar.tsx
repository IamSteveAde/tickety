"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Button from "@/components/ui/Button";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Events" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated" && !!session?.user;

  return (
    <header className="sticky top-0 z-50">
      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <nav className="border-b border-white/[0.07] bg-[#08070B]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* =====================================================
              LOGO
          ===================================================== */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            {/* Mark */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] shadow-[0_8px_25px_rgba(124,58,237,0.18)] transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-base font-semibold text-white">
                t
              </span>

              {/* tiny highlight */}
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>

            {/* Wordmark */}
            <span className="font-display text-[15px] font-semibold tracking-[-0.025em] text-white">
              tickety
              <span className="text-[#A78BFA]">.africa</span>
            </span>
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ===================================================== */}
          <div className="hidden items-center gap-1 md:flex">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-[13px] font-medium text-white/50 transition-colors hover:text-white"
              >
                {link.label}

                {/* active/hover underline */}
                <span className="absolute bottom-0 left-4 right-4 h-px origin-left scale-x-0 bg-[#A78BFA] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                href="/organiser/dashboard"
                className="group relative px-4 py-2 text-[13px] font-medium text-white/50 transition-colors hover:text-white"
              >
                My events

                <span className="absolute bottom-0 left-4 right-4 h-px origin-left scale-x-0 bg-[#A78BFA] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            )}

            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin"
                className="group relative px-4 py-2 text-[13px] font-medium text-white/50 transition-colors hover:text-white"
              >
                Admin

                <span className="absolute bottom-0 left-4 right-4 h-px origin-left scale-x-0 bg-[#A78BFA] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            )}
          </div>

          {/* =====================================================
              DESKTOP ACTIONS
          ===================================================== */}
          <div className="hidden items-center gap-2 md:flex">
            {isAuthenticated ? (
              <>
                {/* Greeting */}
                <div className="mr-2 flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                    <span className="text-[10px] font-semibold uppercase text-white/60">
                      {session.user.name?.charAt(0) || "U"}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-white/45">
                    Hi,{" "}
                    <span className="text-white/75">
                      {session.user.name?.split(" ")[0]}
                    </span>
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="md"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/",
                    })
                  }
                  className="h-9 rounded-full border border-white/10 bg-white/[0.025] px-4 text-xs text-white/55 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex h-10 items-center rounded-full px-4 text-[13px] font-medium text-white/55 transition-colors hover:text-white"
                >
                  Log in
                </Link>

                <Link
                  href="/signup"
                  className="group flex h-10 items-center gap-1.5 rounded-full bg-white px-5 text-[13px] font-semibold text-[#111014] shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_35px_rgba(255,255,255,0.14)]"
                >
                  Sign up

                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </>
            )}
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ===================================================== */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>

        {/* =========================================================
            MOBILE MENU
        ========================================================= */}
        {open && (
          <div className="border-t border-white/[0.07] bg-[#09070F]/95 px-5 py-5 backdrop-blur-2xl md:hidden">
            <div className="mx-auto max-w-7xl">
              {/* Links */}
              <div className="space-y-1">
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-[14px] px-4 py-3.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    {link.label}

                    <ArrowUpRight
                      size={15}
                      className="text-white/20"
                    />
                  </Link>
                ))}

                {isAuthenticated && (
                  <Link
                    href="/organiser/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-[14px] px-4 py-3.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    My events

                    <ArrowUpRight
                      size={15}
                      className="text-white/20"
                    />
                  </Link>
                )}

                {session?.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-[14px] px-4 py-3.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    Admin

                    <ArrowUpRight
                      size={15}
                      className="text-white/20"
                    />
                  </Link>
                )}
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-white/[0.07]" />

              {/* Auth */}
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-[16px] border border-white/[0.07] bg-white/[0.03] p-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7C3AED]/20">
                      <span className="text-xs font-semibold text-[#C4B5FD]">
                        {session.user.name?.charAt(0) || "U"}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-white">
                        {session.user.name || "Account"}
                      </p>

                      <p className="mt-0.5 text-[10px] text-white/30">
                        Signed in
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() =>
                      signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="w-full rounded-full border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm font-medium text-white/65 transition-colors hover:bg-white/[0.07] hover:text-white"
                  >
                    Log in
                  </Link>

                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-white text-sm font-semibold text-[#111014]"
                  >
                    Sign up
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              )}

              {/* Mobile footer signal */}
              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-1 w-1 rounded-full bg-[#A78BFA]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
                  Discover · Sell · Scan
                </span>

                <span className="h-1 w-1 rounded-full bg-[#A78BFA]" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}