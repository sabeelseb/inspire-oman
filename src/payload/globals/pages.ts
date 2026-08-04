import type { GlobalConfig } from "payload";

const draftVersions = {
  drafts: true,
} as const;

export const Site: GlobalConfig = {
  slug: "site",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  versions: draftVersions,
  fields: [
    { name: "name", type: "text", defaultValue: "Inspire Oman", label: "Site name" },
    { name: "tagline", type: "text" },
    { name: "slogan", type: "text" },
    { name: "description", type: "textarea", label: "Short description" },
    { name: "summitDate", type: "text", label: "Summit date" },
    { name: "venue", type: "text" },
    { name: "heroImage", type: "upload", relationTo: "media", label: "Hero background image" },
    { name: "bannerImage", type: "upload", relationTo: "media", label: "Skyline / brand banner" },
    { name: "summitImage", type: "upload", relationTo: "media", label: "Summit featured image" },
    { name: "omanPhone1", type: "text", label: "Oman phone 1" },
    { name: "omanPhone2", type: "text", label: "Oman phone 2" },
    { name: "omanEmail", type: "text", label: "Oman email" },
    { name: "indiaPhone", type: "text", label: "India phone" },
    { name: "indiaEmail", type: "text", label: "India email" },
    { name: "instagram", type: "text", label: "Instagram URL" },
    { name: "facebook", type: "text", label: "Facebook URL" },
    { name: "linkedin", type: "text", label: "LinkedIn URL" },
    { name: "twitter", type: "text", label: "Twitter / X URL" },
    { name: "youtube", type: "text", label: "YouTube URL" },
    { name: "partnerStrategic", type: "text", label: "Strategic partner name" },
    { name: "partnerInitiative", type: "text", label: "Initiative by name" },
    { name: "partnerExecution", type: "text", label: "Execution partner name" },
  ],
};

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  admin: {
    group: "Settings",
    description: "Logo, brand wordmark, navigation links, and header CTA button.",
  },
  versions: draftVersions,
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
    },
    {
      name: "logoSrc",
      type: "text",
      defaultValue: "/images/logos/IO-logo.svg",
      label: "Logo path fallback",
      admin: {
        description: "Used when no logo upload is set (e.g. /images/logos/IO-logo.svg).",
      },
    },
    {
      name: "brandPrimary",
      type: "text",
      defaultValue: "Inspire",
      label: "Brand wordmark (primary)",
    },
    {
      name: "brandHighlight",
      type: "text",
      defaultValue: "Oman",
      label: "Brand wordmark (gold)",
    },
    {
      name: "navLinks",
      type: "array",
      label: "Navigation links",
      labels: { singular: "Link", plural: "Links" },
      admin: {
        initCollapsed: false,
      },
      fields: [
        { name: "label", type: "text", required: true, label: "Label" },
        {
          name: "href",
          type: "text",
          required: true,
          label: "Link",
          admin: { description: "Path or URL, e.g. /about" },
        },
      ],
      defaultValue: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Pillars", href: "/pillars" },
        { label: "Summit 2026", href: "/summit" },
        { label: "Partner With Us", href: "/partner" },
        { label: "Media", href: "/media" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      defaultValue: "Partner With Us",
      label: "CTA button label",
    },
    {
      name: "ctaHref",
      type: "text",
      defaultValue: "/partner",
      label: "CTA button link",
    },
  ],
};

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    group: "Settings",
    description:
      "Footer brand, blurb, quick links, contact blocks, partner callout, social links, and copyright.",
  },
  versions: draftVersions,
  fields: [
    {
      name: "brandPrimary",
      type: "text",
      defaultValue: "Inspire",
      label: "Brand wordmark (primary)",
    },
    {
      name: "brandHighlight",
      type: "text",
      defaultValue: "Oman",
      label: "Brand wordmark (gold)",
    },
    {
      name: "description",
      type: "textarea",
      label: "Short description",
      admin: {
        description: "Shown under the brand in the footer.",
      },
    },
    {
      name: "quickLinksTitle",
      type: "text",
      defaultValue: "Quick Links",
      label: "Quick links heading",
    },
    {
      name: "quickLinks",
      type: "array",
      label: "Quick links",
      labels: { singular: "Link", plural: "Links" },
      fields: [
        { name: "label", type: "text", required: true, label: "Label" },
        {
          name: "href",
          type: "text",
          required: true,
          label: "Link",
          admin: { description: "Path or URL, e.g. /about" },
        },
      ],
      defaultValue: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Pillars", href: "/pillars" },
        { label: "Summit 2026", href: "/summit" },
        { label: "Partner With Us", href: "/partner" },
        { label: "Media", href: "/media" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      name: "omanTitle",
      type: "text",
      defaultValue: "Contact - Oman",
      label: "Oman contact heading",
    },
    { name: "omanPhone1", type: "text", label: "Oman phone 1" },
    { name: "omanPhone2", type: "text", label: "Oman phone 2" },
    { name: "omanEmail", type: "text", label: "Oman email" },
    {
      name: "omanAddress",
      type: "textarea",
      defaultValue: "Oman Convention & Exhibition Centre, Muscat",
      label: "Oman address",
    },
    {
      name: "indiaTitle",
      type: "text",
      defaultValue: "Contact - India",
      label: "India contact heading",
    },
    { name: "indiaPhone", type: "text", label: "India phone" },
    { name: "indiaEmail", type: "text", label: "India email" },
    {
      name: "partnerLabel",
      type: "text",
      defaultValue: "Strategic Partner",
      label: "Partner callout label",
    },
    {
      name: "partnerName",
      type: "text",
      defaultValue: "Oman Chamber of Commerce & Industry",
      label: "Partner callout name",
    },
    {
      type: "row",
      fields: [
        { name: "instagram", type: "text", label: "Instagram URL", admin: { width: "50%" } },
        { name: "facebook", type: "text", label: "Facebook URL", admin: { width: "50%" } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "linkedin", type: "text", label: "LinkedIn URL", admin: { width: "50%" } },
        { name: "twitter", type: "text", label: "Twitter / X URL", admin: { width: "50%" } },
      ],
    },
    { name: "youtube", type: "text", label: "YouTube URL" },
    {
      name: "copyrightText",
      type: "text",
      defaultValue:
        "Inspire Oman. All rights reserved. An initiative by Gulf Madhyamam.",
      label: "Copyright text",
      admin: {
        description: "Shown after © and the current year.",
      },
    },
  ],
};

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home",
  admin: {
    group: "Pages",
    description:
      "Hero order (top → bottom): logo → title → slogan → support → date/city chip → buttons. Venue line is not shown on the public hero.",
  },
  versions: draftVersions,
  fields: [
    {
      name: "heroLogo",
      type: "upload",
      relationTo: "media",
      label: "Hero - logo",
      admin: {
        description: "Centered mark above the title (e.g. lighthouse / inspire oman lockup).",
      },
    },
    {
      name: "heroLogoSrc",
      type: "text",
      defaultValue: "/images/logos/inspire-oman-hero-logo.png",
      label: "Hero - logo path fallback",
      admin: {
        description: "Used when no logo upload is set.",
      },
    },
    {
      name: "heroTitle",
      type: "text",
      defaultValue: "Telling Oman's Growth Story Globally",
      label: "Hero - title",
      admin: {
        description:
          "Full title as one string. On desktop it can split into two lines using “line break after” below.",
      },
    },
    {
      name: "heroTitleHighlight",
      type: "text",
      defaultValue: "Growth Story",
      label: "Hero - gold highlight word(s)",
    },
    {
      name: "heroTitleBreakAfter",
      type: "text",
      defaultValue: "Telling Oman's",
      label: "Hero - desktop line break after",
      admin: {
        description:
          "On desktop only, insert a line break after this exact text. Example: “Telling Oman's” → second line “Growth Story Globally”. Leave empty for a single line.",
      },
    },
    {
      name: "heroSlogan",
      type: "textarea",
      defaultValue: "Celebrating Success. Creating Legacy. Inspiring Investment.",
      label: "Hero - slogan",
    },
    {
      name: "heroSupportLine",
      type: "textarea",
      defaultValue:
        "Legacy Documentation • Celebrating the Experience • Inspire Oman Summit",
      label: "Hero - support line (pillars)",
    },
    {
      name: "heroDate",
      type: "text",
      defaultValue: "11 October 2026",
      label: "Hero - date (chip)",
      admin: {
        description: "Shown in the chip directly above the CTA buttons.",
      },
    },
    {
      name: "heroCity",
      type: "text",
      defaultValue: "Muscat",
      label: "Hero - city (chip)",
    },
    {
      name: "heroPrimaryCta",
      type: "text",
      defaultValue: "Register for Summit",
      label: "Hero - primary button label",
    },
    {
      name: "heroPrimaryCtaHref",
      type: "text",
      defaultValue: "/summit",
      label: "Hero - primary button link",
    },
    {
      name: "heroSecondaryCta",
      type: "text",
      defaultValue: "Become a Partner",
      label: "Hero - secondary button label",
    },
    {
      name: "heroSecondaryCtaHref",
      type: "text",
      defaultValue: "/partner",
      label: "Hero - secondary button link",
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
      label: "Hero - background image (optional override)",
    },
    {
      name: "heroVenue",
      type: "text",
      defaultValue: "Oman Convention & Exhibition Centre",
      label: "Hero - venue (unused on public hero)",
      admin: {
        hidden: true,
        description: "Kept for older content; not rendered on the public hero.",
      },
    },
    {
      name: "aboutEyebrow",
      type: "text",
      defaultValue: "About the Initiative",
      label: "About - eyebrow",
    },
    {
      name: "aboutTitle",
      type: "text",
      defaultValue: "Celebrating Oman's Growth Story",
      label: "About - title",
    },
    {
      name: "aboutTitleHighlight",
      type: "text",
      defaultValue: "Growth Story",
      label: "About - gold highlight word(s)",
    },
    { name: "aboutIntro", type: "textarea", label: "About - first paragraph" },
    { name: "aboutBody", type: "textarea", label: "About - second paragraph" },
    {
      name: "aboutTags",
      type: "array",
      label: "About - tags",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "aboutFacts",
      type: "array",
      label: "About - side facts card",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "homeStats",
      type: "array",
      label: "Stats row - counters (15+, 500+, etc.)",
      fields: [
        { name: "value", type: "number", defaultValue: 0, label: "Number" },
        { name: "suffix", type: "text", defaultValue: "+" },
        { name: "label", type: "text" },
      ],
    },
    {
      name: "statsBannerSrc",
      type: "text",
      defaultValue: "/images/logos/inspire-oman-banner.jpg",
      label: "Stats - banner image path",
    },
    {
      name: "statsBanner",
      type: "upload",
      relationTo: "media",
      label: "Stats - or upload banner image",
    },
    {
      name: "ctaTitle",
      type: "text",
      defaultValue: "Be Part of Oman's Growth Story",
      label: "Bottom CTA title",
    },
    { name: "ctaBody", type: "textarea", label: "Bottom CTA body" },
  ],
};

