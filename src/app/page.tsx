import HomeClient from "./HomeClient";
import {
  getCmsPackages,
  getCmsPartners,
  getCmsPillars,
  getCmsSpeakers,
  getCmsStats,
  getCmsTestimonials,
} from "@/lib/cms";

export default async function Home() {
  const [stats, partners, testimonials, speakers, pillars, packages] = await Promise.all([
    getCmsStats(),
    getCmsPartners(),
    getCmsTestimonials(),
    getCmsSpeakers(),
    getCmsPillars(),
    getCmsPackages(),
  ]);

  return (
    <HomeClient
      stats={stats}
      partners={partners}
      testimonials={testimonials}
      speakers={speakers}
      pillars={pillars}
      packages={packages}
    />
  );
}
