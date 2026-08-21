import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { EarlyAccessStrip } from "@/components/sections/product/EarlyAccessStrip";
import { FinalCta } from "@/components/sections/product/FinalCta";
import { Hero } from "@/components/sections/product/Hero";
import { KeyCapabilities } from "@/components/sections/product/KeyCapabilities";
import { Mechanism } from "@/components/sections/product/Mechanism";
import { Metrics } from "@/components/sections/product/Metrics";
import { Testimonial } from "@/components/sections/product/Testimonial";
import { products } from "@/content/products";
import { isProductSlug } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isProductSlug(slug)) return { title: "StackGen" };
  return { title: `${products[slug].hero.heading} | StackGen` };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  if (!isProductSlug(slug)) notFound();

  const product = products[slug];

  return (
    <main className="bg-bg text-text-primary">
      <Hero hero={product.hero} />
      <Metrics metrics={product.metrics} />
      <KeyCapabilities capabilities={product.capabilities} />
      <Mechanism mechanism={product.mechanism} />
      {product.earlyAccess ? (
        <EarlyAccessStrip earlyAccess={product.earlyAccess} />
      ) : null}
      <Testimonial testimonial={product.testimonial} />
      <FinalCta finalCta={product.finalCta} />
      <Footer
        columns={product.footer.columns}
        tagline={product.footer.tagline}
        copyright={product.footer.copyright}
      />
    </main>
  );
}
