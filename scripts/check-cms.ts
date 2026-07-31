import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";

async function main() {
  console.log("collections", Object.keys(config.collections ?? {}));
  console.log("singletons", Object.keys(config.singletons ?? {}));
  const r = createReader(process.cwd(), config);
  const partners = await r.collections.partners.all();
  const stats = await r.collections.stats.all();
  const speakers = await r.collections.speakers.all();
  const testimonials = await r.collections.testimonials.all();
  const site = await r.singletons.site.read();
  console.log(
    JSON.stringify(
      {
        partners: partners.length,
        stats: stats.length,
        speakers: speakers.length,
        testimonials: testimonials.length,
        siteName: site?.name ?? null,
        partnerNames: partners.map((p) => p.entry.name),
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
