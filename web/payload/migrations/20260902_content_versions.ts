import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Enable versions + drafts + autosave for cards, posts, products, faqs, home.
 * Idempotent: safe when schema was already pushed via local `dev` migrate.
 * Backfills existing rows to published so the public site keeps serving content.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
DO $$ BEGIN
  CREATE TYPE "public"."enum_cards_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__cards_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_faqs_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__faqs_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE "cards" ADD COLUMN IF NOT EXISTS "_status" "enum_cards_status" DEFAULT 'draft';
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "_status" "enum_posts_status" DEFAULT 'draft';
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "_status" "enum_products_status" DEFAULT 'draft';
ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "_status" "enum_faqs_status" DEFAULT 'draft';
ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "_status" "enum_home_status" DEFAULT 'draft';

CREATE TABLE IF NOT EXISTS "_cards_v" (
  "id" serial PRIMARY KEY NOT NULL,
  "parent_id" integer,
  "version_slot" varchar,
  "version_title" varchar,
  "version_label" varchar,
  "version_body" varchar,
  "version_href" varchar,
  "version_product_slug" varchar,
  "version_updated_at" timestamp(3) with time zone,
  "version_created_at" timestamp(3) with time zone,
  "version__status" "enum__cards_v_version_status" DEFAULT 'draft',
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "latest" boolean,
  "autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_posts_v" (
  "id" serial PRIMARY KEY NOT NULL,
  "parent_id" integer,
  "version_slug" varchar,
  "version_name" varchar,
  "version_excerpt" varchar,
  "version_body" varchar,
  "version_published_on_2" timestamp(3) with time zone,
  "version_updated_at" timestamp(3) with time zone,
  "version_created_at" timestamp(3) with time zone,
  "version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "latest" boolean,
  "autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_products_v" (
  "id" serial PRIMARY KEY NOT NULL,
  "parent_id" integer,
  "version_slug" varchar,
  "version_hero_heading" varchar,
  "version_hero_subhead" varchar,
  "version_problem_heading" varchar,
  "version_problem_body" varchar,
  "version_final_cta_heading" varchar,
  "version_final_cta_subhead" varchar,
  "version_faq_heading" varchar,
  "version_updated_at" timestamp(3) with time zone,
  "version_created_at" timestamp(3) with time zone,
  "version__status" "enum__products_v_version_status" DEFAULT 'draft',
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "latest" boolean,
  "autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_faqs_v" (
  "id" serial PRIMARY KEY NOT NULL,
  "parent_id" integer,
  "version_product_slug" varchar,
  "version_question" varchar,
  "version_answer" varchar,
  "version_updated_at" timestamp(3) with time zone,
  "version_created_at" timestamp(3) with time zone,
  "version__status" "enum__faqs_v_version_status" DEFAULT 'draft',
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "latest" boolean,
  "autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_home_v" (
  "id" serial PRIMARY KEY NOT NULL,
  "version_hero_heading" varchar,
  "version_hero_sub" varchar,
  "version_hero_primary_cta" varchar,
  "version_hero_secondary_cta" varchar,
  "version_logos_eyebrow" varchar,
  "version_problem_eyebrow" varchar,
  "version_problem_heading" varchar,
  "version_problem_body" varchar,
  "version_problem_punchline" varchar,
  "version_problem_film_caption" varchar,
  "version_solution_eyebrow" varchar,
  "version_solution_heading" varchar,
  "version_solution_body" varchar,
  "version_solution_claim" varchar,
  "version_assemblies_eyebrow" varchar,
  "version_assemblies_heading" varchar,
  "version_assemblies_body" varchar,
  "version_shell_eyebrow" varchar,
  "version_shell_heading" varchar,
  "version_shell_body_1" varchar,
  "version_shell_body_2" varchar,
  "version_who_eyebrow" varchar,
  "version_who_heading" varchar,
  "version_who_sub" varchar,
  "version_who_os_title" varchar,
  "version_footer_cta_heading" varchar,
  "version_footer_cta_sub" varchar,
  "version_footer_cta" varchar,
  "version_footer_brand" varchar,
  "version_footer_legal" varchar,
  "version__status" "enum__home_v_version_status" DEFAULT 'draft',
  "version_updated_at" timestamp(3) with time zone,
  "version_created_at" timestamp(3) with time zone,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "latest" boolean,
  "autosave" boolean
);

DO $$ BEGIN
  ALTER TABLE "_cards_v" ADD CONSTRAINT "_cards_v_parent_id_cards_id_fk"
    FOREIGN KEY ("parent_id") REFERENCES "public"."cards"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk"
    FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk"
    FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  ALTER TABLE "_faqs_v" ADD CONSTRAINT "_faqs_v_parent_id_faqs_id_fk"
    FOREIGN KEY ("parent_id") REFERENCES "public"."faqs"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE INDEX IF NOT EXISTS "cards__status_idx" ON "cards" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "products__status_idx" ON "products" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "faqs__status_idx" ON "faqs" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "home__status_idx" ON "home" USING btree ("_status");

CREATE INDEX IF NOT EXISTS "_cards_v_parent_idx" ON "_cards_v" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_cards_v_version_version__status_idx" ON "_cards_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_cards_v_created_at_idx" ON "_cards_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_cards_v_updated_at_idx" ON "_cards_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_cards_v_latest_idx" ON "_cards_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_cards_v_autosave_idx" ON "_cards_v" USING btree ("autosave");

CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");

CREATE INDEX IF NOT EXISTS "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
CREATE INDEX IF NOT EXISTS "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");

CREATE INDEX IF NOT EXISTS "_faqs_v_parent_idx" ON "_faqs_v" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "_faqs_v_version_version__status_idx" ON "_faqs_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_faqs_v_created_at_idx" ON "_faqs_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_faqs_v_updated_at_idx" ON "_faqs_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_faqs_v_latest_idx" ON "_faqs_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_faqs_v_autosave_idx" ON "_faqs_v" USING btree ("autosave");

CREATE INDEX IF NOT EXISTS "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
CREATE INDEX IF NOT EXISTS "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
CREATE INDEX IF NOT EXISTS "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
CREATE INDEX IF NOT EXISTS "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");

-- Pre-versions content was always live; publish so public reads keep working.
UPDATE "cards" SET "_status" = 'published';
UPDATE "posts" SET "_status" = 'published';
UPDATE "products" SET "_status" = 'published';
UPDATE "faqs" SET "_status" = 'published';
UPDATE "home" SET "_status" = 'published';
`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
DROP TABLE IF EXISTS "_cards_v" CASCADE;
DROP TABLE IF EXISTS "_posts_v" CASCADE;
DROP TABLE IF EXISTS "_products_v" CASCADE;
DROP TABLE IF EXISTS "_faqs_v" CASCADE;
DROP TABLE IF EXISTS "_home_v" CASCADE;
ALTER TABLE "cards" DROP COLUMN IF EXISTS "_status";
ALTER TABLE "posts" DROP COLUMN IF EXISTS "_status";
ALTER TABLE "products" DROP COLUMN IF EXISTS "_status";
ALTER TABLE "faqs" DROP COLUMN IF EXISTS "_status";
ALTER TABLE "home" DROP COLUMN IF EXISTS "_status";
DROP TYPE IF EXISTS "public"."enum_cards_status";
DROP TYPE IF EXISTS "public"."enum__cards_v_version_status";
DROP TYPE IF EXISTS "public"."enum_posts_status";
DROP TYPE IF EXISTS "public"."enum__posts_v_version_status";
DROP TYPE IF EXISTS "public"."enum_products_status";
DROP TYPE IF EXISTS "public"."enum__products_v_version_status";
DROP TYPE IF EXISTS "public"."enum_faqs_status";
DROP TYPE IF EXISTS "public"."enum__faqs_v_version_status";
DROP TYPE IF EXISTS "public"."enum_home_status";
DROP TYPE IF EXISTS "public"."enum__home_v_version_status";
`)
}
