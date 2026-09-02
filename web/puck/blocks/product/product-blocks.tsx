"use client";

import type { ComponentConfig } from "@puckeditor/core";
import type { ComponentType } from "react";
import { ProductHero } from "@/components/replica/product/ProductHero";
import { ProductSubNav } from "@/components/replica/product/ProductSubNav";
import { ProductPillars } from "@/components/replica/product/ProductPillars";
import { ProductLogos } from "@/components/replica/product/ProductLogos";
import { ProductProblem } from "@/components/replica/product/ProductProblem";
import { ProductVideo } from "@/components/replica/product/ProductVideo";
import { ProductSpotlight } from "@/components/replica/product/ProductSpotlight";
import { ProductCapabilities } from "@/components/replica/product/ProductCapabilities";
import { ProductPlatformLink } from "@/components/replica/product/ProductPlatformLink";
import { ProductIntegrations } from "@/components/replica/product/ProductIntegrations";
import { ProductEnterprise } from "@/components/replica/product/ProductEnterprise";
import { ProductProof } from "@/components/replica/product/ProductProof";
import { ProductOffers } from "@/components/replica/product/ProductOffers";
import { ProductFinalCta } from "@/components/replica/product/ProductFinalCta";
import { ProductFaq } from "@/components/replica/product/ProductFaq";
import { ProductResources } from "@/components/replica/product/ProductResources";
import { useTheme } from "@/components/replica/theme/ThemeProvider";
import { getProduct, type ProductSlug } from "@/lib/products";
import { getProductContent, type ProductPageContent } from "@/content/products";
import { mergeProductContent } from "@/puck/lib/merge-content";
import {
  bodyField,
  ctaFields,
  headingField,
  productSlugField,
} from "@/puck/fields/common";

const str = (value: unknown) => String(value);

function productBlock(
  label: string,
  fields: Record<string, unknown>,
  defaultSlug: ProductSlug,
  defaultExtras: Record<string, unknown>,
  patch: (props: Record<string, unknown>) => Record<string, unknown>,
  Section: ComponentType<Record<string, unknown>>,
  options?: {
    needsFrame?: boolean;
    captionFrom?: (props: Record<string, unknown>) => string;
    passContent?: boolean;
  },
): ComponentConfig {
  return {
    label,
    fields: {
      productSlug: productSlugField,
      ...fields,
    } as ComponentConfig["fields"],
    defaultProps: {
      id: label.toLowerCase().replace(/\s+/g, "-"),
      productSlug: defaultSlug,
      ...defaultExtras,
    },
    render: (props) => {
      const { theme } = useTheme();
      const slug = props.productSlug as ProductSlug;
      const meta = getProduct(slug)!;
      const content = mergeProductContent(slug, patch(props));
      const passContent = options?.passContent ?? true;
      const extra = options?.captionFrom
        ? { caption: options.captionFrom(props) }
        : {};
      return passContent ? (
        <Section
          theme={theme}
          content={content}
          pencilFrameId={options?.needsFrame ? meta.pencilFrameId : undefined}
          {...extra}
        />
      ) : (
        <Section theme={theme} {...extra} />
      );
    },
  };
}

export const stackGenProductSubNavBlock = productBlock(
  "Product Sub Nav",
  { overviewLabel: { type: "text", label: "Overview label" } },
  "aiden-for-infraops",
  { overviewLabel: getProductContent("aiden-for-infraops").subNav.overviewLabel },
  (props) => ({ subNav: { overviewLabel: str(props.overviewLabel) } }),
  ProductSubNav as ComponentType<Record<string, unknown>>,
);