function pageGlobal(slug: string, label: string, extra: GlobalConfig["fields"] = []): GlobalConfig {
  return {
    slug,
    label,
    admin: { group: "Pages" },
    versions: draftVersions,
    fields: [
      { name: "eyebrow", type: "text", label: "Hero eyebrow" },
      { name: "title", type: "text", label: "Hero title" },
      { name: "highlight", type: "text", label: "Title gold highlight" },
      { name: "subtitle", type: "textarea", label: "Hero subtitle" },
      ...extra,
    ],
  };
}

export const AboutPage: GlobalConfig = pageGlobal("about-page", "About", [
  { name: "missionTitle", type: "text", label: "Mission title" },
  { name: "missionP1", type: "textarea", label: "Mission paragraph 1" },
  { name: "missionP2", type: "textarea", label: "Mission paragraph 2" },
  { name: "quote", type: "textarea", label: "Mission quote" },
  {
    name: "missionFacts",
    type: "array",
    label: "Mission - side facts cards",
    labels: { singular: "Fact", plural: "Facts" },
    admin: {
      description:
        "2×2 cards beside the mission (Strategic Partner, Initiative By, etc.)",
    },
    fields: [
      { name: "label", type: "text", required: true, label: "Label" },
      { name: "value", type: "text", required: true, label: "Value" },
    ],
  },
  { name: "valuesEyebrow", type: "text", label: "Values eyebrow" },
  { name: "valuesTitle", type: "text", label: "Values title" },
  { name: "audienceEyebrow", type: "text", label: "Audience eyebrow" },
  { name: "audienceTitle", type: "text", label: "Audience title" },
  {
    name: "stakeholders",
    type: "array",
    label: "Who we serve",
    fields: [{ name: "item", type: "text", required: true }],
  },
]);

export const PillarsPage = pageGlobal("pillars-page", "Pillars page");
export const SummitPage = pageGlobal("summit-page", "Summit page");
export const PartnerPage = pageGlobal("partner-page", "Partner page");
export const MediaPage = pageGlobal("media-page", "Media page");
export const ContactPage = pageGlobal("contact-page", "Contact page");
