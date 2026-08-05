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
import { useIsMobile } from "@/hooks/useMobilePerf";

export type HomeHeroContent = {
  heroLogo?: string | null;
  heroLogoSrc?: string | null;
  heroDate?: string | null;
  heroCity?: string | null;
  heroTitle?: string | null;
  heroTitleHighlight?: string | null;
  heroTitleBreakAfter?: string | null;
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
  const isMobile = useIsMobile();

  const date = page?.heroDate || siteConfig.summitDate;
  const city = page?.heroCity || siteConfig.city || "Muscat";
  const title = page?.heroTitle || siteConfig.name || "Inspire Oman";
  const highlight = page?.heroTitleHighlight || "Oman";
  const titleBreakAfter =
    page?.heroTitleBreakAfter === undefined || page?.heroTitleBreakAfter === null
      ? "Telling Oman's"
      : page.heroTitleBreakAfter.trim();
  const slogan = page?.heroSlogan || siteConfig.slogan;
  const support =
    page?.heroSupportLine ||
    "Legacy Documentation • Celebrating the Experience • Inspire Oman Summit";
  const primaryCta = page?.heroPrimaryCta || "Register for Summit";
  const primaryHref = page?.heroPrimaryCtaHref || "/summit";
  const secondaryCta = page?.heroSecondaryCta || "Become a Partner";
  const secondaryHref = page?.heroSecondaryCtaHref || "/partner";
  const heroSrc = page?.heroImage || siteConfig.images.hero;
  const heroLogoSrc =
    page?.heroLogo ||
    page?.heroLogoSrc ||
    "/images/logos/inspire-oman-hero-logo.png";

  useEffect(() => {
    const t = window.setTimeout(() => markTopReady("hero"), isMobile ? 1600 : 3000);
    return () => window.clearTimeout(t);
  }, [markTopReady, isMobile]);

  const fade = (delay: number, y = 20, duration = 0.7) => {
    if (reduceMotion) return {};
    // Mobile keeps stagger + translate; shorter travel/duration for smoother main-thread work
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
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <Image
        src={heroSrc}
        alt={city ? `${city}, Oman` : "Inspire Oman"}
        fill
        priority
        quality={65}
        className="object-cover object-center"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        onLoadingComplete={() => markTopReady("hero")}
        onError={() => markTopReady("hero")}
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/75 to-primary" />
      <IslamicPattern opacity={0.05} />

      {/* Heavy blur orb — desktop only (GPU costly on mobile) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.05] hidden md:block md:blur-[120px]"
        aria-hidden
      />

      <div className="relative z-10 site-container text-center pt-20 sm:pt-24 lg:pt-20 xl:pt-16">
        <motion.div
          {...fade(0.2, 16, 0.65)}
          className="flex justify-center mb-4 sm:mb-5 lg:mb-4 xl:mb-6"
        >
          <Image
            src={heroLogoSrc}
            alt="Inspire Oman"
            width={280}
            height={320}
            priority
            className="h-[7rem] sm:h-[7.5rem] md:h-28 lg:h-[6.75rem] xl:h-32 w-auto object-contain"
          />
        </motion.div>

        <motion.h1
          {...fade(0.35, 30, 0.8)}
          className="text-[clamp(2.4rem,calc(1.45rem+4.6vw),4.5rem)] font-black tracking-tight leading-[1.08] mb-4 sm:mb-5 lg:mb-4 xl:mb-6"
        >
          <TitleHighlight
            title={title}
            highlight={highlight}
            breakAfter={titleBreakAfter || undefined}
            highlightClassName={`gold-text bg-[length:200%_auto]${
              reduceMotion ? "" : " animate-shimmer"
            }`}
          />
        </motion.h1>

        <motion.p
          {...fade(0.5)}
          className="text-base sm:text-xl md:text-2xl xl:text-3xl font-light text-white/70 mb-3 sm:mb-4 tracking-wide max-w-4xl mx-auto"
        >
          {slogan}
        </motion.p>

        <motion.p
          {...fade(0.65)}
          className="text-sm sm:text-base lg:text-[15px] xl:text-lg text-white/40 max-w-2xl mx-auto mb-5 sm:mb-6 lg:mb-5 xl:mb-8 leading-relaxed"
        >
          {support}
        </motion.p>

        <motion.div
          {...fade(0.85, 20, 0.6)}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs sm:text-sm font-medium mb-5 sm:mb-6 lg:mb-5 xl:mb-8"
        >
          <CalendarDays size={14} className="shrink-0" />
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0" />
          <MapPin size={13} className="shrink-0" />
          <span className="text-gold/80">{city}</span>
        </motion.div>

        <motion.div
          {...fade(1)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href={primaryHref} className="btn-primary text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8 group">
            {primaryCta}
            <ArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link href={secondaryHref} className="btn-outline text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8">
            {secondaryCta}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
}
