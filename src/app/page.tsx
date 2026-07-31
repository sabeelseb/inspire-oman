import HomeClient from "./HomeClient";
import {
  getCmsPartners,
  getCmsSpeakers,
  getCmsStats,
  getCmsTestimonials,
} from "@/lib/cms";

export default async function Home() {
  const [stats, partners, testimonials, speakers] = await Promise.all([
    getCmsStats(),
    getCmsPartners(),
    getCmsTestimonials(),
    getCmsSpeakers(),
  ]);

  return (
    <HomeClient
      stats={stats}
      partners={partners}
      testimonials={testimonials}
      speakers={speakers}
    />
  );
}
