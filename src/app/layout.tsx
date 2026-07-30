import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-brand",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Inspire Oman — Telling Oman's Growth Story Globally",
  description:
    "A prestigious integrated initiative aligned with Oman Vision 2040. Investors Summit — 11 October 2026, Oman Convention & Exhibition Centre.",
  keywords: [
    "Inspire Oman",
    "Oman Vision 2040",
    "Investors Summit",
    "Gulf Madhyamam",
    "OCCI",
    "Business Oman",
    "Investment Oman",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-primary text-white">
        <AppShell>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
