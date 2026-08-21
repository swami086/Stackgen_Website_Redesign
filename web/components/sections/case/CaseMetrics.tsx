// STUB
import type { Metric, SectionProps } from '@/lib/types';

export function CaseMetrics({ content }: SectionProps<Metric[]>) {
  return (
    <section aria-labelledby="case-metrics-heading" data-stub="CaseMetrics">
      <h2 id="case-metrics-heading">Metrics</h2>
      <p>{content[0]?.value}</p>
    </section>
  );
}
