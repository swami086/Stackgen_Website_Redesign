import Link from "next/link";
import type { ProductPageContent } from "@/content/products";
import { AtmosphereField } from "@/components/replica/shared/AtmosphereField";
import { cn } from "@/lib/cn";
import { productHeroSrc } from "@/lib/product-media";
import { ProductPlaceholderBadge, ProductSectionShell, isPlaceholderCopy } from "./shared";

type ProductHeroProps = {
  theme: "light" | "dark";
  content: ProductPageContent;
  pencilFrameId: string;
  className?: string;
};

export function ProductHero({
  theme,
  content,
  pencilFrameId,
  className,
}: ProductHeroProps) {
  const { heading, subhead, primaryCta, primaryHref, secondaryCta, secondaryHref } =
    content.hero;

  return (
    <ProductSectionShell
      id="product-hero"
      theme={theme}
      pencilId={pencilFrameId}
      className={cn("min-h-[60vh] justify-center pt-24", className)}
    >
      <AtmosphereField
        slot="hero-field"
        theme={theme}
        srcOverride={productHeroSrc(content.slug, theme)}
        className="z-0 opacity-40"
      />
      <div className="flex flex-col gap-4">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[2px] text-text-tertiary">
          {content.phase}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-text-primary md:text-5xl">
          {heading}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
          {subhead}
        </p>
        {isPlaceholderCopy(subhead) ? <ProductPlaceholderBadge /> : null}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent no-underline"
          >
            {primaryCta}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-text-primary no-underline outline outline-1 -outline-offset-1 outline-border"
          >
            {secondaryCta}
          </Link>
        </div>
      </div>
    </ProductSectionShell>
  );
}
