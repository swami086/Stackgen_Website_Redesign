import { ButtonGhost } from "@/components/primitives/ButtonGhost";
import { SectionShell } from "@/components/primitives/SectionShell";
import home from "@/content/home";

const PRODUCT_HREFS: Record<string, string> = {
  "Aiden for Infrastructure": "/product/aiden-for-infrastructure",
  "Aiden for Automation": "/product/aiden-for-automation",
  "Aiden for Observability": "/product/aiden-for-observability",
  "Aiden for SRE": "/product/aiden-for-sre",
};

export function AgenticOs() {
  const { heading, body, products, footer } = home.agenticOs;

  return (
    <SectionShell
      className="bg-surface py-[120px]"
      aria-labelledby="agentic-os-heading"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14">
        <div className="flex gap-20">
          <h2
            id="agentic-os-heading"
            className="max-w-[600px] shrink-0 text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
          >
            {heading}
          </h2>
          <p className="flex-1 text-base leading-[1.6] tracking-[-0.01em] text-text-secondary">
            {body}
          </p>
        </div>

        <ul className="grid grid-cols-4 border-t border-border">
          {products.map((product, index) => (
            <li
              key={product.title}
              className={`flex flex-col gap-[18px] border-r border-border py-[30px] ${index === 0 ? "pl-0 pr-[26px]" : "px-[26px]"} last:border-r-0`}
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-text-primary">
                  {product.title}
                </h3>
                <p className="text-sm text-text-secondary">{product.tagline}</p>
              </div>

              <ul className="flex flex-col gap-2 border-y border-border py-4">
                {product.metrics.map((metric) => (
                  <li key={metric.label} className="flex flex-col gap-0.5">
                    <span className="font-mono text-lg text-accent-text">
                      {metric.value}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {metric.label}
                    </span>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-col gap-2">
                {product.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm leading-[1.4] text-text-secondary"
                  >
                    {feature}
                  </li>
                ))}
              </ul>

              <ButtonGhost href={PRODUCT_HREFS[product.title] ?? "#"}>
                {product.cta} →
              </ButtonGhost>
            </li>
          ))}
        </ul>

        <p className="max-w-[720px] text-xl font-medium leading-[1.35] tracking-[-0.02em] text-text-primary">
          {footer}
        </p>
      </div>
    </SectionShell>
  );
}
