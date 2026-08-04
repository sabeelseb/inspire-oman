"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCmsSite } from "@/components/CmsProvider";
import LogoImage from "./LogoImage";
import { getIsMobile } from "@/hooks/useMobilePerf";

type LoaderContextValue = {
  markTopReady: (key: string) => void;
  isReady: boolean;
};

const LoaderContext = createContext<LoaderContextValue>({
  markTopReady: () => {},
  isReady: true,
});

export function usePageLoader() {
  return useContext(LoaderContext);
}

export function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(() => resolve()).catch(() => resolve());
      } else {
        resolve();
      }
    };
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function AppShell({ children }: { children: ReactNode }) {
  const siteConfig = useCmsSite();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  /** Home + About share the full splash / first-paint experience. */
  const isSplashPage = isHome || isAbout;
  const reduceMotion = useReducedMotion();
  const booted = useRef(false);
  const readyKeys = useRef(new Set<string>());
  const mobileRef = useRef(false);
  const [sectionReady, setSectionReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const isReady = sectionReady && minTimeDone;

  const checkReady = useCallback(
    (keys: Set<string>) => {
      // Mobile: don't block splash on below-fold banner
      if (isHome) {
        if (mobileRef.current) return keys.has("hero") && keys.has("pack");
        return keys.has("hero") && keys.has("banner") && keys.has("pack");
      }
      if (isAbout) {
        return keys.has("about-hero") && keys.has("pack");
      }
      return keys.has("pack");
    },
    [isHome, isAbout]
  );

  const markTopReady = useCallback(
    (key: string) => {
      readyKeys.current.add(key);
      if (checkReady(readyKeys.current)) {
        setSectionReady(true);
      }
    },
    [checkReady]
  );

  // First paint only - never re-flash splash on client navigations (mWeb glitch)
  useEffect(() => {
    if (booted.current) {
      setShowLoader(false);
      setSectionReady(true);
      setMinTimeDone(true);
      return;
    }
    booted.current = true;
    const mobile = getIsMobile();
    mobileRef.current = mobile;

    const minMs = mobile ? (isSplashPage ? 280 : 160) : isSplashPage ? 800 : 400;
    const failMs = mobile ? (isSplashPage ? 2200 : 1200) : isSplashPage ? 5000 : 2000;
    const minTimer = window.setTimeout(() => setMinTimeDone(true), minMs);
    const failSafe = window.setTimeout(() => setSectionReady(true), failMs);

    void (async () => {
      // Always warm the logo (splash + nav). Skip raw hero/banner preloads —
      // next/image already fetches optimized sizes and marks hero/banner ready.
      await preloadImage(siteConfig.images.logo);
      if (!mobile) {
        await Promise.all([
          preloadImage("/images/logos/OCC-logo.svg"),
          preloadImage("/images/logos/GM-logo.png"),
          preloadImage("/images/logos/MF-logo.svg"),
        ]);
      }
      markTopReady("pack");
    })();

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(failSafe);
    };
    // Intentionally once on mount - navigation must not restart splash
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const fadeMs = mobileRef.current || reduceMotion ? 220 : 650;
    const hide = window.setTimeout(() => setShowLoader(false), fadeMs);
    return () => window.clearTimeout(hide);
  }, [isReady, reduceMotion]);

  useEffect(() => {
    if (!showLoader) return;
    const html = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody || "";
      html.style.overflow = prevHtml || "";
    };
  }, [showLoader]);

  const value = useMemo(
    () => ({ markTopReady, isReady }),
    [markTopReady, isReady]
  );

  const fadeDuration = mobileRef.current || reduceMotion ? 0.22 : 0.55;
  const contentFade = mobileRef.current || reduceMotion ? 0.28 : 0.65;

  return (
    <LoaderContext.Provider value={value}>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="page-loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
            initial={{ opacity: 1 }}
            animate={{ opacity: isReady ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDuration, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: isReady ? "none" : "auto" }}
            aria-hidden={isReady}
            aria-busy={!isReady}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: mobileRef.current ? 0.25 : 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-6 px-6"
            >
              <div className="h-28 w-28 sm:h-36 sm:w-36">
                <LogoImage
                  src={siteConfig.images.logo}
                  alt="Inspire Oman"
                  className="h-full w-full"
                  priority
                />
              </div>
              <div className="h-0.5 w-24 overflow-hidden rounded-full bg-gold/20">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-gold/70">
                Inspire Oman
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady || !showLoader ? 1 : 0 }}
        transition={{
          duration: contentFade,
          ease: [0.22, 1, 0.36, 1],
          delay: isReady && !mobileRef.current && !reduceMotion ? 0.08 : 0,
        }}
      >
        {children}
      </motion.div>
    </LoaderContext.Provider>
  );
}
