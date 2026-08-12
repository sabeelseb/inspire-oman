import type { GlobalConfig } from "payload";
import {
  TYPOGRAPHY_FONT_SIZE_OPTIONS,
  TYPOGRAPHY_STYLE_OPTIONS,
} from "@/lib/typography";

const draftVersions = {
  drafts: true,
} as const;

const typographyRoleFields = (label: string) => [
  {
    name: "fontSize",
    type: "select" as const,
    label: `${label} – font size`,
    defaultValue: "default",
    options: [...TYPOGRAPHY_FONT_SIZE_OPTIONS],
    admin: {
      description: "Leave Default to keep the theme size on the public site.",
    },
  },
  {
    name: "color",
    type: "text" as const,
    label: `${label} – color`,
    admin: {
      description:
        "CSS color, e.g. #FFFFFF, #C9A227, or rgba(255,255,255,0.7). Empty = theme.",
    },
  },
  {
    name: "style",
    type: "select" as const,
    label: `${label} – style`,
    defaultValue: "default",
    options: [...TYPOGRAPHY_STYLE_OPTIONS],
    admin: {
      description: "Weight / italic. Default keeps the theme style.",
    },
  },
];

export const Site: GlobalConfig = {
  slug: "site",
  label: "Site Settings",
  admin: {
    group: "Settings",
    description:
      "Shared brand, SEO, summit details, typography, and default images. Header, footer, contact, social, and partner names are edited in their own Settings tabs.",
  },
  versions: draftVersions,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Brand & SEO",
          fields: [
            { name: "name", type: "text", defaultValue: "Inspire Oman", label: "Site name" },
            {
              name: "seoTitle",
              type: "text",
              defaultValue: "Inspire Oman - Telling Oman's Growth Story Globally",
              label: "Browser / SEO title",
              admin: {
                description: "Shown in the browser tab and search results.",
              },
            },
            {
              name: "seoDescription",
              type: "textarea",
              defaultValue:
                "A prestigious integrated initiative aligned with Oman Vision 2040. Investors Summit - 11 October 2026, Oman Convention & Exhibition Centre.",
              label: "SEO description",
            },
            {
              name: "slogan",
              type: "text",
              label: "Default slogan",
              admin: {
                description: "Used when a page does not set its own slogan.",
              },
            },
            {
              name: "description",
              type: "textarea",
              label: "Default short description",
              admin: {
                description: "Fallback blurb when a page or the footer has no description.",
              },
            },
          ],
        },
        {
          label: "Summit",
          fields: [
            {
              name: "summitDate",
              type: "text",
              label: "Summit date",
              admin: {
                description:
                  "Site-wide fallback. Home → Hero can override the date shown in the hero chip.",
              },
            },
            {
              name: "venue",
              type: "text",
              label: "Venue",
              admin: {
                description:
                  "Site-wide fallback. Home → Hero can override the venue under the hero date chip.",
              },
            },
            {
              name: "city",
              type: "text",
              defaultValue: "Muscat",
              label: "City",
              admin: {
                description: "Shown with the venue on contact and as the hero city fallback.",
              },
            },
          ],
        },
        {
          label: "Shared images",
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Default hero / page background",
            },
            {
              name: "bannerImage",
              type: "upload",
              relationTo: "media",
              label: "Skyline / brand banner",
            },
            {
              name: "summitImage",
              type: "upload",
              relationTo: "media",
              label: "Summit featured image",
              admin: {
                description: "Large photo on the summit speakers card.",
              },
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              label: "Social share image",
              admin: {
                description: "Preview image when the site is shared on WhatsApp, LinkedIn, etc.",
              },
            },
          ],
        },
        {
          label: "Typography",
          fields: [
            {
              name: "typography",
              type: "group",
              label: "Text styles",
              admin: {
                description:
                  "Site-wide text colors and styles. Body = default page text, Heading = h1–h3, Paragraph = p tags. Hero also uses Heading / Subheading / Paragraph.",
              },
              fields: [
                {
                  name: "body",
                  type: "group",
                  label: "Body text",
                  fields: [...typographyRoleFields("Body")],
                },
                {
                  name: "heading",
                  type: "group",
                  label: "Heading",
                  fields: [...typographyRoleFields("Heading")],
                },
                {
                  name: "subheading",
                  type: "group",
                  label: "Subheading",
                  fields: [...typographyRoleFields("Subheading")],
                },
                {
                  name: "paragraph",
                  type: "group",
                  label: "Paragraph",
                  fields: [...typographyRoleFields("Paragraph")],
                },
              ],
            },
          ],
        },
        {
          label: "Registration",
          fields: [
            {
              name: "registrationCategories",
              type: "group",
              label: "Summit registration categories",
              admin: {
                description:
                  "The three premium cards shown before the summit registration form (Summit page + floating Register widget).",
              },
              fields: [
                {
                  name: "vvip",
                  type: "group",
                  label: "VVIP",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      defaultValue: "VVIP",
                      label: "Short label",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      defaultValue: "Investors Inside Oman",
                      label: "Heading",
                    },
                    {
                      name: "description",
                      type: "textarea",
                      defaultValue:
                        "Exclusive access for investors and decision-makers based in Oman.",
                      label: "Short description",
                    },
                    {
                      name: "badge",
                      type: "text",
                      defaultValue: "Inside Oman",
                      label: "Badge text",
                    },
                  ],
                },
                {
                  name: "vip",
                  type: "group",
                  label: "VIP",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      defaultValue: "VIP",
                      label: "Short label",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      defaultValue: "Investors Outside Oman",
                      label: "Heading",
                    },
                    {
                      name: "description",
                      type: "textarea",
                      defaultValue:
                        "Premium access for international investors joining the summit.",
                      label: "Short description",
                    },
                    {
                      name: "badge",
                      type: "text",
                      defaultValue: "Outside Oman",
                      label: "Badge text",
                    },
                  ],
                },
                {
                  name: "media",
                  type: "group",
                  label: "Media",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      defaultValue: "Media",
                      label: "Short label",
                    },
                    {
                      name: "subtitle",
                      type: "text",
                      defaultValue: "Media Partners",
                      label: "Heading",
                    },
                    {
                      name: "description",
                      type: "textarea",
                      defaultValue:
                        "Accreditation for publishers, press, and media partners.",
                      label: "Short description",
                    },
                    {
                      name: "badge",
                      type: "text",
                      defaultValue: "Press Pass",
                      label: "Badge text",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "tagline",
      type: "text",
      admin: { hidden: true },
    },
    { name: "omanPhone1", type: "text", admin: { hidden: true } },
    { name: "omanPhone2", type: "text", admin: { hidden: true } },
    { name: "omanEmail", type: "text", admin: { hidden: true } },
    { name: "indiaPhone", type: "text", admin: { hidden: true } },
    { name: "indiaEmail", type: "text", admin: { hidden: true } },
    { name: "instagram", type: "text", admin: { hidden: true } },
    { name: "facebook", type: "text", admin: { hidden: true } },
    { name: "linkedin", type: "text", admin: { hidden: true } },
    { name: "twitter", type: "text", admin: { hidden: true } },
    { name: "youtube", type: "text", admin: { hidden: true } },
    { name: "partnerStrategic", type: "text", admin: { hidden: true } },
    { name: "partnerInitiative", type: "text", admin: { hidden: true } },
    { name: "partnerExecution", type: "text", admin: { hidden: true } },
  ],
};

