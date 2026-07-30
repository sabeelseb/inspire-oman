"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { stats, siteConfig } from "@/lib/data";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const steps = 36;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Compact stats + skyline banner — same density on mobile and desktop */
export default function StatsCounter() {
  return (
    <section className="relative z-10 py-6">
      <div className="site-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3.5 sm:px-4 sm:py-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-black gold-text leading-none mb-1">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-white/45 text-[11px] sm:text-xs font-medium leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gold/25">
          <Image
            src={siteConfig.images.banner}
            alt="Inspire Oman — Celebrating Success. Creating Legacy. Inspiring Investment."
            width={2501}
            height={626}
            className="w-full h-auto object-cover max-h-32 sm:max-h-36"
            sizes="(max-width: 768px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}
