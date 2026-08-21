import { MetricCell } from '@/components/primitives/MetricCell';
import { Reveal } from '@/components/motion/Reveal';
import type { Metric, SectionProps } from '@/lib/types';

export function CaseMetrics({ content }: SectionProps<Metric[]>) {
  return (
    <section aria-labelledby="case-metrics-heading" className="bg-bg-base px-pad-x py-pad-y">
      <h2 id="case-metrics-heading" className="sr-only">
        Metrics
      </h2>
      <Reveal>
        <ul className="mx-auto flex max-w-[1240px] flex-wrap gap-12">
          {content.map((metric) => (
            <li key={`${metric.value}-${metric.label}`} className="min-w-[240px] flex-1">
              <MetricCell metric={metric} compact />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
