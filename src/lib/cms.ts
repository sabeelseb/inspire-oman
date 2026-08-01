import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import {
  siteConfig as fallbackSite,
  stats as fallbackStats,
  speakers as fallbackSpeakers,
  testimonials as fallbackTestimonials,
  pillars as fallbackPillars,
  packages as fallbackPackages,
  agenda as fallbackAgenda,
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

const fallbackAboutValues = [
  {
    icon: "Target",
    title: "Vision 2040 Aligned",
    description:
      "Directly supporting Oman's national economic diversification and growth strategy.",
  },
  {
    icon: "Globe",
    title: "Global Perspective",
    description:
      "Bridging Oman with international markets, investors, and business communities.",
  },
  {
    icon: "Handshake",
    title: "Collaborative Spirit",
    description:
      "Fostering partnerships between government, private sector, and entrepreneurs.",
  },
  {
    icon: "Heart",
    title: "Cultural Celebration",
    description:
      "Honoring the rich heritage and achievements of Oman's business community.",
  },
  {
    icon: "Eye",
    title: "Transparency",
    description:
      "Building trust through open dialogue, clear processes, and measurable outcomes.",
  },
  {
    icon: "TrendingUp",
    title: "Sustainable Growth",
    description: "Creating lasting economic impact beyond a single event.",
  },
];

const fallbackPillarExtras: Record<string, string[]> = {
  "legacy-documenting": [
    "Professional photography sessions",
    "Editorial team crafted narratives",
    "Premium hardbound production",
    "Embassy & stakeholder distribution",
  ],
  "celebrating-the-experience": [
    "High-production video profiles",
    "Multi-platform social campaigns",
    "International audience reach",
    "Brand storytelling expertise",
  ],
  "investors-summit": [
    "500+ delegates expected",
    "Government-private sector dialogue",
    "Recognition & awards ceremony",
    "Cross-border networking",
  ],
};

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
      partners: {
        strategic: site.partnerStrategic || fallbackSite.partners.strategic,
        initiative: site.partnerInitiative || fallbackSite.partners.initiative,
        execution: site.partnerExecution || fallbackSite.partners.execution,
      },
      images: {
        ...fallbackSite.images,
        hero: site.heroImage || fallbackSite.images.hero,
        banner: site.bannerImage || fallbackSite.images.banner,
        summit: site.summitImage || fallbackSite.images.summit,
      },
      contact: {
        oman: {
          ...fallbackSite.contact.oman,
          phone1: site.omanPhone1 || fallbackSite.contact.oman.phone1,
          phone2: site.omanPhone2 || fallbackSite.contact.oman.phone2,
          email: site.omanEmail || fallbackSite.contact.oman.email,
        },
        india: {
          ...fallbackSite.contact.india,
          phone: site.indiaPhone || fallbackSite.contact.india.phone,
          email: site.indiaEmail || fallbackSite.contact.india.email,
        },
      },
      social: {
        instagram: site.instagram || fallbackSite.social.instagram,
        facebook: site.facebook || fallbackSite.social.facebook,
        linkedin: site.linkedin || fallbackSite.social.linkedin,
        twitter: site.twitter || fallbackSite.social.twitter,
        youtube: site.youtube || fallbackSite.social.youtube,
      },
    };
  } catch {
    return { ...fallbackSite, images: { ...fallbackSite.images } };
  }
}

export async function getCmsPageHome() {
  try {
    const page = await reader.singletons.homePage.read();
    return (
      page || {
        aboutEyebrow: "About the Initiative",
        aboutTitle: "Celebrating Oman's Growth Story",
        aboutBody: "",
        aboutTags: ["Oman Vision 2040", "OCCI Partnership", "Cross-Border Investment"],
        ctaTitle: "Be Part of Oman's Growth Story",
        ctaBody: "",
      }
    );
  } catch {
    return null;
  }
}

