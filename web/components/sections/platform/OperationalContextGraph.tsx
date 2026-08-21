import { SectionShell } from "@/components/primitives/SectionShell";
import { cn } from "@/lib/cn";
import platform from "@/content/platform";

const PILLAR_POSITIONS = [
  "left-[40px] top-[40px]",
  "right-[40px] top-[40px]",
  "left-[40px] bottom-[40px]",
  "right-[40px] bottom-[40px]",
  "left-1/2 top-[20px] -translate-x-1/2",
] as const;

export function OperationalContextGraph() {
  const { heading, body, flowLabels, pillars, hub, chips } = platform.ocg;

  return (
    <SectionShell
      className="border-y border-border bg-bg py-[120px]"
      aria-labelledby="platform-ocg-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <div className="flex items-start justify-between gap-12">
          <h2
            id="platform-ocg-heading"
            className="max-w-[520px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="max-w-[480px] text-base leading-[1.6] text-text-secondary">
            {body}
          </p>
        </div>

        <div
          className="relative mx-auto h-[660px] w-full overflow-hidden rounded-xl border border-border bg-surface"
          aria-label="Operational Context Graph diagram"
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute h-[440px] w-[440px] rounded-full border border-border/60" />
            <div className="absolute h-[660px] w-[660px] rounded-full border border-border/40" />
            <div className="absolute h-[880px] w-[880px] rounded-full border border-border/25" />
          </div>

          <ul className="absolute inset-x-0 top-8 flex justify-center gap-8">
            {flowLabels.map((label) => (
              <li
                key={label}
                className="font-mono text-xs uppercase tracking-wide text-text-tertiary"
              >
                {label}
              </li>
            ))}
          </ul>

          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className={cn(
                "absolute w-[280px] rounded-lg border border-border bg-bg p-5",
                PILLAR_POSITIONS[index],
              )}
            >
              <h3 className="text-sm font-semibold text-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-2 text-xs leading-[1.5] text-text-secondary">
                {pillar.body}
              </p>
            </article>
          ))}

          <article className="absolute left-1/2 top-1/2 flex w-[360px] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-xl border border-accent/30 bg-surface-raised p-6 text-center">
            <h3 className="text-base font-semibold text-text-primary">
              {hub.title}
            </h3>
            <p className="text-sm leading-[1.5] text-text-secondary">
              {hub.body}
            </p>
            <p className="text-xs text-text-tertiary">{hub.footnote}</p>
          </article>

          <ul className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border bg-bg px-4 py-1.5 text-xs font-medium text-text-secondary"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
