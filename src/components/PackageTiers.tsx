"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Crown } from "lucide-react";
import { packages } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import IslamicPattern from "./IslamicPattern";

export default function PackageTiers() {
  return (
    <section className="relative section-padding overflow-hidden">
      <IslamicPattern opacity={0.03} />

      <div className="relative site-container">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Partnership Packages
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Partner With{" "}
            <span className="gold-text">Inspire Oman</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Choose the partnership tier that aligns with your vision and brand goals
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.tier}
                whileHover={{ y: -8 }}
                className={`relative glass-card-hover p-8 flex flex-col h-full ${
                  pkg.highlight ? "border-gold/40 gold-glow" : ""
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gold text-primary-dark text-xs font-bold flex items-center gap-1.5">
                    <Crown size={12} />
                    MOST POPULAR
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{pkg.tier}</h3>
                  <p className="text-white/40 text-sm">Partnership</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-black gold-text">{pkg.price}</span>
                  <span className="text-white/50 text-sm ml-2">{pkg.currency}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-gold shrink-0 mt-0.5" />
                      <span className="text-white/60">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/partner"
                  className={`${pkg.highlight ? "btn-primary" : "btn-outline"} w-full text-center mt-auto`}
                >
                  Get Started
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
