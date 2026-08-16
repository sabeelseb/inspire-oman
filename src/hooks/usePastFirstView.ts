"use client";

import { useEffect, useState } from "react";

/**
 * True once the user has scrolled clearly past the first viewport.
 * Uses viewport-relative enter/exit bands so mobile browser chrome
 * (URL bar show/hide) does not flip the flag and glitch CTAs.
 */
export function usePastFirstView(_thresholdPx = 100) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const readY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const update = () => {
      frame = 0;
      const y = readY();
      // Relative to current visual height so soft keyboards / chrome resize
      // do not thrash around a fixed 100px line on mWeb.
      const vh = Math.max(
        window.innerHeight || 0,
        window.visualViewport?.height || 0,
      );
      const enterAt = Math.max(180, vh * 0.55);
      const exitAt = Math.max(80, vh * 0.3);

      setPast((wasPast) => {
        if (!wasPast && y > enterAt) return true;
        if (wasPast && y < exitAt) return false;
        return wasPast;
      });
    };

    const onScrollOrResize = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.visualViewport?.addEventListener("resize", onScrollOrResize);
    window.visualViewport?.addEventListener("scroll", onScrollOrResize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.visualViewport?.removeEventListener("resize", onScrollOrResize);
      window.visualViewport?.removeEventListener("scroll", onScrollOrResize);
    };
  }, []);

  return past;
}
