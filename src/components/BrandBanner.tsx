"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function BrandBanner() {
  return (
    <section className="relative py-10">
      <div className="site-container">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl border border-gold/20 gold-glow">
            <Image
              src={siteConfig.images.banner}
              alt="Inspire Oman — Celebrating Success. Creating Legacy. Inspiring Investment."
              width={2501}
              height={626}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1200px) 100vw, 1152px"
              priority
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
