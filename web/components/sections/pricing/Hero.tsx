import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import pricing from "@/content/pricing";

export function Hero() {
  const { label, heading, body } = pricing.hero;

  return (
    <SectionShell
      className="bg-bg pt-[96px] pb-[72px]"
      aria-labelledby="pricing-hero-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-7">
        <MonoLabel>{label}</MonoLabel>
        <h1
          id="pricing-hero-heading"
          className="max-w-[900px] text-[48px] font-medium leading-[1.08] tracking-[-0.033em] text-text-primary"
        >
          {heading}
        </h1>
        <p className="max-w-[640px] text-[17px] leading-[1.55] text-text-secondary">
          {body}
        </p>
      </div>
    </SectionShell>
  );
}
