"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import PartnersSection from "@/components/PartnersSection";
import PillarsSection from "@/components/PillarsSection";
import SummitHighlights from "@/components/SummitHighlights";
import PackageTiers from "@/components/PackageTiers";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import { siteConfig, testimonials } from "@/lib/data";

function AboutSection() {
  return (
    <section className="relative pt-14 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              About the Initiative
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Celebrating Oman&apos;s{" "}
              <span className="gold-text">Growth Story</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <p className="text-white/40 leading-relaxed mb-6">
              In strategic partnership with the Oman Chamber of Commerce &amp; Industry (OCCI),
              Inspire Oman brings together CEOs, investors, government leaders, and entrepreneurs
              to celebrate contributions, strengthen investment pathways, and document the
              remarkable achievements of Oman&apos;s business community.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["Oman Vision 2040", "OCCI Partnership", "Cross-Border Investment"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-gold/10 text-gold text-sm border border-gold/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="glass-card p-5 sm:p-6 relative overflow-hidden">
                <IslamicPattern opacity={0.08} />
                <div className="relative space-y-3.5">
                  {[
                    { label: "Strategic Partner", value: siteConfig.partners.strategic },
                    { label: "Initiative By", value: siteConfig.partners.initiative },
                    { label: "Execution Partner", value: siteConfig.partners.execution },
                    { label: "Summit Date", value: siteConfig.summitDate },
                    { label: "Venue", value: siteConfig.venue },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">{label}</p>
                        <p className="text-white/80 text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Voices of Support
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Leaders{" "}
            <span className="gold-text">Say</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <motion.div whileHover={{ y: -4 }} className="glass-card-hover p-8 h-full flex flex-col">
                <Quote size={24} className="text-gold/30 mb-4" />
                <p className="text-white/60 leading-relaxed flex-1 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="islamic-divider mb-4" />
                <p className="text-white font-semibold text-sm">{t.author}</p>
                <p className="text-gold/60 text-xs">{t.role}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10" />
      <IslamicPattern opacity={0.06} />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Be Part of Oman&apos;s{" "}
            <span className="gold-text">Growth Story</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Join Inspire Oman as a partner or delegate and connect with the region&apos;s
            most dynamic business community
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/partner" className="btn-primary text-base group">
              Become a Partner
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/summit" className="btn-outline text-base">
              Register for Summit
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StatsCounter />
      <PartnersSection />
      <div className="islamic-divider max-w-6xl mx-auto" />
      <PillarsSection />
      <SummitHighlights />
      <PackageTiers />
      <TestimonialsSection />
      <CTABanner />
      <ContactForm />
    </>
  );
}
