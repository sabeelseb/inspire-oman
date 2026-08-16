"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import {
  SUMMIT_REG_CATEGORIES,
  type SummitRegCategory,
  type SummitRegCategoryOption,
} from "@/lib/summit-registration";

export default function SummitRegCategoryPicker({
  value,
  onSelect,
  compact = false,
  categories = SUMMIT_REG_CATEGORIES,
}: {
  value?: SummitRegCategory | null;
  onSelect: (id: SummitRegCategory) => void;
  compact?: boolean;
  categories?: SummitRegCategoryOption[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={
        compact
          ? "grid grid-cols-1 gap-3"
          : "grid grid-cols-1 gap-4 sm:grid-cols-3"
      }
      role="listbox"
      aria-label="Registration category"
    >
      {categories.map((item, index) => {
        const Icon = item.icon;
        const selected = value === item.id;

        return (
          <motion.button
            key={item.id}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(item.id)}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: reduceMotion ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            className={`group relative overflow-hidden rounded-2xl border text-left transition-colors duration-300 ${
              selected
                ? "border-gold/55 bg-gradient-to-b from-gold/20 via-gold/10 to-white/[0.03] shadow-[0_0_40px_rgba(197,165,90,0.18)]"
                : "border-white/[0.08] bg-white/[0.03] hover:border-gold/35 hover:bg-gold/[0.06]"
            } ${compact ? "p-4" : "p-5 sm:p-6"}`}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gold/10 to-transparent opacity-80"
              aria-hidden
            />

            <div className="relative flex items-start justify-between gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                  selected
                    ? "border-gold/40 bg-gold/20 text-gold"
                    : "border-white/10 bg-white/[0.04] text-gold/70 group-hover:text-gold"
                }`}
              >
                <Icon size={compact ? 18 : 20} />
              </div>
              {selected ? (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-primary-dark">
                  <Check size={14} strokeWidth={3} />
                </span>
              ) : (
                <span className="rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/80">
                  {item.badge}
                </span>
              )}
            </div>

            <div className={`relative ${compact ? "mt-3" : "mt-4"}`}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/75">
                {item.label}
              </p>
              <h3
                className={`mt-1 font-bold text-white ${
                  compact ? "text-base" : "text-lg sm:text-xl"
                }`}
              >
                {item.subtitle}
              </h3>
              <p
                className={`mt-2 leading-relaxed text-white/45 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                {item.description}
              </p>
            </div>

            <div
              className={`relative mt-5 inline-flex items-center gap-1.5 rounded-lg bg-gold font-semibold text-primary-dark shadow-md shadow-gold/25 transition-colors group-hover:bg-gold-light ${
                compact ? "px-3.5 py-2 text-[11px]" : "px-4 py-2.5 text-xs"
              }`}
            >
              {selected ? "Selected" : "Continue"}
              <ArrowRight
                size={14}
                className={`transition-transform ${
                  selected ? "" : "group-hover:translate-x-0.5"
                }`}
              />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
