import { notFound } from "next/navigation";
import { ProductPage } from "@/components/replica/ProductPage";
import { getProduct, isProductSlug } from "@/lib/products";

type ProductRoutePageProps = {
  params: Promise<{ slug: string }>;
};

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
