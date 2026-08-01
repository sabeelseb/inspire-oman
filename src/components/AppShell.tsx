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
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCmsSite } from "@/components/CmsProvider";
import LogoImage from "./LogoImage";

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

const HOME_TOP_KEYS = ["hero", "banner", "pack"] as const;

export default function AppShell({ children }: { children: ReactNode }) {
  const siteConfig = useCmsSite();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const booted = useRef(false);
  const readyKeys = useRef(new Set<string>());
  const [sectionReady, setSectionReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const isReady = sectionReady && minTimeDone;

  const checkReady = useCallback(
    (keys: Set<string>) => {
      if (isHome) return HOME_TOP_KEYS.every((k) => keys.has(k));
      return keys.has("pack");
    },
    [isHome]
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

    const minTimer = window.setTimeout(() => setMinTimeDone(true), isHome ? 800 : 400);
    const failSafe = window.setTimeout(() => setSectionReady(true), isHome ? 5000 : 2000);

    void (async () => {
      await Promise.all([
        preloadImage(siteConfig.images.logo),
        preloadImage(siteConfig.images.hero),
        preloadImage(siteConfig.images.banner),
        preloadImage("/images/logos/OCC-logo.svg"),
        preloadImage("/images/logos/GM-logo.png"),
        preloadImage("/images/logos/MF-logo.svg"),
      ]);
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
    const hide = window.setTimeout(() => setShowLoader(false), 180);
    return () => window.clearTimeout(hide);
  }, [isReady]);

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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: isReady ? "none" : "auto" }}
            aria-hidden={isReady}
            aria-busy={!isReady}
          >
            <div className="flex flex-col items-center gap-6 px-6">
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
              <p className="text-xs tracking-[0.25em] text-gold/70">Inspire Oman</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>{children}</div>
    </LoaderContext.Provider>
  );
}
