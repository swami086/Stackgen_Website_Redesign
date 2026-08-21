import { SectionShell } from "@/components/primitives/SectionShell";
import pricing from "@/content/pricing";

export function Faq() {
  const { heading, subheading, items } = pricing.faq;

  return (
    <SectionShell
      className="border-t border-border bg-bg py-[72px]"
      aria-labelledby="pricing-faq-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10">
        <div className="flex flex-col gap-3">
          <h2
            id="pricing-faq-heading"
            className="text-[32px] font-medium leading-[1.15] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="text-[17px] text-text-secondary">{subheading}</p>
        </div>
        <dl className="m-0 flex flex-col gap-8 p-0">
          {items.map((item) => (
            <div key={item.question} className="flex flex-col gap-2">
              <dt className="text-lg font-medium tracking-[-0.02em] text-text-primary">
                {item.question}
              </dt>
              <dd className="m-0 text-[15px] leading-[1.45] text-text-secondary">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionShell>
  );
}
