import PartnerClient from "./PartnerClient";
import { getCmsPackages, getCmsPagePartner } from "@/lib/cms";

export default async function PartnerPage() {
  const [page, packages] = await Promise.all([getCmsPagePartner(), getCmsPackages()]);

  return <PartnerClient page={page} packages={packages} />;
}
