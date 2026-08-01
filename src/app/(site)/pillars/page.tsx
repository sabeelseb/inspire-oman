import PillarsClient from "./PillarsClient";
import { getCmsPagePillars, getCmsPillars } from "@/lib/cms";

export default async function PillarsPage() {
  const [page, pillars] = await Promise.all([getCmsPagePillars(), getCmsPillars()]);

  return <PillarsClient page={page} pillars={pillars} />;
}
