// STUB
import type { SectionProps } from '@/lib/types';
import productInfrastructure from '@/content/product-infrastructure';

type ProductFinalCtaContent = typeof productInfrastructure.finalCta;

export function ProductFinalCta({ content }: SectionProps<ProductFinalCtaContent>) {
  return (
    <section aria-labelledby="product-final-cta-heading" data-stub="ProductFinalCta">
      <h2 id="product-final-cta-heading">{content.heading}</h2>
    </section>
  );
}
