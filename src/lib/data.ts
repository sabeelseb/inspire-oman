export const siteConfig = {
  name: "Inspire Oman",
  tagline: "Telling Oman's Growth Story Globally",
  slogan: "Celebrating Success. Creating Legacy. Inspiring Investment.",
  description:
    "A prestigious integrated initiative aligned with Oman Vision 2040, celebrating contributions of Oman's business community and enabling future collaborations.",
  summitDate: "11 October 2026",
  venue: "Oman Convention & Exhibition Centre",
  partners: {
    strategic: "Oman Chamber of Commerce & Industry (OCCI)",
    initiative: "Gulf Madhyamam",
    execution: "mefriend",
  },
  images: {
    logo: "/images/logos/IO-logo.svg",
    banner: "/images/logos/inspire-oman-banner.jpg",
    hero: "/images/hero/oman-muscat.jpg",
    summit: "/images/hero/business-summit.jpg",
    brandBanner: "/images/hero/inspire-banner.jpg",
  },
  header: {
    brandPrimary: "Inspire",
    brandHighlight: "Oman",
    ctaLabel: "Partner With Us",
    ctaHref: "/partner",
    navLinks: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/pillars", label: "Pillars" },
      { href: "/summit", label: "Summit 2026" },
      { href: "/partner", label: "Partner With Us" },
      { href: "/media", label: "Media" },
      { href: "/contact", label: "Contact" },
    ],
  },
  partnerLogos: [
    {
      name: "OCCI",
      role: "Strategic Partner",
      src: "/images/logos/OCC-logo.svg",
      fullName: "Oman Chamber of Commerce & Industry",
      bg: "light",
    },
    {
      name: "Gulf Madhyamam",
      role: "Initiative By",
      src: "/images/logos/GM-logo.png",
      fullName: "Gulf Madhyamam L.L.C.",
      bg: "dark",
    },
    {
      name: "mefriend",
      role: "Execution Partner",
      src: "/images/logos/MF-logo.svg",
      fullName: "mefriend - Where Brands Find Solutions",
      bg: "dark",
    },
  ],
  galleryImages: [
    {
      src: "/images/gallery/mosque.jpg",
      title: "Oman's Heritage",
      caption: "Celebrating culture and national vision",
    },
    {
      src: "/images/gallery/networking.jpg",
      title: "Business Networking",
      caption: "Creating meaningful connections that drive growth",
    },
    {
      src: "/images/gallery/keynote.jpg",
      title: "Keynote Sessions",
      caption: "Visionary talks from industry leaders",
    },
    {
      src: "/images/gallery/award.jpg",
      title: "Award Ceremony",
      caption: "Recognizing excellence in business achievement",
    },
    {
      src: "/images/gallery/conference.jpg",
      title: "Investors Summit",
      caption: "Leaders gathering under one roof",
    },
    {
      src: "/images/gallery/handshake.jpg",
      title: "Partnerships",
      caption: "Building lasting business collaborations",
    },
    {
      src: "/images/gallery/skyline.jpg",
      title: "Global Ambition",
      caption: "Positioning Oman on the world stage",
    },
    {
      src: "/images/gallery/investment.jpg",
      title: "Investment Growth",
      caption: "Unlocking opportunities aligned with Vision 2040",
    },
  ],
  contact: {
    oman: {
      phone1: "+968 9916 8230",
      phone2: "+968 7738 5585",
      email: "inspireoman@gulfmadhyamam.net",
      label: "Oman",
    },
    india: {
      phone: "+91 9645 009444",
      email: "events@madhyamam.com",
      label: "India",
    },
  },
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    twitter: "#",
    youtube: "#",
  },
};

export const stats = [
  { value: 500, suffix: "+", label: "Expected Attendees" },
  { value: 25, suffix: "+", label: "Keynote Speakers" },
  { value: 50, suffix: "+", label: "Partner Brands" },
  { value: 15, suffix: "+", label: "Countries" },
];

