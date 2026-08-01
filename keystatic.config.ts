import { config, fields, collection, singleton } from "@keystatic/core";

/**
 * Keystatic CMS - all page content editable via /keystatic
 * Content files live in content/ (Git). Prefer editing via npm run dev.
 */
export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Inspire Oman CMS" },
    navigation: {
      Pages: [
        "homePage",
        "aboutPage",
        "pillarsPage",
        "summitPage",
        "partnerPage",
        "mediaPage",
        "contactPage",
      ],
      "Site content": [
        "partners",
        "stats",
        "speakers",
        "testimonials",
        "pillars",
        "packages",
        "values",
      ],
      "Summit & media": ["agenda", "gallery", "videos", "press"],
      Settings: ["site"],
    },
  },
  singletons: {
    site: singleton({
      label: "Site Settings",
      path: "content/site",
      schema: {
        name: fields.text({ label: "Site name", defaultValue: "Inspire Oman" }),
        tagline: fields.text({ label: "Tagline" }),
        slogan: fields.text({ label: "Slogan" }),
        description: fields.text({ label: "Short description", multiline: true }),
        summitDate: fields.text({ label: "Summit date" }),
        venue: fields.text({ label: "Venue" }),
        heroImage: fields.image({
          label: "Hero background image",
          directory: "public/images/cms",
          publicPath: "/images/cms/",
        }),
        bannerImage: fields.image({
          label: "Skyline / brand banner",
          directory: "public/images/cms",
          publicPath: "/images/cms/",
        }),
        summitImage: fields.image({
          label: "Summit featured image",
          directory: "public/images/cms",
          publicPath: "/images/cms/",
        }),
        omanPhone1: fields.text({ label: "Oman phone 1" }),
        omanPhone2: fields.text({ label: "Oman phone 2" }),
        omanEmail: fields.text({ label: "Oman email" }),
        indiaPhone: fields.text({ label: "India phone" }),
        indiaEmail: fields.text({ label: "India email" }),
        instagram: fields.text({ label: "Instagram URL" }),
        facebook: fields.text({ label: "Facebook URL" }),
        linkedin: fields.text({ label: "LinkedIn URL" }),
        twitter: fields.text({ label: "Twitter / X URL" }),
        youtube: fields.text({ label: "YouTube URL" }),
        partnerStrategic: fields.text({ label: "Strategic partner name" }),
        partnerInitiative: fields.text({ label: "Initiative by name" }),
        partnerExecution: fields.text({ label: "Execution partner name" }),
      },
    }),

    homePage: singleton({
      label: "Home",
      path: "content/pages/home",
      schema: {
        heroDate: fields.text({
          label: "Hero - date badge",
          defaultValue: "11 October 2026",
        }),
        heroCity: fields.text({
          label: "Hero - city badge",
          defaultValue: "Muscat",
        }),
        heroTitle: fields.text({
          label: "Hero - title",
          defaultValue: "Inspire Oman",
        }),
        heroTitleHighlight: fields.text({
          label: "Hero - gold highlight word(s)",
          defaultValue: "Oman",
        }),
        heroSlogan: fields.text({
          label: "Hero - slogan",
          defaultValue: "Celebrating Success. Creating Legacy. Inspiring Investment.",
          multiline: true,
        }),
        heroSupportLine: fields.text({
          label: "Hero - support line (pillars)",
          defaultValue:
            "Legacy Documentation • Celebrating the Experience • Inspire Oman Summit",
          multiline: true,
        }),
        heroVenue: fields.text({
          label: "Hero - venue",
          defaultValue: "Oman Convention & Exhibition Centre",
        }),
        heroPrimaryCta: fields.text({
          label: "Hero - primary button label",
          defaultValue: "Register for Summit",
        }),
        heroPrimaryCtaHref: fields.text({
          label: "Hero - primary button link",
          defaultValue: "/summit",
        }),
        heroSecondaryCta: fields.text({
          label: "Hero - secondary button label",
          defaultValue: "Become a Partner",
        }),
        heroSecondaryCtaHref: fields.text({
          label: "Hero - secondary button link",
          defaultValue: "/partner",
        }),
        heroImage: fields.image({
          label: "Hero - background image (optional override)",
          directory: "public/images/cms",
          publicPath: "/images/cms/",
        }),
        aboutEyebrow: fields.text({ label: "About eyebrow", defaultValue: "About the Initiative" }),
        aboutTitle: fields.text({ label: "About title", defaultValue: "Celebrating Oman's Growth Story" }),
        aboutBody: fields.text({ label: "About body paragraph", multiline: true }),
        aboutTags: fields.array(fields.text({ label: "Tag" }), {
          label: "About tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        ctaTitle: fields.text({ label: "Bottom CTA title", defaultValue: "Be Part of Oman's Growth Story" }),
        ctaBody: fields.text({ label: "Bottom CTA body", multiline: true }),
      },
    }),

    aboutPage: singleton({
      label: "About",
      path: "content/pages/about",
      schema: {
        eyebrow: fields.text({ label: "Hero eyebrow" }),
        title: fields.text({ label: "Hero title" }),
        highlight: fields.text({ label: "Title gold highlight", defaultValue: "Growth Story" }),
        subtitle: fields.text({ label: "Hero subtitle", multiline: true }),
        missionTitle: fields.text({ label: "Mission title" }),
        missionP1: fields.text({ label: "Mission paragraph 1", multiline: true }),
        missionP2: fields.text({ label: "Mission paragraph 2", multiline: true }),
        quote: fields.text({ label: "Mission quote", multiline: true }),
        valuesEyebrow: fields.text({ label: "Values eyebrow" }),
        valuesTitle: fields.text({ label: "Values title" }),
        audienceEyebrow: fields.text({ label: "Audience eyebrow" }),
        audienceTitle: fields.text({ label: "Audience title" }),
        stakeholders: fields.array(fields.text({ label: "Audience item" }), {
          label: "Who we serve",
          itemLabel: (props) => props.value || "Audience",
        }),
      },
    }),

    pillarsPage: singleton({
      label: "Pillars page",
      path: "content/pages/pillars",
      schema: {
        eyebrow: fields.text({ label: "Hero eyebrow" }),
        title: fields.text({ label: "Hero title" }),
        highlight: fields.text({ label: "Title gold highlight" }),
        subtitle: fields.text({ label: "Hero subtitle", multiline: true }),
      },
    }),

    summitPage: singleton({
      label: "Summit page",
      path: "content/pages/summit",
      schema: {
        eyebrow: fields.text({ label: "Hero eyebrow" }),
        title: fields.text({ label: "Hero title" }),
        highlight: fields.text({ label: "Title gold highlight" }),
        subtitle: fields.text({ label: "Hero subtitle", multiline: true }),
      },
    }),

    partnerPage: singleton({
      label: "Partner page",
      path: "content/pages/partner",
      schema: {
        eyebrow: fields.text({ label: "Hero eyebrow" }),
        title: fields.text({ label: "Hero title" }),
        highlight: fields.text({ label: "Title gold highlight" }),
        subtitle: fields.text({ label: "Hero subtitle", multiline: true }),
      },
    }),

    mediaPage: singleton({
      label: "Media page",
      path: "content/pages/media",
      schema: {
        eyebrow: fields.text({ label: "Hero eyebrow" }),
        title: fields.text({ label: "Hero title" }),
        highlight: fields.text({ label: "Title gold highlight" }),
        subtitle: fields.text({ label: "Hero subtitle", multiline: true }),
      },
    }),

    contactPage: singleton({
      label: "Contact page",
      path: "content/pages/contact",
      schema: {
        eyebrow: fields.text({ label: "Hero eyebrow" }),
        title: fields.text({ label: "Hero title" }),
        highlight: fields.text({ label: "Title gold highlight" }),
        subtitle: fields.text({ label: "Hero subtitle", multiline: true }),
      },
    }),
  },

  collections: {
    partners: collection({
      label: "Partners",
      slugField: "name",
      path: "content/partners/*",
      columns: ["role", "fullName"],
      schema: {
        name: fields.slug({ name: { label: "Short name" } }),
        role: fields.text({ label: "Role (e.g. Strategic Partner)" }),
        fullName: fields.text({ label: "Full organisation name" }),
        bg: fields.select({
          label: "Logo background",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ],
          defaultValue: "dark",
        }),
        logoSrc: fields.text({
          label: "Logo path (e.g. /images/logos/OCC-logo.svg)",
        }),
        logo: fields.image({
          label: "Or upload logo",
          directory: "public/images/cms/partners",
          publicPath: "/images/cms/partners/",
        }),
        order: fields.integer({ label: "Display order", defaultValue: 1 }),
      },
    }),

    stats: collection({
      label: "Stats",
      slugField: "label",
      path: "content/stats/*",
      columns: ["value", "suffix"],
      schema: {
        label: fields.slug({ name: { label: "Label" } }),
        value: fields.integer({ label: "Number", defaultValue: 0 }),
        suffix: fields.text({ label: "Suffix (e.g. +)", defaultValue: "+" }),
      },
    }),

    speakers: collection({
      label: "Speakers",
      slugField: "name",
      path: "content/speakers/*",
      columns: ["role", "featured"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role: fields.text({ label: "Role / title" }),
        description: fields.text({ label: "Description", multiline: true }),
        featured: fields.checkbox({ label: "Featured speaker", defaultValue: false }),
      },
    }),

    testimonials: collection({
      label: "Testimonials",
      slugField: "author",
      path: "content/testimonials/*",
      columns: ["role"],
      schema: {
        author: fields.slug({ name: { label: "Author" } }),
        role: fields.text({ label: "Role" }),
        quote: fields.text({ label: "Quote", multiline: true }),
      },
    }),

    pillars: collection({
      label: "Pillars",
      slugField: "title",
      path: "content/pillars/*",
      columns: ["subtitle", "icon"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subtitle: fields.text({ label: "Subtitle" }),
        description: fields.text({ label: "Description", multiline: true }),
        icon: fields.select({
          label: "Icon",
          options: [
            { label: "Book", value: "BookOpen" },
            { label: "Video", value: "Video" },
            { label: "Landmark", value: "Landmark" },
          ],
          defaultValue: "BookOpen",
        }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Features",
          itemLabel: (props) => props.value || "Feature",
        }),
        extras: fields.array(fields.text({ label: "Highlight card" }), {
          label: "Pillar page highlight cards",
          itemLabel: (props) => props.value || "Highlight",
        }),
      },
    }),

    packages: collection({
      label: "Partnership Packages",
      slugField: "tier",
      path: "content/packages/*",
      columns: ["price", "currency", "highlight"],
      schema: {
        tier: fields.slug({ name: { label: "Tier name" } }),
        price: fields.text({ label: "Price" }),
        currency: fields.text({ label: "Currency", defaultValue: "OMR" }),
        highlight: fields.checkbox({ label: "Most popular", defaultValue: false }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Features",
          itemLabel: (props) => props.value || "Feature",
        }),
      },
    }),

    agenda: collection({
      label: "Summit Agenda",
      slugField: "title",
      path: "content/agenda/*",
      columns: ["time", "type"],
      schema: {
        title: fields.slug({ name: { label: "Session title" } }),
        time: fields.text({ label: "Time (e.g. 10:00 AM)" }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "General", value: "general" },
            { label: "Keynote", value: "keynote" },
            { label: "Session", value: "session" },
            { label: "Break", value: "break" },
            { label: "Featured", value: "featured" },
          ],
          defaultValue: "session",
        }),
      },
    }),

    gallery: collection({
      label: "Media Gallery",
      slugField: "title",
      path: "content/gallery/*",
      columns: ["caption", "imageSrc"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        caption: fields.text({ label: "Caption" }),
        imageSrc: fields.text({
          label: "Image path (e.g. /images/gallery/mosque.jpg)",
        }),
        image: fields.image({
          label: "Or upload image",
          directory: "public/images/cms/gallery",
          publicPath: "/images/cms/gallery/",
        }),
      },
    }),

    videos: collection({
      label: "Media Videos",
      slugField: "title",
      path: "content/videos/*",
      columns: ["tag", "imageSrc"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        tag: fields.text({ label: "Tag", defaultValue: "COMING SOON" }),
        imageSrc: fields.text({
          label: "Thumbnail path (e.g. /images/hero/oman-muscat.jpg)",
        }),
        image: fields.image({
          label: "Or upload thumbnail",
          directory: "public/images/cms/videos",
          publicPath: "/images/cms/videos/",
        }),
      },
    }),

    press: collection({
      label: "Press Releases",
      slugField: "title",
      path: "content/press/*",
      columns: ["date"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.text({ label: "Date label", defaultValue: "Coming Soon" }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
      },
    }),

    values: collection({
      label: "About Values",
      slugField: "title",
      path: "content/values/*",
      columns: ["icon"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        icon: fields.select({
          label: "Icon",
          options: [
            { label: "Target", value: "Target" },
            { label: "Globe", value: "Globe" },
            { label: "Handshake", value: "Handshake" },
            { label: "Heart", value: "Heart" },
            { label: "Eye", value: "Eye" },
            { label: "TrendingUp", value: "TrendingUp" },
          ],
          defaultValue: "Target",
        }),
      },
    }),
  },
});
