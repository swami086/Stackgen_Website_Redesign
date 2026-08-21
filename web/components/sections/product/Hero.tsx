import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import type { ProductContent } from "@/content/products";

type HeroProps = {
  hero: ProductContent["hero"];
};

export function Hero({ hero }: HeroProps) {
  const { label, heading, body, support, cta } = hero;

  return (
    <SectionShell
      className="bg-bg pt-[96px] pb-[72px]"
      aria-labelledby="product-hero-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-7">
        <MonoLabel>{label}</MonoLabel>
        <h1
          id="product-hero-heading"
          className="max-w-[900px] text-[48px] font-medium leading-[1.08] tracking-[-0.033em] text-text-primary"
        >
          {heading}
        </h1>
        <p className="max-w-[640px] text-[17px] leading-[1.55] text-text-secondary">
          {body}
        </p>
        <p className="max-w-[640px] text-[15px] leading-normal text-text-secondary">
          {support}
        </p>
        <div>
          <ButtonPrimary href="#">{cta.label}</ButtonPrimary>
        </div>
      </div>
    </SectionShell>
  );
}
