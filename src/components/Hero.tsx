"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useCmsSite } from "@/components/CmsProvider";
import IslamicPattern from "./IslamicPattern";
import { usePageLoader } from "./AppShell";

export default function Hero() {
  const siteConfig = useCmsSite();
  const { markTopReady } = usePageLoader();

  useEffect(() => {
    const t = window.setTimeout(() => markTopReady("hero"), 3000);
    return () => window.clearTimeout(t);
  }, [markTopReady]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={siteConfig.images.hero}
        alt="Muscat, Oman"
        fill
        priority
        quality={75}
        className="object-cover object-center"
        sizes="100vw"
        onLoadingComplete={() => markTopReady("hero")}
        onError={() => markTopReady("hero")}
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/75 to-primary" />
      <IslamicPattern opacity={0.04} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[80px]" />

      <div className="relative z-10 site-container text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
          <CalendarDays size={16} />
          <span>{siteConfig.summitDate}</span>
          <span className="w-1 h-1 rounded-full bg-gold/60" />
          <MapPin size={14} />
          <span className="text-gold/80">Muscat</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
          <span className="text-white">Inspire</span>{" "}
          <span className="gold-text">Oman</span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-light text-white/70 mb-4 tracking-wide">
          {siteConfig.slogan}
        </p>

        <p className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
          Legacy Documentation &bull; Celebrating the Experience &bull; Inspire Oman Summit
        </p>

        <div className="flex items-center justify-center gap-2 text-white/40 text-sm mb-10">
          <MapPin size={16} className="text-gold/60" />
          <span>{siteConfig.venue}</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/summit" className="btn-primary text-base group">
            Register for Summit
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/partner" className="btn-outline text-base">
            Become a Partner
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-gold/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
