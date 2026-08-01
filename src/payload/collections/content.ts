import type { CollectionConfig } from "payload";

const draftVersions = {
  drafts: true,
} as const;

export const Partners: CollectionConfig = {
  slug: "partners",
  admin: {
    useAsTitle: "name",
    group: "Site content",
    defaultColumns: ["name", "role", "fullName", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "name", type: "text", required: true, label: "Short name" },
    { name: "slug", type: "text", required: true, unique: true, label: "Slug" },
    { name: "role", type: "text", label: "Role (e.g. Strategic Partner)" },
    { name: "fullName", type: "text", label: "Full organisation name" },
    {
      name: "bg",
      type: "select",
      defaultValue: "dark",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
      ],
      label: "Logo background",
    },
    {
      name: "logoSrc",
      type: "text",
      label: "Logo path (e.g. /images/logos/OCC-logo.svg)",
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Or upload logo",
    },
    { name: "order", type: "number", defaultValue: 1, label: "Display order" },
  ],
};

export const Stats: CollectionConfig = {
  slug: "stats",
  admin: {
    useAsTitle: "label",
    group: "Site content",
    defaultColumns: ["label", "value", "suffix", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "label", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "value", type: "number", defaultValue: 0, label: "Number" },
    { name: "suffix", type: "text", defaultValue: "+", label: "Suffix (e.g. +)" },
  ],
};

export const Speakers: CollectionConfig = {
  slug: "speakers",
  admin: {
    useAsTitle: "name",
    group: "Site content",
    defaultColumns: ["name", "role", "featured", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "role", type: "text", label: "Role / title" },
    { name: "description", type: "textarea" },
    { name: "featured", type: "checkbox", defaultValue: false, label: "Featured speaker" },
  ],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    group: "Site content",
    defaultColumns: ["author", "role", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "author", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "role", type: "text" },
    { name: "quote", type: "textarea" },
  ],
};

export const Pillars: CollectionConfig = {
  slug: "pillars",
  admin: {
    useAsTitle: "title",
    group: "Site content",
    defaultColumns: ["title", "subtitle", "icon", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "subtitle", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "icon",
      type: "select",
      defaultValue: "BookOpen",
      options: [
        { label: "Book", value: "BookOpen" },
        { label: "Video", value: "Video" },
        { label: "Landmark", value: "Landmark" },
      ],
    },
    {
      name: "features",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "extras",
      type: "array",
      label: "Pillar page highlight cards",
      fields: [{ name: "item", type: "text", required: true }],
    },
  ],
};

export const Packages: CollectionConfig = {
  slug: "packages",
  labels: { singular: "Partnership Package", plural: "Partnership Packages" },
  admin: {
    useAsTitle: "tier",
    group: "Site content",
    defaultColumns: ["tier", "price", "currency", "highlight", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "tier", type: "text", required: true, label: "Tier name" },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "price", type: "text" },
    { name: "currency", type: "text", defaultValue: "OMR" },
    { name: "highlight", type: "checkbox", defaultValue: false, label: "Most popular" },
    {
      name: "features",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
  ],
};

export const Values: CollectionConfig = {
  slug: "values",
  labels: { singular: "About Value", plural: "About Values" },
  admin: {
    useAsTitle: "title",
    group: "Site content",
    defaultColumns: ["title", "icon", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea" },
    {
      name: "icon",
      type: "select",
      defaultValue: "Target",
      options: [
        { label: "Target", value: "Target" },
        { label: "Globe", value: "Globe" },
        { label: "Handshake", value: "Handshake" },
        { label: "Heart", value: "Heart" },
        { label: "Eye", value: "Eye" },
        { label: "TrendingUp", value: "TrendingUp" },
      ],
    },
  ],
};

export const Agenda: CollectionConfig = {
  slug: "agenda",
  labels: { singular: "Summit Agenda item", plural: "Summit Agenda" },
  admin: {
    useAsTitle: "title",
    group: "Summit & media",
    defaultColumns: ["title", "time", "type", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "title", type: "text", required: true, label: "Session title" },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "time", type: "text", label: "Time (e.g. 10:00 AM)" },
    {
      name: "type",
      type: "select",
      defaultValue: "session",
      options: [
        { label: "General", value: "general" },
        { label: "Keynote", value: "keynote" },
        { label: "Session", value: "session" },
        { label: "Break", value: "break" },
        { label: "Featured", value: "featured" },
      ],
    },
  ],
};

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: { singular: "Gallery item", plural: "Media Gallery" },
  admin: {
    useAsTitle: "title",
    group: "Summit & media",
    defaultColumns: ["title", "caption", "imageSrc", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "caption", type: "text" },
    {
      name: "imageSrc",
      type: "text",
      label: "Image path (e.g. /images/gallery/mosque.jpg)",
    },
    { name: "image", type: "upload", relationTo: "media", label: "Or upload image" },
  ],
};

export const Videos: CollectionConfig = {
  slug: "videos",
  labels: { singular: "Video", plural: "Media Videos" },
  admin: {
    useAsTitle: "title",
    group: "Summit & media",
    defaultColumns: ["title", "tag", "imageSrc", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "description", type: "textarea" },
    { name: "tag", type: "text", defaultValue: "COMING SOON" },
    {
      name: "imageSrc",
      type: "text",
      label: "Thumbnail path (e.g. /images/hero/oman-muscat.jpg)",
    },
    { name: "image", type: "upload", relationTo: "media", label: "Or upload thumbnail" },
  ],
};

export const Press: CollectionConfig = {
  slug: "press",
  labels: { singular: "Press Release", plural: "Press Releases" },
  admin: {
    useAsTitle: "title",
    group: "Summit & media",
    defaultColumns: ["title", "date", "_status"],
  },
  versions: draftVersions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "date", type: "text", defaultValue: "Coming Soon", label: "Date label" },
    { name: "excerpt", type: "textarea" },
  ],
};
