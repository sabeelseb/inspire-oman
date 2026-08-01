/**
 * One-time migration: copy legacy `submissions` rows into the three Inbox collections.
 * Safe to re-run — skips emails already present in the target collection.
 *
 * Usage (local):  npm run migrate:submissions
 * Usage (docker): docker compose -f docker-compose.prod.yml exec app \
 *   npx tsx scripts/migrate-submissions-split.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

type LegacyType = "contact" | "message" | "summit" | "partner";

async function main() {
  const payload = await getPayload({ config });

  const legacy = await payload.find({
    collection: "submissions",
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  });

  let contact = 0;
  let summit = 0;
  let partner = 0;
  let skipped = 0;

  for (const row of legacy.docs) {
    const type = row.type as LegacyType;
    const email = String(row.email || "").toLowerCase();
    const createdAt = row.createdAt;

    if (type === "contact" || type === "message") {
      const existing = await payload.find({
        collection: "get-in-touch",
        where: {
          and: [
            { email: { equals: row.email } },
            { createdAt: { equals: createdAt } },
          ],
        },
        limit: 1,
        overrideAccess: true,
      });
      if (existing.totalDocs > 0) {
        skipped += 1;
        continue;
      }
      await payload.create({
        collection: "get-in-touch",
        data: {
          name: row.name,
          email: row.email,
          phone: row.phone || undefined,
          subject: row.subject || undefined,
          message: row.message || undefined,
          status: (row.status as "new" | "in-progress" | "closed") || "new",
        },
        overrideAccess: true,
      });
      contact += 1;
      continue;
    }

    if (type === "summit") {
      const existing = await payload.find({
        collection: "summit-registrations",
        where: {
          and: [
            { email: { equals: row.email } },
            { createdAt: { equals: createdAt } },
          ],
        },
        limit: 1,
        overrideAccess: true,
      });
      if (existing.totalDocs > 0) {
        skipped += 1;
        continue;
      }
      await payload.create({
        collection: "summit-registrations",
        data: {
          name: row.name,
          email: row.email,
          phone: row.phone || undefined,
          organization: row.organization || undefined,
          role: row.role || undefined,
          message: row.message || undefined,
          status: (row.status as "new" | "in-progress" | "closed") || "new",
        },
        overrideAccess: true,
      });
      summit += 1;
      continue;
    }

    if (type === "partner") {
      const existing = await payload.find({
        collection: "partner-applications",
        where: {
          and: [
            { email: { equals: row.email } },
            { createdAt: { equals: createdAt } },
          ],
        },
        limit: 1,
        overrideAccess: true,
      });
      if (existing.totalDocs > 0) {
        skipped += 1;
        continue;
      }
      await payload.create({
        collection: "partner-applications",
        data: {
          name: row.name,
          email: row.email,
          phone: row.phone || undefined,
          companyName: row.companyName || undefined,
          contactPerson: row.contactPerson || undefined,
          designation: row.designation || undefined,
          address: row.address || undefined,
          tier: row.tier || undefined,
          paymentMethod: row.paymentMethod || undefined,
          message: row.message || undefined,
          status: (row.status as "new" | "in-progress" | "closed") || "new",
        },
        overrideAccess: true,
      });
      partner += 1;
      continue;
    }

    console.warn(`Unknown type for ${email}: ${type}`);
    skipped += 1;
  }

  console.log(
    JSON.stringify(
      {
        legacyTotal: legacy.totalDocs,
        migrated: { contact, summit, partner },
        skipped,
      },
      null,
      2
    )
  );
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
