"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Globe, Handshake, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import { siteConfig } from "@/lib/data";

const values = [
  { icon: Target, title: "Vision 2040 Aligned", description: "Directly supporting Oman's national economic diversification and growth strategy." },
  { icon: Globe, title: "Global Perspective", description: "Bridging Oman with international markets, investors, and business communities." },
  { icon: Handshake, title: "Collaborative Spirit", description: "Fostering partnerships between government, private sector, and entrepreneurs." },
  { icon: Heart, title: "Cultural Celebration", description: "Honoring the rich heritage and achievements of Oman's business community." },
  { icon: Eye, title: "Transparency", description: "Building trust through open dialogue, clear processes, and measurable outcomes." },
  { icon: TrendingUp, title: "Sustainable Growth", description: "Creating lasting economic impact beyond a single event." },
];

const stakeholders = [
  "Senior Government Representatives",
  "CEOs & Business Owners",
  "Investors & Financial Leaders",
  "Corporate Executives & SME Leaders",
  "International Delegates",
  "Media Representatives",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[100px]" />

        <div className="relative site-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            About the Initiative
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Telling Oman&apos;s{" "}
            <span className="gold-text">Growth Story</span> Globally
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {siteConfig.description}
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-white/50 leading-relaxed mb-6">
                Inspire Oman celebrates the contributions of Oman&apos;s expatriate and local
                business community, strengthening Oman as a destination for investment, innovation,
                and entrepreneurship.
              </p>
              <p className="text-white/40 leading-relaxed mb-8">
                Through a powerful combination of premium documentation, digital storytelling, and
                a flagship investors summit, we create a lasting platform for recognition,
                collaboration, and growth — aligned with the bold ambitions of Oman Vision 2040.
              </p>
              <div className="glass-card p-6 border-l-2 border-l-gold">
                <p className="text-white/60 italic">
                  &ldquo;Inspire Oman is more than an event — it is a movement to document
                  excellence, celebrate achievement, and inspire the next generation of business
                  leaders in the Sultanate.&rdquo;
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Strategic Partner", value: "OCCI" },
                  { label: "Initiative By", value: "Gulf Madhyamam" },
                  { label: "Execution", value: "mefriend" },
                  { label: "Summit Date", value: "11 Oct 2026" },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-5 text-center">
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-2">{item.label}</p>
                    <p className="text-gold font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-primary-light relative">
        <IslamicPattern opacity={0.03} />
        <div className="relative site-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              What Drives <span className="gold-text">Us</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} className="glass-card-hover p-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <v.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="section-padding">
        <div className="site-container">
          <ScrollReveal className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Our Audience</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Who We <span className="gold-text">Serve</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {stakeholders.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  <p className="text-white/70 font-medium">{s}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
