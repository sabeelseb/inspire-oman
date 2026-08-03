import {
  siteConfig as fallbackSite,
  stats as fallbackStats,
  speakers as fallbackSpeakers,
  testimonials as fallbackTestimonials,
  pillars as fallbackPillars,
  packages as fallbackPackages,
  agenda as fallbackAgenda,
} from "./data";
import { getPayloadClient } from "./payload";

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

const partnerLogoFallback: Record<string, string> = {
  OCCI: "/images/logos/OCC-logo.svg",
  "Gulf Madhyamam": "/images/logos/GM-logo.png",
  mefriend: "/images/logos/MF-logo.svg",
};

function mediaUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "url" in value) {
    const url = (value as { url?: string | null }).url;
    return url || undefined;
  }
  return undefined;
}

function items(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((row) => {
      if (typeof row === "string") return row;
      if (row && typeof row === "object") {
        const r = row as { item?: string; tag?: string };
        return r.item || r.tag || "";
      }
      return "";
    })
    .filter(Boolean);
}

async function findPublished(collection: string, sort = "createdAt") {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: collection as "partners",
    limit: 200,
    sort,
    draft: false,
    overrideAccess: true,
    depth: 1,
  });
  return result.docs;
}

async function readGlobal(slug: string) {
  const payload = await getPayloadClient();
  return payload.findGlobal({
    slug: slug as "home-page",
    draft: false,
    overrideAccess: true,
    depth: 1,
  });
}

export async function getCmsSite() {
  try {
    const [site, header] = await Promise.all([
      readGlobal("site"),
      readGlobal("header"),
    ]);
    if (!site && !header) {
      return {
        ...fallbackSite,
        images: { ...fallbackSite.images },
        header: {
          ...fallbackSite.header,
          navLinks: [...fallbackSite.header.navLinks],
        },
      };
    }

    const headerNav = Array.isArray(header?.navLinks)
      ? (header.navLinks as { label?: string; href?: string }[])
          .map((l) => ({
            label: (l.label || "").trim(),
            href: (l.href || "").trim(),
          }))
          .filter((l) => l.label && l.href)
      : [];

    return {
      ...fallbackSite,
      name: (site?.name as string) || fallbackSite.name,
      tagline: (site?.tagline as string) || fallbackSite.tagline,
      slogan: (site?.slogan as string) || fallbackSite.slogan,
      description: (site?.description as string) || fallbackSite.description,
      summitDate: (site?.summitDate as string) || fallbackSite.summitDate,
      venue: (site?.venue as string) || fallbackSite.venue,
      partners: {
        strategic:
          (site?.partnerStrategic as string) || fallbackSite.partners.strategic,
        initiative:
          (site?.partnerInitiative as string) || fallbackSite.partners.initiative,
        execution:
          (site?.partnerExecution as string) || fallbackSite.partners.execution,
      },
      images: {
        ...fallbackSite.images,
        logo:
          mediaUrl(header?.logo) ||
          (header?.logoSrc as string) ||
          fallbackSite.images.logo,
        hero:
          mediaUrl(site?.heroImage) ||
          (site?.heroImage as string) ||
          fallbackSite.images.hero,
        banner:
          mediaUrl(site?.bannerImage) ||
          (site?.bannerImage as string) ||
          fallbackSite.images.banner,
        summit:
          mediaUrl(site?.summitImage) ||
          (site?.summitImage as string) ||
          fallbackSite.images.summit,
      },
      header: {
        brandPrimary:
          (header?.brandPrimary as string) || fallbackSite.header.brandPrimary,
        brandHighlight:
          (header?.brandHighlight as string) || fallbackSite.header.brandHighlight,
        ctaLabel: (header?.ctaLabel as string) || fallbackSite.header.ctaLabel,
        ctaHref: (header?.ctaHref as string) || fallbackSite.header.ctaHref,
        navLinks: headerNav.length
          ? headerNav
          : [...fallbackSite.header.navLinks],
      },
      contact: {
        oman: {
          ...fallbackSite.contact.oman,
          phone1: (site?.omanPhone1 as string) || fallbackSite.contact.oman.phone1,
          phone2: (site?.omanPhone2 as string) || fallbackSite.contact.oman.phone2,
          email: (site?.omanEmail as string) || fallbackSite.contact.oman.email,
        },
        india: {
          ...fallbackSite.contact.india,
          phone: (site?.indiaPhone as string) || fallbackSite.contact.india.phone,
          email: (site?.indiaEmail as string) || fallbackSite.contact.india.email,
        },
      },
      social: {
        instagram: (site?.instagram as string) || fallbackSite.social.instagram,
        facebook: (site?.facebook as string) || fallbackSite.social.facebook,
        linkedin: (site?.linkedin as string) || fallbackSite.social.linkedin,
        twitter: (site?.twitter as string) || fallbackSite.social.twitter,
        youtube: (site?.youtube as string) || fallbackSite.social.youtube,
      },
    };
  } catch {
    return {
      ...fallbackSite,
      images: { ...fallbackSite.images },
      header: {
        ...fallbackSite.header,
        navLinks: [...fallbackSite.header.navLinks],
      },
    };
  }
}

