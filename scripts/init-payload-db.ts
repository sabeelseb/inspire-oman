/**
 * Initialize Payload DB schema (uses adapter push).
 * Usage: npx tsx scripts/init-payload-db.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });
  console.log("Payload DB ready. Collections:", payload.config.collections.map((c) => c.slug).join(", "));
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
