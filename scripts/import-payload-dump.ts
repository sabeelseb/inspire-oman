/**
 * Import Payload dump JSON into the current DATABASE_URI.
 * Usage: PAYLOAD_PUSH=false npx tsx --env-file=.env scripts/import-payload-dump.ts [dump.json]
 */
import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";

type Dump = {
  exportedAt?: string;
  globals: Record<string, Record<string, unknown>>;
  collections: Record<string, Record<string, unknown>[]>;
  media?: { filename: string; alt?: string }[];
};

const UPLOAD_FIELD_HINTS = new Set([
  "logo",
  "heroLogo",
  "heroImage",
  "bannerImage",
  "summitImage",
  "statsBanner",
  "ogImage",
  "image",
]);

type PayloadClient = Awaited<ReturnType<typeof getPayload>>;

function filenameFromUpload(value: unknown): { filename: string; alt?: string } | null {
  if (!value) return null;
  if (typeof value === "string") {
    const name = value.split("/").filter(Boolean).pop() || "";
    return name ? { filename: name } : null;
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const filename = typeof obj.filename === "string" ? obj.filename : "";
    if (!filename) return null;
    return {
      filename,
      alt: typeof obj.alt === "string" ? obj.alt : undefined,
    };
  }
  return null;
}

async function ensureMedia(
  payload: PayloadClient,
  cache: Map<string, string | number>,
  filename: string,
  alt?: string
) {
  if (cache.has(filename)) return cache.get(filename);
  const existing = await payload.find({
    collection: "media",
    where: { filename: { equals: filename } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) {
    cache.set(filename, existing.docs[0].id);
    return existing.docs[0].id;
  }
  const filePath = path.join(process.cwd(), "public/media", filename);
  if (!fs.existsSync(filePath)) {
    console.log(`  missing media file ${filename}`);
    return null;
  }
  const created = await payload.create({
    collection: "media",
    data: { alt: alt || filename },
    filePath,
    overrideAccess: true,
  });
  cache.set(filename, created.id);
  console.log(`  created media/${filename}`);
  return created.id;
}

async function sanitizeForWrite(
  payload: PayloadClient,
  cache: Map<string, string | number>,
  data: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === "_status") {
      out[key] = "published";
      continue;
    }
    if (key === "_order" && typeof value === "string" && value) {
      out[key] = value;
      continue;
    }
    if (UPLOAD_FIELD_HINTS.has(key)) {
      const ref = filenameFromUpload(value);
      if (!ref) continue;
      const id = await ensureMedia(payload, cache, ref.filename, ref.alt);
      if (id) out[key] = id;
      continue;
    }
    if (Array.isArray(value)) {
      out[key] = value.map((row) => {
        if (row && typeof row === "object") {
          const r = { ...(row as Record<string, unknown>) };
          delete r.id;
          delete r._uuid;
          return r;
        }
        return row;
      });
      continue;
    }
    out[key] = value;
  }
  out._status = "published";
  return out;
}

async function upsertCollection(
  payload: PayloadClient,
  cache: Map<string, string | number>,
  collection: string,
  data: Record<string, unknown>
) {
  const slug = data.slug;
  if (typeof slug !== "string" || !slug) {
    console.log(`  skip ${collection} (no slug)`);
    return;
  }
  const cleaned = await sanitizeForWrite(payload, cache, data);
  const existing = await payload.find({
    collection: collection as "partners",
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  });
  if (existing.docs[0]) {
    await payload.update({
      collection: collection as "partners",
      id: existing.docs[0].id,
      data: cleaned,
      overrideAccess: true,
      draft: false,
    });
    console.log(`  updated ${collection}/${slug}`);
  } else {
    await payload.create({
      collection: collection as "partners",
      data: cleaned,
      overrideAccess: true,
      draft: false,
    });
    console.log(`  created ${collection}/${slug}`);
  }
}

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "false";
  const dumpPath = path.resolve(
    process.argv[2] || path.join(process.cwd(), "payload-live-export.json")
  );
  if (!fs.existsSync(dumpPath)) {
    console.error(`Dump not found: ${dumpPath}`);
    process.exit(1);
  }

  const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8")) as Dump;
  console.log(`Importing dump from ${dump.exportedAt || dumpPath}`);

  const payload = await getPayload({ config });
  const cache = new Map<string, string | number>();

  console.log("Importing media library...");
  for (const item of dump.media || []) {
    if (!item.filename) continue;
    await ensureMedia(payload, cache, item.filename, item.alt);
  }

  console.log("Importing globals...");
  for (const [slug, doc] of Object.entries(dump.globals || {})) {
    const cleaned = await sanitizeForWrite(payload, cache, doc);
    await payload.updateGlobal({
      slug: slug as "site",
      data: cleaned,
      overrideAccess: true,
      draft: false,
    });
    console.log(`  global ${slug}`);
  }

  console.log("Importing collections...");
  for (const [collection, docs] of Object.entries(dump.collections || {})) {
    if (collection === "media") continue;
    for (const doc of docs) {
      await upsertCollection(payload, cache, collection, doc);
    }
  }

  console.log("Import complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
