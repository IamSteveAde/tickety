import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import SiteNavigation from "@/components/layout/SiteNavigation";
import Footer from "@/components/layout/Footer";
import AuthSessionProvider from "@/components/providers/SessionProvider";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],  
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Tickety.africa — Event ticketing, reimagined as a conversation",
  description:
    "Discover events on the web. Get your ticket, receipt, and QR code in a WhatsApp chat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col font-body">
        <AuthSessionProvider>
         <SiteNavigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}