export const stackGenProductHeroBlock = productBlock(
  "Product Hero",
  {
    phase: { type: "text", label: "Phase eyebrow" },
    heading: headingField,
    subhead: bodyField,
    ...ctaFields,
  },
  "aiden-for-infraops",
  {
    phase: getProductContent("aiden-for-infraops").phase,
    heading: getProductContent("aiden-for-infraops").hero.heading,
    subhead: getProductContent("aiden-for-infraops").hero.subhead,
    primaryCta: getProductContent("aiden-for-infraops").hero.primaryCta,
    primaryHref: getProductContent("aiden-for-infraops").hero.primaryHref,
    secondaryCta: getProductContent("aiden-for-infraops").hero.secondaryCta,
    secondaryHref: getProductContent("aiden-for-infraops").hero.secondaryHref,
  },
  (props) => ({
    phase: str(props.phase),
    hero: {
      heading: str(props.heading),
      subhead: str(props.subhead),
      primaryCta: str(props.primaryCta),
      primaryHref: str(props.primaryHref),
      secondaryCta: str(props.secondaryCta),
      secondaryHref: str(props.secondaryHref),
    },
  }),
  ProductHero as ComponentType<Record<string, unknown>>,
  { needsFrame: true },
);

export const stackGenProductLogosBlock = productBlock(
  "Product Logos",
  { eyebrow: { type: "text", label: "Eyebrow" } },
  "aiden-for-infraops",
  { eyebrow: getProductContent("aiden-for-infraops").logos.eyebrow },
  (props) => ({ logos: { eyebrow: str(props.eyebrow) } }),
  ProductLogos as ComponentType<Record<string, unknown>>,
);

export const stackGenProductProblemBlock = productBlock(
  "Product Problem",
  { heading: headingField, body: bodyField },
  "aiden-for-infraops",
  {
    heading: getProductContent("aiden-for-infraops").problem.heading,
    body: getProductContent("aiden-for-infraops").problem.body,
  },
  (props) => ({ problem: { heading: str(props.heading), body: str(props.body) } }),
  ProductProblem as ComponentType<Record<string, unknown>>,
);

export const stackGenProductVideoBlock = productBlock(
  "Product Video",
  { caption: { type: "text", label: "Caption" } },
  "aiden-for-infraops",
  { caption: getProductContent("aiden-for-infraops").video.caption },
  (props) => ({ video: { caption: str(props.caption) } }),
  ProductVideo as ComponentType<Record<string, unknown>>,
  { captionFrom: (props) => str(props.caption), passContent: false },
);

export const stackGenProductSpotlightBlock = productBlock(
  "Product Spotlight",
  { heading: headingField, body: bodyField },
  "aiden-for-infraops",
  {
    heading: getProductContent("aiden-for-infraops").spotlight.heading,
    body: getProductContent("aiden-for-infraops").spotlight.body,
  },
  (props) => ({
    spotlight: { heading: str(props.heading), body: str(props.body) },
  }),
  ProductSpotlight as ComponentType<Record<string, unknown>>,
);

export const stackGenProductCapabilitiesBlock = productBlock(
  "Product Capabilities",
  { heading: headingField },
  "aiden-for-infraops",
  { heading: getProductContent("aiden-for-infraops").capabilities.heading },
  (props) => ({ capabilities: { heading: str(props.heading) } }),
  ProductCapabilities as ComponentType<Record<string, unknown>>,
);

export const stackGenProductPlatformLinkBlock = productBlock(
  "Product Platform Link",
  { heading: headingField, body: bodyField },
  "aiden-for-infraops",
  {
    heading: getProductContent("aiden-for-infraops").platformLink.heading,
    body: getProductContent("aiden-for-infraops").platformLink.body,
  },
  (props) => ({
    platformLink: { heading: str(props.heading), body: str(props.body) },
  }),
  ProductPlatformLink as ComponentType<Record<string, unknown>>,
);

export const stackGenProductIntegrationsBlock = productBlock(
  "Product Integrations",
  { heading: headingField, body: bodyField },
  "aiden-for-infraops",
  {
    heading: getProductContent("aiden-for-infraops").integrations.heading,
    body: getProductContent("aiden-for-infraops").integrations.body,
  },
  (props) => ({
    integrations: { heading: str(props.heading), body: str(props.body) },
  }),
  ProductIntegrations as ComponentType<Record<string, unknown>>,
);

export const stackGenProductEnterpriseBlock = productBlock(
  "Product Enterprise",
  { heading: headingField },
  "aiden-for-infraops",
  { heading: getProductContent("aiden-for-infraops").enterprise.heading },
  (props) => ({ enterprise: { heading: str(props.heading) } }),
  ProductEnterprise as ComponentType<Record<string, unknown>>,
);