export async function getCmsPageAbout() {
  try {
    return (await reader.singletons.aboutPage.read()) || null;
  } catch {
    return null;
  }
}

export async function getCmsPagePillars() {
  try {
    return (await reader.singletons.pillarsPage.read()) || null;
  } catch {
    return null;
  }
}

export async function getCmsPageSummit() {
  try {
    return (await reader.singletons.summitPage.read()) || null;
  } catch {
    return null;
  }
}

export async function getCmsPagePartner() {
  try {
    return (await reader.singletons.partnerPage.read()) || null;
  } catch {
    return null;
  }
}

export async function getCmsPageMedia() {
  try {
    return (await reader.singletons.mediaPage.read()) || null;
  } catch {
    return null;
  }
}

export async function getCmsPageContact() {
  try {
    return (await reader.singletons.contactPage.read()) || null;
  } catch {
    return null;
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

export async function getCmsPillars() {
  try {
    const entries = await reader.collections.pillars.all();
    if (!entries.length) {
      return fallbackPillars.map((p) => ({
        ...p,
        extras: fallbackPillarExtras[p.id] || [],
      }));
    }
    return entries.map(({ slug, entry }) => ({
      id: slug,
      title: slugName(entry.title),
      subtitle: entry.subtitle,
      description: entry.description,
      icon: entry.icon,
      features: entry.features?.filter(Boolean) || [],
      extras:
        entry.extras?.filter(Boolean) ||
        fallbackPillarExtras[slug] ||
        [],
    }));
  } catch {
    return fallbackPillars.map((p) => ({
      ...p,
      extras: fallbackPillarExtras[p.id] || [],
    }));
  }
}

export async function getCmsPackages() {
  try {
    const entries = await reader.collections.packages.all();
    if (!entries.length) return fallbackPackages;
    return entries.map(({ entry }) => ({
      tier: slugName(entry.tier),
      price: entry.price,
      currency: entry.currency || "OMR",
      color: "from-gold-dark to-gold",
      highlight: !!entry.highlight,
      features: entry.features?.filter(Boolean) || [],
    }));
  } catch {
    return fallbackPackages;
  }
}

export async function getCmsAgenda() {
  try {
    const entries = await reader.collections.agenda.all();
    if (!entries.length) return fallbackAgenda;
    return entries.map(({ entry }) => ({
      time: entry.time,
      title: slugName(entry.title),
      type: entry.type,
    }));
  } catch {
    return fallbackAgenda;
  }
}

export async function getCmsGallery() {
  try {
    const entries = await reader.collections.gallery.all();
    if (!entries.length) return fallbackSite.galleryImages;
    return entries.map(({ entry }) => ({
      title: slugName(entry.title),
      caption: entry.caption,
      src: entry.image || entry.imageSrc || "/images/gallery/mosque.jpg",
    }));
  } catch {
    return fallbackSite.galleryImages;
  }
}

export async function getCmsVideos() {
  try {
    const entries = await reader.collections.videos.all();
    if (!entries.length) return [];
    return entries.map(({ entry }) => ({
      title: slugName(entry.title),
      description: entry.description,
      tag: entry.tag || "COMING SOON",
      image: entry.image || entry.imageSrc || fallbackSite.images.hero,
    }));
  } catch {
    return [];
  }
}

export async function getCmsPress() {
  try {
    const entries = await reader.collections.press.all();
    if (!entries.length) return [];
    return entries.map(({ entry }) => ({
      title: slugName(entry.title),
      date: entry.date || "Coming Soon",
      excerpt: entry.excerpt,
    }));
  } catch {
    return [];
  }
}

export async function getCmsValues() {
  try {
    const entries = await reader.collections.values.all();
    if (!entries.length) return fallbackAboutValues;
    return entries.map(({ entry }) => ({
      title: slugName(entry.title),
      description: entry.description,
      icon: entry.icon,
    }));
  } catch {
    return fallbackAboutValues;
  }
}
