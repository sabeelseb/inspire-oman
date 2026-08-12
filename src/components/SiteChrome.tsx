"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppShell from "@/components/AppShell";
import RegisterWidget from "@/components/RegisterWidget";

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
      body.style.setProperty("color", "#1a1a1a");
    } else {
      body.classList.remove("cms-body");
      body.classList.add("bg-primary");
      body.classList.remove("text-white");
      body.style.backgroundColor = "";
      const bodyColor = body.style.getPropertyValue("--io-body-color").trim();
      if (bodyColor) {
        body.style.color = bodyColor;
      } else {
        body.style.removeProperty("color");
      }
    }
    return () => {
      body.classList.remove("cms-body");
      body.style.backgroundColor = "";
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
      <RegisterWidget />
    </AppShell>
  );
}
