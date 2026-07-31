"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppShell from "@/components/AppShell";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCms = pathname?.startsWith("/keystatic");

  if (isCms) {
    return <>{children}</>;
  }

  return (
    <AppShell>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </AppShell>
  );
}
