// STUB
import type { SectionProps } from '@/lib/types';
import productInfrastructure from '@/content/product-infrastructure';

type EarlyAccessContent = NonNullable<typeof productInfrastructure.earlyAccess>;

export function EarlyAccessStrip({ content }: SectionProps<EarlyAccessContent>) {
  return (
    <section aria-labelledby="early-access-heading" data-stub="EarlyAccessStrip">
      <h2 id="early-access-heading">{content.heading}</h2>
    </section>
  );
}
