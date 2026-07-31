import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import {
  siteConfig as fallbackSite,
  stats as fallbackStats,
  speakers as fallbackSpeakers,
  testimonials as fallbackTestimonials,
} from "./data";

const reader = createReader(process.cwd(), keystaticConfig);

function slugName(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "name" in value) {
    const name = (value as { name?: string }).name;
    if (typeof name === "string") return name;
  }
  return fallback;
}

/** Merge Keystatic (Git) content with fallbacks from data.ts */
export async function getCmsSite() {
  try {
    const site = await reader.singletons.site.read();
    if (!site) {
      return { ...fallbackSite, images: { ...fallbackSite.images } };
    }

    return {
      ...fallbackSite,
      name: site.name || fallbackSite.name,
      tagline: site.tagline || fallbackSite.tagline,
      slogan: site.slogan || fallbackSite.slogan,
      description: site.description || fallbackSite.description,
      summitDate: site.summitDate || fallbackSite.summitDate,
      venue: site.venue || fallbackSite.venue,
      images: {
        ...fallbackSite.images,
        hero: site.heroImage || fallbackSite.images.hero,
        banner: site.bannerImage || fallbackSite.images.banner,
        summit: site.summitImage || fallbackSite.images.summit,
      },
    };
  } catch {
    return { ...fallbackSite, images: { ...fallbackSite.images } };
  }
}

export async function getCmsPartners(): Promise<
  { name: string; role: string; fullName: string; bg: "light" | "dark"; src: string }[]
> {
  try {
    const entries = await reader.collections.partners.all();
    if (!entries.length) {
      return fallbackSite.partnerLogos.map((p) => ({
        ...p,
        bg: p.bg === "light" ? ("light" as const) : ("dark" as const),
      }));
    }

    return entries.map(({ entry }) => {
      const bg: "light" | "dark" = entry.bg === "light" ? "light" : "dark";
      return {
        name: slugName(entry.name),
        role: entry.role,
        fullName: entry.fullName,
        bg,
        src: entry.logo || "/images/logos/IO-logo.svg",
      };
    });
  } catch {
    return fallbackSite.partnerLogos.map((p) => ({
      ...p,
      bg: p.bg === "light" ? ("light" as const) : ("dark" as const),
    }));
  }
}

export async function getCmsStats() {
  try {
    const entries = await reader.collections.stats.all();
    if (!entries.length) return fallbackStats;

    return entries.map(({ entry }) => ({
      value: entry.value ?? 0,
      suffix: entry.suffix || "+",
      label: slugName(entry.label),
    }));
  } catch {
    return fallbackStats;
  }
}

export async function getCmsSpeakers() {
  try {
    const entries = await reader.collections.speakers.all();
    if (!entries.length) return fallbackSpeakers;

    return entries.map(({ entry }) => ({
      name: slugName(entry.name),
      role: entry.role,
      description: entry.description,
      featured: !!entry.featured,
    }));
  } catch {
    return fallbackSpeakers;
  }
}

export async function getCmsTestimonials() {
  try {
    const entries = await reader.collections.testimonials.all();
    if (!entries.length) return fallbackTestimonials;

    return entries.map(({ entry }) => ({
      author: slugName(entry.author),
      role: entry.role,
      quote: entry.quote,
    }));
  } catch {
    return fallbackTestimonials;
  }
}
