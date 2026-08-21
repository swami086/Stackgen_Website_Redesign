import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { MonoLabel } from '@/components/primitives/MonoLabel';
import { Reveal } from '@/components/motion/Reveal';
import { PRIMARY_CTA } from '@/lib/nav';
import type { Cta, SectionProps } from '@/lib/types';

type ProductHeroContent = {
  label?: string;
  h1: string;
  sub: string;
  support: string;
  cta: Cta;
};

export function ProductHero({ content }: SectionProps<ProductHeroContent>) {
  return (
    <section
      aria-labelledby="product-hero-heading"
      className="bg-bg-base px-pad-x pt-[88px] pb-[72px]"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7">
          <div className="flex flex-col gap-5">
            {content.label ? <MonoLabel>{content.label}</MonoLabel> : null}
            <h1
              id="product-hero-heading"
              className="max-w-[900px] text-[48px] font-medium leading-[1.08] tracking-[-0.04em] text-balance text-text-primary max-[767px]:text-[38px] max-[767px]:leading-[1.08]"
            >
              {content.h1}
            </h1>
            <p className="max-w-[640px] text-[17px] leading-[1.55] text-text-secondary max-[767px]:text-[16px]">
              {content.sub}
            </p>
            <p className="max-w-[640px] text-[15px] leading-normal text-text-tertiary">
              {content.support}
            </p>
          </div>
          <div>
            <ButtonPrimary href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonPrimary>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
