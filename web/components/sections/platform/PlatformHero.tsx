import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { MonoLabel } from '@/components/primitives/MonoLabel';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import platform from '@/content/platform';

type PlatformHeroContent = typeof platform.hero & { label?: string };

export function PlatformHero({ content }: SectionProps<PlatformHeroContent>) {
  return (
    <section
      aria-labelledby="platformhero-heading"
      className="bg-bg-base px-(--spacing-pad-x) pt-[88px] pb-12"
    >
      <Reveal>
        <div className="flex max-w-[1240px] flex-col gap-7">
          {content.label ? <MonoLabel>{content.label}</MonoLabel> : null}
          <h1
            id="platformhero-heading"
            className="max-w-[980px] text-[64px] font-medium leading-[1.06] tracking-[-0.02em] text-balance text-text-primary"
          >
            {content.h1}
          </h1>
          <p className="max-w-[680px] text-[17px] leading-normal text-text-secondary">
            {content.sub}
          </p>
          <p className="max-w-[640px] text-[15px] leading-normal text-text-tertiary">
            {content.support}
          </p>
          <div>
            <ButtonPrimary href={content.cta.href}>{content.cta.label}</ButtonPrimary>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
