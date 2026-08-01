"use client";

import { useEffect, useState } from "react";

const MOBILE_MQ = "(max-width: 767px)";

/** Sync check for mount-once effects (splash, preload). */
export function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MQ).matches;
}

/** Reactive mobile flag for components that re-render on resize. */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_MQ);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}
