import { SectionShell } from "@/components/primitives/SectionShell";
import enterprise from "@/content/enterprise";

export function Metrics() {
  const { stats } = enterprise.metrics;

  return (
    <SectionShell className="border-y border-border bg-bg py-12">
      <ul className="mx-auto flex max-w-[1240px] list-none justify-between gap-8 p-0">
        {stats.map((stat) => (
          <li key={stat.label} className="flex max-w-[280px] flex-col gap-3">
            <span className="font-mono text-[32px] leading-none tracking-[-0.02em] text-accent-text">
              {stat.value}
            </span>
            <span className="text-sm font-medium text-text-primary">
              {stat.label}
            </span>
            <p className="text-sm leading-[1.5] text-text-secondary">
              {stat.mech}
            </p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
