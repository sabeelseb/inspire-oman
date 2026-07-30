"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import LogoImage from "./LogoImage";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock page scroll while mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const headerSolid = scrolled || mobileOpen;

  return (
    <>
      {/* Plain header — avoid motion transforms on fixed nav (iOS / containing-block bugs) */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          headerSolid
            ? "bg-primary/95 backdrop-blur-xl border-b border-gold/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center gap-3 group relative z-[70]"
              onClick={() => setMobileOpen(false)}
            >
              <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 flex items-center justify-center">
                <LogoImage
                  src={siteConfig.images.logo}
                  alt="Inspire Oman"
                  className="h-full w-full"
                  priority
                />
              </div>
              <div className="hidden sm:block brand-wordmark text-lg">
                <span className="text-white group-hover:text-gold transition-colors">Inspire</span>
                <span className="brand-wordmark-logo-gold ml-1.5">Oman</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    pathname === link.href
                      ? "text-gold bg-gold/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/partner" className="btn-primary ml-4 text-sm py-2.5 px-6">
                Partner With Us
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className={`lg:hidden relative z-[70] flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
                mobileOpen
                  ? "border-gold bg-gold text-primary"
                  : "border-gold/40 bg-primary/60 text-gold hover:border-gold hover:bg-gold/10"
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[50] bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 z-[55] flex h-[100dvh] w-[min(100%,22rem)] flex-col border-l border-gold/20 bg-primary shadow-2xl shadow-black/50 lg:hidden"
            >
              <div className="flex h-20 items-center justify-between border-b border-white/5 px-5">
                <p className="text-sm font-medium uppercase tracking-widest text-gold/80">Menu</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 text-gold hover:bg-gold/10"
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
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-lg transition-all ${
                          pathname === link.href
                            ? "bg-gold/10 font-medium text-gold"
                            : "text-white/75 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.label}
                        <ChevronRight
                          size={18}
                          className={pathname === link.href ? "text-gold" : "text-white/25"}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/5 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Link
                  href="/partner"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full text-center"
                >
                  Partner With Us
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
