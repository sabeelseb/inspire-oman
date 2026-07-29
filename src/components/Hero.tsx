"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import IslamicPattern from "./IslamicPattern";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,120vw)] h-[min(800px,120vw)] rounded-full bg-gold/[0.05] blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6"
        >
          <CalendarDays size={16} />
          <span>{siteConfig.summitDate}</span>
          <span className="w-1 h-1 rounded-full bg-gold/60" />
          <MapPin size={14} />
          <span className="text-gold/80">Muscat</span>
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.1 }}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-5"
        >
          <span className="text-white">INSPIRE</span>{" "}
          <span className="gold-text">OMAN</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.15 }}
          className="text-lg sm:text-2xl md:text-3xl font-light text-white/70 mb-3 tracking-wide text-balance"
        >
          {siteConfig.slogan}
        </motion.p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.2 }}
          className="text-sm sm:text-lg text-white/40 max-w-2xl mx-auto mb-6 leading-relaxed"
        >
          Legacy Documentation &bull; Celebrating the Experience &bull; Inspire Oman Summit
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.25 }}
          className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8"
        >
          <MapPin size={16} className="text-gold/60 shrink-0" />
          <span>{siteConfig.venue}</span>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href="/summit" className="btn-primary text-base group w-full sm:w-auto">
            Register for Summit
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/partner" className="btn-outline text-base w-full sm:w-auto">
            Become a Partner
          </Link>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent" />

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-gold/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
