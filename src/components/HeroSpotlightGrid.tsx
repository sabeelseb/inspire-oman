"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ImageIcon, Play, Video, X } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { youtubeThumbnailUrl } from "@/lib/youtube";

export type HeroSpotlightCopy = {
  card1Keynote?: string | null;
  card1Title?: string | null;
  card1Description?: string | null;
  card1Image?: string | null;
  card1Href?: string | null;
  card2Keynote?: string | null;
  card2Title?: string | null;
  card2Description?: string | null;
  card2Image?: string | null;
  card2Href?: string | null;
  videoKeynote?: string | null;
  videoTitle?: string | null;
  videoDescription?: string | null;
  videoHref?: string | null;
  videoPoster?: string | null;
  videoViewMoreLabel?: string | null;
  videoViewMoreHref?: string | null;
};

const DEFAULTS = {
  card1Keynote: "Keynote",
  card1Title: "Legacy Documentation",
  card1Description:
    "Documenting Oman's success stories and institutional memory for Vision 2040.",
  card1Href: "/pillars",
  card2Keynote: "Keynote",
  card2Title: "Digital Video Campaign",
  card2Description:
    "A cinematic campaign amplifying Omani brands and leaders across digital platforms.",
  card2Href: "/media",
  videoKeynote: "Chairman Video",
  videoTitle: "Official Launch of Inspire Oman | Muscat Highlights",
  videoDescription:
    "Watch the official launch highlights from Muscat and the vision behind Inspire Oman.",
  videoHref: "https://youtu.be/j0DS8GX9ht4",
  videoPoster: "/images/gallery/handshake.jpg",
  videoViewMoreLabel: "View More",
  videoViewMoreHref: "/media",
};

function normalizeHref(value?: string | null) {
  const href = (value || "").trim();
  if (!href) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(href)) return href;
  return `https://${href}`;
}

function toEmbedUrl(raw?: string | null) {
  const href = normalizeHref(raw);
  if (!href) return "";

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : href;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname.startsWith("/embed/")) {
        return href.includes("autoplay=1")
          ? href
          : `${href}${href.includes("?") ? "&" : "?"}autoplay=1&rel=0`;
      }
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : href;
    }
  } catch {
    return href;
  }

  return href;
}

function youtubeThumb(raw?: string | null) {
  return youtubeThumbnailUrl(raw);
}

function FeatureCard({
  icon: Icon,
  keynote,
  title,
  description,
  image,
  href,
  delay = 0,
}: {
  icon: typeof BookOpen;
  keynote: string;
  title: string;
  description: string;
  image?: string | null;
  href?: string | null;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const link = normalizeHref(href);
  const portrait = (image || "").trim();
  const remotePortrait = /^https?:\/\//i.test(portrait);

  const body = (
    <>
      <div className="relative flex min-h-0 flex-1 items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <Icon size={20} />
          </div>
          <p className="io-keynote mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80">
            {keynote}
          </p>
          <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">{title}</h3>
          <p className="text-sm leading-relaxed text-white/50 sm:text-[15px]">
            {description}
          </p>
          {link ? (
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold/85 transition-colors group-hover:text-gold">
              Learn more
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          ) : null}
        </div>
        {portrait ? (
          <div className="relative h-[7.25rem] w-[5.35rem] shrink-0 overflow-hidden rounded-xl border border-gold/25 bg-white/[0.04] sm:h-[8.25rem] sm:w-[6.1rem]">
            {remotePortrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={portrait}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={portrait}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="100px"
              />
            )}
          </div>
        ) : (
          <div
            className="relative flex h-[7.25rem] w-[5.35rem] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gold/30 bg-white/[0.03] text-gold/45 sm:h-[8.25rem] sm:w-[6.1rem]"
            aria-hidden
          >
            <ImageIcon size={22} strokeWidth={1.5} />
          </div>
        )}
      </div>
    </>
  );

  const className = `group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/20 bg-white/[0.03] p-5 sm:p-6 ${
    link ? "cursor-pointer transition-colors hover:border-gold/40 hover:bg-gold/[0.05]" : ""
  }`;

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
    whileHover: reduceMotion ? undefined : { y: -3 },
    className,
  };

  if (link) {
    const external = /^https?:\/\//i.test(link);
    return (
      <motion.div {...motionProps}>
        <Link
          href={link}
          className="absolute inset-0 z-10"
          aria-label={`${title} - open link`}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        />
        <div className="relative z-0 flex h-full flex-col">{body}</div>
      </motion.div>
    );
  }

  return <motion.article {...motionProps}>{body}</motion.article>;
}

