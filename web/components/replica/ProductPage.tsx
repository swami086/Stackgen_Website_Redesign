"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { applyProductGlobalOverlay, type CmsFieldData } from "@/lib/cms-overlay";
import { getProductContent, type ProductPageContent } from "@/content/products";
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
import { ProductVideo } from "@/components/replica/product/ProductVideo";

type ProductPageProps = {
  slug: ProductSlug;
  content?: ProductPageContent;
  /** Raw product doc fields — enables Payload admin Live Preview when set.
   * See lib/cms-overlay.ts applyProductGlobalOverlay for scope (direct
   * product text fields only; cards/faqs-derived sections don't
   * live-update). */
  rawProduct?: CmsFieldData;
};

export function ProductPage({ slug, content, rawProduct }: ProductPageProps) {
  const { theme } = useTheme();
  const meta = getProduct(slug)!;
  const base = content ?? getProductContent(slug);

  // Inert outside Payload's Live Preview iframe — just returns initialData.
  const { data: liveProduct } = useLivePreview<CmsFieldData>({
    initialData: rawProduct ?? {},
    serverURL:
      process.env.NEXT_PUBLIC_SERVER_URL ??
      (typeof window !== "undefined" ? window.location.origin : ""),
    depth: 0,
  });

  const resolved = rawProduct ? applyProductGlobalOverlay(base, liveProduct) : base;

  return (
    <main
      data-product-slug={slug}
      data-pencil-id={meta.pencilFrameId}
      data-pencil-theme={theme}
      className="flex w-full flex-col bg-bg text-text-primary"
    >
      <ReplicaNav theme={theme} />
      {resolved.flags.subNav ? (
        <ProductSubNav theme={theme} content={resolved} />
      ) : null}
      <ProductHero
        theme={theme}
        content={resolved}
        pencilFrameId={meta.pencilFrameId}
      />
      {resolved.flags.pillars ? (
        <ProductPillars theme={theme} content={resolved} />
      ) : null}
      <ProductLogos theme={theme} content={resolved} />
      <ProductProblem theme={theme} content={resolved} />
      <ProductVideo theme={theme} caption={resolved.video.caption} />
      <ProductSpotlight theme={theme} content={resolved} />
      <ProductCapabilities theme={theme} content={resolved} />
      <ProductPlatformLink theme={theme} content={resolved} />
      <ProductIntegrations theme={theme} content={resolved} />
      <ProductEnterprise theme={theme} content={resolved} />
      <ProductProof theme={theme} content={resolved} />
      {resolved.flags.offers ? <ProductOffers theme={theme} content={resolved} /> : null}
      <ProductFinalCta theme={theme} content={resolved} />
      <ProductFaq theme={theme} content={resolved} />
      {resolved.flags.resources ? (
        <ProductResources theme={theme} content={resolved} />
      ) : null}
      <ReplicaFooter theme={theme} />
    </main>
  );
}
