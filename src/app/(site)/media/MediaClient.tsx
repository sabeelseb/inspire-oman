"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play, ExternalLink, Calendar, X } from "lucide-react";
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
  href?: string;
  playMode?: "redirect" | "iframe";
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
  href?: string;
  image?: string;
};

function isRemoteSrc(src: string) {
  return /^https?:\/\//i.test(src);
}

function normalizeHref(value?: string) {
  const href = (value || "").trim();
  if (!href) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(href)) return href;
  return `https://${href}`;
}

function toEmbedUrl(raw?: string) {
  const href = normalizeHref(raw);
  if (!href) return "";

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : href;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) return href.includes("autoplay=1") ? href : `${href}${href.includes("?") ? "&" : "?"}autoplay=1`;
      if (url.pathname.startsWith("/shorts/")) {
        const id = url.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : href;
      }
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : href;
    }

    if (host === "vimeo.com") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : href;
    }

    if (host === "player.vimeo.com") return href;
  } catch {
    return href;
  }

  return href;
}

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
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (!activeVideo) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeVideo]);

  const openVideo = (video: Video) => {
    const href = normalizeHref(video.href);
    if (!href) return;
    if (video.playMode === "iframe") {
      setActiveVideo(video);
      return;
    }
    window.location.assign(href);
  };

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
            {videos.map((video, i) => {
              const clickable = Boolean(normalizeHref(video.href));
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.button
                    type="button"
                    whileHover={{ y: -4 }}
                    onClick={() => openVideo(video)}
                    disabled={!clickable}
                    className="glass-card-hover overflow-hidden group w-full text-left disabled:cursor-default"
                  >
                    <div className="relative aspect-video">
                      {isRemoteSrc(video.image) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={video.image}
                          alt={video.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={video.image}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-primary/50 opacity-100 transition-opacity duration-300 group-hover:opacity-0" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border border-gold/40 bg-gold/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:shadow-[0_0_28px_rgba(201,162,39,0.55)]">
                          <Play size={28} className="text-gold ml-1 transition-colors duration-300 group-hover:text-primary" fill="currentColor" />
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
                  </motion.button>
                </ScrollReveal>
              );
            })}
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
                    <div className="absolute inset-0 hidden bg-primary/40 opacity-0 transition-opacity lg:flex lg:items-end lg:p-4 lg:group-hover:opacity-100">
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
            {press.map((pr, i) => {
              const href = normalizeHref(pr.href);
              const cardClass =
                "glass-card-hover p-4 sm:p-5 flex items-center gap-4 sm:gap-5 text-left";
              const inner = (
                <>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-gold/10">
                    {pr.image ? (
                      isRemoteSrc(pr.image) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={pr.image}
                          alt={pr.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={pr.image}
                          alt={pr.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      )
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Calendar size={22} className="text-gold" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gold/70 text-xs uppercase tracking-wider mb-1">{pr.date}</p>
                    <h3 className="text-white font-semibold mb-1 leading-snug">{pr.title}</h3>
                    <p className="text-white/40 text-sm line-clamp-2">{pr.excerpt}</p>
                  </div>
                  <ExternalLink size={16} className="text-gold/40 shrink-0 hidden sm:block" />
                </>
              );

              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  {href ? (
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className={`${cardClass} block`}
                    >
                      {inner}
                    </motion.a>
                  ) : (
                    <motion.div whileHover={{ x: 4 }} className={cardClass}>
                      {inner}
                    </motion.div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {typeof document !== "undefined" &&
        activeVideo &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8">
            <button
              type="button"
              aria-label="Close video"
              className="absolute inset-0 bg-black/80"
              onClick={() => setActiveVideo(null)}
            />
            <div className="relative z-10 w-full max-w-4xl">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-white font-semibold truncate">{activeVideo.title}</p>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="rounded-full border border-white/20 p-2 text-white hover:bg-white/10"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
                <iframe
                  src={toEmbedUrl(activeVideo.href)}
                  title={activeVideo.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
