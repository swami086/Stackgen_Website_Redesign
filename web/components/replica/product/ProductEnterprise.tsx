import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductPlaceholderBadge, ProductSectionShell } from "./shared";

type ProductEnterpriseProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductEnterprise({
  theme,
  content,
  className,
}: ProductEnterpriseProps) {
  return (
    <ProductSectionShell id="product-enterprise" theme={theme} className={className}>
      <ProductPlaceholderBadge />
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.enterprise.heading}
      </h2>
      <div className="grid gap-3 md:gap-4 md:grid-cols-3">
        {content.enterprise.items.map((item, index) => (
          <article
            key={`enterprise-${index}`}
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
