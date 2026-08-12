import type { CSSProperties } from "react";

export type TypographyRole = {
  fontSize?: string | null;
  color?: string | null;
  style?: string | null;
};

export type SiteTypography = {
  body?: TypographyRole;
  heading?: TypographyRole;
  subheading?: TypographyRole;
  paragraph?: TypographyRole;
};

/** Named size tokens → CSS font-size (empty / default → no override). */
const FONT_SIZE_MAP: Record<string, string> = {
  default: "",
  sm: "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)",
  md: "clamp(1rem, 0.9rem + 0.45vw, 1.25rem)",
  lg: "clamp(1.125rem, 1rem + 0.7vw, 1.5rem)",
  xl: "clamp(1.35rem, 1.1rem + 1.1vw, 2rem)",
  "2xl": "clamp(1.75rem, 1.3rem + 1.8vw, 2.75rem)",
  "3xl": "clamp(2.1rem, 1.4rem + 2.6vw, 3.5rem)",
  "4xl": "clamp(2.4rem, 1.45rem + 3.5vw, 4.25rem)",
  "5xl": "clamp(2.75rem, 1.6rem + 4.2vw, 5rem)",
};

type StylePreset = {
  fontWeight?: number | string;
  fontStyle?: "normal" | "italic";
};

const STYLE_MAP: Record<string, StylePreset> = {
  default: {},
  light: { fontWeight: 300, fontStyle: "normal" },
  regular: { fontWeight: 400, fontStyle: "normal" },
  medium: { fontWeight: 500, fontStyle: "normal" },
  semibold: { fontWeight: 600, fontStyle: "normal" },
  bold: { fontWeight: 700, fontStyle: "normal" },
  black: { fontWeight: 900, fontStyle: "normal" },
  italic: { fontWeight: 400, fontStyle: "italic" },
  "bold-italic": { fontWeight: 700, fontStyle: "italic" },
};

export const TYPOGRAPHY_FONT_SIZE_OPTIONS = [
  { label: "Default (theme)", value: "default" },
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
  { label: "Extra large", value: "xl" },
  { label: "2XL", value: "2xl" },
  { label: "3XL", value: "3xl" },
  { label: "4XL (display)", value: "4xl" },
  { label: "5XL", value: "5xl" },
] as const;

export const TYPOGRAPHY_STYLE_OPTIONS = [
  { label: "Default (theme)", value: "default" },
  { label: "Light", value: "light" },
  { label: "Regular", value: "regular" },
  { label: "Medium", value: "medium" },
  { label: "Semibold", value: "semibold" },
  { label: "Bold", value: "bold" },
  { label: "Black", value: "black" },
  { label: "Italic", value: "italic" },
  { label: "Bold italic", value: "bold-italic" },
] as const;

/** Build inline styles from CMS typography role. Empty fields keep CSS class defaults. */
export function typographyToStyle(role?: TypographyRole | null): CSSProperties | undefined {
  if (!role) return undefined;

  const style: CSSProperties = {};
  const sizeKey = (role.fontSize || "default").trim().toLowerCase();
  const size = FONT_SIZE_MAP[sizeKey];
  if (size) style.fontSize = size;
  else if (sizeKey && sizeKey !== "default" && !FONT_SIZE_MAP[sizeKey]) {
    // Allow raw CSS values from CMS (e.g. "2.5rem", "42px")
    style.fontSize = role.fontSize!.trim();
  }

  const color = (role.color || "").trim();
  if (color) style.color = color;

  const styleKey = (role.style || "default").trim().toLowerCase();
  const preset = STYLE_MAP[styleKey];
  if (preset) {
    if (preset.fontWeight != null) style.fontWeight = preset.fontWeight;
    if (preset.fontStyle) style.fontStyle = preset.fontStyle;
  }

  return Object.keys(style).length ? style : undefined;
}

/** CSS custom properties for site-wide typography (set on `<body>`). */
export function typographyToCssVars(
  typography?: SiteTypography | null,
): Record<string, string> {
  if (!typography) return {};

  const vars: Record<string, string> = {};
  const roles: Array<[keyof SiteTypography, string]> = [
    ["body", "body"],
    ["heading", "heading"],
    ["subheading", "subheading"],
    ["paragraph", "paragraph"],
  ];

  for (const [key, prefix] of roles) {
    const style = typographyToStyle(typography[key]);
    if (!style) continue;
    if (style.color) vars[`--io-${prefix}-color`] = String(style.color);
    if (style.fontSize) vars[`--io-${prefix}-size`] = String(style.fontSize);
    if (style.fontWeight != null) vars[`--io-${prefix}-weight`] = String(style.fontWeight);
    if (style.fontStyle) vars[`--io-${prefix}-style`] = String(style.fontStyle);
  }

  // Apply body color as a real `color` too — Tailwind `text-*` utilities
  // otherwise beat `color: var(--io-body-color)` from the base layer.
  const bodyColor = vars["--io-body-color"];
  if (bodyColor) vars.color = bodyColor;

  return vars;
}
