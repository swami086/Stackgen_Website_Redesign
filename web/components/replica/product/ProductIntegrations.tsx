import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductPlaceholderBadge, ProductSectionShell } from "./shared";

type ProductIntegrationsProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductIntegrations({
  theme,
  content,
  className,
}: ProductIntegrationsProps) {
  return (
    <ProductSectionShell id="product-integrations" theme={theme} className={className}>
      <ProductPlaceholderBadge />
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.integrations.heading}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
        {content.integrations.body}
      </p>
    </ProductSectionShell>
  );
}