export async function getCmsPageHome() {
  try {
    const page = await readGlobal("home-page");
    if (!page) return null;

    const aboutTags = items(page.aboutTags);
    const aboutFacts = Array.isArray(page.aboutFacts)
      ? (page.aboutFacts as { label?: string; value?: string }[])
          .map((f) => ({
            label: f.label || "",
            value: f.value || "",
          }))
          .filter((f) => f.label || f.value)
      : [];
    const homeStats = Array.isArray(page.homeStats)
      ? (page.homeStats as { value?: number; suffix?: string; label?: string }[]).map(
          (s) => ({
            value: s.value ?? 0,
            suffix: s.suffix || "+",
            label: s.label || "",
          })
        )
      : [];

    return {
      heroLogo:
        mediaUrl(page.heroLogo) ||
        (page.heroLogoSrc as string) ||
        "/images/logos/inspire-oman-hero-logo.png",
      heroLogoSrc:
        (page.heroLogoSrc as string) || "/images/logos/inspire-oman-hero-logo.png",
      heroDate: page.heroDate,
      heroCity: page.heroCity,
      heroTitle: page.heroTitle,
      heroTitleHighlight: page.heroTitleHighlight,
      heroTitleBreakAfter: page.heroTitleBreakAfter,
      heroSlogan: page.heroSlogan,
      heroSupportLine: page.heroSupportLine,
      heroVenue: page.heroVenue,
      heroPrimaryCta: page.heroPrimaryCta,
      heroPrimaryCtaHref: page.heroPrimaryCtaHref,
      heroSecondaryCta: page.heroSecondaryCta,
      heroSecondaryCtaHref: page.heroSecondaryCtaHref,
      heroImage:
        mediaUrl(page.heroImage) ||
        (typeof page.heroImage === "string" ? page.heroImage : null),
      aboutEyebrow: page.aboutEyebrow,
      aboutTitle: page.aboutTitle,
      aboutTitleHighlight: page.aboutTitleHighlight,
      aboutIntro: typeof page.aboutIntro === "string" ? page.aboutIntro.trim() : page.aboutIntro,
      aboutBody: typeof page.aboutBody === "string" ? page.aboutBody.trim() : page.aboutBody,
      // Omit empty arrays so the UI can use built-in defaults
      aboutTags: aboutTags.length ? aboutTags : null,
      aboutFacts: aboutFacts.length ? aboutFacts : null,
      homeStats: homeStats.length ? homeStats : null,
      statsBannerSrc:
        mediaUrl(page.statsBanner) ||
        (page.statsBannerSrc as string) ||
        "/images/logos/inspire-oman-banner.jpg",
      ctaTitle: page.ctaTitle,
      ctaBody: page.ctaBody,
    };
  } catch {
    return null;
  }
}

export async function getCmsPageAbout() {
  try {
    const page = await readGlobal("about-page");
    if (!page) return null;
    const missionFacts = Array.isArray(page.missionFacts)
      ? (page.missionFacts as { label?: string; value?: string }[])
          .map((f) => ({
            label: f.label || "",
            value: f.value || "",
          }))
          .filter((f) => f.label || f.value)
      : [];
    return {
      ...page,
      stakeholders: items(page.stakeholders),
      missionFacts: missionFacts.length ? missionFacts : null,
    };
  } catch {
    return null;
  }
}

export async function getCmsPagePillars() {
  try {
    return (await readGlobal("pillars-page")) || null;
  } catch {
    return null;
  }
}

export async function getCmsPageSummit() {
  try {
    return (await readGlobal("summit-page")) || null;
  } catch {
    return null;
  }
}

export async function getCmsPagePartner() {
  try {
    return (await readGlobal("partner-page")) || null;
  } catch {
    return null;
  }
}

export async function getCmsPageMedia() {
  try {
    return (await readGlobal("media-page")) || null;
  } catch {
    return null;
  }
}

export async function getCmsPageContact() {
  try {
    return (await readGlobal("contact-page")) || null;
  } catch {
    return null;
  }
}

export async function getCmsPartners(): Promise<
  { name: string; role: string; fullName: string; bg: "light" | "dark"; src: string }[]
