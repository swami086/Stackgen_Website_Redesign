import { MetricCell } from '@/components/primitives/MetricCell';
import { Reveal } from '@/components/motion/Reveal';
import type { Metric, SectionProps } from '@/lib/types';

// Canvas `UUADq` is 137px: 32 padding, one 73px metric row, 32 padding.
export function CaseMetrics({ content }: SectionProps<Metric[]>) {
  return (
    <section aria-labelledby="case-metrics-heading" className="bg-bg-base px-pad-x py-8">
      <h2 id="case-metrics-heading" className="sr-only">
        Metrics
      </h2>
      <Reveal>
        <ul className="mx-auto grid max-w-[1240px] grid-cols-2 gap-8 min-[768px]:flex">
          {content.map((metric) => (
            <li key={`${metric.value}-${metric.label}`} className="min-w-0 flex-1">
              <MetricCell metric={metric} compact />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
