import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPage } from "@/components/replica/ProductPage";
import { getProductContent } from "@/content/products";
import { getProduct, isProductSlug } from "@/lib/products";

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
  const content = getProductContent(slug);
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

  return <ProductPage slug={slug} />;
}
