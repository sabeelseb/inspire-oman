"use client";

import { useEffect } from "react";
import Image from "next/image";
import { stats as fallbackStats } from "@/lib/data";
import { useCmsSite } from "@/components/CmsProvider";
import { usePageLoader } from "@/components/AppShell";

type Stat = { value: number; suffix: string; label: string };

export default function StatsCounter({
  stats = fallbackStats,
  bannerSrc,
}: {
  stats?: Stat[];
  bannerSrc?: string | null;
}) {
  const siteConfig = useCmsSite();
  const { markTopReady } = usePageLoader();
  const banner = bannerSrc || siteConfig.images.banner;

  useEffect(() => {
    // Banner is below-fold; don't hold splash long waiting for it
    const t = window.setTimeout(() => markTopReady("banner"), 1800);
    return () => window.clearTimeout(t);
  }, [markTopReady]);

  return (
    <section className="relative z-10 py-6">
      <div className="site-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3.5 sm:px-4 sm:py-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-black gold-text leading-none mb-1 tabular-nums">
                {stat.value.toLocaleString()}
                {stat.suffix}
              </div>
              <p className="text-white/45 text-[11px] sm:text-xs font-medium leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gold/25">
          <Image
            src={banner}
            alt="Inspire Oman - Celebrating Success. Creating Legacy. Inspiring Investment."
            width={1280}
            height={320}
            quality={65}
            className="w-full h-auto object-cover max-h-32 sm:max-h-36"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 75vw"
            onLoadingComplete={() => markTopReady("banner")}
            onError={() => markTopReady("banner")}
          />
        </div>
      </div>
    </section>
  );
}
