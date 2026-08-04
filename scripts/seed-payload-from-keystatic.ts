/**
 * Seed Payload from existing Keystatic YAML under content/.
 * Does not modify Keystatic files. Safe to re-run (upsert by slug).
 *
 * Usage: npm run seed:payload
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import { getPayload } from "payload";
import config from "../payload.config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function readYaml(rel: string): Record<string, unknown> | null {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) return null;
  return yaml.load(fs.readFileSync(full, "utf8")) as Record<string, unknown>;
}

function listYamlDir(rel: string): { slug: string; data: Record<string, unknown> }[] {
  const dir = path.join(root, rel);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"))
    .map((f) => {
      const slug = f.replace(/\.ya?ml$/, "");
      const data = yaml.load(fs.readFileSync(path.join(dir, f), "utf8")) as Record<
        string,
        unknown
      >;
      return { slug, data: data || {} };
    });
}

function slugName(value: unknown, fallback: string): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "name" in value) {
    const name = (value as { name?: string }).name;
    if (typeof name === "string") return name;
  }
  return fallback;
}

function asStringArray(value: unknown): { item?: string; tag?: string }[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => {
    if (typeof v === "string") return { item: v, tag: v };
    return v as { item?: string; tag?: string };
  });
}

async function upsertCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  slug: string,
  data: Record<string, unknown>
) {
  const existing = await payload.find({
    collection: collection as "partners",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  });
  const doc = { ...data, slug, _status: "published" as const };
  if (existing.docs[0]) {
    await payload.update({
      collection: collection as "partners",
      id: existing.docs[0].id,
      data: doc,
      overrideAccess: true,
      draft: false,
    });
    console.log(`  updated ${collection}/${slug}`);
  } else {
    await payload.create({
      collection: collection as "partners",
      data: doc,
      overrideAccess: true,
      draft: false,
    });
    console.log(`  created ${collection}/${slug}`);
  }
}

async function main() {
  const payload = await getPayload({ config });

  const email = process.env.PAYLOAD_ADMIN_EMAIL || "admin@inspireoman.local";
  const password = process.env.PAYLOAD_ADMIN_PASSWORD || "ChangeMe123!";

  const users = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });
  if (!users.docs[0]) {
    await payload.create({
      collection: "users",
      data: { email, password },
      overrideAccess: true,
    });
    console.log(`Created admin user ${email}`);
  } else {
    console.log(`Admin user exists: ${email}`);
  }

  const globalMap: {
    file: string;
    slug: string;
    transform?: (d: Record<string, unknown>) => Record<string, unknown>;
  }[] = [
    { file: "content/site.yaml", slug: "site" },
    {
      file: "content/header.yaml",
      slug: "header",
      transform: (d) => ({
        logoSrc: d.logoSrc,
        brandPrimary: d.brandPrimary,
        brandHighlight: d.brandHighlight,
        ctaLabel: d.ctaLabel,
        ctaHref: d.ctaHref,
        navLinks: Array.isArray(d.navLinks) ? d.navLinks : [],
      }),
    },
    {
      file: "content/footer.yaml",
      slug: "footer",
      transform: (d) => ({
        brandPrimary: d.brandPrimary,
        brandHighlight: d.brandHighlight,
        description: d.description,
        quickLinksTitle: d.quickLinksTitle,
        quickLinks: Array.isArray(d.quickLinks) ? d.quickLinks : [],
        omanTitle: d.omanTitle,
        omanPhone1: d.omanPhone1,
        omanPhone2: d.omanPhone2,
        omanEmail: d.omanEmail,
        omanAddress: d.omanAddress,
        indiaTitle: d.indiaTitle,
        indiaPhone: d.indiaPhone,
        indiaEmail: d.indiaEmail,
        partnerLabel: d.partnerLabel,
        partnerName: d.partnerName,
        instagram: d.instagram,
        facebook: d.facebook,
        linkedin: d.linkedin,
        twitter: d.twitter,
        youtube: d.youtube,
        copyrightText: d.copyrightText,
      }),
    },
    {
      file: "content/pages/home.yaml",
      slug: "home-page",
      transform: (d) => ({
        ...d,
        aboutTags: Array.isArray(d.aboutTags)
          ? (d.aboutTags as string[]).map((tag) => ({ tag }))
          : [],
        aboutFacts: d.aboutFacts || [],
        homeStats: d.homeStats || [],
      }),
    },
    {
      file: "content/pages/about.yaml",
      slug: "about-page",
      transform: (d) => ({
        ...d,
        stakeholders: Array.isArray(d.stakeholders)
          ? (d.stakeholders as string[]).map((item) => ({ item }))
          : [],
      }),
    },
    { file: "content/pages/pillars.yaml", slug: "pillars-page" },
    { file: "content/pages/summit.yaml", slug: "summit-page" },
    { file: "content/pages/partner.yaml", slug: "partner-page" },
    { file: "content/pages/media.yaml", slug: "media-page" },
    { file: "content/pages/contact.yaml", slug: "contact-page" },
  ];

  console.log("Seeding globals...");
  for (const g of globalMap) {
    const raw = readYaml(g.file);
    if (!raw) {
      console.log(`  skip missing ${g.file}`);
      continue;
    }
    const data = g.transform ? g.transform(raw) : raw;
    const cleaned = { ...data };
    for (const key of Object.keys(cleaned)) {
      if (
        cleaned[key] &&
        typeof cleaned[key] === "object" &&
        !Array.isArray(cleaned[key])
      ) {
        delete cleaned[key];
      }
    }
    await payload.updateGlobal({
      slug: g.slug as "site",
      data: { ...cleaned, _status: "published" },
      overrideAccess: true,
      draft: false,
    });
    console.log(`  global ${g.slug}`);
  }

  console.log("Seeding collections...");

  for (const { slug, data } of listYamlDir("content/partners")) {
    await upsertCollection(payload, "partners", slug, {
      name: slugName(data.name, slug),
      role: data.role,
      fullName: data.fullName,
      bg: data.bg || "dark",
      logoSrc: data.logoSrc,
      order: data.order ?? 1,
    });
  }

  for (const { slug, data } of listYamlDir("content/stats")) {
    await upsertCollection(payload, "stats", slug, {
      label: slugName(data.label, slug),
      value: data.value ?? 0,
      suffix: data.suffix ?? "+",
    });
  }

  for (const { slug, data } of listYamlDir("content/speakers")) {
    await upsertCollection(payload, "speakers", slug, {
      name: slugName(data.name, slug),
      role: data.role,
      description: data.description,
      featured: Boolean(data.featured),
    });
  }

  for (const { slug, data } of listYamlDir("content/testimonials")) {
    await upsertCollection(payload, "testimonials", slug, {
      author: slugName(data.author, slug),
      role: data.role,
      quote: data.quote,
    });
  }

  for (const { slug, data } of listYamlDir("content/pillars")) {
    await upsertCollection(payload, "pillars", slug, {
      title: slugName(data.title, slug),
      subtitle: data.subtitle,
      description: data.description,
      icon: data.icon || "BookOpen",
      features: asStringArray(data.features).map((x) => ({ item: x.item || x.tag })),
      extras: asStringArray(data.extras).map((x) => ({ item: x.item || x.tag })),
    });
  }

  for (const { slug, data } of listYamlDir("content/packages")) {
    await upsertCollection(payload, "packages", slug, {
      tier: slugName(data.tier, slug),
      price: data.price,
      currency: data.currency || "OMR",
      highlight: Boolean(data.highlight),
      features: asStringArray(data.features).map((x) => ({ item: x.item || x.tag })),
    });
  }

  for (const { slug, data } of listYamlDir("content/agenda")) {
    await upsertCollection(payload, "agenda", slug, {
      title: slugName(data.title, slug),
      time: data.time,
      type: data.type || "session",
    });
  }

  for (const { slug, data } of listYamlDir("content/gallery")) {
    await upsertCollection(payload, "gallery", slug, {
      title: slugName(data.title, slug),
      caption: data.caption,
      imageSrc: data.imageSrc,
    });
  }

  for (const { slug, data } of listYamlDir("content/videos")) {
    await upsertCollection(payload, "videos", slug, {
      title: slugName(data.title, slug),
      description: data.description,
      tag: data.tag || "COMING SOON",
      imageSrc: data.imageSrc,
    });
  }

  for (const { slug, data } of listYamlDir("content/press")) {
    await upsertCollection(payload, "press", slug, {
      title: slugName(data.title, slug),
      date: data.date || "Coming Soon",
      excerpt: data.excerpt,
    });
  }

  for (const { slug, data } of listYamlDir("content/values")) {
    await upsertCollection(payload, "values", slug, {
      title: slugName(data.title, slug),
      description: data.description,
      icon: data.icon || "Target",
    });
  }

  console.log("Seed complete. Keystatic content/ files were not modified.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
