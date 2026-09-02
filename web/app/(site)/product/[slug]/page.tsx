import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { getProduct, isProductSlug } from "@/lib/products";
import { getOverlayProductContent } from "@/lib/cms";
import { getPublishedPageBySlug } from "@/lib/puck-pages";

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
  if (!puckPage?.puckData) notFound();

  return <PuckSitePage data={puckPage.puckData as Data} />;
}
