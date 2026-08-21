import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { SectionShell } from "@/components/primitives/SectionShell";
import { PRIMARY_CTA } from "@/lib/nav";
import platform from "@/content/platform";

export function FinalCta() {
  const { heading, body, cta } = platform.finalCta;

  return (
    <SectionShell
      className="bg-bg py-[96px]"
      aria-labelledby="platform-final-cta-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 text-center">
        <h2
          id="platform-final-cta-heading"
          className="max-w-[760px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
        >
          {heading}
        </h2>
        <p className="max-w-[660px] text-[17px] leading-[1.6] tracking-[-0.01em] text-text-secondary">
          {body}
        </p>
        <ButtonPrimary href={PRIMARY_CTA.href}>{cta.label}</ButtonPrimary>
      </div>
    </SectionShell>
  );
}
