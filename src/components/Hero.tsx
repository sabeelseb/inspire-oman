"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import IslamicPattern from "./IslamicPattern";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Photo background */}
      <Image
        src={siteConfig.images.hero}
        alt="Muscat, Oman"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/75 to-primary" />
      <IslamicPattern opacity={0.05} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.05] blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
        >
          <CalendarDays size={16} />
          <span>{siteConfig.summitDate}</span>
          <span className="w-1 h-1 rounded-full bg-gold/60" />
          <MapPin size={14} />
          <span className="text-gold/80">Muscat</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
        >
          <span className="text-white">INSPIRE</span>{" "}
          <span className="gold-text animate-shimmer bg-[length:200%_auto]">OMAN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/70 mb-4 tracking-wide"
        >
          {siteConfig.slogan}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="text-base sm:text-lg text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Legacy Documentation &bull; Celebrating the Experience &bull; Inspire Oman Summit
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex items-center justify-center gap-2 text-white/40 text-sm mb-10"
        >
          <MapPin size={16} className="text-gold/60" />
          <span>{siteConfig.venue}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
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
        transition={{ delay: 1.5 }}
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
