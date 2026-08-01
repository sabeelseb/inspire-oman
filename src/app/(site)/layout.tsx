import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { CmsProvider } from "@/components/CmsProvider";
import { getCmsSite } from "@/lib/cms";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Inspire Oman - Telling Oman's Growth Story Globally",
  description:
    "A prestigious integrated initiative aligned with Oman Vision 2040. Investors Summit - 11 October 2026, Oman Convention & Exhibition Centre.",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getCmsSite();

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-primary text-white">
        <CmsProvider site={site}>
          <SiteChrome>{children}</SiteChrome>
        </CmsProvider>
      </body>
    </html>
  );
}
