import { SectionShell } from "@/components/primitives/SectionShell";
import type { ProductContent } from "@/content/products";

type MetricsProps = {
  metrics: ProductContent["metrics"];
};

export function Metrics({ metrics }: MetricsProps) {
  return (
    <SectionShell className="border-y border-border bg-bg py-12">
      <ul className="mx-auto flex max-w-[1240px] list-none justify-between gap-8 p-0">
        {metrics.map((metric) => (
          <li key={metric.label} className="flex flex-col gap-1">
            <span className="font-mono text-[28px] leading-none text-accent-text">
              {metric.value}
            </span>
            <span className="text-sm text-text-secondary">{metric.label}</span>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
