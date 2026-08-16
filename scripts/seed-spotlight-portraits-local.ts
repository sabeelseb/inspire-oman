/**
 * Local-only: seed Home Spotlight Block 1/2 portrait paths + click links.
 * Usage: npx tsx --env-file=.env scripts/seed-spotlight-portraits-local.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "true";
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "home-page",
    data: {
      spotlightCard1ImageSrc: "/media/areef.jpg",
      spotlightCard1Href: "/pillars",
      spotlightCard2ImageSrc: "/media/DSC00479.jpg",
      spotlightCard2Href: "/media",
    },
    overrideAccess: true,
    draft: false,
  });

  const home = await payload.findGlobal({
    slug: "home-page",
    depth: 0,
    overrideAccess: true,
  });

  console.log("Seeded spotlight portraits:");
  console.log("  card1ImageSrc:", home.spotlightCard1ImageSrc);
  console.log("  card1Href:", home.spotlightCard1Href);
  console.log("  card2ImageSrc:", home.spotlightCard2ImageSrc);
  console.log("  card2Href:", home.spotlightCard2Href);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
