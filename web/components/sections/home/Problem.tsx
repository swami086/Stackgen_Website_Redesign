import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Problem() {
  const {
    heading,
    body,
    creation,
    gap,
    operations,
    painPoints,
    stats,
    closing,
  } = home.problem;

  return (
    <SectionShell
      className="bg-bg py-[120px]"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-16">
        <div className="flex gap-20">
          <h2
            id="problem-heading"
            className="max-w-[620px] shrink-0 text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="flex-1 text-base leading-[1.6] tracking-[-0.01em] text-text-secondary">
            {body}
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface-raised p-8">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-text-tertiary">
                {creation.label}
              </p>
              <p className="mt-3 text-sm leading-[1.5] text-text-secondary">
                {creation.body}
              </p>
            </div>
            <div className="flex w-[108px] shrink-0 flex-col items-center gap-2.5 py-2">
              <span className="font-mono text-xs text-text-tertiary">
                {gap.label}
              </span>
              <span className="text-[11px] text-text-tertiary">
                {gap.caption}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-text-tertiary">
                {operations.label}
              </p>
              <p className="mt-3 text-sm leading-[1.5] text-text-secondary">
                {operations.body}
              </p>
            </div>
          </div>

          <div className="my-7 h-px bg-border" />

          <ul className="flex flex-col">
            {painPoints.map((point) => (
              <li
                key={point.label}
                className="flex gap-6 border-t border-border py-[18px]"
              >
                <span className="w-[180px] shrink-0 text-sm font-medium text-text-primary">
                  {point.label}
                </span>
                <p className="flex-1 text-sm leading-[1.5] text-text-secondary">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <ul className="border-t border-border">
          {stats.map((stat) => (
            <li
              key={stat.value}
              className="flex gap-14 border-b border-border py-8"
            >
              <span className="w-[200px] shrink-0 font-mono text-[44px] leading-[1.05] text-accent-text">
                {stat.value}
              </span>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-text-primary">
                  {stat.headline}
                </p>
                <p className="text-sm leading-[1.5] text-text-secondary">
                  {stat.body}
                </p>
                <p className="text-xs text-text-tertiary">{stat.attribution}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="max-w-[860px] text-[26px] font-medium leading-[1.35] tracking-[-0.02em] text-text-primary">
          {closing}
        </p>
      </div>
    </SectionShell>
  );
}
