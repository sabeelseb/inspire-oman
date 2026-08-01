"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  Landmark,
  Camera,
  Share2,
  Award,
  Users,
  Globe,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import TitleHighlight from "@/components/TitleHighlight";

const iconMap: Record<string, LucideIcon> = { BookOpen, Video, Landmark };

const extraIcons = [Camera, BookOpen, Award, Globe, Video, Share2, Lightbulb, Users, Landmark];

type Pillar = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  extras?: string[];
};

type PageData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
};

export default function PillarsClient({
  page,
  pillars,
}: {
  page: PageData | null;
  pillars: Pillar[];
}) {
  const title = page?.title || "Three Pillars of Impact";
  const highlight = page?.highlight || "Impact";

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />

        <div className="relative site-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            {page?.eyebrow || "Our Foundation"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            <TitleHighlight title={title} highlight={highlight} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            {page?.subtitle}
          </motion.p>
        </div>
      </section>

      {pillars.map((pillar, i) => {
        const Icon = iconMap[pillar.icon] || BookOpen;
        const extras = pillar.extras || [];
        const reversed = i % 2 !== 0;

        return (
          <section
            key={pillar.id}
            className={`section-padding ${i % 2 === 0 ? "" : "bg-primary-light"} relative overflow-hidden`}
          >
            {i % 2 !== 0 && <IslamicPattern opacity={0.03} />}

            <div className="relative site-container">
              <div
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  reversed ? "lg:grid-flow-dense" : ""
                }`}
              >
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
                  <p className="text-white/50 leading-relaxed mb-8">{pillar.description}</p>
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
                    {extras.map((text, j) => {
                      const ExtraIcon = extraIcons[j % extraIcons.length];
                      return (
                        <motion.div
                          key={j}
                          whileHover={{ y: -4 }}
                          className="glass-card-hover p-5 text-center"
                        >
                          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                            <ExtraIcon size={20} className="text-gold" />
                          </div>
                          <p className="text-white/60 text-sm">{text}</p>
                        </motion.div>
                      );
                    })}
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
