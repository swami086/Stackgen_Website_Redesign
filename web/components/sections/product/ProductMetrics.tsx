import { MetricCell } from '@/components/primitives/MetricCell';
import { Reveal } from '@/components/motion/Reveal';
import type { Metric, SectionProps } from '@/lib/types';

export function ProductMetrics({ content }: SectionProps<Metric[]>) {
  return (
    <section aria-label="Product metrics" className="bg-bg-raised px-pad-x py-10">
      <Reveal>
        <ul className="mx-auto flex max-w-[1240px] gap-6">
          {content.map((metric) => (
            <li key={metric.label} className="min-w-0 flex-1 px-0 py-3">
              <MetricCell metric={metric} compact />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
