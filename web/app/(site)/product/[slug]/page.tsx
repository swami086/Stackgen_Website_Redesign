import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/replica/ProductPage";
import { getProduct, isProductSlug } from "@/lib/products";
import { getOverlayProductContent, getProductRaw } from "@/lib/cms";

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

  const [content, rawProduct] = await Promise.all([
    getOverlayProductContent(slug),
    getProductRaw(slug),
  ]);
  return <ProductPage slug={slug} content={content} rawProduct={rawProduct} />;
}
