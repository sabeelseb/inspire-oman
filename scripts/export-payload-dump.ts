/**
 * Export Payload globals + site content collections to JSON.
 * Usage: DATABASE_URI=... PAYLOAD_PUSH=false npx tsx scripts/export-payload-dump.ts [out.json]
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

const COLLECTIONS = [
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

const STRIP_KEYS = new Set([
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "globalType",
  "collection",
  "sizes",
  "filename",
  "mimeType",
  "filesize",
  "width",
  "height",
  "focalX",
  "focalY",
  "thumbnailURL",
  "url",
]);

function cleanValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => cleanValue(item));
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    // Upload relation → keep url as text if present, else drop
    if ("url" in obj && ("mimeType" in obj || "filename" in obj || "filesize" in obj)) {
      return typeof obj.url === "string" ? obj.url : null;
    }
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (STRIP_KEYS.has(k) || k.startsWith("_")) continue;
      // array row ids
      if (k === "id" || k === "_uuid") continue;
      out[k] = cleanValue(v);
    }
    return out;
  }
  return value;
}

function cleanDoc(doc: Record<string, unknown>): Record<string, unknown> {
  return cleanValue(doc) as Record<string, unknown>;
}

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "false";
  const outPath = path.resolve(
    process.argv[2] || path.join(process.cwd(), "payload-live-export.json")
  );

  const payload = await getPayload({ config });
  const dump: {
    exportedAt: string;
    globals: Record<string, unknown>;
    collections: Record<string, unknown[]>;
  } = {
    exportedAt: new Date().toISOString(),
    globals: {},
    collections: {},
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

  console.log("Exporting collections...");
  for (const collection of COLLECTIONS) {
    const result = await payload.find({
      collection: collection as "partners",
      limit: 500,
      depth: 1,
      overrideAccess: true,
      draft: false,
    });
    dump.collections[collection] = result.docs.map((d) =>
      cleanDoc(d as unknown as Record<string, unknown>)
    );
    console.log(`  ${collection}: ${result.docs.length}`);
  }

  fs.writeFileSync(outPath, JSON.stringify(dump, null, 2), "utf8");
  console.log(`Wrote ${outPath}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