export const pillars = [
  {
    id: "legacy",
    title: "Legacy Documenting",
    subtitle: "Premium Publication",
    description:
      "A prestigious coffee-table publication documenting the journeys, achievements, and contributions of Oman's most inspiring business leaders and entrepreneurs. Each story is a testament to vision, resilience, and impact.",
    icon: "BookOpen",
    features: [
      "Premium quality hardbound publication",
      "Professional photography and editorial",
      "Distribution to key stakeholders and embassies",
      "Permanent record of business excellence",
    ],
  },
  {
    id: "campaign",
    title: "Celebrating the Experience",
    subtitle: "Digital Campaign",
    description:
      "A dynamic digital video and social media campaign that amplifies the stories of Oman's business community, reaching global audiences and inspiring the next generation of entrepreneurs and investors.",
    icon: "Video",
    features: [
      "Professional video production",
      "Social media amplification",
      "Global digital reach",
      "Compelling storytelling format",
    ],
  },
  {
    id: "summit",
    title: "Investors Summit",
    subtitle: "11 October 2026",
    description:
      "The flagship Inspire Oman Investors Summit brings together CEOs, investors, government leaders, and entrepreneurs for visionary keynotes, industry discussions, and high-value networking opportunities.",
    icon: "Landmark",
    features: [
      "Visionary keynote sessions",
      "Government-private collaboration",
      "Investment opportunity showcase",
      "Premium networking experiences",
    ],
  },
];

export const packages = [
  {
    tier: "Associate",
    price: "1,000",
    currency: "OMR",
    color: "from-zinc-600 to-zinc-700",
    features: [
      "1 full page in publication",
      "45-second brand video",
      "2 summit official entries",
      "Logo on event materials",
      "Basic networking access",
    ],
    highlight: false,
  },
  {
    tier: "Leadership",
    price: "2,000",
    currency: "OMR",
    color: "from-gold-dark to-gold",
    features: [
      "2 full pages in publication",
      "90-second brand video",
      "5 summit official entries",
      "Premium logo placement",
      "Priority networking access",
      "Media coverage inclusion",
    ],
    highlight: true,
  },
  {
    tier: "Premier",
    price: "3,000",
    currency: "OMR",
    color: "from-gold to-gold-light",
    features: [
      "3 full pages in publication",
      "3-5 minute brand film",
      "8 summit official entries",
      "Title sponsor branding",
      "VIP networking & lounge",
      "Keynote stage mention",
      "Full media package",
    ],
    highlight: false,
  },
];

export const speakers = [
  {
    name: "Arfeen Khan",
    role: "Transformational Speaker",
    description:
      "Internationally acclaimed peak performance strategist and transformational coach. Featured speaker delivering a special session on unlocking human potential and business excellence.",
    featured: true,
  },
  {
    name: "Guest Speaker",
    role: "Government Representative",
    description: "Senior government official sharing Oman's Vision 2040 roadmap and investment opportunities.",
    featured: false,
  },
  {
    name: "Guest Speaker",
    role: "Industry Leader",
    description: "Prominent business leader discussing cross-border investment and the Oman-India business corridor.",
    featured: false,
  },
  {
    name: "Guest Speaker",
    role: "Innovation Expert",
    description: "Technology and innovation expert exploring Oman's emerging startup ecosystem.",
    featured: false,
  },
];

export const agenda = [
  { time: "09:00 AM", title: "Registration & Welcome Coffee", type: "general" },
  { time: "10:00 AM", title: "Opening Ceremony & Keynote Address", type: "keynote" },
  { time: "10:45 AM", title: "Oman Vision 2040 - Investment Landscape", type: "session" },
  { time: "11:30 AM", title: "Networking Break", type: "break" },
  { time: "12:00 PM", title: "Industry Panel: Cross-Border Opportunities", type: "session" },
  { time: "01:00 PM", title: "Lunch & Business Networking", type: "break" },
  { time: "02:30 PM", title: "Special Session by Arfeen Khan", type: "featured" },
  { time: "04:00 PM", title: "Partner Showcase & Recognition", type: "session" },
  { time: "05:00 PM", title: "Awards Ceremony & Closing", type: "keynote" },
  { time: "06:00 PM", title: "Gala Dinner & Networking", type: "general" },
];

export const navLinks = siteConfig.header.navLinks;

export const testimonials = [
  {
    quote: "Inspire Oman represents a transformative platform that bridges cultures and creates meaningful business connections across borders.",
    author: "Business Leader",
    role: "CEO, International Trade",
  },
  {
    quote: "The Vision 2040 alignment makes this initiative uniquely positioned to drive real economic impact in the region.",
    author: "Investment Director",
    role: "Regional Fund Manager",
  },
  {
    quote: "A remarkable opportunity to document and celebrate the entrepreneurial spirit that drives Oman's economic diversification.",
    author: "Media Executive",
    role: "Gulf Madhyamam",
  },
];
