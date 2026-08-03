"use client";

import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import PartnersSection from "@/components/PartnersSection";
import PillarsSection from "@/components/PillarsSection";
import SummitHighlights from "@/components/SummitHighlights";
import PackageTiers from "@/components/PackageTiers";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import { useCmsSite } from "@/components/CmsProvider";
import TitleHighlight from "@/components/TitleHighlight";
import { testimonials as fallbackTestimonials, pillars as fallbackPillars, packages as fallbackPackages } from "@/lib/data";

type Testimonial = (typeof fallbackTestimonials)[number];
type Pillar = (typeof fallbackPillars)[number];
type Package = (typeof fallbackPackages)[number];
type Stat = { value: number; suffix: string; label: string };
type Partner = {
  name: string;
  role: string;
  fullName: string;
  bg: "light" | "dark";
  src: string;
};
type Speaker = {
  name: string;
  role: string;
  description: string;
  featured: boolean;
};

type HomePage = {
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
  aboutEyebrow?: string | null;
  aboutTitle?: string | null;
  aboutTitleHighlight?: string | null;
  aboutIntro?: string | null;
  aboutBody?: string | null;
  aboutTags?: readonly (string | { tag?: string | null } | null)[] | null;
  aboutFacts?: readonly ({ label: string | null; value: string | null } | null)[] | null;
  homeStats?: readonly ({ value: number | null; suffix: string | null; label: string | null } | null)[] | null;
  statsBannerSrc?: string | null;
  statsBanner?: string | null;
  ctaTitle?: string | null;
  ctaBody?: string | null;
};

function AboutSection({ page }: { page?: HomePage | null }) {
  const siteConfig = useCmsSite();
  const defaultTags = [
    "Oman Vision 2040",
    "OCCI Partnership",
    "Cross-Border Investment",
  ];
  const defaultFacts = [
    { label: "Strategic Partner", value: siteConfig.partners.strategic },
    { label: "Initiative By", value: siteConfig.partners.initiative },
    { label: "Execution Partner", value: siteConfig.partners.execution },
    { label: "Summit Date", value: siteConfig.summitDate },
    { label: "Venue", value: siteConfig.venue },
  ];

  // Empty arrays from CMS are truthy — treat them as missing so defaults show.
  const tagsFromCms = (page?.aboutTags ?? [])
    .map((t) => {
      if (typeof t === "string") return t.trim();
      if (t && typeof t === "object" && "tag" in t) {
        const tag = (t as { tag?: string | null }).tag;
        return typeof tag === "string" ? tag.trim() : "";
      }
      return "";
    })
    .filter(Boolean);
  const tags = tagsFromCms.length ? tagsFromCms : defaultTags;

  const factsFromCms = (page?.aboutFacts ?? [])
    .filter((f): f is { label: string | null; value: string | null } => Boolean(f))
    .map((f) => ({
      label: (f.label || "").trim(),
      value: (f.value || "").trim(),
    }))
    .filter((f) => f.label || f.value);
  const facts = factsFromCms.length ? factsFromCms : defaultFacts;

  const intro =
    page?.aboutIntro?.trim() ||
    siteConfig.description ||
    "A prestigious integrated initiative aligned with Oman Vision 2040, celebrating contributions of Oman's business community and enabling future collaborations.";

  const body =
    page?.aboutBody?.trim() ||
    "In strategic partnership with the Oman Chamber of Commerce & Industry (OCCI), Inspire Oman brings together CEOs, investors, government leaders, and entrepreneurs to celebrate contributions, strengthen investment pathways, and document the remarkable achievements of Oman's business community.";

  return (
    <section className="relative pt-14 pb-6">
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
              {page?.aboutEyebrow || "About the Initiative"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              <TitleHighlight
                title={page?.aboutTitle || "Celebrating Oman's Growth Story"}
                highlight={page?.aboutTitleHighlight || "Growth Story"}
              />
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">{intro}</p>
            <p className="text-white/40 leading-relaxed mb-6">{body}</p>
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-gold/10 text-gold text-sm border border-gold/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-5 sm:p-6 relative overflow-hidden">
              <IslamicPattern opacity={0.08} />
              <div className="relative space-y-3.5">
                {facts.map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-white/80 text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({
  testimonials = fallbackTestimonials,
}: {
  testimonials?: Testimonial[];
}) {
  return (
    <section className="relative section-padding">
      <div className="site-container">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            Voices of Support
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Leaders{" "}
            <span className="gold-text">Say</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card-hover p-8 h-full flex flex-col md:hover:-translate-y-1"
              >
                <Quote size={24} className="text-gold/30 mb-4" />
                <p className="text-white/60 leading-relaxed flex-1 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="islamic-divider mb-4" />
                <p className="text-white font-semibold text-sm">{t.author}</p>
                <p className="text-gold/60 text-xs">{t.role}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CTABanner({ page }: { page?: HomePage | null }) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10" />
      <IslamicPattern opacity={0.06} />

      <div className="relative site-container text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            <TitleHighlight
              title={page?.ctaTitle || "Be Part of Oman's Growth Story"}
              highlight="Growth Story"
            />
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            {page?.ctaBody ||
              "Join Inspire Oman as a partner or delegate and connect with the region's most dynamic business community"}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/partner" className="btn-primary text-base group">
              Become a Partner
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/summit" className="btn-outline text-base">
              Register for Summit
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function HomeClient({
  page,
  stats,
  partners,
  testimonials,
  speakers,
  pillars = fallbackPillars,
  packages = fallbackPackages,
}: {
  page?: HomePage | null;
  stats: Stat[];
  partners: Partner[];
  testimonials: Testimonial[];
  speakers: Speaker[];
  pillars?: Pillar[];
  packages?: Package[];
}) {
  const pageStats =
    page?.homeStats
      ?.filter((s): s is { value: number | null; suffix: string | null; label: string | null } =>
        Boolean(s)
      )
      .map((s) => ({
        value: s.value ?? 0,
        suffix: s.suffix || "+",
        label: s.label || "",
      }))
      .filter((s) => s.label) || [];

  const displayStats = pageStats.length ? pageStats : stats;
  const bannerSrc = page?.statsBanner || page?.statsBannerSrc || null;

  return (
    <>
      <Hero page={page} />
      <AboutSection page={page} />
      <StatsCounter stats={displayStats} bannerSrc={bannerSrc} />
      <div className="cv-auto">
        <PartnersSection partners={partners} />
      </div>
      <div className="islamic-divider site-container" />
      <div className="cv-auto">
        <PillarsSection pillars={pillars} />
      </div>
      <div className="cv-auto">
        <SummitHighlights speakers={speakers} />
      </div>
      <div className="cv-auto">
        <PackageTiers packages={packages} />
      </div>
      <div className="cv-auto">
        <TestimonialsSection testimonials={testimonials} />
      </div>
      <div className="cv-auto">
        <CTABanner page={page} />
      </div>
      <div className="cv-auto">
        <ContactForm />
      </div>
    </>
  );
}
