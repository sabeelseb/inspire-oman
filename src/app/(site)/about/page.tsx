import AboutClient from "./AboutClient";
import { getCmsPageAbout, getCmsValues } from "@/lib/cms";

export default async function AboutPage() {
  const [page, values] = await Promise.all([getCmsPageAbout(), getCmsValues()]);

  return <AboutClient page={page} values={values} />;
}
