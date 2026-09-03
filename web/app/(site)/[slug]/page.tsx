import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { isNextProductionBuild } from "@/lib/next-build-phase";
import { getPublishedPageBySlug } from "@/lib/puck-pages";
import { isProductSlug } from "@/lib/products";

/** Payload Local API — no DB at Docker build time. */
export const dynamic = "force-dynamic";

/** Reserved single-segment routes handled elsewhere. */
const RESERVED = new Set([
  "blog",
  "product",
  "docs",
  "puck-demo",
  "home",
  "admin",
  "api",
]);

type MarketingPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: MarketingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);
  if (!page) return { title: "StackGen" };
  const meta = page.meta as { title?: string; description?: string } | undefined;
  return {
    title: meta?.title ?? page.title ?? "StackGen",
    description: meta?.description,
  };
}

export default async function MarketingPage({ params }: MarketingPageProps) {
  const { slug } = await params;

  if (RESERVED.has(slug) || isProductSlug(slug)) {
    notFound();
  }

  const page = await getPublishedPageBySlug(slug);
  if (!page?.puckData || page.isHomepage) {
    if (isNextProductionBuild()) {
      return (
        <main className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-neutral-500">
          Content loads at runtime.
        </main>
      );
    }
    notFound();
  }

  return <PuckSitePage data={page.puckData as Data} />;
}
