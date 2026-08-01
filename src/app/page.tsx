import HomeClient from "./HomeClient";
import {
  getCmsPackages,
  getCmsPageHome,
  getCmsPartners,
  getCmsPillars,
  getCmsSpeakers,
  getCmsStats,
  getCmsTestimonials,
} from "@/lib/cms";

export default async function Home() {
  const [page, stats, partners, testimonials, speakers, pillars, packages] =
    await Promise.all([
      getCmsPageHome(),
      getCmsStats(),
      getCmsPartners(),
      getCmsTestimonials(),
      getCmsSpeakers(),
      getCmsPillars(),
      getCmsPackages(),
    ]);

  return (
    <HomeClient
      page={page}
      stats={stats}
      partners={partners}
      testimonials={testimonials}
      speakers={speakers}
      pillars={pillars}
      packages={packages}
    />
  );
}
