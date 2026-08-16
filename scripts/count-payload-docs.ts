/**
 * Print document counts per collection for the current DATABASE_URI.
 * Usage: npx tsx --env-file=.env scripts/count-payload-docs.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "false";
  const payload = await getPayload({ config });

  for (const collection of payload.config.collections) {
    if (collection.slug.startsWith("payload-")) continue;
    const result = await payload.count({
      collection: collection.slug as "media",
      overrideAccess: true,
    });
    console.log(`${collection.slug}=${result.totalDocs}`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
