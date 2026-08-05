"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Globe,
  Handshake,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import TitleHighlight from "@/components/TitleHighlight";
import { useCmsSite } from "@/components/CmsProvider";
import { usePageLoader } from "@/components/AppShell";
import { useIsMobile } from "@/hooks/useMobilePerf";

const iconMap: Record<string, LucideIcon> = {
  Target,
  Globe,
  Handshake,
  Heart,
  Eye,
  TrendingUp,
};

type AboutPageData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
  missionTitle?: string | null;
  missionP1?: string | null;
  missionP2?: string | null;
  quote?: string | null;
  missionFacts?: readonly ({ label: string | null; value: string | null } | null)[] | null;
  valuesEyebrow?: string | null;
  valuesTitle?: string | null;
  audienceEyebrow?: string | null;
  audienceTitle?: string | null;
  stakeholders?: readonly (string | null)[] | null;
};

type ValueItem = {
  title: string;
  description: string;
  icon: string;
};

export default function AboutClient({
  page,
  values,
}: {
  page: AboutPageData | null;
  values: ValueItem[];
}) {
  const siteConfig = useCmsSite();
  const { markTopReady } = usePageLoader();
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const stakeholders =
    page?.stakeholders?.filter((s): s is string => Boolean(s)) || [
      "Senior Government Representatives",
      "CEOs & Business Owners",
      "Investors & Financial Leaders",
      "Corporate Executives & SME Leaders",
      "International Delegates",
      "Media Representatives",
    ];

  const title = page?.title || "Telling Oman's Growth Story Globally";
  const highlight = page?.highlight || "Growth Story";

  const defaultMissionFacts = [
    { label: "Strategic Partner", value: "OCCI" },
    { label: "Initiative By", value: siteConfig.partners.initiative },
    { label: "Execution", value: siteConfig.partners.execution },
    { label: "Summit Date", value: siteConfig.summitDate },
  ];
  const missionFacts = (page?.missionFacts ?? [])
    .filter((f): f is { label: string | null; value: string | null } => Boolean(f))
    .map((f) => ({ label: f.label || "", value: f.value || "" }))
    .filter((f) => f.label || f.value);
  const facts = missionFacts.length ? missionFacts : defaultMissionFacts;

  // Same splash gate as Home: paint-ready + failsafe timeout
  useEffect(() => {
    let cancelled = false;
    let paintTimer: number | undefined;
    const failsafe = window.setTimeout(
      () => markTopReady("about-hero"),
      isMobile ? 1600 : 3000
    );
    const raf = window.requestAnimationFrame(() => {
      paintTimer = window.setTimeout(() => {
        if (!cancelled) markTopReady("about-hero");
      }, isMobile ? 480 : 720);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      window.cancelAnimationFrame(raf);
      if (paintTimer) window.clearTimeout(paintTimer);
    };
  }, [markTopReady, isMobile]);

  const fade = (delay: number, y = 20, duration = 0.7) => {
    if (reduceMotion) return {};
    if (isMobile) {
      return {
        initial: { opacity: 0, y: Math.min(y, 18) },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: Math.min(duration, 0.5),
          delay: delay * 0.45,
          ease: [0.22, 1, 0.36, 1],
        },
      };
    }
    return {
      initial: { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay },
    };
  };

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-gradient" />
        <IslamicPattern opacity={0.05} />
        {/* Heavy blur orb — desktop only (same as Home hero) */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] hidden md:block md:blur-[100px]"
          aria-hidden
        />

        <div className="relative site-container text-center">
          <motion.p
            {...fade(0.2, 16, 0.65)}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            {page?.eyebrow || "About the Initiative"}
          </motion.p>
          <motion.h1
            {...fade(0.35, 30, 0.8)}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            <TitleHighlight title={title} highlight={highlight} />
          </motion.h1>
          <motion.p
            {...fade(0.5)}
            className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {page?.subtitle || siteConfig.description}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-white mb-6">
                {page?.missionTitle || "Our Mission"}
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                {page?.missionP1}
              </p>
              <p className="text-white/40 leading-relaxed mb-8">
                {page?.missionP2}
              </p>
              {page?.quote && (
                <div className="glass-card p-6 border-l-2 border-l-gold">
                  <p className="text-white/60 italic">&ldquo;{page.quote}&rdquo;</p>
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {facts.map((item, i) => (
                  <div key={`${item.label}-${i}`} className="glass-card p-5 text-center">
                    <p className="text-white/30 text-xs uppercase tracking-wider mb-2">
                      {item.label}
                    </p>
                    <p className="text-gold font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-light relative">
        <IslamicPattern opacity={0.03} />
        <div className="relative site-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {page?.valuesEyebrow || "Our Values"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {page?.valuesTitle || "What Drives Us"}
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {values.map((v, i) => {
              const Icon = iconMap[v.icon] || Target;
              return (
                <ScrollReveal key={i} delay={i * 0.1} className="h-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card-hover p-6 h-full flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 shrink-0">
                      <Icon size={24} className="text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed flex-1">{v.description}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container">
          <ScrollReveal className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {page?.audienceEyebrow || "Our Audience"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {page?.audienceTitle || "Who We Serve"}
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
