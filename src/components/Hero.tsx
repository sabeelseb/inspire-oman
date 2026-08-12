"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useCmsSite } from "@/components/CmsProvider";
import IslamicPattern from "./IslamicPattern";
import TitleHighlight from "./TitleHighlight";
import LogoImage from "./LogoImage";
import { usePageLoader } from "./AppShell";
import { useIsMobile } from "@/hooks/useMobilePerf";
import { typographyToStyle } from "@/lib/typography";

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
  heroOcciRole?: string | null;
  heroOcciTitle?: string | null;
  heroOcciLogo?: string | null;
  heroOcciLogoSrc?: string | null;
  heroMefriendRole?: string | null;
  heroMefriendTitle?: string | null;
  heroMefriendLogo?: string | null;
  heroMefriendLogoSrc?: string | null;
};

export default function Hero({ page }: { page?: HomeHeroContent | null }) {
  const siteConfig = useCmsSite();
  const { markTopReady } = usePageLoader();
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const date = page?.heroDate || siteConfig.summitDate;
  const city = page?.heroCity || siteConfig.city || "Muscat";
  const venue = page?.heroVenue || siteConfig.venue;
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
  const primaryCta = page?.heroPrimaryCta || "Register Now";
  const primaryHref = page?.heroPrimaryCtaHref || "/summit";
  const secondaryCta = page?.heroSecondaryCta || "View More";
  const secondaryHref = page?.heroSecondaryCtaHref || "/about";
  const heroSrc = page?.heroImage || siteConfig.images.hero;
  const heroLogoSrc =
    page?.heroLogo ||
    page?.heroLogoSrc ||
    "/images/logos/inspire-oman-hero-logo.png";

  const partnerTitles = {
    occi:
      page?.heroOcciTitle?.trim() ||
      siteConfig.partners?.strategic ||
      "Oman Chamber of Commerce & Industry",
    mefriend:
      page?.heroMefriendTitle?.trim() ||
      "Mefriend - Where Brands Find Solutions",
  };

  const strategicPartner = {
    name: "OCCI",
    title: partnerTitles.occi.replace(/\s*\(OCCI\)\s*$/i, "").trim(),
    role: page?.heroOcciRole?.trim() || "Strategic Partner",
    src:
      page?.heroOcciLogo ||
      page?.heroOcciLogoSrc ||
      "/images/logos/OCC-logo.svg",
  };

  const executionPartner = {
    name: "mefriend",
    title: partnerTitles.mefriend,
    role: page?.heroMefriendRole?.trim() || "Execution Partner",
    src:
      page?.heroMefriendLogo ||
      page?.heroMefriendLogoSrc ||
      "/images/logos/MF-logo.svg",
  };

  const headingStyle = typographyToStyle(siteConfig.typography?.heading);
  const subheadingStyle = typographyToStyle(siteConfig.typography?.subheading);
  const paragraphStyle = typographyToStyle(siteConfig.typography?.paragraph);

  useEffect(() => {
    const t = window.setTimeout(() => markTopReady("hero"), isMobile ? 1600 : 3000);
    return () => window.clearTimeout(t);
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
    <section className="relative min-h-[100svh] flex items-start justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-r from-primary/55 via-primary/25 to-transparent hidden lg:block" />
      <IslamicPattern opacity={0.05} />

      <div
        className="absolute top-1/3 left-[18%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold/[0.06] hidden md:block md:blur-[120px]"
        aria-hidden
      />

      {/*
        Header clearance stays OUTSIDE scale so the gap under the nav is stable.
        Inner content uses scale-[0.9] for the 90%-zoom look without pushing CTAs off-screen.
        Do not add Tailwind width utilities on .site-container.
      */}
      <div
        className="relative z-10 w-full pt-[calc(env(safe-area-inset-top)+5.35rem)] sm:pt-[calc(env(safe-area-inset-top)+5.75rem)] lg:pt-[calc(env(safe-area-inset-top)+6rem)] pb-8 sm:pb-10"
      >
        <div className="site-container origin-top scale-[0.9]">
          <div className="flex w-full min-w-0 flex-col items-center gap-2.5 sm:gap-3 lg:gap-3.5 text-center">
            {/* Partners flank the main logo: Execution left · Strategic right */}
            <motion.div
              {...fade(0.15, 16, 0.65)}
              className="mb-0 grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8"
              aria-label="Partners and brand"
            >
              <div className="min-w-0 justify-self-end text-center">
                <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.14em] text-gold/70 sm:mb-1.5 sm:text-[9px] md:text-[10px] md:tracking-[0.16em]">
                  {executionPartner.role}
                </p>
                <div className="mx-auto mb-1 flex h-9 items-center justify-center sm:mb-1.5 sm:h-11 md:h-12 lg:h-14">
                  <LogoImage
                    src={executionPartner.src}
                    alt={executionPartner.title}
                    priority
                    className="h-full w-auto max-w-full object-contain sm:max-w-[7rem] md:max-w-[8rem]"
                  />
                </div>
                <p className="mx-auto max-w-[8rem] text-[9px] font-medium leading-snug text-white/70 sm:max-w-[9.5rem] sm:text-[10px] md:text-xs">
                  {executionPartner.title}
                </p>
              </div>

              <div className="flex shrink-0 justify-center px-1 sm:px-2">
                <Image
                  src={heroLogoSrc}
                  alt="Inspire Oman"
                  width={360}
                  height={420}
                  priority
                  className="h-[6.75rem] w-auto max-w-full object-contain object-center sm:h-[8rem] md:h-[8.75rem] lg:h-[9.75rem] xl:h-[10.5rem]"
                />
              </div>

              <div className="min-w-0 justify-self-start text-center">
                <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.14em] text-gold/70 sm:mb-1.5 sm:text-[9px] md:text-[10px] md:tracking-[0.16em]">
                  {strategicPartner.role}
                </p>
                <div className="mx-auto mb-1 flex h-9 items-center justify-center sm:mb-1.5 sm:h-11 md:h-12 lg:h-14">
                  <LogoImage
                    src={strategicPartner.src}
                    alt={strategicPartner.title}
                    priority
                    className="h-full w-auto max-w-full object-contain sm:max-w-[7rem] md:max-w-[8rem]"
                  />
                </div>
                <p className="mx-auto max-w-[8rem] text-[9px] font-medium leading-snug text-white/70 sm:max-w-[9.5rem] sm:text-[10px] md:text-xs">
                  {strategicPartner.title}
                </p>
              </div>
            </motion.div>

            {/* Copy + CTA — centered */}
            <div className="flex min-w-0 w-full flex-col items-center">
              <motion.h1
                {...fade(0.3, 28, 0.8)}
                className="mt-0.5 text-[clamp(2rem,calc(1.15rem+3.6vw),3.6rem)] font-black tracking-tight leading-[1.08] mb-2 sm:mb-2.5 text-white text-center"
                style={headingStyle}
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
                {...fade(0.45)}
                className="text-base sm:text-xl md:text-2xl font-light text-white/75 mb-2 sm:mb-2.5 tracking-wide max-w-2xl mx-auto text-center"
                style={subheadingStyle}
              >
                {slogan}
              </motion.p>

              <motion.p
                {...fade(0.55)}
                className="text-sm sm:text-base text-white/45 max-w-xl mx-auto mb-3.5 sm:mb-4 leading-relaxed text-center"
                style={paragraphStyle}
              >
                {support}
              </motion.p>

              <motion.div
                {...fade(0.7, 16, 0.55)}
                className="mb-4 sm:mb-5 flex w-full min-w-0 flex-col items-center gap-2"
              >
                <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-2 text-gold text-xs sm:px-4 sm:text-sm font-medium">
                  <CalendarDays size={14} className="shrink-0" />
                  <span className="min-w-0 break-words text-center text-balance">{date}</span>
                </div>
                {venue || city ? (
                  <div className="flex max-w-full items-center justify-center gap-1.5 text-gold/80 text-xs sm:text-sm font-medium">
                    <MapPin size={13} className="shrink-0" />
                    <span className="min-w-0 break-words text-center text-balance">{venue || city}</span>
                  </div>
                ) : null}
              </motion.div>

              <motion.div
                {...fade(0.85)}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
              >
                <Link
                  id="hero-register-cta"
                  href={primaryHref}
                  className="btn-primary text-base sm:text-lg py-3.5 px-8 sm:py-4 sm:px-10 shadow-lg shadow-gold/25 group"
                >
                  {primaryCta}
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                {secondaryCta ? (
                  <Link
                    href={secondaryHref}
                    className="btn-outline text-sm sm:text-base py-2.5 px-5 sm:py-3 sm:px-6 opacity-90"
                  >
                    {secondaryCta}
                  </Link>
                ) : null}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
}
