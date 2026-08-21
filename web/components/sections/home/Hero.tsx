import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

export function Hero() {
  const { heading, body, support, cta } = home.hero;

  return (
    <SectionShell
      className="bg-bg pt-[88px] pb-12"
      aria-labelledby="hero-heading"
    >
      <div className="flex max-w-[1240px] flex-col gap-7">
        <h1
          id="hero-heading"
          className="max-w-[980px] text-[64px] font-medium leading-[1.06] tracking-[-0.02em] text-text-primary"
        >
          {heading}
        </h1>
        <p className="max-w-[680px] text-[17px] leading-[1.55] tracking-[-0.01em] text-text-secondary">
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
