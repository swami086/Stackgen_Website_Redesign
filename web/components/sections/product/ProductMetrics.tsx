// STUB
import type { Metric, SectionProps } from '@/lib/types';

export function ProductMetrics({ content }: SectionProps<Metric[]>) {
  return (
    <section aria-labelledby="product-metrics-heading" data-stub="ProductMetrics">
      <h2 id="product-metrics-heading">Metrics</h2>
      <p>{content[0]?.value}</p>
    </section>
  );
}
