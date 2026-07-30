"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import LogoImage from "./LogoImage";

type LoaderContextValue = {
  markFirstSectionReady: () => void;
  isReady: boolean;
};

const LoaderContext = createContext<LoaderContextValue>({
  markFirstSectionReady: () => {},
  isReady: true,
});

export function usePageLoader() {
  return useContext(LoaderContext);
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [sectionReady, setSectionReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const isReady = sectionReady && minTimeDone;

  const markFirstSectionReady = useCallback(() => {
    setSectionReady(true);
  }, []);

  useEffect(() => {
    const minTimer = window.setTimeout(() => setMinTimeDone(true), 900);
    const failSafe = window.setTimeout(() => setSectionReady(true), 3500);

    // Warm logo + hero so first paint is smooth
    void Promise.all([
      preloadImage(siteConfig.images.logo),
      preloadImage(siteConfig.images.hero),
    ]).then(() => {
      // If Hero hasn't reported yet, allow ready soon after assets are warm
      window.setTimeout(() => setSectionReady(true), 200);
    });

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(failSafe);
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const hide = window.setTimeout(() => setShowLoader(false), 650);
    return () => window.clearTimeout(hide);
  }, [isReady]);

  // Soft-lock scroll only while splash is visible
  useEffect(() => {
    if (!showLoader) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [showLoader]);

  const value = useMemo(
    () => ({ markFirstSectionReady, isReady }),
    [markFirstSectionReady, isReady]
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
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden={isReady}
            aria-busy={!isReady}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
              <p className="text-xs tracking-[0.25em] text-gold/70">
                Inspire Oman
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Do NOT wrap children in Framer Motion — transforms on an ancestor break
        position:fixed on the Navbar (nav appears mid-page while scrolling).
        Splash overlay covers content until ready; fade with CSS opacity only.
      */}
      <div
        className={`transition-opacity duration-500 ease-out ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </LoaderContext.Provider>
  );
}
