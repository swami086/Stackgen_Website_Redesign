import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { SectionShell } from "@/components/primitives/SectionShell";
import type { ProductContent } from "@/content/products";

type FinalCtaProps = {
  finalCta: ProductContent["finalCta"];
};

export function FinalCta({ finalCta }: FinalCtaProps) {
  const { heading, ctaLabel, href } = finalCta;

  return (
    <SectionShell
      className="bg-bg py-[96px]"
      aria-labelledby="product-final-cta-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 text-center">
        <h2
          id="product-final-cta-heading"
          className="max-w-[760px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
        >
          {heading}
        </h2>
        <ButtonPrimary href={href}>{ctaLabel}</ButtonPrimary>
      </div>
    </SectionShell>
  );
}
