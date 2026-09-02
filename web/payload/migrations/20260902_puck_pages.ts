import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_pages_page_layout" AS ENUM('default', 'landing', 'full-width');
  CREATE TYPE "public"."enum_pages_editor_version" AS ENUM('legacy', 'puck');
  CREATE TYPE "public"."enum_pages_conversion_tracking_conversion_type" AS ENUM('lead', 'registration', 'purchase', 'donation', 'newsletter', 'contact', 'custom');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_page_layout" AS ENUM('default', 'landing', 'full-width');
  CREATE TYPE "public"."enum__pages_v_version_editor_version" AS ENUM('legacy', 'puck');
  CREATE TYPE "public"."enum__pages_v_version_conversion_tracking_conversion_type" AS ENUM('lead', 'registration', 'purchase', 'donation', 'newsletter', 'contact', 'custom');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');

  CREATE TABLE "puck_templates" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "description" varchar,
    "category" varchar,
    "content" jsonb NOT NULL,
    "thumbnail" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar,
    "slug" varchar,
    "page_layout" "enum_pages_page_layout" DEFAULT 'default',
    "editor_version" "enum_pages_editor_version",
    "is_homepage" boolean DEFAULT false,
    "puck_data" jsonb,
    "meta_title" varchar,
    "meta_description" varchar,
    "meta_image_id" integer,
    "meta_noindex" boolean DEFAULT false,
    "meta_nofollow" boolean DEFAULT false,
    "meta_exclude_from_sitemap" boolean DEFAULT false,
    "conversion_tracking_is_conversion_page" boolean DEFAULT false,
    "conversion_tracking_conversion_type" "enum_pages_conversion_tracking_conversion_type",
    "conversion_tracking_conversion_value" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "_status" "enum_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE "_pages_v" (
    "id" serial PRIMARY KEY NOT NULL,
    "parent_id" integer,
    "version_title" varchar,
    "version_slug" varchar,
    "version_page_layout" "enum__pages_v_version_page_layout" DEFAULT 'default',
    "version_editor_version" "enum__pages_v_version_editor_version",
    "version_is_homepage" boolean DEFAULT false,
    "version_puck_data" jsonb,
    "version_meta_title" varchar,
    "version_meta_description" varchar,
    "version_meta_image_id" integer,
    "version_meta_noindex" boolean DEFAULT false,
    "version_meta_nofollow" boolean DEFAULT false,
    "version_meta_exclude_from_sitemap" boolean DEFAULT false,
    "version_conversion_tracking_is_conversion_page" boolean DEFAULT false,
    "version_conversion_tracking_conversion_type" "enum__pages_v_version_conversion_tracking_conversion_type",
    "version_conversion_tracking_conversion_value" numeric DEFAULT 0,
    "version_updated_at" timestamp(3) with time zone,
    "version_created_at" timestamp(3) with time zone,
    "version__status" "enum__pages_v_version_status" DEFAULT 'draft',
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "latest" boolean
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "puck_templates_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;

  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_puck_templates_fk" FOREIGN KEY ("puck_templates_id") REFERENCES "public"."puck_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;

  CREATE INDEX "puck_templates_updated_at_idx" ON "puck_templates" USING btree ("updated_at");
  CREATE INDEX "puck_templates_created_at_idx" ON "puck_templates" USING btree ("created_at");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "payload_locked_documents_rels_puck_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("puck_templates_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_pages_fk";
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_puck_templates_fk";
  ALTER TABLE "_pages_v" DROP CONSTRAINT IF EXISTS "_pages_v_version_meta_image_id_media_id_fk";
  ALTER TABLE "_pages_v" DROP CONSTRAINT IF EXISTS "_pages_v_parent_id_pages_id_fk";
  ALTER TABLE "pages" DROP CONSTRAINT IF EXISTS "pages_meta_image_id_media_id_fk";

  DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_puck_templates_id_idx";
  DROP TABLE IF EXISTS "_pages_v" CASCADE;
  DROP TABLE IF EXISTS "pages" CASCADE;
  DROP TABLE IF EXISTS "puck_templates" CASCADE;

  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "pages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "puck_templates_id";

  DROP TYPE IF EXISTS "public"."enum__pages_v_version_status";
  DROP TYPE IF EXISTS "public"."enum__pages_v_version_conversion_tracking_conversion_type";
  DROP TYPE IF EXISTS "public"."enum__pages_v_version_editor_version";
  DROP TYPE IF EXISTS "public"."enum__pages_v_version_page_layout";
  DROP TYPE IF EXISTS "public"."enum_pages_status";
  DROP TYPE IF EXISTS "public"."enum_pages_conversion_tracking_conversion_type";
  DROP TYPE IF EXISTS "public"."enum_pages_editor_version";
  DROP TYPE IF EXISTS "public"."enum_pages_page_layout";
  `)
}
