"use client";

import { useEffect, useState } from "react";

/** True once the user has scrolled away from the initial first viewport. */
export function usePastFirstView(thresholdPx = 100) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const update = () => {
      setPast(window.scrollY > thresholdPx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [thresholdPx]);

  return past;
}