export default function HeroSpotlightGrid({
  copy,
  fallbackVideo,
}: {
  copy?: HeroSpotlightCopy | null;
  fallbackVideo?: {
    title?: string;
    href?: string;
    image?: string;
  } | null;
}) {
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const card1 = {
    keynote: copy?.card1Keynote?.trim() || DEFAULTS.card1Keynote,
    title: copy?.card1Title?.trim() || DEFAULTS.card1Title,
    description: copy?.card1Description?.trim() || DEFAULTS.card1Description,
    image: copy?.card1Image?.trim() || "",
    href: copy?.card1Href?.trim() || DEFAULTS.card1Href,
  };
  const card2 = {
    keynote: copy?.card2Keynote?.trim() || DEFAULTS.card2Keynote,
    title: copy?.card2Title?.trim() || DEFAULTS.card2Title,
    description: copy?.card2Description?.trim() || DEFAULTS.card2Description,
    image: copy?.card2Image?.trim() || "",
    href: copy?.card2Href?.trim() || DEFAULTS.card2Href,
  };

  const videoHref =
    copy?.videoHref?.trim() ||
    fallbackVideo?.href?.trim() ||
    DEFAULTS.videoHref;
  const videoTitle =
    copy?.videoTitle?.trim() ||
    fallbackVideo?.title?.trim() ||
    DEFAULTS.videoTitle;
  const videoPoster =
    copy?.videoPoster?.trim() ||
    fallbackVideo?.image?.trim() ||
    youtubeThumb(videoHref) ||
    DEFAULTS.videoPoster;
  const videoKeynote = copy?.videoKeynote?.trim() || DEFAULTS.videoKeynote;
  const videoDescription =
    copy?.videoDescription?.trim() || DEFAULTS.videoDescription;
  const viewMoreLabel =
    copy?.videoViewMoreLabel?.trim() || DEFAULTS.videoViewMoreLabel;
  const viewMoreHref =
    copy?.videoViewMoreHref?.trim() || DEFAULTS.videoViewMoreHref;

  const embedUrl = useMemo(() => toEmbedUrl(videoHref), [videoHref]);
  const remotePoster = /^https?:\/\//i.test(videoPoster);

  return (
    <section className="relative z-10 w-full -mt-2 pb-10 sm:pb-14 lg:pb-16">
      <div className="site-container">
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-5">
            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <FeatureCard
                icon={BookOpen}
                keynote={card1.keynote}
                title={card1.title}
                description={card1.description}
                image={card1.image}
                href={card1.href}
                delay={0.05}
              />
              <FeatureCard
                icon={Video}
                keynote={card2.keynote}
                title={card2.title}
                description={card2.description}
                image={card2.image}
                href={card2.href}
                delay={0.12}
              />
            </div>

            <motion.article
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-gold/25 bg-white/[0.03] sm:min-h-[26rem] lg:min-h-full"
            >
              <div className="relative min-h-[16rem] flex-1 overflow-hidden sm:min-h-[18rem]">
                {playing && embedUrl ? (
                  <iframe
                    title={videoTitle}
                    src={embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {remotePoster ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={videoPoster}
                        alt={videoTitle}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={videoPoster}
                        alt={videoTitle}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/45 to-primary/20" />
                    <motion.button
                      type="button"
                      aria-label={`Play ${videoTitle}`}
                      onClick={() => {
                        if (embedUrl) setPlaying(true);
                        else setLightbox(true);
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    >
                      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold text-primary-dark shadow-[0_0_40px_rgba(197,165,90,0.35)] sm:h-[4.5rem] sm:w-[4.5rem]">
                        <motion.span
                          className="absolute inset-0 rounded-full border border-gold/50"
                          animate={
                            reduceMotion
                              ? undefined
                              : { scale: [1, 1.35], opacity: [0.55, 0] }
                          }
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                          aria-hidden
                        />
                        <Play size={28} className="ml-0.5 fill-current" />
                      </span>
                    </motion.button>
                  </>
                )}
              </div>

              <div className="relative z-10 flex flex-col gap-3 border-t border-white/5 bg-primary/90 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                <div className="min-w-0">
                  <p className="io-keynote mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/80">
                    {videoKeynote}
                  </p>
                  <h3 className="text-lg font-bold text-white sm:text-xl">{videoTitle}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                    {videoDescription}
                  </p>
                </div>
                <Link
                  href={viewMoreHref}
                  className="btn-outline inline-flex shrink-0 items-center self-start px-4 py-2 text-xs sm:self-auto sm:text-sm"
                >
                  {viewMoreLabel}
                  <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </div>
            </motion.article>
          </div>
        </ScrollReveal>
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {lightbox ? (
                <motion.div
                  className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    type="button"
                    aria-label="Close video"
                    className="absolute inset-0"
                    onClick={() => setLightbox(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="relative z-10 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-gold/20 bg-primary"
                  >
                    <button
                      type="button"
                      onClick={() => setLightbox(false)}
                      className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                    {embedUrl ? (
                      <iframe
                        title={videoTitle}
                        src={embedUrl}
                        className="h-full w-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    ) : null}
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
