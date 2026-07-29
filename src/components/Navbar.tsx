"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-xl border-b border-gold/10 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 flex items-center justify-center">
                <LogoImage
                  src={siteConfig.images.logo}
                  alt="Inspire Oman"
                  className="h-full w-full"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-wide text-white group-hover:text-gold transition-colors">
                  INSPIRE
                </span>
                <span className="text-lg font-light tracking-widest text-gold ml-1">OMAN</span>
              </div>
            </Link>

            {/* Desktop Nav */}
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

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col justify-center h-full px-8">
              <nav className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between py-4 px-4 text-2xl font-light rounded-xl transition-all ${
                        pathname === link.href
                          ? "text-gold bg-gold/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      <ChevronRight size={20} className="text-gold/50" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Link href="/partner" className="btn-primary w-full text-center text-lg py-4">
                  Partner With Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
