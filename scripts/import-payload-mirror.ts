/**
 * Import a full CMS mirror (globals + content + Inbox) into the current DATABASE_URI.
 * Inbox rows are replaced so the local dashboard matches the source row for row.
 *
 * Registration emails fire on create, so run without POSTMARK_SERVER_TOKEN.
 * Usage: npx tsx --env-file=.env scripts/import-payload-mirror.ts [dump.json]
 */
import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";

type Dump = {
  exportedAt?: string;
  source?: string;
  globals: Record<string, Record<string, unknown>>;
  collections: Record<string, Record<string, unknown>[]>;
  inbox?: Record<string, Record<string, unknown>[]>;
  media?: { filename: string; alt?: string }[];
};

/** Every `type: "upload"` field name across globals and collections. */
const UPLOAD_FIELDS = new Set([
  "logo",
  "image",
  "heroLogo",
  "heroImage",
  "bannerImage",
  "summitImage",
  "statsBanner",
  "ogImage",
  "heroOcciLogo",
  "heroMefriendLogo",
  "spotlightVideoPosterImage",
  "spotlightCard1Image",
  "spotlightCard2Image",
]);

type PayloadClient = Awaited<ReturnType<typeof getPayload>>;

function filenameFromUpload(
  value: unknown,
): { filename: string; alt?: string } | null {
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
  missing: Set<string>,
  filename: string,
  alt?: string,
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
    missing.add(filename);
    return null;
  }
  const created = await payload.create({
    collection: "media",
    data: { alt: alt || filename },
    filePath,
    overrideAccess: true,
  });
  cache.set(filename, created.id);
  return created.id;
}

async function sanitizeForWrite(
  payload: PayloadClient,
  cache: Map<string, string | number>,
  missing: Set<string>,
  data: Record<string, unknown>,
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
    if (UPLOAD_FIELDS.has(key)) {
      const ref = filenameFromUpload(value);
      if (!ref) continue;
      const id = await ensureMedia(payload, cache, missing, ref.filename, ref.alt);
      if (id) out[key] = id;
      continue;
    }
    if (Array.isArray(value)) {
      out[key] = await Promise.all(
        value.map(async (row) => {
          if (row && typeof row === "object") {
            const cleaned = await sanitizeForWrite(
              payload,
              cache,
              missing,
              row as Record<string, unknown>,
            );
            delete cleaned._status;
            return cleaned;
          }
          return row;
        }),
      );
      continue;
    }
    out[key] = value;
  }
  out._status = "published";
  return out;
}

async function upsertContent(
  payload: PayloadClient,
  cache: Map<string, string | number>,
  missing: Set<string>,
  collection: string,
  data: Record<string, unknown>,
) {
  const slug = data.slug;
  if (typeof slug !== "string" || !slug) return "skipped";
  const cleaned = await sanitizeForWrite(payload, cache, missing, data);
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
    return "updated";
  }
  await payload.create({
    collection: collection as "partners",
    data: cleaned,
    overrideAccess: true,
    draft: false,
  });
  return "created";
}

async function replaceInbox(
  payload: PayloadClient,
  collection: string,
  docs: Record<string, unknown>[],
) {
  const existing = await payload.find({
    collection: collection as "get-in-touch",
    limit: 5000,
    depth: 0,
    overrideAccess: true,
  });
  for (const doc of existing.docs) {
    await payload.delete({
      collection: collection as "get-in-touch",
      id: doc.id,
      overrideAccess: true,
    });
  }
  for (const doc of docs) {
    const data = { ...doc };
    delete data._status;
    await payload.create({
      collection: collection as "get-in-touch",
      data: data as never,
      overrideAccess: true,
    });
  }
  return { removed: existing.docs.length, added: docs.length };
}

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "false";
  if (process.env.POSTMARK_SERVER_TOKEN) {
    console.error(
      "Refusing to run: POSTMARK_SERVER_TOKEN is set and importing registrations would email real people.",
    );
    process.exit(1);
  }

  const dumpPath = path.resolve(
    process.argv[2] || path.join(process.cwd(), "payload-mirror.json"),
  );
  if (!fs.existsSync(dumpPath)) {
    console.error(`Dump not found: ${dumpPath}`);
    process.exit(1);
  }

  const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8")) as Dump;
  console.log(`Importing mirror from ${dump.source || "?"} @ ${dump.exportedAt}`);

  const payload = await getPayload({ config });
  const cache = new Map<string, string | number>();
  const missing = new Set<string>();

  console.log("Media library...");
  let mediaCreated = 0;
  for (const item of dump.media || []) {
    if (!item.filename) continue;
    const before = cache.size;
    await ensureMedia(payload, cache, missing, item.filename, item.alt);
    if (cache.size > before) mediaCreated += 1;
  }
  console.log(`  linked ${cache.size}, missing files ${missing.size}`);

  console.log("Globals...");
  for (const [slug, doc] of Object.entries(dump.globals || {})) {
    const cleaned = await sanitizeForWrite(payload, cache, missing, doc);
    await payload.updateGlobal({
      slug: slug as "site",
      data: cleaned,
      overrideAccess: true,
      draft: false,
    });
    console.log(`  ${slug}`);
  }

  console.log("Content collections...");
  for (const [collection, docs] of Object.entries(dump.collections || {})) {
    if (collection === "media") continue;
    const counts = { created: 0, updated: 0, skipped: 0 };
    for (const doc of docs) {
      const result = await upsertContent(
        payload,
        cache,
        missing,
        collection,
        doc,
      );
      counts[result as keyof typeof counts] += 1;
    }
    console.log(
      `  ${collection}: +${counts.created} ~${counts.updated} skip${counts.skipped}`,
    );
  }

  console.log("Inbox collections...");
  for (const [collection, docs] of Object.entries(dump.inbox || {})) {
    const { removed, added } = await replaceInbox(payload, collection, docs);
    console.log(`  ${collection}: removed ${removed}, added ${added}`);
  }

  if (missing.size) {
    console.log(`\nMissing ${missing.size} media files in public/media:`);
    for (const name of [...missing].slice(0, 20)) console.log(`  ${name}`);
    if (missing.size > 20) console.log(`  ... and ${missing.size - 20} more`);
  }

  console.log(`\nImport complete (media created: ${mediaCreated}).`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
