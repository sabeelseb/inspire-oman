import type { LucideIcon } from "lucide-react";
import { Crown, Globe2, Newspaper } from "lucide-react";

export type SummitRegCategory = "vvip" | "vip" | "media";

export type SummitRegCategoryCopy = {
  label?: string | null;
  subtitle?: string | null;
  description?: string | null;
  badge?: string | null;
};

export type SummitRegCategoriesCms = {
  vvip?: SummitRegCategoryCopy | null;
  vip?: SummitRegCategoryCopy | null;
  media?: SummitRegCategoryCopy | null;
};

export type SummitRegCategoryOption = {
  id: SummitRegCategory;
  label: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  badge: string;
};

export const SUMMIT_REG_CATEGORIES: SummitRegCategoryOption[] = [
  {
    id: "vvip",
    label: "VVIP",
    subtitle: "Investors Inside Oman",
    description: "Exclusive access for investors and decision-makers based in Oman.",
    icon: Crown,
    badge: "Inside Oman",
  },
  {
    id: "vip",
    label: "VIP",
    subtitle: "Investors Outside Oman",
    description: "Premium access for international investors joining the summit.",
    icon: Globe2,
    badge: "Outside Oman",
  },
  {
    id: "media",
    label: "Media",
    subtitle: "Media Partners",
    description: "Accreditation for publishers, press, and media partners.",
    icon: Newspaper,
    badge: "Press Pass",
  },
];

export function resolveSummitRegCategories(
  cms?: SummitRegCategoriesCms | null,
): SummitRegCategoryOption[] {
  return SUMMIT_REG_CATEGORIES.map((item) => {
    const row = cms?.[item.id];
    return {
      ...item,
      label: row?.label?.trim() || item.label,
      subtitle: row?.subtitle?.trim() || item.subtitle,
      description: row?.description?.trim() || item.description,
      badge: row?.badge?.trim() || item.badge,
    };
  });
}

export function getSummitRegCategory(
  id: SummitRegCategory | null | undefined,
  cms?: SummitRegCategoriesCms | null,
) {
  return resolveSummitRegCategories(cms).find((item) => item.id === id) || null;
}

export function summitRegCategoryLabel(
  id: SummitRegCategory | null | undefined,
  cms?: SummitRegCategoriesCms | null,
) {
  const item = getSummitRegCategory(id, cms);
  if (!item) return "";
  return `${item.label} — ${item.subtitle}`;
}
