import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type PlatformFinalCtaContent = typeof platform.finalCta;

export function PlatformFinalCta({ content }: SectionProps<PlatformFinalCtaContent>) {
  return (
    <section
      aria-labelledby="platform-final-cta-heading"
      className="bg-bg-base px-(--spacing-pad-x) pt-24 pb-30"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-[26px] px-(--spacing-pad-x) pt-32 text-center">
          <h2
            id="platform-final-cta-heading"
            className="max-w-[760px] text-[42px] font-medium leading-[1.12] tracking-[-0.018em] text-balance text-text-primary"
          >
            {content.heading}
          </h2>
          <p className="max-w-[660px] text-[17px] leading-normal text-text-secondary">
            {content.body}
          </p>
          <ButtonPrimary href={content.cta.href}>{content.cta.label}</ButtonPrimary>
        </div>
      </Reveal>
    </section>
  );
}
