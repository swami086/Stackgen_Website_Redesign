import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductPlaceholderBadge, ProductSectionShell } from "./shared";

type ProductSpotlightProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductSpotlight({ theme, content, className }: ProductSpotlightProps) {
  return (
    <ProductSectionShell id="product-spotlight" theme={theme} className={className}>
      <ProductPlaceholderBadge />
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.spotlight.heading}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
        {content.spotlight.body}
      </p>
      <div className="grid gap-3 md:gap-4 md:grid-cols-3">
        {content.spotlight.cards.map((card, index) => (
          <article
            key={`spotlight-${index}`}
            className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4"
          >
            <h3 className="text-base font-semibold text-text-primary">{card.title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{card.body}</p>
          </article>
        ))}
      </div>
    </ProductSectionShell>
  );
}
