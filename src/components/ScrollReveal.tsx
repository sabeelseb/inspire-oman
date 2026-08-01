"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/useMobilePerf";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const base = directionMap[direction];
  // Mobile: same reveal experience, smaller travel + snappier timing (transform/opacity only)
  const offset = isMobile
    ? {
        x: base.x ? Math.sign(base.x) * 18 : 0,
        y: base.y ? Math.sign(base.y) * 18 : 0,
      }
    : base;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-48px" : "-80px" }}
      transition={{
        duration: isMobile ? Math.min(duration, 0.5) : duration,
        delay: isMobile ? delay * 0.55 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
