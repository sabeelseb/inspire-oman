"use client";

import { createContext, useContext, type ReactNode } from "react";
import { siteConfig as fallbackSite } from "@/lib/data";

export type CmsSite = typeof fallbackSite;

const CmsContext = createContext<CmsSite>(fallbackSite);

export function CmsProvider({
  site,
  children,
}: {
  site: CmsSite;
  children: ReactNode;
}) {
  return <CmsContext.Provider value={site}>{children}</CmsContext.Provider>;
}

export function useCmsSite() {
  return useContext(CmsContext);
}
