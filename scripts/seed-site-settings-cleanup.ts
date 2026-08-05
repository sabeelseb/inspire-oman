/**
 * Fill new Site Settings / Footer fields after the admin cleanup.
 */
import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  process.env.PAYLOAD_PUSH = process.env.PAYLOAD_PUSH || "false";
  const payload = await getPayload({ config });

  const footer = await payload.findGlobal({
    slug: "footer",
    depth: 0,
    overrideAccess: true,
    draft: false,
  });
  await payload.updateGlobal({
    slug: "footer",
    data: {
      partnerInitiative:
        (footer.partnerInitiative as string) || "Gulf Madhyamam",
      partnerExecution: (footer.partnerExecution as string) || "mefriend",
    } as Record<string, unknown>,
    overrideAccess: true,
    draft: false,
  });

  const site = await payload.findGlobal({
    slug: "site",
    depth: 0,
    overrideAccess: true,
    draft: false,
  });
  await payload.updateGlobal({
    slug: "site",
    data: {
      seoTitle:
        (site.seoTitle as string) ||
        "Inspire Oman - Telling Oman's Growth Story Globally",
      seoDescription:
        (site.seoDescription as string) ||
        "A prestigious integrated initiative aligned with Oman Vision 2040. Investors Summit - 11 October 2026, Oman Convention & Exhibition Centre.",
      city: (site.city as string) || "Muscat",
    } as Record<string, unknown>,
    overrideAccess: true,
    draft: false,
  });

  console.log("Site settings cleanup seed complete.");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
