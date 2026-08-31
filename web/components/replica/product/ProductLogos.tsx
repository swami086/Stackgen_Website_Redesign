import { replicaContent } from "@/content/replica";
import type { ProductPageContent } from "@/content/products";
import { cn } from "@/lib/cn";
import { ProductSectionShell } from "./shared";

type ProductLogosProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  className?: string;
};

export function ProductLogos({ theme, content, className }: ProductLogosProps) {
  const { items } = replicaContent.logos;

  return (
    <ProductSectionShell id="product-logos" theme={theme} className={className}>
      <div className="flex flex-col items-center gap-4">
        <p className="text-center font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary">
          {content.logos.eyebrow}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {items.map((logo) => (
          <div key={logo.alt} className="flex h-8 items-center justify-center px-4">
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-5 w-auto max-w-none object-contain"
            />
          </div>
        ))}
      </div>
    </ProductSectionShell>
  );
}