> {
  try {
    const docs = await findPublished("partners", "order");
    if (!docs.length) {
      return fallbackSite.partnerLogos.map((p) => ({
        ...p,
        bg: p.bg === "light" ? ("light" as const) : ("dark" as const),
      }));
    }

    return docs.map((doc) => {
      const name = String(doc.name || "");
      const bg: "light" | "dark" = doc.bg === "light" ? "light" : "dark";
      return {
        name,
        role: String(doc.role || ""),
        fullName: String(doc.fullName || ""),
        bg,
        src:
          mediaUrl(doc.logo) ||
          String(doc.logoSrc || "") ||
          partnerLogoFallback[name] ||
          "/images/logos/IO-logo.svg",
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
    const docs = await findPublished("stats", "createdAt");
    if (!docs.length) return fallbackStats;
    return docs.map((doc) => ({
      value: Number(doc.value ?? 0),
      suffix: String(doc.suffix || "+"),
      label: String(doc.label || ""),
    }));
  } catch {
    return fallbackStats;
  }
}

export async function getCmsSpeakers() {
  try {
    const docs = await findPublished("speakers", "createdAt");
    if (!docs.length) return fallbackSpeakers;
    return docs.map((doc) => ({
      name: String(doc.name || ""),
      role: String(doc.role || ""),
      description: String(doc.description || ""),
      featured: Boolean(doc.featured),
    }));
  } catch {
    return fallbackSpeakers;
  }
}

export async function getCmsTestimonials() {
  try {
    const docs = await findPublished("testimonials", "createdAt");
    if (!docs.length) return fallbackTestimonials;
    return docs.map((doc) => ({
      author: String(doc.author || ""),
      role: String(doc.role || ""),
      quote: String(doc.quote || ""),
    }));
  } catch {
    return fallbackTestimonials;
  }
}

export async function getCmsPillars() {
  try {
    const docs = await findPublished("pillars", "createdAt");
    if (!docs.length) {
      return fallbackPillars.map((p) => ({
        ...p,
        extras: fallbackPillarExtras[p.id] || [],
      }));
    }
    return docs.map((doc) => {
      const slug = String(doc.slug || "");
      return {
        id: slug,
        title: String(doc.title || ""),
        subtitle: String(doc.subtitle || ""),
        description: String(doc.description || ""),
        icon: String(doc.icon || "BookOpen"),
        features: items(doc.features),
        extras: items(doc.extras).length
          ? items(doc.extras)
          : fallbackPillarExtras[slug] || [],
      };
    });
  } catch {
    return fallbackPillars.map((p) => ({
      ...p,
      extras: fallbackPillarExtras[p.id] || [],
    }));
  }
}

export async function getCmsPackages() {
  try {
    const docs = await findPublished("packages", "createdAt");
    if (!docs.length) return fallbackPackages;
    return docs.map((doc) => ({
      tier: String(doc.tier || ""),
      price: String(doc.price || ""),
      currency: String(doc.currency || "OMR"),
      color: "from-gold-dark to-gold",
      highlight: Boolean(doc.highlight),
      features: items(doc.features),
    }));
  } catch {
    return fallbackPackages;
  }
}

export async function getCmsAgenda() {
  try {
    const docs = await findPublished("agenda", "createdAt");
    if (!docs.length) return fallbackAgenda;
    return docs.map((doc) => ({
      time: String(doc.time || ""),
      title: String(doc.title || ""),
      type: String(doc.type || ""),
    }));
  } catch {
    return fallbackAgenda;
  }
}

export async function getCmsGallery() {
  try {
    const docs = await findPublished("gallery", "createdAt");
    if (!docs.length) return fallbackSite.galleryImages;
    return docs.map((doc) => ({
      title: String(doc.title || ""),
      caption: String(doc.caption || ""),
      src:
        mediaUrl(doc.image) ||
        String(doc.imageSrc || "") ||
        "/images/gallery/mosque.jpg",
    }));
  } catch {
    return fallbackSite.galleryImages;
  }
}

export async function getCmsVideos() {
  try {
    const docs = await findPublished("videos", "createdAt");
    if (!docs.length) return [];
    return docs.map((doc) => ({
      title: String(doc.title || ""),
      description: String(doc.description || ""),
      tag: String(doc.tag || "COMING SOON"),
      image:
        mediaUrl(doc.image) ||
        String(doc.imageSrc || "") ||
        fallbackSite.images.hero,
    }));
  } catch {
    return [];
  }
}

export async function getCmsPress() {
  try {
    const docs = await findPublished("press", "createdAt");
    if (!docs.length) return [];
    return docs.map((doc) => ({
      title: String(doc.title || ""),
      date: String(doc.date || "Coming Soon"),
      excerpt: String(doc.excerpt || ""),
    }));
  } catch {
    return [];
  }
}

export async function getCmsValues() {
  try {
    const docs = await findPublished("values", "createdAt");
    if (!docs.length) return fallbackAboutValues;
    return docs.map((doc) => ({
      title: String(doc.title || ""),
      description: String(doc.description || ""),
      icon: String(doc.icon || "Target"),
    }));
  } catch {
    return fallbackAboutValues;
  }
}
