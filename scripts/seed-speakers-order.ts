/**
 * Initialize speakers _order so drag-and-drop has a stable start.
 */
import { getPayload } from "payload";
import config from "../payload.config";

function orderKey(index: number): string {
  const letter = String.fromCharCode(97 + Math.floor(index / 10));
  return `${letter}${index % 10}`;
}

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "false";
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "speakers",
    limit: 500,
    depth: 0,
    overrideAccess: true,
    draft: false,
  });

  const docs = [...result.docs].sort((a, b) => {
    const aDate = new Date(String(a.createdAt || 0)).getTime();
    const bDate = new Date(String(b.createdAt || 0)).getTime();
    if (aDate !== bDate) return aDate - bDate;
    return String(a.name || "").localeCompare(String(b.name || ""));
  });

  let updated = 0;
  for (const [index, doc] of docs.entries()) {
    if ((doc as { _order?: string })._order) continue;
    const nextOrder = orderKey(index);
    await payload.update({
      collection: "speakers",
      id: doc.id,
      data: { _order: nextOrder } as Record<string, unknown>,
      overrideAccess: true,
      draft: false,
    });
    updated += 1;
    console.log(`  ${nextOrder}  ${doc.name}`);
  }

  console.log(`Seeded _order for ${updated}/${docs.length} speakers.`);
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
