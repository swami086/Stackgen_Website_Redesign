import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductSectionShell } from "./shared";

type ProductProofProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductProof({ theme, content, className }: ProductProofProps) {
  return (
    <ProductSectionShell id="product-proof" theme={theme} className={className}>
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.proof.heading}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
        {content.proof.body}
      </p>
    </ProductSectionShell>
  );
}
