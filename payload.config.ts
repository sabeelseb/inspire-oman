import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { GetInTouch } from "./src/payload/collections/GetInTouch";
import { SummitRegistrations } from "./src/payload/collections/SummitRegistrations";
import { PartnerApplications } from "./src/payload/collections/PartnerApplications";
import { Submissions } from "./src/payload/collections/Submissions";
import {
  Partners,
  Stats,
  Speakers,
  Testimonials,
  Pillars,
  Packages,
  Values,
  Agenda,
  Gallery,
  Videos,
  Press,
} from "./src/payload/collections/content";
import {
  Site,
  HomePage,
  AboutPage,
  PillarsPage,
  SummitPage,
  PartnerPage,
  MediaPage,
  ContactPage,
} from "./src/payload/globals/pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri =
  process.env.DATABASE_URI ||
  process.env.DATABASE_URL ||
  "file:./payload.db";

const isPostgres = /^postgres(ql)?:\/\//i.test(databaseUri);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Inspire Oman CMS",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/images/logos/IO-logo-white.svg",
        },
        {
          rel: "apple-touch-icon",
          url: "/images/logos/IO-logo-white.svg",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/src/payload/components/Logo#default",
        Icon: "/src/payload/components/Icon#default",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    GetInTouch,
    SummitRegistrations,
    PartnerApplications,
    Submissions,
    Partners,
    Stats,
    Speakers,
    Testimonials,
    Pillars,
    Packages,
    Values,
    Agenda,
    Gallery,
    Videos,
    Press,
  ],
  globals: [
    HomePage,
    AboutPage,
    PillarsPage,
    SummitPage,
    PartnerPage,
    MediaPage,
    ContactPage,
    Site,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "inspire-oman-dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
        },
        // Create/update tables on boot (needed for fresh droplet Postgres).
        // Set PAYLOAD_PUSH=false once you switch to formal migrations.
        push: process.env.PAYLOAD_PUSH !== "false",
      })
    : sqliteAdapter({
        client: {
          url: databaseUri,
        },
        push: process.env.PAYLOAD_PUSH !== "false",
      }),
  sharp,
});
