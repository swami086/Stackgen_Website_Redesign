import { SectionShell } from "@/components/primitives/SectionShell";
import enterprise from "@/content/enterprise";

export function FinalCta() {
  const { heading } = enterprise.finalCta;

  return (
    <SectionShell
      className="bg-bg py-[96px]"
      aria-labelledby="enterprise-final-cta-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col items-center text-center">
        <h2
          id="enterprise-final-cta-heading"
          className="max-w-[760px] text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
        >
          {heading}
        </h2>
      </div>
    </SectionShell>
  );
}
