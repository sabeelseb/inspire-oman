import { createClient } from "@libsql/client";

async function main() {
  const db = createClient({ url: process.env.DATABASE_URI || "file:./payload.db" });
  const info = await db.execute("PRAGMA table_info(videos)");
  console.log(
    "cols",
    info.rows.map((r) => r.name),
  );
  const r = await db.execute("SELECT id, title, href, tag FROM videos LIMIT 8");
  console.log(JSON.stringify(r.rows, null, 2));
}

main().catch(console.error);
