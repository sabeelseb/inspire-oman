/** Local SQLite: add spotlight portrait columns + seed sample values. */
import { createClient } from "@libsql/client";

async function main() {
  const client = createClient({ url: "file:./payload.db" });
  const cols = await client.execute("PRAGMA table_info(home_page)");
  const names = cols.rows.map((r) => String(r.name));
  console.log(
    "existing spotlight cols:\n",
    names.filter((n) => n.includes("spotlight")).join("\n") || "(none)",
  );

  const needed: { name: string; type: string }[] = [
    { name: "spotlight_card1_image_id", type: "integer" },
    { name: "spotlight_card1_image_src", type: "text" },
    { name: "spotlight_card1_href", type: "text" },
    { name: "spotlight_card2_image_id", type: "integer" },
    { name: "spotlight_card2_image_src", type: "text" },
    { name: "spotlight_card2_href", type: "text" },
  ];

  for (const col of needed) {
    if (!names.includes(col.name)) {
      await client.execute(
        `ALTER TABLE home_page ADD COLUMN ${col.name} ${col.type}`,
      );
      console.log("added", col.name);
    }
  }

  await client.execute({
    sql: `UPDATE home_page SET
      spotlight_card1_image_src = ?,
      spotlight_card1_href = ?,
      spotlight_card2_image_src = ?,
      spotlight_card2_href = ?`,
    args: ["/media/areef.jpg", "/pillars", "/media/DSC00479.jpg", "/media"],
  });

  const row = await client.execute(
    `SELECT spotlight_card1_image_src, spotlight_card1_href,
            spotlight_card2_image_src, spotlight_card2_href
     FROM home_page LIMIT 1`,
  );
  console.log("seeded:", row.rows[0]);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
