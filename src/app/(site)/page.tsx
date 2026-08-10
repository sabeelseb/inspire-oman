import HomeClient from "./HomeClient";
import {
  getCmsPageHome,
  getCmsPartners,
  getCmsPillars,
  getCmsSpeakers,
  getCmsStats,
  getCmsTestimonials,
  getCmsVideos,
} from "@/lib/cms";

export default async function Home() {
  const [page, stats, partners, testimonials, speakers, pillars, videos] =
    await Promise.all([
      getCmsPageHome(),
      getCmsStats(),
      getCmsPartners(),
      getCmsTestimonials(),
      getCmsSpeakers(),
      getCmsPillars(),
      getCmsVideos(),
    ]);

  return (
    <HomeClient
      page={page}
      stats={stats}
      partners={partners}
      testimonials={testimonials}
      speakers={speakers}
      pillars={pillars}
      videos={videos}
    />
  );
}
