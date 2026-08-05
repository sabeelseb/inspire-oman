import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { CmsProvider } from "@/components/CmsProvider";
import { getCmsSite } from "@/lib/cms";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

/** Live CMS reads (Payload / Keystatic) must not be baked at build time. */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getCmsSite();
  const title = site.seoTitle || `${site.name} - Telling Oman's Growth Story Globally`;
  const description = site.seoDescription || site.description;
  const ogImage = site.images.og || site.images.hero;

  return {
    title,
    description,
    keywords: [
      "Inspire Oman",
      "Oman Vision 2040",
      "Investors Summit",
      "Gulf Madhyamam",
      "OCCI",
      "Business Oman",
      "Investment Oman",
    ],
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/images/logos/IO-logo.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/images/logos/IO-logo.svg" }],
    },
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

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
