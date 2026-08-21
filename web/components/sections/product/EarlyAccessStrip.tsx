import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { Reveal } from '@/components/motion/Reveal';
import { PRIMARY_CTA } from '@/lib/nav';
import type { SectionProps } from '@/lib/types';

type EarlyAccessContent = {
  label: string;
  heading: string;
  body: string;
};

// Canvas `lUtF2` is a 184px band: 24px padding, 12px gaps, and no outer section
// padding — product page sections sit flush against each other.
export function EarlyAccessStrip({ content }: SectionProps<EarlyAccessContent>) {
  return (
    <section aria-labelledby="early-access-heading" className="bg-bg-base px-pad-x">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <div className="flex flex-col gap-3 rounded-[20px] border border-border-card bg-bg-raised px-7 py-6">
            <p className="font-mono text-[11px] font-medium leading-[15px] tracking-[0.1em] text-accent-text uppercase">
              {content.label}
            </p>
            <h2
              id="early-access-heading"
              className="text-2xl font-semibold leading-[29px] tracking-[-0.02em] text-text-primary"
            >
              {content.heading}
            </h2>
            <p className="max-w-[760px] text-base leading-6 text-text-secondary">
              {content.body}
            </p>
            <div>
              <ButtonPrimary href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonPrimary>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
