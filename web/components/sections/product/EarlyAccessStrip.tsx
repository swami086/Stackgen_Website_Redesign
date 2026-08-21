import { ButtonPrimary } from "@/components/primitives/ButtonPrimary";
import { MonoLabel } from "@/components/primitives/MonoLabel";
import { SectionShell } from "@/components/primitives/SectionShell";
import type { ProductContent } from "@/content/products";

type EarlyAccessStripProps = {
  earlyAccess: NonNullable<ProductContent["earlyAccess"]>;
};

export function EarlyAccessStrip({ earlyAccess }: EarlyAccessStripProps) {
  const { label, title, body, ctaLabel } = earlyAccess;

  return (
    <SectionShell className="border-y border-border bg-surface-raised py-12">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8">
        <div className="flex max-w-[760px] flex-col gap-3">
          <MonoLabel>{label}</MonoLabel>
          <h2 className="text-2xl font-medium tracking-[-0.02em] text-text-primary">
            {title}
          </h2>
          <p className="text-[15px] leading-[1.45] text-text-secondary">{body}</p>
        </div>
        <ButtonPrimary href="#">{ctaLabel}</ButtonPrimary>
      </div>
    </SectionShell>
  );
}
