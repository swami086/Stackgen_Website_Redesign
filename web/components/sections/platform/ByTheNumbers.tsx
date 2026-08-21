import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import platform from "@/content/platform";

export function ByTheNumbers() {
  const { label, stats } = platform.byTheNumbers;

  return (
    <SectionShell
      className="border-b border-border bg-bg py-[72px]"
      aria-label={label}
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <MonoLabel>{label}</MonoLabel>
        <ul className="grid grid-cols-4 border-y border-border">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex flex-col gap-3 border-r border-border px-6 py-8 last:border-r-0"
            >
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
      </div>
    </SectionShell>
  );
}
