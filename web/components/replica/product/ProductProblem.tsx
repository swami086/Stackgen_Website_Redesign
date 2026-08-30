import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductPlaceholderBadge, ProductSectionShell } from "./shared";

type ProductProblemProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductProblem({ theme, content, className }: ProductProblemProps) {
  return (
    <ProductSectionShell id="product-problem" theme={theme} className={className}>
      <ProductPlaceholderBadge />
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.problem.heading}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
        {content.problem.body}
      </p>
    </ProductSectionShell>
  );
}
