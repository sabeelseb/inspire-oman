"use client";

import { motion } from "framer-motion";
import { BookOpen, Video, Landmark, Camera, Share2, Award, Users, Globe, Lightbulb } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import { pillars } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = { BookOpen, Video, Landmark };

const pillarDetails = [
  {
    extras: [
      { icon: Camera, text: "Professional photography sessions" },
      { icon: BookOpen, text: "Editorial team crafted narratives" },
      { icon: Award, text: "Premium hardbound production" },
      { icon: Globe, text: "Embassy & stakeholder distribution" },
    ],
  },
  {
    extras: [
      { icon: Video, text: "High-production video profiles" },
      { icon: Share2, text: "Multi-platform social campaigns" },
      { icon: Globe, text: "International audience reach" },
      { icon: Lightbulb, text: "Brand storytelling expertise" },
    ],
  },
  {
    extras: [
      { icon: Users, text: "500+ delegates expected" },
      { icon: Landmark, text: "Government-private sector dialogue" },
      { icon: Award, text: "Recognition & awards ceremony" },
      { icon: Globe, text: "Cross-border networking" },
    ],
  },
];

export default function PillarsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />

        <div className="relative site-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Our Foundation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Three Pillars of{" "}
            <span className="gold-text">Impact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Each pillar is designed to document, amplify, and connect - creating a comprehensive
            ecosystem for celebrating Oman&apos;s business excellence
          </motion.p>
        </div>
      </section>

      {/* Pillars Deep Dive */}
      {pillars.map((pillar, i) => {
        const Icon = iconMap[pillar.icon];
        const details = pillarDetails[i];
        const reversed = i % 2 !== 0;

        return (
          <section
            key={pillar.id}
            className={`section-padding ${i % 2 === 0 ? "" : "bg-primary-light"} relative overflow-hidden`}
          >
            {i % 2 !== 0 && <IslamicPattern opacity={0.03} />}

            <div className="relative site-container">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? "lg:grid-flow-dense" : ""}`}>
                <ScrollReveal className={reversed ? "lg:col-start-2" : ""}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-6">
                    <Icon size={16} />
                    Pillar {i + 1}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {pillar.title}
                  </h2>
                  <p className="text-gold/70 text-sm font-medium uppercase tracking-wider mb-6">
                    {pillar.subtitle}
                  </p>
                  <p className="text-white/50 leading-relaxed mb-8">
                    {pillar.description}
                  </p>
                  <ul className="space-y-3">
                    {pillar.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>

                <ScrollReveal delay={0.2} className={reversed ? "lg:col-start-1" : ""}>
                  <div className="grid grid-cols-2 gap-4">
                    {details.extras.map((extra, j) => (
                      <motion.div
                        key={j}
                        whileHover={{ y: -4 }}
                        className="glass-card-hover p-5 text-center"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                          <extra.icon size={20} className="text-gold" />
                        </div>
                        <p className="text-white/60 text-sm">{extra.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
