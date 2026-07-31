import { config, fields, collection, singleton } from "@keystatic/core";

/**
 * Keystatic CMS - content stored as files in Git (content/).
 * Admin UI: http://localhost:3000/keystatic
 *
 * Local mode for now. Later switch storage.kind to "github" for team edits on DigitalOcean.
 */
export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Inspire Oman CMS" },
  },
  singletons: {
    site: singleton({
      label: "Site Settings",
      path: "content/site",
      schema: {
        name: fields.text({ label: "Site name", defaultValue: "Inspire Oman" }),
        tagline: fields.text({
          label: "Tagline",
          defaultValue: "Telling Oman's Growth Story Globally",
        }),
        slogan: fields.text({
          label: "Slogan",
          defaultValue: "Celebrating Success. Creating Legacy. Inspiring Investment.",
        }),
        description: fields.text({
          label: "About description",
          multiline: true,
        }),
        summitDate: fields.text({
          label: "Summit date",
          defaultValue: "11 October 2026",
        }),
        venue: fields.text({
          label: "Venue",
          defaultValue: "Oman Convention & Exhibition Centre",
        }),
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
      },
    }),
  },
  collections: {
    partners: collection({
      label: "Partners",
      slugField: "name",
      path: "content/partners/*",
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
        logo: fields.image({
          label: "Logo",
          directory: "public/images/cms/partners",
          publicPath: "/images/cms/partners/",
        }),
      },
    }),
    stats: collection({
      label: "Stats",
      slugField: "label",
      path: "content/stats/*",
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
      schema: {
        author: fields.slug({ name: { label: "Author" } }),
        role: fields.text({ label: "Role" }),
        quote: fields.text({ label: "Quote", multiline: true }),
      },
    }),
  },
});
