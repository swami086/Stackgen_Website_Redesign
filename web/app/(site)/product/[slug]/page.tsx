import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Data } from "@puckeditor/core";
import { ProductPage } from "@/components/replica/ProductPage";
import { PuckSitePage } from "@/components/puck/PuckSitePage";
import { getProduct, isProductSlug } from "@/lib/products";
import { getCardsRaw, getFaqsRaw, getOverlayProductContent, getProductRaw } from "@/lib/cms";
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

  if (!isProductSlug(slug)) {
    notFound();
  }

  const product = getProduct(slug);
  if (!product) {
    notFound();
  }

  const puckPage = await getPublishedPageBySlug(slug);
  if (puckPage?.puckData) {
    return <PuckSitePage data={puckPage.puckData as Data} />;
  }

  const [content, rawProduct, cards, faqs] = await Promise.all([
    getOverlayProductContent(slug),
    getProductRaw(slug),
    getCardsRaw(),
    getFaqsRaw(),
  ]);
  return (
    <ProductPage
      slug={slug}
      content={content}
      rawProduct={rawProduct}
      cards={cards}
      faqs={faqs}
    />
  );
}
