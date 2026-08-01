import SummitClient from "./SummitClient";
import { getCmsAgenda, getCmsPageSummit, getCmsSpeakers } from "@/lib/cms";

export default async function SummitPage() {
  const [page, agenda, speakers] = await Promise.all([
    getCmsPageSummit(),
    getCmsAgenda(),
    getCmsSpeakers(),
  ]);

  return <SummitClient page={page} agenda={agenda} speakers={speakers} />;
}
