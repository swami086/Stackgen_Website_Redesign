import type { Metric } from '@/lib/types';

export function MetricCell({
  metric,
  className,
}: {
  metric: Metric;
  className?: string;
}) {
  return (
    <div
      className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}
    >
      <p className="text-[40px] font-semibold tracking-[-0.025em] text-text-primary">
        {metric.value}
      </p>
      <p className="text-sm text-text-secondary">{metric.label}</p>
      <p className="text-sm text-text-tertiary">{metric.mechanism}</p>
    </div>
  );
}
