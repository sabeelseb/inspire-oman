"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export default function FormThankYou({
  open,
  title,
  paragraphs,
  onClose,
  ctaLabel = "Close",
}: {
  open: boolean;
  title: string;
  paragraphs: readonly string[];
  onClose: () => void;
  ctaLabel?: string;
}) {
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <button
            type="button"
            aria-label="Close thank you dialog"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-gold/20 bg-primary-dark shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-gold/15 to-transparent"
              aria-hidden
            />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="relative px-6 pb-7 pt-10 sm:px-8 sm:pb-8 sm:pt-12 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                <CheckCircle2 size={32} className="text-gold" strokeWidth={1.75} />
              </div>

              <h3
                id={titleId}
                className="mb-4 text-2xl font-bold text-white sm:text-[1.65rem] leading-snug"
              >
                {title}
              </h3>

              <div className="mx-auto mb-7 max-w-md space-y-3">
                {paragraphs.map((p) => (
                  <p key={p} className="text-sm sm:text-[0.95rem] leading-relaxed text-white/55">
                    {p}
                  </p>
                ))}
              </div>

              <button type="button" onClick={onClose} className="btn-primary min-w-[10rem]">
                {ctaLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
