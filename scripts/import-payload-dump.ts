/**
 * Import Payload dump JSON into the current DATABASE_URI (local SQLite).
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
};

const UPLOAD_FIELD_HINTS = new Set([
  "logo",
  "heroLogo",
  "heroImage",
  "bannerImage",
  "summitImage",
  "statsBanner",
  "image",
]);

function sanitizeForWrite(data: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key === "_status") {
      out[key] = "published";
      continue;
    }
    // Drop upload relations (IDs won't match local media). Prefer *Src text fields.
    if (UPLOAD_FIELD_HINTS.has(key)) {
      if (typeof value === "string" && value.startsWith("/")) {
        // accidental url stored in upload field — ignore
        continue;
      }
      if (value && typeof value === "object") continue;
      if (typeof value === "number" || typeof value === "string") continue;
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
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  data: Record<string, unknown>
) {
  const slug = data.slug;
  if (typeof slug !== "string" || !slug) {
    console.log(`  skip ${collection} (no slug)`);
    return;
  }
  const cleaned = sanitizeForWrite(data);
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

  console.log("Importing globals...");
  for (const [slug, doc] of Object.entries(dump.globals || {})) {
    const cleaned = sanitizeForWrite(doc);
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
    for (const doc of docs) {
      await upsertCollection(payload, collection, doc);
    }
  }

  console.log("Import complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
