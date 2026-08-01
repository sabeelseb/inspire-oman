"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppShell from "@/components/AppShell";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCms =
    pathname?.startsWith("/keystatic") || pathname?.startsWith("/admin");

  useEffect(() => {
    const body = document.body;
    if (isCms) {
      body.classList.add("cms-body");
      body.classList.remove("bg-primary", "text-white");
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#1a1a1a";
    } else {
      body.classList.remove("cms-body");
      body.classList.add("bg-primary", "text-white");
      body.style.backgroundColor = "";
      body.style.color = "";
    }
    return () => {
      body.classList.remove("cms-body");
      body.style.backgroundColor = "";
      body.style.color = "";
    };
  }, [isCms]);

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
