import { ButtonPrimary } from '@/components/primitives/ButtonPrimary';
import { Reveal } from '@/components/motion/Reveal';
import { PRIMARY_CTA } from '@/lib/nav';
import type { Cta, SectionProps } from '@/lib/types';

type ProductFinalCtaContent = {
  heading: string;
  body: string;
  cta: Cta;
};

export function ProductFinalCta({ content }: SectionProps<ProductFinalCtaContent>) {
  return (
    <section
      aria-labelledby="product-final-cta-heading"
      className="bg-bg-base px-pad-x pt-20 pb-24"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5">
          <h2
            id="product-final-cta-heading"
            className="max-w-[800px] text-[36px] font-medium leading-[1.12] tracking-[-0.028em] text-balance text-text-primary"
          >
            {content.heading}
          </h2>
          <p className="max-w-[760px] text-base leading-normal text-text-secondary">
            {content.body}
          </p>
          <div>
            <ButtonPrimary href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</ButtonPrimary>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
