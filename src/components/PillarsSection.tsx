"use client";

import { BookOpen, Video, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import { pillars as fallbackPillars } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";
import IslamicPattern from "./IslamicPattern";
import TitleHighlight from "./TitleHighlight";

const iconMap: Record<string, React.ElementType> = { BookOpen, Video, Landmark };

type Pillar = (typeof fallbackPillars)[number];

export default function PillarsSection({
  pillars = fallbackPillars,
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  learnMoreLabel,
  learnMoreHref,
}: {
  pillars?: Pillar[];
  eyebrow?: string | null;
  title?: string | null;
  titleHighlight?: string | null;
  subtitle?: string | null;
  learnMoreLabel?: string | null;
  learnMoreHref?: string | null;
}) {
  const linkLabel = learnMoreLabel || "Learn More";
  const linkHref = learnMoreHref || "/pillars";

  return (
    <section className="relative section-padding overflow-hidden">
      <IslamicPattern opacity={0.03} />

      <div className="relative site-container">
        <ScrollReveal className="text-center mb-16">
          <p className="io-keynote text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            {eyebrow || "Three Pillars"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            <TitleHighlight
              title={title || "Building Oman's Legacy"}
              highlight={titleHighlight || "Legacy"}
            />
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            {subtitle ||
              "Three integrated pillars working together to document, celebrate, and connect Oman's business community"}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {pillars.map((pillar) => {
              const Icon = iconMap[pillar.icon] || BookOpen;
              return (
                <div
                  key={pillar.id}
                  className="glass-card-hover p-8 h-full flex flex-col md:hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                    <Icon size={28} className="text-gold" />
                  </div>
                  <p className="text-gold/70 text-xs font-semibold uppercase tracking-wider mb-2">
                    {pillar.subtitle}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {pillar.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-white/40">
                        <span className="w-1 h-1 rounded-full bg-gold mt-2 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={linkHref}
                    className="inline-flex items-center gap-1 text-gold text-sm font-medium hover:gap-2 transition-all"
                  >
                    {linkLabel} <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
