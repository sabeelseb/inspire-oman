/**
 * Full CMS mirror export: globals + content collections + Inbox submissions + media list.
 * Usage: DATABASE_URI=... PAYLOAD_PUSH=false npx tsx scripts/export-payload-mirror.ts [out.json]
 */
import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";

const GLOBALS = [
  "site",
  "header",
  "footer",
  "home-page",
  "about-page",
  "pillars-page",
  "summit-page",
  "partner-page",
  "media-page",
  "contact-page",
] as const;

/** Editable site content, matched on `slug`. */
const CONTENT_COLLECTIONS = [
  "partners",
  "stats",
  "speakers",
  "testimonials",
  "pillars",
  "packages",
  "values",
  "agenda",
  "gallery",
  "videos",
  "press",
] as const;

/** Form submissions, mirrored row for row with original timestamps. */
const INBOX_COLLECTIONS = [
  "get-in-touch",
  "summit-registrations",
  "partner-applications",
  "submissions",
] as const;

const STRIP_KEYS = new Set([
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "globalType",
  "collection",
  "sizes",
  "mimeType",
  "filesize",
  "width",
  "height",
  "focalX",
  "focalY",
  "thumbnailURL",
  "url",
]);

function isUploadDoc(obj: Record<string, unknown>) {
  return (
    ("filename" in obj || "url" in obj) &&
    ("mimeType" in obj || "filesize" in obj || "filename" in obj)
  );
}

function cleanValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => cleanValue(item));
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (isUploadDoc(obj)) {
      return {
        filename: typeof obj.filename === "string" ? obj.filename : null,
        alt: typeof obj.alt === "string" ? obj.alt : null,
      };
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === "_order" || k === "_status") {
        out[k] = v;
        continue;
      }
      if (STRIP_KEYS.has(k) || k.startsWith("_")) continue;
      out[k] = cleanValue(v);
    }
    return out;
  }
  return value;
}

function cleanDoc(doc: Record<string, unknown>, keepTimestamps = false) {
  const out = cleanValue(doc) as Record<string, unknown>;
  if (keepTimestamps) {
    if (typeof doc.createdAt === "string") out.createdAt = doc.createdAt;
    if (typeof doc.updatedAt === "string") out.updatedAt = doc.updatedAt;
  }
  return out;
}

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "false";
  const outPath = path.resolve(
    process.argv[2] || path.join(process.cwd(), "payload-mirror.json"),
  );

  const payload = await getPayload({ config });
  const dump = {
    exportedAt: new Date().toISOString(),
    source: process.env.MIRROR_SOURCE || "unknown",
    globals: {} as Record<string, unknown>,
    collections: {} as Record<string, unknown[]>,
    inbox: {} as Record<string, unknown[]>,
    media: [] as { filename: string; alt: string }[],
  };

  console.log("Exporting globals...");
  for (const slug of GLOBALS) {
    const doc = await payload.findGlobal({
      slug: slug as "site",
      draft: false,
      overrideAccess: true,
      depth: 1,
    });
    dump.globals[slug] = cleanDoc(doc as unknown as Record<string, unknown>);
    console.log(`  ${slug}`);
  }

  console.log("Exporting content collections...");
  for (const collection of CONTENT_COLLECTIONS) {
    const result = await payload.find({
      collection: collection as "partners",
      limit: 1000,
      depth: 1,
      overrideAccess: true,
      draft: false,
      sort: "createdAt",
    });
    dump.collections[collection] = result.docs.map((d) =>
      cleanDoc(d as unknown as Record<string, unknown>),
    );
    console.log(`  ${collection}: ${result.docs.length}`);
  }

  console.log("Exporting inbox collections...");
  for (const collection of INBOX_COLLECTIONS) {
    const result = await payload.find({
      collection: collection as "get-in-touch",
      limit: 5000,
      depth: 0,
      overrideAccess: true,
      sort: "createdAt",
    });
    dump.inbox[collection] = result.docs.map((d) =>
      cleanDoc(d as unknown as Record<string, unknown>, true),
    );
    console.log(`  ${collection}: ${result.docs.length}`);
  }

  const media = await payload.find({
    collection: "media",
    limit: 5000,
    depth: 0,
    overrideAccess: true,
    sort: "createdAt",
  });
  dump.media = media.docs
    .map((doc) => ({
      filename: String((doc as { filename?: string }).filename || ""),
      alt: String((doc as { alt?: string }).alt || ""),
    }))
    .filter((item) => item.filename);
  console.log(`  media: ${dump.media.length}`);

  fs.writeFileSync(outPath, JSON.stringify(dump, null, 2), "utf8");
  console.log(`Wrote ${outPath}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
