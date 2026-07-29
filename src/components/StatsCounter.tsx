"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "@/lib/data";

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 40;
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

  // Fallback so numbers aren't stuck at 0 on mobile
  useEffect(() => {
    const t = window.setTimeout(() => setCount(value), 1800);
    return () => window.clearTimeout(t);
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-1">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass-card p-5 sm:p-8 text-center group hover:border-gold/30 transition-all duration-500"
          >
            <div className="text-2xl sm:text-4xl md:text-5xl font-black gold-text mb-2">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="text-white/50 text-xs sm:text-base font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