export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  admin: {
    group: "Settings",
    description: "Logo, brand wordmark, navigation links, header CTA, and Register Now floating widget.",
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
    {
      type: "collapsible",
      label: "Register Now widget",
      admin: {
        description:
          "Floating button on every public page (hidden on Summit, where the full form already appears). Submissions go to Inbox → Summit Registrations.",
      },
      fields: [
        {
          name: "registerWidgetEnabled",
          type: "checkbox",
          defaultValue: true,
          label: "Show Register Now widget",
        },
        {
          name: "registerWidgetLabel",
          type: "text",
          defaultValue: "Register Now",
          label: "Widget button label",
        },
        {
          name: "registerWidgetTitle",
          type: "text",
          defaultValue: "Register for Summit 2026",
          label: "Widget panel title",
        },
        {
          name: "registerWidgetSubtitle",
          type: "textarea",
          defaultValue:
            "Join delegates at the Inspire Oman Investors Summit — 11 October 2026",
          label: "Widget panel subtitle",
        },
      ],
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
      label: "Strategic partner name",
      admin: {
        description: "Footer callout and default Strategic Partner label on the site.",
      },
    },
    {
      name: "partnerInitiative",
      type: "text",
      defaultValue: "Gulf Madhyamam",
      label: "Initiative by name",
    },
    {
      name: "partnerExecution",
      type: "text",
      defaultValue: "mefriend",
      label: "Execution partner name",
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

const homeSectionHeadingFields = (
  prefix: string,
  sectionLabel: string,
  defaults: {
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
  }
) => [
  {
    name: `${prefix}Eyebrow`,
    type: "text" as const,
    label: `${sectionLabel} - eyebrow`,
    defaultValue: defaults.eyebrow,
  },
  {
    name: `${prefix}Title`,
    type: "text" as const,
    label: `${sectionLabel} - title`,
    defaultValue: defaults.title,
  },
  {
    name: `${prefix}TitleHighlight`,
    type: "text" as const,
    label: `${sectionLabel} - gold highlight word(s)`,
    defaultValue: defaults.titleHighlight,
  },
  {
    name: `${prefix}Subtitle`,
    type: "textarea" as const,
    label: `${sectionLabel} - subtitle`,
    defaultValue: defaults.subtitle,
  },
];

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home",
  admin: {
    group: "Pages",
    description:
      "Homepage copy and section headings. Tabs: Hero, Spotlight Grid (3 blocks), About, Stats, Partners, Pillars, Summit, Videos, Testimonials, Contact, Bottom CTA. Collections: Partners, Pillars, Speakers, Videos, Testimonials.",
  },
  versions: draftVersions,
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
    {
      name: "heroLogo",
      type: "upload",
      relationTo: "media",
      label: "Hero - logo",
      admin: {
        description: "Primary Inspire Oman mark on the left of the hero (enlarged).",
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
      defaultValue: "Register Now",
      label: "Hero - primary button label",
      admin: {
        description: "Main focus CTA on the opening view (left column).",
      },
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
      defaultValue: "View More",
      label: "Hero - secondary button label",
    },
    {
      name: "heroSecondaryCtaHref",
      type: "text",
      defaultValue: "/about",
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
      label: "Hero - venue (chip)",
      admin: {
        description: "Shown in the date chip under the hero copy when set.",
      },
    },
    {
      type: "collapsible",
      label: "Hero partner logos (OCCI & mefriend)",
      fields: [
        {
          name: "heroOcciRole",
          type: "text",
          defaultValue: "Strategic Partner",
          label: "OCCI - role label",
        },
        {
          name: "heroOcciTitle",
          type: "text",
          defaultValue: "Oman Chamber of Commerce & Industry",
          label: "OCCI - title under logo (Strategic Partner)",
          admin: {
            description:
              "Shown under the Strategic Partner logo (right of main hero logo).",
          },
        },
        {
          name: "heroOcciLogoSrc",
          type: "text",
          defaultValue: "/images/logos/OCC-logo.svg",
          label: "OCCI - logo path fallback",
        },
        {
          name: "heroOcciLogo",
          type: "upload",
          relationTo: "media",
          label: "OCCI - logo upload",
        },
        {
          name: "heroMefriendRole",
          type: "text",
          defaultValue: "Execution Partner",
          label: "mefriend - role label",
        },
        {
          name: "heroMefriendTitle",
          type: "text",
          defaultValue: "Mefriend - Where Brands Find Solutions",
          label: "mefriend - title under logo (Execution Partner)",
          admin: {
            description:
              "Shown under the Execution Partner logo (left of main hero logo).",
          },
        },
        {
          name: "heroMefriendLogoSrc",
          type: "text",
          defaultValue: "/images/logos/MF-logo.svg",
          label: "mefriend - logo path fallback",
        },
        {
          name: "heroMefriendLogo",
          type: "upload",
          relationTo: "media",
          label: "mefriend - logo upload",
        },
      ],
    },
          ],
        },
        {
          label: "Spotlight Grid",
          fields: [
            {
              type: "collapsible",
              label: "Block 1 — Legacy Documentation",
              fields: [
                {
                  name: "spotlightCard1Keynote",
                  type: "text",
                  defaultValue: "Keynote",
                  label: "Keynote label",
                },
                {
                  name: "spotlightCard1Title",
                  type: "text",
                  defaultValue: "Legacy Documentation",
                  label: "Heading",
                },
                {
                  name: "spotlightCard1Description",
                  type: "textarea",
                  defaultValue:
                    "Documenting Oman's success stories and institutional memory for Vision 2040.",
                  label: "Short description",
                },
              ],
            },
            {
              type: "collapsible",
              label: "Block 2 — Digital Video Campaign",
              fields: [
                {
                  name: "spotlightCard2Keynote",
                  type: "text",
                  defaultValue: "Keynote",
                  label: "Keynote label",
                },
                {
                  name: "spotlightCard2Title",
                  type: "text",
                  defaultValue: "Digital Video Campaign",
                  label: "Heading",
                },
                {
                  name: "spotlightCard2Description",
                  type: "textarea",
                  defaultValue:
                    "A cinematic campaign amplifying Omani brands and leaders across digital platforms.",
                  label: "Short description",
                },
              ],
            },
            {
              type: "collapsible",
              label: "Block 3 — Chairman Video",
              fields: [
                {
                  name: "spotlightVideoKeynote",
                  type: "text",
                  defaultValue: "Chairman Video",
                  label: "Keynote label",
                },
                {
                  name: "spotlightVideoTitle",
                  type: "text",
                  defaultValue: "Official Launch of Inspire Oman | Muscat Highlights",
                  label: "Video title",
                },
                {
                  name: "spotlightVideoDescription",
                  type: "textarea",
                  defaultValue:
                    "Watch the official launch highlights from Muscat and the vision behind Inspire Oman.",
                  label: "Short description",
                },
                {
                  name: "spotlightVideoHref",
                  type: "text",
                  defaultValue: "https://youtu.be/j0DS8GX9ht4",
                  label: "YouTube URL",
                  admin: {
                    description: "Paste a YouTube link. Can be changed anytime from the dashboard.",
                  },
                },
                {
                  name: "spotlightVideoPoster",
                  type: "text",
                  label: "Poster image path / URL (optional)",
                  admin: {
                    description: "Leave empty to use the YouTube thumbnail.",
                  },
                },
                {
                  name: "spotlightVideoViewMoreLabel",
                  type: "text",
                  defaultValue: "View More",
                  label: "View more button label",
                },
                {
                  name: "spotlightVideoViewMoreHref",
                  type: "text",
                  defaultValue: "/media",
                  label: "View more button link",
                },
              ],
            },
          ],
        },
        {
          label: "About",
          fields: [
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
          ],
        },
        {
          label: "Stats",
          fields: [
            {
              name: "homeStats",
              type: "array",
              label: "Stats row - counters (15+, 500+, etc.)",
              admin: {
                description:
                  "Preferred source for the homepage stats strip. If empty, the site falls back to the Stats collection.",
              },
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
          ],
        },
        {
          label: "Partners",
          fields: [
            {
              name: "partnersEyebrow",
              type: "text",
              defaultValue: "Our Partners",
              label: "Partners - eyebrow",
            },
            {
              name: "partnersTitle",
              type: "text",
              defaultValue: "Trusted by Leaders",
              label: "Partners - title",
            },
            {
              name: "partnersTitleHighlight",
              type: "text",
              defaultValue: "Leaders",
              label: "Partners - gold highlight word(s)",
            },
            {
              name: "partnersSubtitle",
              type: "textarea",
              defaultValue:
                "Inspire Oman is powered by strategic collaboration between OCCI, Gulf Madhyamam, and mefriend",
              label: "Partners - subtitle",
              admin: {
                description: "Partner logos are managed under Site content → Partners.",
              },
            },
          ],
        },
        {
          label: "Pillars",
          fields: [
            ...homeSectionHeadingFields("pillars", "Pillars", {
              eyebrow: "Three Pillars",
              title: "Building Oman's Legacy",
              titleHighlight: "Legacy",
              subtitle:
                "Three integrated pillars working together to document, celebrate, and connect Oman's business community",
            }),
            {
              name: "pillarsLearnMoreLabel",
              type: "text",
              defaultValue: "Learn More",
              label: "Pillars - card link label",
            },
            {
              name: "pillarsLearnMoreHref",
              type: "text",
              defaultValue: "/pillars",
              label: "Pillars - card link URL",
            },
          ],
        },
        {
          label: "Summit",
          fields: [
            ...homeSectionHeadingFields("summit", "Summit highlights", {
              eyebrow: "Flagship Event",
              title: "Investors Summit",
              titleHighlight: "2026",
              subtitle:
                "Discover, Connect & Prosper - bringing together leaders, investors, and visionaries",
            }),
            {
              name: "summitExpectedLabel",
              type: "text",
              defaultValue: "Expected",
              label: "Summit - expected delegates label",
            },
            {
              name: "summitExpectedValue",
              type: "text",
              defaultValue: "500+ Delegates",
              label: "Summit - expected delegates value",
            },
            {
              name: "summitFeaturedBadge",
              type: "text",
              defaultValue: "FEATURED SPEAKER",
              label: "Summit - featured speaker badge",
            },
            {
              name: "summitFeaturedSessionLabel",
              type: "text",
              defaultValue: "Special Transformational Session",
              label: "Summit - featured card session label",
            },
            {
              name: "summitAgendaCta",
              type: "text",
              defaultValue: "View Full Agenda",
              label: "Summit - featured card button label",
            },
            {
              name: "summitAgendaHref",
              type: "text",
              defaultValue: "/summit",
              label: "Summit - featured card button link",
            },
          ],
        },
        {
          label: "Videos",
          fields: [
            ...homeSectionHeadingFields("videos", "Featured videos", {
              eyebrow: "Featured Videos",
              title: "Watch the",
              titleHighlight: "Story",
            }),
          ],
        },
        {
          label: "Testimonials",
          fields: [
            ...homeSectionHeadingFields("testimonials", "Testimonials", {
              eyebrow: "Voices of Support",
              title: "What Leaders",
              titleHighlight: "Say",
            }),
          ],
        },
        {
          label: "Contact",
          fields: [
            ...homeSectionHeadingFields("contact", "Contact form", {
              eyebrow: "Get In Touch",
              title: "We're Ready to",
              titleHighlight: "Help",
              subtitle:
                "Reach out for inquiries, partnerships, sponsorships, or collaboration opportunities",
            }),
          ],
        },
        {
          label: "Bottom CTA",
          fields: [
            {
              name: "ctaTitle",
              type: "text",
              defaultValue: "Be Part of Oman's Growth Story",
              label: "Bottom CTA - title",
            },
            {
              name: "ctaTitleHighlight",
              type: "text",
              defaultValue: "Growth Story",
              label: "Bottom CTA - gold highlight word(s)",
            },
            {
              name: "ctaBody",
              type: "textarea",
              defaultValue:
                "Join Inspire Oman as a partner or delegate and connect with the region's most dynamic business community",
              label: "Bottom CTA - body",
            },
            {
              name: "ctaPrimaryLabel",
              type: "text",
              defaultValue: "Become a Partner",
              label: "Bottom CTA - primary button label",
            },
            {
              name: "ctaPrimaryHref",
              type: "text",
              defaultValue: "/partner",
              label: "Bottom CTA - primary button link",
            },
            {
              name: "ctaSecondaryLabel",
              type: "text",
              defaultValue: "Register for Summit",
              label: "Bottom CTA - secondary button label",
            },
            {
              name: "ctaSecondaryHref",
              type: "text",
              defaultValue: "/summit",
              label: "Bottom CTA - secondary button link",
            },
          ],
        },
      ],
    },
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
export const SummitPage = pageGlobal("summit-page", "Summit page", [
  {
    type: "collapsible",
    label: "Registration section (#register)",
    admin: {
      description:
        "Headings above the VVIP / VIP / Media category cards. Category card copy is edited in Settings → Site Settings → Registration.",
    },
    fields: [
      {
        name: "registerEyebrow",
        type: "text",
        defaultValue: "Register",
        label: "Register - eyebrow",
      },
      {
        name: "registerTitle",
        type: "text",
        defaultValue: "Secure Your Spot",
        label: "Register - title",
      },
      {
        name: "registerTitleHighlight",
        type: "text",
        defaultValue: "Spot",
        label: "Register - gold highlight word(s)",
      },
      {
        name: "registerChooseSubtitle",
        type: "textarea",
        defaultValue: "Choose your registration category to continue.",
        label: "Register - subtitle (category step)",
      },
      {
        name: "registerFormSubtitle",
        type: "textarea",
        defaultValue: "Complete your details to confirm your place at the summit.",
        label: "Register - subtitle (form step)",
      },
    ],
  },
]);
export const PartnerPage = pageGlobal("partner-page", "Partner page");
export const MediaPage = pageGlobal("media-page", "Media page");
export const ContactPage = pageGlobal("contact-page", "Contact page");
