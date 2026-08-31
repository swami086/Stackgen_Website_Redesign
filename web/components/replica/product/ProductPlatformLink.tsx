import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductSectionShell } from "./shared";

type ProductPlatformLinkProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductPlatformLink({
  theme,
  content,
  className,
}: ProductPlatformLinkProps) {
  return (
    <ProductSectionShell id="product-platform-link" theme={theme} className={className}>
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.platformLink.heading}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
        {content.platformLink.body}
      </p>
    </ProductSectionShell>
  );
}
