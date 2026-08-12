/**
 * Add missing SQLite columns when Payload push fails on duplicate indexes.
 * Usage: npm run db:migrate-local
 */
import { createClient } from "@libsql/client";

const db = createClient({ url: process.env.DATABASE_URI || "file:./payload.db" });

async function columnExists(table: string, column: string) {
  const info = await db.execute(`PRAGMA table_info(${table})`);
  return info.rows.some((row) => String(row.name) === column);
}

async function addColumn(table: string, column: string, type = "TEXT") {
  if (await columnExists(table, column)) {
    console.log(`  skip ${table}.${column}`);
    return;
  }
  await db.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  console.log(`  added ${table}.${column}`);
}

async function main() {
  console.log("Migrating local SQLite schema…");

  const headerCols = [
    "register_widget_enabled",
    "register_widget_label",
    "register_widget_title",
    "register_widget_subtitle",
  ];
  for (const col of headerCols) {
    const sqlType = col === "register_widget_enabled" ? "INTEGER" : "TEXT";
    await addColumn("header", col, sqlType);
  }

  const homeCols = [
    "hero_occi_role",
    "hero_occi_title",
    "hero_occi_logo_src",
    "hero_occi_logo_id",
    "hero_mefriend_role",
    "hero_mefriend_title",
    "hero_mefriend_logo_src",
    "hero_mefriend_logo_id",
    "pillars_eyebrow",
    "pillars_title",
    "pillars_title_highlight",
    "pillars_subtitle",
    "pillars_learn_more_label",
    "pillars_learn_more_href",
    "summit_eyebrow",
    "summit_title",
    "summit_title_highlight",
    "summit_subtitle",
    "summit_expected_label",
    "summit_expected_value",
    "summit_featured_badge",
    "summit_featured_session_label",
    "summit_agenda_cta",
    "summit_agenda_href",
    "videos_eyebrow",
    "videos_title",
    "videos_title_highlight",
    "videos_subtitle",
    "testimonials_eyebrow",
    "testimonials_title",
    "testimonials_title_highlight",
    "testimonials_subtitle",
    "contact_eyebrow",
    "contact_title",
    "contact_title_highlight",
    "contact_subtitle",
  ];
  for (const col of homeCols) {
    const sqlType = col.endsWith("_id") ? "INTEGER" : "TEXT";
    await addColumn("home_page", col, sqlType);
  }

  const siteTypographyCols = [
    "typography_body_font_size",
    "typography_body_color",
    "typography_body_style",
  ];
  for (const col of siteTypographyCols) {
    await addColumn("site", col);
  }

  await addColumn("summit_registrations", "category", "TEXT");

  const siteRegistrationCols = [
    "registration_categories_vvip_label",
    "registration_categories_vvip_subtitle",
    "registration_categories_vvip_description",
    "registration_categories_vvip_badge",
    "registration_categories_vip_label",
    "registration_categories_vip_subtitle",
    "registration_categories_vip_description",
    "registration_categories_vip_badge",
    "registration_categories_media_label",
    "registration_categories_media_subtitle",
    "registration_categories_media_description",
    "registration_categories_media_badge",
  ];
  for (const col of siteRegistrationCols) {
    await addColumn("site", col);
  }

  const summitRegisterCols = [
    "register_eyebrow",
    "register_title",
    "register_title_highlight",
    "register_choose_subtitle",
    "register_form_subtitle",
  ];
  for (const col of summitRegisterCols) {
    await addColumn("summit_page", col);
  }

  const spotlightCols = [
    "spotlight_card1_keynote",
    "spotlight_card1_title",
    "spotlight_card1_description",
    "spotlight_card2_keynote",
    "spotlight_card2_title",
    "spotlight_card2_description",
    "spotlight_video_keynote",
    "spotlight_video_title",
    "spotlight_video_description",
    "spotlight_video_href",
    "spotlight_video_poster",
    "spotlight_video_view_more_label",
    "spotlight_video_view_more_href",
  ];
  for (const col of spotlightCols) {
    await addColumn("home_page", col);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
