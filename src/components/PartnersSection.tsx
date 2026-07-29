"use client";

import LogoImage from "./LogoImage";
import ScrollReveal from "./ScrollReveal";
import { siteConfig } from "@/lib/data";

export default function PartnersSection() {
  return (
    <section className="relative section-padding">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Our Partners
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by <span className="gold-text">Leaders</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Inspire Oman is powered by strategic collaboration between OCCI, Gulf Madhyamam, and mefriend
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-6 items-stretch">
          {siteConfig.partnerLogos.map((partner, i) => (
            <ScrollReveal key={partner.name} delay={i * 0.1}>
              <div className="glass-card-hover p-8 h-full flex flex-col items-center justify-center text-center">
                <p className="text-gold/70 text-xs font-semibold uppercase tracking-wider mb-5">
                  {partner.role}
                </p>
                <div
                  className={`w-full h-36 mb-5 rounded-xl flex items-center justify-center overflow-hidden p-4 ${
                    partner.bg === "light" ? "bg-white" : "bg-black border border-white/10"
                  }`}
                >
                  <LogoImage src={partner.src} alt={partner.fullName} className="h-full w-auto" />
                </div>
                <p className="text-white/70 text-sm font-medium">{partner.fullName}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
