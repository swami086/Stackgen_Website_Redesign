import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductPlaceholderBadge, ProductSectionShell } from "./shared";

type ProductFaqProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductFaq({ theme, content, className }: ProductFaqProps) {
  return (
    <ProductSectionShell id="product-faq" theme={theme} className={className}>
      <ProductPlaceholderBadge />
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.faq.heading}
      </h2>
      <div className="flex flex-col gap-4">
        {content.faq.items.map((item, index) => (
          <article
            key={`faq-${index}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4"
          >
            <h3 className="text-base font-semibold text-text-primary">{item.question}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{item.answer}</p>
          </article>
        ))}
      </div>
    </ProductSectionShell>
  );
}
