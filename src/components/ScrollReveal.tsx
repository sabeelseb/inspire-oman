"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const directionMap = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.55,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);
  const offset = directionMap[direction];

  // Mobile Safari can miss IntersectionObserver — never leave content invisible
  useEffect(() => {
    const t = window.setTimeout(() => setForceVisible(true), 1200 + delay * 1000);
    return () => window.clearTimeout(t);
  }, [delay]);

  if (reduceMotion || forceVisible) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      onAnimationComplete={() => setForceVisible(true)}
    >
      {children}
    </motion.div>
  );
}
