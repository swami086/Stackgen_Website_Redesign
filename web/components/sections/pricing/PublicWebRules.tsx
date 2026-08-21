import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import pricing from "@/content/pricing";

export function PublicWebRules() {
  const { heading, body } = pricing.publicWebRules;

  return (
    <SectionShell
      className="bg-bg py-[72px]"
      aria-labelledby="pricing-public-web-rules-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6">
        <MonoLabel>PUBLIC WEB RULES</MonoLabel>
        <h2
          id="pricing-public-web-rules-heading"
          className="max-w-[720px] text-[32px] font-medium leading-[1.15] tracking-[-0.03em] text-text-primary"
        >
          {heading}
        </h2>
        <p className="max-w-[720px] text-[17px] leading-[1.55] text-text-secondary">
          {body}
        </p>
      </div>
    </SectionShell>
  );
}
