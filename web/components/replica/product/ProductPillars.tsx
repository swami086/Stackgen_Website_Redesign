import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductSectionShell } from "./shared";

type ProductPillarsProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductPillars({ theme, content, className }: ProductPillarsProps) {
  return (
    <ProductSectionShell id="product-pillars" theme={theme} className={className}>
      <div className="grid gap-3 md:gap-4 md:grid-cols-3">
        {content.pillars.items.map((item, index) => (
          <article
            key={`pillar-${index}`}
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
