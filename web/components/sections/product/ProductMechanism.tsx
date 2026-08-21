// STUB
import type { SectionProps } from '@/lib/types';
import productInfrastructure from '@/content/product-infrastructure';

type ProductMechanismContent = typeof productInfrastructure.mechanism;

export function ProductMechanism({
  content,
  slug,
}: SectionProps<ProductMechanismContent> & { slug: string }) {
  return (
    <section aria-labelledby="product-mechanism-heading" data-stub="ProductMechanism">
      <h2 id="product-mechanism-heading">{content.heading}</h2>
      <p data-slug={slug} />
    </section>
  );
}
