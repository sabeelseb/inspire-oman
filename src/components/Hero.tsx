"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { useCmsSite } from "@/components/CmsProvider";
import IslamicPattern from "./IslamicPattern";
import { usePageLoader } from "./AppShell";

export default function Hero() {
  const siteConfig = useCmsSite();
  const { markFirstSectionReady } = usePageLoader();

  useEffect(() => {
    // Failsafe only - do not hold the page for a long artificial delay
    const t = window.setTimeout(() => markFirstSectionReady(), 1200);
    return () => window.clearTimeout(t);
  }, [markFirstSectionReady]);

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
        onLoadingComplete={() => markFirstSectionReady()}
        onError={() => markFirstSectionReady()}
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/75 to-primary" />
      <IslamicPattern opacity={0.04} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[80px] will-change-transform" />

      <div className="relative z-10 site-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
        >
          <CalendarDays size={16} />
          <span>{siteConfig.summitDate}</span>
          <span className="w-1 h-1 rounded-full bg-gold/60" />
          <MapPin size={14} />
          <span className="text-gold/80">Muscat</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
        >
          <span className="text-white">Inspire</span>{" "}
          <span className="gold-text">Oman</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/70 mb-4 tracking-wide"
        >
          {siteConfig.slogan}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Legacy Documentation &bull; Celebrating the Experience &bull; Inspire Oman Summit
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.34 }}
          className="flex items-center justify-center gap-2 text-white/40 text-sm mb-10"
        >
          <MapPin size={16} className="text-gold/60" />
          <span>{siteConfig.venue}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/summit" className="btn-primary text-base group">
            Register for Summit
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/partner" className="btn-outline text-base">
            Become a Partner
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-2.5 rounded-full bg-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
