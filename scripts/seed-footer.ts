/**
 * Seed/update only the Footer global from content/footer.yaml
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";
import { getPayload } from "payload";
import config from "../payload.config";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const file = path.join(root, "content/footer.yaml");
  const raw = yaml.load(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
  const payload = await getPayload({ config });
  await payload.updateGlobal({
    slug: "footer",
    data: {
      ...raw,
      quickLinks: Array.isArray(raw.quickLinks) ? raw.quickLinks : [],
      _status: "published",
    },
    draft: false,
    overrideAccess: true,
  });
  console.log("Footer global seeded.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
