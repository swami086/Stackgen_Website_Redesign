import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductSectionShell } from "./shared";

type ProductCapabilitiesProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductCapabilities({
  theme,
  content,
  className,
}: ProductCapabilitiesProps) {
  return (
    <ProductSectionShell id="product-capabilities" theme={theme} className={className}>
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.capabilities.heading}
      </h2>
      <div className="grid gap-3 md:gap-4 md:grid-cols-2">
        {content.capabilities.items.map((item, index) => (
          <article
            key={`capability-${index}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4"
          >
            <h3 className="text-base font-semibold text-text-primary">{item.title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{item.body}</p>
          </article>
        ))}
      </div>
    </ProductSectionShell>
  );
}
