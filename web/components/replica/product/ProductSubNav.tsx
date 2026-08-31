import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductSectionShell } from "./shared";

type ProductSubNavProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductSubNav({ theme, content, className }: ProductSubNavProps) {
  return (
    <ProductSectionShell
      id="product-sub-nav"
      theme={theme}
      className={cn("border-b border-border bg-surface py-4 md:py-4", className)}
    >
      <nav aria-label="Product sections" className="flex items-center gap-4">
        <span className="text-sm font-medium text-text-primary">
          {content.subNav.overviewLabel}
        </span>
      </nav>
    </ProductSectionShell>
  );
}
