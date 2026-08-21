import { MonoLabel } from '@/components/primitives/MonoLabel';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import scheduleDemo from '@/content/schedule-demo';

type DemoHeroContent = typeof scheduleDemo.hero & { label?: string };

export function DemoHero({ content }: SectionProps<DemoHeroContent>) {
  return (
    <section
      aria-labelledby="demohero-heading"
      className="bg-bg-base px-(--spacing-pad-x) pt-[88px] pb-16"
    >
      <Reveal>
        <div className="flex max-w-[1240px] flex-col gap-5">
          {content.label ? <MonoLabel>{content.label}</MonoLabel> : null}
          <h1
            id="demohero-heading"
            className="max-w-[980px] text-[64px] font-medium leading-[1.06] tracking-[-0.02em] text-balance text-text-primary"
          >
            {content.h1}
          </h1>
          <p className="max-w-[680px] text-[17px] leading-normal text-text-secondary">
            {content.sub}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
