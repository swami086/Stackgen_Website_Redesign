import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { getProduct, isProductSlug } from "@/lib/products";
import { getOverlayProductContent } from "@/lib/cms";
import { isNextProductionBuild } from "@/lib/next-build-phase";
import { getPublishedPageBySlug } from "@/lib/puck-pages";

/** Payload Local API — no DB at Docker build time. */
export const dynamic = "force-dynamic";

type ProductRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) {
    return { title: "StackGen" };
  }
  const content = await getOverlayProductContent(slug);
  return {
    title: `${content.hero.heading} | StackGen`,
    description: content.hero.subhead,
  };
}

export default async function ProductRoutePage({ params }: ProductRoutePageProps) {
  const { slug } = await params;

  if (!isProductSlug(slug) || !getProduct(slug)) {
    notFound();
  }

  const puckPage = await getPublishedPageBySlug(slug);
  if (!puckPage?.puckData) {
    if (isNextProductionBuild()) {
      return (
        <main className="flex min-h-[40vh] items-center justify-center p-8 text-sm text-neutral-500">
          Content loads at runtime.
        </main>
      );
    }
    notFound();
  }

  return <PuckSitePage data={puckPage.puckData as Data} />;
}