export const stackGenProductProofBlock = productBlock(
  "Product Proof",
  { heading: headingField, body: bodyField },
  "aiden-for-infraops",
  {
    heading: getProductContent("aiden-for-infraops").proof.heading,
    body: getProductContent("aiden-for-infraops").proof.body,
  },
  (props) => ({ proof: { heading: str(props.heading), body: str(props.body) } }),
  ProductProof as ComponentType<Record<string, unknown>>,
);

export const stackGenProductFinalCtaBlock = productBlock(
  "Product Final CTA",
  {
    heading: headingField,
    subhead: bodyField,
    cta: { type: "text", label: "CTA label" },
    href: { type: "text", label: "CTA URL" },
  },
  "aiden-for-infraops",
  {
    heading: getProductContent("aiden-for-infraops").finalCta.heading,
    subhead: getProductContent("aiden-for-infraops").finalCta.subhead,
    cta: getProductContent("aiden-for-infraops").finalCta.cta,
    href: getProductContent("aiden-for-infraops").finalCta.href,
  },
  (props) => ({
    finalCta: {
      heading: str(props.heading),
      subhead: str(props.subhead),
      cta: str(props.cta),
      href: str(props.href),
    },
  }),
  ProductFinalCta as ComponentType<Record<string, unknown>>,
);

export const stackGenProductFaqBlock = productBlock(
  "Product FAQ",
  {
    heading: headingField,
    items: {
      type: "array",
      label: "FAQ items",
      getItemSummary: (item: { question?: string }) => item.question || "FAQ",
      arrayFields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
    },
  },
  "aiden-for-infraops",
  {
    heading: getProductContent("aiden-for-infraops").faq.heading,
    items: [...getProductContent("aiden-for-infraops").faq.items],
  },
  (props) => ({
    faq: {
      heading: str(props.heading),
      items: props.items as ProductPageContent["faq"]["items"],
    },
  }),
  ProductFaq as ComponentType<Record<string, unknown>>,
);

export const stackGenProductPillarsBlock = productBlock(
  "Product Pillars",
  {},
  "aiden-for-infraops",
  {},
  () => ({}),
  ProductPillars as ComponentType<Record<string, unknown>>,
);

export const stackGenProductOffersBlock = productBlock(
  "Product Offers",
  { heading: headingField },
  "aiden-for-devops",
  { heading: getProductContent("aiden-for-devops").offers.heading },
  (props) => ({ offers: { heading: str(props.heading) } }),
  ProductOffers as ComponentType<Record<string, unknown>>,
);

export const stackGenProductResourcesBlock = productBlock(
  "Product Resources",
  { heading: headingField },
  "aiden-for-devops",
  { heading: getProductContent("aiden-for-devops").resources.heading },
  (props) => ({ resources: { heading: str(props.heading) } }),
  ProductResources as ComponentType<Record<string, unknown>>,
);

export const productBlocks = {
  StackGenProductSubNav: stackGenProductSubNavBlock,
  StackGenProductHero: stackGenProductHeroBlock,
  StackGenProductPillars: stackGenProductPillarsBlock,
  StackGenProductLogos: stackGenProductLogosBlock,
  StackGenProductProblem: stackGenProductProblemBlock,
  StackGenProductVideo: stackGenProductVideoBlock,
  StackGenProductSpotlight: stackGenProductSpotlightBlock,
  StackGenProductCapabilities: stackGenProductCapabilitiesBlock,
  StackGenProductPlatformLink: stackGenProductPlatformLinkBlock,
  StackGenProductIntegrations: stackGenProductIntegrationsBlock,
  StackGenProductEnterprise: stackGenProductEnterpriseBlock,
  StackGenProductProof: stackGenProductProofBlock,
  StackGenProductOffers: stackGenProductOffersBlock,
  StackGenProductFinalCta: stackGenProductFinalCtaBlock,
  StackGenProductFaq: stackGenProductFaqBlock,
  StackGenProductResources: stackGenProductResourcesBlock,
};
