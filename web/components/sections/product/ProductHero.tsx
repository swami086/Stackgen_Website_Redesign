// components/sections/product/ProductHero.tsx — STUB
import type { SectionProps } from '@/lib/types';
import productInfrastructure from '@/content/product-infrastructure';

type ProductHeroContent = typeof productInfrastructure.hero;

export function ProductHero({ content }: SectionProps<ProductHeroContent>) {
  return (
    <section aria-labelledby="producthero-heading" data-stub="ProductHero">
      <h1 id="producthero-heading">{content.h1}</h1>
    </section>
  );
}
