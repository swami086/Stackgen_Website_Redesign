import { notFound } from 'next/navigation';
import { Nav } from '@/components/primitives/Nav';
import { Footer } from '@/components/primitives/Footer';
import { ProductHero } from '@/components/sections/product/ProductHero';
import { ProductMetrics } from '@/components/sections/product/ProductMetrics';
import { ProductMechanism } from '@/components/sections/product/ProductMechanism';
import { EarlyAccessStrip } from '@/components/sections/product/EarlyAccessStrip';
import { ProductFinalCta } from '@/components/sections/product/ProductFinalCta';
import infrastructure from '@/content/product-infrastructure';
import automation from '@/content/product-automation';
import observability from '@/content/product-observability';
import sre from '@/content/product-sre';

const PRODUCTS = {
  'aiden-for-infrastructure': infrastructure,
  'aiden-for-automation': automation,
  'aiden-for-observability': observability,
  'aiden-for-sre': sre,
} as const;

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS[slug as keyof typeof PRODUCTS];
  if (!product) notFound();

  return (
    <>
      <Nav />
      <main>
        <ProductHero content={product.hero} />
        <ProductMetrics content={product.metrics} />
        <ProductMechanism content={product.mechanism} slug={slug} />
        {product.earlyAccess && <EarlyAccessStrip content={product.earlyAccess} />}
        <ProductFinalCta content={product.finalCta} />
      </main>
      <Footer />
    </>
  );
}
