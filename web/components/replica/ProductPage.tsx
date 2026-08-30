"use client";

import { getProductContent } from "@/content/products";
import { ReplicaFooter } from "@/components/replica/sections/Footer";
import { ReplicaNav } from "@/components/replica/sections/Nav";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { getProduct, type ProductSlug } from "@/lib/products";
import { ProductCapabilities } from "@/components/replica/product/ProductCapabilities";
import { ProductEnterprise } from "@/components/replica/product/ProductEnterprise";
import { ProductFaq } from "@/components/replica/product/ProductFaq";
import { ProductFinalCta } from "@/components/replica/product/ProductFinalCta";
import { ProductHero } from "@/components/replica/product/ProductHero";
import { ProductIntegrations } from "@/components/replica/product/ProductIntegrations";
import { ProductLogos } from "@/components/replica/product/ProductLogos";
import { ProductOffers } from "@/components/replica/product/ProductOffers";
import { ProductPillars } from "@/components/replica/product/ProductPillars";
import { ProductPlatformLink } from "@/components/replica/product/ProductPlatformLink";
import { ProductProblem } from "@/components/replica/product/ProductProblem";
import { ProductProof } from "@/components/replica/product/ProductProof";
import { ProductResources } from "@/components/replica/product/ProductResources";
import { ProductSpotlight } from "@/components/replica/product/ProductSpotlight";
import { ProductSubNav } from "@/components/replica/product/ProductSubNav";

type ProductPageProps = {
  slug: ProductSlug;
};

export function ProductPage({ slug }: ProductPageProps) {
  const { theme } = useTheme();
  const meta = getProduct(slug)!;
  const content = getProductContent(slug);

  return (
    <main
      data-product-slug={slug}
      data-pencil-id={meta.pencilFrameId}
      data-pencil-theme={theme}
      className="flex w-full flex-col bg-bg text-text-primary"
    >
      <ReplicaNav theme={theme} />
      {content.flags.subNav ? (
        <ProductSubNav theme={theme} content={content} />
      ) : null}
      <ProductHero
        theme={theme}
        content={content}
        pencilFrameId={meta.pencilFrameId}
      />
      {content.flags.pillars ? (
        <ProductPillars theme={theme} content={content} />
      ) : null}
      <ProductLogos theme={theme} content={content} />
      <ProductProblem theme={theme} content={content} />
      <ProductSpotlight theme={theme} content={content} />
      <ProductCapabilities theme={theme} content={content} />
      <ProductPlatformLink theme={theme} content={content} />
      <ProductIntegrations theme={theme} content={content} />
      <ProductEnterprise theme={theme} content={content} />
      <ProductProof theme={theme} content={content} />
      {content.flags.offers ? <ProductOffers theme={theme} content={content} /> : null}
      <ProductFinalCta theme={theme} content={content} />
      <ProductFaq theme={theme} content={content} />
      {content.flags.resources ? (
        <ProductResources theme={theme} content={content} />
      ) : null}
      <ReplicaFooter theme={theme} />
    </main>
  );
}
