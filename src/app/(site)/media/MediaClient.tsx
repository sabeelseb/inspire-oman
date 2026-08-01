"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, ExternalLink, Calendar } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import IslamicPattern from "@/components/IslamicPattern";
import TitleHighlight from "@/components/TitleHighlight";
import { useCmsSite } from "@/components/CmsProvider";

type PageData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
};

type Video = {
  title: string;
  description: string;
  tag: string;
  image: string;
};

type GalleryItem = {
  title: string;
  caption: string;
  src: string;
};

type PressItem = {
  title: string;
  date: string;
  excerpt: string;
};

export default function MediaClient({
  page,
  videos,
  gallery,
  press,
}: {
  page: PageData | null;
  videos: Video[];
  gallery: GalleryItem[];
  press: PressItem[];
}) {
  const siteConfig = useCmsSite();
  const title = page?.title || "Media Gallery";
  const highlight = page?.highlight || "Gallery";

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <Image
          src={siteConfig.images.hero}
          alt="Inspire Oman media"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-primary/85" />
        <IslamicPattern opacity={0.05} />

        <div className="relative site-container text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-sm font-semibold uppercase tracking-widest mb-4"
          >
            {page?.eyebrow || "Stories & Media"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            <TitleHighlight title={title} highlight={highlight} />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            {page?.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Video</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Featured <span className="gold-text">Videos</span>
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {videos.map((video, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} className="glass-card-hover overflow-hidden group">
                  <div className="relative aspect-video">
                    <Image
                      src={video.image}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-primary/50 group-hover:bg-primary/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                        <Play size={28} className="text-gold ml-1" />
                      </div>
                    </div>
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 text-gold text-xs font-semibold">
                      {video.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                    <p className="text-white/50 text-sm">{video.description}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary-light relative">
        <IslamicPattern opacity={0.03} />
        <div className="relative site-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Gallery</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Photo <span className="gold-text">Gallery</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} className="glass-card-hover overflow-hidden group">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <div>
                        <h4 className="text-white font-medium text-sm">{item.title}</h4>
                        <p className="text-white/60 text-xs mt-1">{item.caption}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 lg:hidden">
                    <h4 className="text-white font-medium text-sm">{item.title}</h4>
                    <p className="text-white/40 text-xs mt-1">{item.caption}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="site-container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">Press</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Latest <span className="gold-text">News</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-4">
            {press.map((pr, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="glass-card-hover p-6 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Calendar size={20} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gold/60 text-xs uppercase tracking-wider mb-1">{pr.date}</p>
                    <h3 className="text-white font-semibold mb-1">{pr.title}</h3>
                    <p className="text-white/40 text-sm">{pr.excerpt}</p>
                  </div>
                  <ExternalLink size={16} className="text-gold/30 shrink-0 mt-1" />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
