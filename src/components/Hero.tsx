"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useCmsSite } from "@/components/CmsProvider";
import IslamicPattern from "./IslamicPattern";
import TitleHighlight from "./TitleHighlight";
import { usePageLoader } from "./AppShell";

export type HomeHeroContent = {
  heroDate?: string | null;
  heroCity?: string | null;
  heroTitle?: string | null;
  heroTitleHighlight?: string | null;
  heroSlogan?: string | null;
  heroSupportLine?: string | null;
  heroVenue?: string | null;
  heroPrimaryCta?: string | null;
  heroPrimaryCtaHref?: string | null;
  heroSecondaryCta?: string | null;
  heroSecondaryCtaHref?: string | null;
  heroImage?: string | null;
};

export default function Hero({ page }: { page?: HomeHeroContent | null }) {
  const siteConfig = useCmsSite();
  const { markTopReady } = usePageLoader();
  const reduceMotion = useReducedMotion();

  const date = page?.heroDate || siteConfig.summitDate;
  const city = page?.heroCity || "Muscat";
  const title = page?.heroTitle || siteConfig.name || "Inspire Oman";
  const highlight = page?.heroTitleHighlight || "Oman";
  const slogan = page?.heroSlogan || siteConfig.slogan;
  const support =
    page?.heroSupportLine ||
    "Legacy Documentation • Celebrating the Experience • Inspire Oman Summit";
  const venue = page?.heroVenue || siteConfig.venue;
  const primaryCta = page?.heroPrimaryCta || "Register for Summit";
  const primaryHref = page?.heroPrimaryCtaHref || "/summit";
  const secondaryCta = page?.heroSecondaryCta || "Become a Partner";
  const secondaryHref = page?.heroSecondaryCtaHref || "/partner";
  const heroSrc = page?.heroImage || siteConfig.images.hero;

  useEffect(() => {
    const t = window.setTimeout(() => markTopReady("hero"), 3000);
    return () => window.clearTimeout(t);
  }, [markTopReady]);

  const fade = (delay: number, y = 20, duration = 0.7) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay },
        };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <Image
        src={heroSrc}
        alt={city ? `${city}, Oman` : "Inspire Oman"}
        fill
        priority
        quality={80}
        className="object-cover object-center"
        sizes="100vw"
        onLoadingComplete={() => markTopReady("hero")}
        onError={() => markTopReady("hero")}
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/75 to-primary" />
      <IslamicPattern opacity={0.05} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.05] blur-[120px]" />

      <div className="relative z-10 site-container text-center">
        <motion.div
          {...fade(0.2, 20, 0.6)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
        >
          <CalendarDays size={16} />
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-gold/60" />
          <MapPin size={14} />
          <span className="text-gold/80">{city}</span>
        </motion.div>

        <motion.h1
          {...fade(0.4, 30, 0.8)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
        >
          <TitleHighlight
            title={title}
            highlight={highlight}
            highlightClassName="gold-text animate-shimmer bg-[length:200%_auto]"
          />
        </motion.h1>

        <motion.p
          {...fade(0.6)}
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/70 mb-4 tracking-wide"
        >
          {slogan}
        </motion.p>

        <motion.p
          {...fade(0.75)}
          className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {support}
        </motion.p>

        <motion.div
          {...fade(0.85)}
          className="flex items-center justify-center gap-2 text-white/40 text-sm mb-10"
        >
          <MapPin size={16} className="text-gold/60" />
          <span>{venue}</span>
        </motion.div>

        <motion.div
          {...fade(1)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={primaryHref} className="btn-primary text-base group">
            {primaryCta}
            <ArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link href={secondaryHref} className="btn-outline text-base">
            {secondaryCta}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
