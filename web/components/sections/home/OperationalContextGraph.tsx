import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function OperationalContextGraph() {
  const { heading, body, pillars, footer } = home.ocg;

  return (
    <SectionShell
      className="border-y border-border bg-surface py-[120px]"
      aria-labelledby="ocg-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <div className="flex items-start justify-between gap-12">
          <h2
            id="ocg-heading"
            className="max-w-[520px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="max-w-[480px] text-base leading-[1.6] text-text-secondary">
            {body}
          </p>
        </div>

        <ul className="grid grid-cols-5 border-y border-border">
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="border-r border-border px-6 py-8 last:border-r-0"
            >
              <h3 className="text-base font-semibold text-text-primary">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.5] text-text-secondary">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="text-base text-text-secondary">{footer}</p>
      </div>
    </SectionShell>
  );
}
