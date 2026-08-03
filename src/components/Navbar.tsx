"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCmsSite } from "@/components/CmsProvider";
import LogoImage from "./LogoImage";

export default function Navbar() {
  const siteConfig = useCmsSite();
  const { header } = siteConfig;
  const navLinks = header.navLinks;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody || "";
      html.style.overflow = prevHtml || "";
    };
  }, [mobileOpen]);

  const headerSolid = scrolled || mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-[background-color,border-color,box-shadow] duration-300 ${
          headerSolid
            ? "bg-primary border-b border-gold/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="site-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link
              href="/"
              className="flex items-center gap-3 group relative z-[70]"
              onClick={() => setMobileOpen(false)}
            >
              <div className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 flex items-center justify-center">
                <LogoImage
                  src={siteConfig.images.logo}
                  alt="Inspire Oman"
                  className="h-full w-full"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-wide text-white group-hover:text-gold transition-colors">
                  {header.brandPrimary}
                </span>
                <span className="text-lg font-light tracking-widest text-gold ml-1">
                  {header.brandHighlight}
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-gold bg-gold/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href={header.ctaHref} className="btn-primary ml-4 text-sm py-2.5 px-6">
                {header.ctaLabel}
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className={`lg:hidden relative z-[95] flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-200 ${
                mobileOpen
                  ? "border-gold bg-gold text-primary"
                  : "border-gold/40 bg-primary/80 text-gold"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">{mobileOpen ? "Close" : "Menu"}</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                    mobileOpen ? "top-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                    mobileOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${
                    mobileOpen ? "top-1.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Full-bleed opaque scrim - prevents footer/page bleed on mWeb */}
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-primary/95 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[90] flex h-[100dvh] w-full max-w-none flex-col bg-primary lg:hidden"
              style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
              <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10">
                    <LogoImage
                      src={siteConfig.images.logo}
                      alt=""
                      className="h-full w-full"
                    />
                  </div>
                  <p className="text-sm font-medium uppercase tracking-widest text-gold/80">
                    Menu
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 text-gold"
                  aria-label="Close menu"
                >
                  <span className="relative block h-3.5 w-5">
                    <span className="absolute left-0 top-1.5 block h-0.5 w-full rotate-45 rounded-full bg-current" />
                    <span className="absolute left-0 top-1.5 block h-0.5 w-full -rotate-45 rounded-full bg-current" />
                  </span>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
                <ul className="space-y-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-lg transition-colors ${
                          pathname === link.href
                            ? "bg-gold/10 font-medium text-gold"
                            : "text-white/75 active:bg-white/5"
                        }`}
                      >
                        {link.label}
                        <ChevronRight
                          size={18}
                          className={pathname === link.href ? "text-gold" : "text-white/25"}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/5 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Link
                  href={header.ctaHref}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  {header.ctaLabel}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
