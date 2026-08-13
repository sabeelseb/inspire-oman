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

function PartnerBlock({
  role,
  title,
  src,
  align = "center",
  compact = false,
}: {
  role: string;
  title: string;
  src: string;
  align?: "start" | "end" | "center";
  compact?: boolean;
}) {
  const alignClass =
    align === "end"
      ? "justify-self-end"
      : align === "start"
        ? "justify-self-start"
        : "justify-self-center";

  return (
    <div className={`min-w-0 text-center ${alignClass}`}>
      <p
        className={`font-medium uppercase tracking-[0.14em] text-gold/70 ${
          compact
            ? "mb-1 text-[8px]"
            : "mb-1 text-[8px] sm:mb-1.5 sm:text-[9px] md:text-[10px] md:tracking-[0.16em]"
        }`}
      >
        {role}
      </p>
      <div
        className={`mx-auto flex items-center justify-center ${
          compact
            ? "mb-0 h-9"
            : "mb-1 h-10 sm:mb-1.5 sm:h-12 md:h-14 lg:h-16"
        }`}
      >
        <LogoImage
          src={src}
          alt={title}
          priority
          className={`h-full w-auto max-w-full object-contain ${
            compact ? "max-w-[5.5rem]" : "sm:max-w-[7.5rem] md:max-w-[9rem]"
          }`}
        />
      </div>
      {!compact ? (
        <p className="mx-auto max-w-[9.5rem] text-[9px] font-medium leading-snug text-white/70 sm:max-w-[11rem] sm:text-[10px] md:max-w-[13rem] md:text-xs">
          {title}
        </p>
      ) : null}
    </div>
  );
}

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
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroSrc}
          alt={city ? `${city}, Oman` : "Inspire Oman"}
          fill
          priority
          quality={65}
          className="object-cover object-center"
          sizes="100vw"
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
      </div>

      <div className="relative z-10 mx-auto flex w-full min-h-[100svh] flex-col justify-center pt-[calc(env(safe-area-inset-top)+4.5rem)] pb-8 sm:pt-[calc(env(safe-area-inset-top)+5.25rem)] sm:pb-12 lg:pt-[calc(env(safe-area-inset-top)+5.5rem)] lg:pb-14">
        <div className="site-container">
          <div className="flex w-full min-w-0 flex-col items-center text-center">
            {/* Desktop/tablet: partners flank main logo */}
            <motion.div
              {...fade(0.15, 16, 0.65)}
              className="mb-3 hidden w-full min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 md:mb-4 md:grid md:gap-6 lg:gap-8"
              aria-label="Partners and brand"
            >
              <PartnerBlock
                role={executionPartner.role}
                title={executionPartner.title}
                src={executionPartner.src}
                align="end"
              />
              <div className="flex shrink-0 justify-center px-2">
                <Image
                  src={heroLogoSrc}
                  alt="Inspire Oman"
                  width={360}
                  height={420}
                  priority
                  className="h-[8.5rem] w-auto max-w-full object-contain object-center md:h-[9.5rem] lg:h-[10.5rem] xl:h-[11.25rem]"
                />
              </div>
              <PartnerBlock
                role={strategicPartner.role}
                title={strategicPartner.title}
                src={strategicPartner.src}
                align="start"
              />
            </motion.div>

            {/* mWeb: brand first — logo only in the first fold */}
            <motion.div
              {...fade(0.1, 12, 0.55)}
              className="mb-3 flex justify-center md:hidden"
            >
              <Image
                src={heroLogoSrc}
                alt="Inspire Oman"
                width={280}
                height={320}
                priority
                className="h-[5.75rem] w-auto max-w-[42vw] object-contain object-center"
              />
            </motion.div>

            <div className="flex min-w-0 w-full flex-col items-center">
              <motion.h1
                {...fade(0.25, 24, 0.75)}
                className="mb-2 text-[clamp(1.75rem,calc(1rem+4.2vw),3.35rem)] font-black leading-[1.1] tracking-tight text-white sm:mb-2.5"
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
                {...fade(0.4)}
                className="mx-auto mb-2 max-w-xl text-[0.95rem] font-light tracking-wide text-white/75 sm:mb-2.5 sm:max-w-2xl sm:text-xl md:text-2xl"
                style={subheadingStyle}
              >
                {slogan}
              </motion.p>

              {/* Support line stays desktop/tablet — too dense on mWeb first fold */}
              <motion.p
                {...fade(0.5)}
                className="mx-auto mb-4 hidden max-w-xl text-sm leading-relaxed text-white/45 sm:mb-4 sm:block sm:text-base"
                style={paragraphStyle}
              >
                {support}
              </motion.p>

              <motion.div
                {...fade(0.6, 14, 0.5)}
                className="mb-4 flex w-full min-w-0 flex-col items-center gap-1.5 sm:mb-5 sm:gap-2"
              >
                <div className="inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-2 text-xs font-medium text-gold sm:px-4 sm:text-sm">
                  <CalendarDays size={14} className="shrink-0" />
                  <span className="min-w-0 break-words text-center text-balance">
                    {date}
                  </span>
                </div>
                {venue || city ? (
                  <div className="flex max-w-[18rem] items-center justify-center gap-1.5 text-xs font-medium text-gold/80 sm:max-w-full sm:text-sm">
                    <MapPin size={13} className="shrink-0" />
                    <span className="min-w-0 break-words text-center text-balance">
                      {venue || city}
                    </span>
                  </div>
                ) : null}
              </motion.div>

              <motion.div
                {...fade(0.75)}
                className="flex w-full max-w-sm flex-col items-stretch justify-center gap-2.5 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
              >
                <Link
                  id="hero-register-cta"
                  href={primaryHref}
                  className="btn-primary px-8 py-3.5 text-base shadow-lg shadow-gold/25 group sm:px-10 sm:py-4 sm:text-lg"
                >
                  {primaryCta}
                  <ArrowRight
                    size={20}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Link>
                {secondaryCta ? (
                  <Link
                    href={secondaryHref}
                    className="btn-outline px-5 py-2.5 text-sm opacity-90 sm:px-6 sm:py-3 sm:text-base"
                  >
                    {secondaryCta}
                  </Link>
                ) : null}
              </motion.div>
            </div>

            {/* mWeb partners: compact strip under CTAs — logos + roles only */}
            <motion.div
              {...fade(0.9, 12, 0.45)}
              className="mt-6 grid w-full max-w-md grid-cols-2 items-start gap-4 border-t border-white/10 pt-5 md:hidden"
              aria-label="Partners"
            >
              <PartnerBlock
                role={executionPartner.role}
                title={executionPartner.title}
                src={executionPartner.src}
                compact
              />
              <PartnerBlock
                role={strategicPartner.role}
                title={strategicPartner.title}
                src={strategicPartner.src}
                compact
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent sm:h-32" />
    </section>
  );
}
