import Link from "next/link";
import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductPlaceholderBadge, ProductSectionShell } from "./shared";

type ProductFinalCtaProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductFinalCta({ theme, content, className }: ProductFinalCtaProps) {
  return (
    <ProductSectionShell
      id="product-final-cta"
      theme={theme}
      className={cn("bg-surface", className)}
    >
      <ProductPlaceholderBadge />
      <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
        {content.finalCta.heading}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
        {content.finalCta.subhead}
      </p>
      <Link
        href={content.finalCta.href}
        className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent no-underline"
      >
        {content.finalCta.cta}
      </Link>
    </ProductSectionShell>
  );
}
