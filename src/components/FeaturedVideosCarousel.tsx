"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import TitleHighlight from "@/components/TitleHighlight";

export type FeaturedVideo = {
  title: string;
  description?: string;
  tag?: string;
  image: string;
  href?: string;
  playMode?: "redirect" | "iframe";
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
      if (url.pathname.startsWith("/embed/")) {
        return href.includes("autoplay=1")
          ? href
          : `${href}${href.includes("?") ? "&" : "?"}autoplay=1`;
      }
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

function Thumb({
  video,
  className = "",
}: {
  video: FeaturedVideo;
  className?: string;
}) {
  if (isRemoteSrc(video.image)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={video.image}
        alt={video.title}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={video.image}
      alt={video.title}
      fill
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 90vw, 720px"
    />
  );
}

export default function FeaturedVideosCarousel({
  videos,
  eyebrow,
  title,
  titleHighlight,
  subtitle,
}: {
  videos: FeaturedVideo[];
  eyebrow?: string | null;
  title?: string | null;
  titleHighlight?: string | null;
  subtitle?: string | null;
}) {
  const items = useMemo(
    () => videos.filter((v) => Boolean(v?.image)),
    [videos]
  );
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState<FeaturedVideo | null>(null);

  useEffect(() => {
    if (count < 2 || paused || activeVideo) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 3000);
    return () => window.clearInterval(id);
  }, [count, paused, activeVideo]);

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

  if (!count) return null;

  const go = (delta: number) => {
    setIndex((current) => (current + delta + count) % count);
  };

  const openVideo = (video: FeaturedVideo) => {
    const href = normalizeHref(video.href);
    if (!href) return;
    if (video.playMode === "iframe") {
      setActiveVideo(video);
      return;
    }
    window.location.assign(href);
  };

  const slideAt = (offset: number) => items[(index + offset + count) % count];

  return (
    <section className="relative section-padding overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,162,39,0.08),_transparent_60%)]" />

      <div className="relative site-container">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="io-keynote text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            {eyebrow || "Featured Videos"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            <TitleHighlight
              title={title || "Watch the"}
              highlight={titleHighlight || "Story"}
            />
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-white/50">{subtitle}</p>
          ) : null}
        </ScrollReveal>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <button
            type="button"
            aria-label="Previous video"
            onClick={() => go(-1)}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:text-white sm:left-2 md:left-0"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Next video"
            onClick={() => go(1)}
            className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-white/80 transition hover:text-white sm:right-2 md:right-0"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>

          <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 sm:gap-5 md:gap-6 px-10 sm:px-14">
            <AnimatePresence mode="popLayout" initial={false}>
              {([-1, 0, 1] as const).map((offset) => {
                const video = slideAt(offset);
                const isCenter = offset === 0;
                const clickable = Boolean(normalizeHref(video.href));

                return (
                  <motion.button
                    key={`${video.title}-${offset}-${index}`}
                    type="button"
                    layout
                    initial={{ opacity: 0, scale: isCenter ? 0.96 : 0.84 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.45,
                      scale: isCenter ? 1 : 0.88,
                      y: isCenter ? 0 : 8,
                      transition: {
                        duration: 0.6,
                        // ease-in for fade in
                        ease: [0.42, 0, 1, 1],
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: isCenter ? 0.96 : 0.84,
                      transition: {
                        duration: 0.5,
                        // ease-out for fade out
                        ease: [0, 0, 0.58, 1],
                      },
                    }}
                    transition={{
                      layout: {
                        duration: 0.55,
                        ease: [0.42, 0, 0.58, 1],
                      },
                    }}
                    onClick={() => openVideo(video)}
                    disabled={!clickable}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] disabled:cursor-default ${
                      isCenter
                        ? "z-10 w-[86%] sm:w-[68%] md:w-[58%]"
                        : "hidden w-[28%] sm:block sm:w-[30%] md:w-[28%]"
                    }`}
                  >
                    <div className="relative aspect-video w-full bg-black/60">
                      <Thumb
                        video={video}
                        className="transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`flex items-center justify-center rounded-full bg-white/85 text-primary shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-white ${
                            isCenter ? "h-16 w-16" : "h-12 w-12"
                          }`}
                        >
                          <Play
                            size={isCenter ? 28 : 20}
                            className="ml-0.5 fill-current"
                          />
                        </span>
                      </div>
                      {isCenter ? (
                        <motion.div
                          key={`caption-${video.title}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, ease: [0.42, 0, 1, 1] },
                          }}
                          exit={{
                            opacity: 0,
                            y: -8,
                            transition: { duration: 0.4, ease: [0, 0, 0.58, 1] },
                          }}
                          className="absolute inset-x-0 bottom-0 p-4 sm:p-5"
                        >
                          {video.tag ? (
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
                              {video.tag}
                            </p>
                          ) : null}
                          <p className="line-clamp-2 text-sm font-semibold text-white sm:text-base">
                            {video.title}
                          </p>
                        </motion.div>
                      ) : null}
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {items.map((video, i) => (
              <button
                key={`${video.title}-dot-${i}`}
                type="button"
                aria-label={`Go to ${video.title}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-7 bg-gold" : "w-1.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {activeVideo && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                onClick={() => setActiveVideo(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-primary-dark shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="Close video"
                    onClick={() => setActiveVideo(null)}
                    className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                  >
                    <X size={18} />
                  </button>
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={toEmbedUrl(activeVideo.href)}
                      title={activeVideo.title}
                      className="h-full w-full"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>,
            document.body
          )
        : null}
    </section>
  );
}
