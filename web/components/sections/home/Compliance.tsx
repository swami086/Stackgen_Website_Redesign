import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type ComplianceContent = typeof home.compliance;

export function Compliance({ content, className }: SectionProps<ComplianceContent>) {
  return (
    <section
      aria-labelledby="compliance-heading"
      className={['bg-bg-base px-pad-x py-pad-y', className].filter(Boolean).join(' ')}
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-16">
          <div className="flex gap-12">
            <div className="w-[520px] shrink-0">
              <p className="text-sm text-text-tertiary">{content.label}</p>
              <h2
                id="compliance-heading"
                className="mt-2 text-[32px] font-semibold leading-[1.2] tracking-[-0.018em] text-text-primary"
              >
                {content.heading}
              </h2>
            </div>
          </div>

          <ul className="flex flex-wrap gap-4" aria-label="Compliance certifications">
            {content.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-lg border border-border-card bg-surface-card px-6 py-4 text-lg font-medium tracking-[-0.02em] text-text-primary"
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
