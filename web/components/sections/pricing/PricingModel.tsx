import { SectionShell } from "@/components/primitives/SectionShell";
import pricing from "@/content/pricing";

export function PricingModel() {
  const { items } = pricing.pricingModel;

  return (
    <SectionShell className="border-y border-border bg-bg py-[72px]">
      <ul className="mx-auto grid max-w-[1240px] list-none grid-cols-3 gap-8 p-0">
        {items.map((item) => (
          <li key={item.title} className="flex flex-col gap-3">
            <h2 className="text-lg font-medium tracking-[-0.02em] text-text-primary">
              {item.title}
            </h2>
            <p className="text-[15px] leading-[1.45] text-text-secondary">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
