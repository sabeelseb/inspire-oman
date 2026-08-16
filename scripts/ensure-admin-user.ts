/**
 * Ensure a local Payload admin user exists (used after rebuilding the local DB).
 * Usage: npx tsx scripts/ensure-admin-user.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const email = process.env.PAYLOAD_ADMIN_EMAIL || "admin@inspireoman.local";
  const password = process.env.PAYLOAD_ADMIN_PASSWORD || "ChangeMe123!";

  const payload = await getPayload({ config });
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  });

  if (existing.docs[0]) {
    console.log(`Admin user already present: ${email}`);
  } else {
    await payload.create({
      collection: "users",
      data: { email, password },
      overrideAccess: true,
    });
    console.log(`Created admin user: ${email} / ${password}`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
