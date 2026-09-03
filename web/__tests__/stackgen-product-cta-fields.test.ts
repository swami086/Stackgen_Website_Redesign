import { describe, expect, it, vi, beforeEach } from "vitest";
import { createElement } from "react";
import { render } from "@testing-library/react";
import * as mergeContent from "@/puck/lib/merge-content";

vi.mock("@/components/replica/theme/ThemeProvider", () => ({
  useTheme: () => ({ theme: "light" as const }),
}));

vi.mock("@/lib/products", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/products")>();
  return {
    ...actual,
    getProduct: () => ({ pencilFrameId: "test-frame" }),
  };
});

vi.mock("@/components/replica/product/ProductHero", () => ({
  ProductHero: () => null,
}));

vi.mock("@/components/replica/product/ProductSubNav", () => ({
  ProductSubNav: () => null,
}));

vi.mock("@/components/replica/product/ProductPillars", () => ({
  ProductPillars: () => null,
}));

vi.mock("@/components/replica/product/ProductLogos", () => ({
  ProductLogos: () => null,
}));

vi.mock("@/components/replica/product/ProductProblem", () => ({
  ProductProblem: () => null,
}));

vi.mock("@/components/replica/product/ProductVideo", () => ({
  ProductVideo: () => null,
}));

vi.mock("@/components/replica/product/ProductSpotlight", () => ({
  ProductSpotlight: () => null,
}));

vi.mock("@/components/replica/product/ProductCapabilities", () => ({
  ProductCapabilities: () => null,
}));

vi.mock("@/components/replica/product/ProductPlatformLink", () => ({
  ProductPlatformLink: () => null,
}));

vi.mock("@/components/replica/product/ProductIntegrations", () => ({
  ProductIntegrations: () => null,
}));

vi.mock("@/components/replica/product/ProductEnterprise", () => ({
  ProductEnterprise: () => null,
}));

vi.mock("@/components/replica/product/ProductProof", () => ({
  ProductProof: () => null,
}));

vi.mock("@/components/replica/product/ProductOffers", () => ({
  ProductOffers: () => null,
}));

vi.mock("@/components/replica/product/ProductFinalCta", () => ({
  ProductFinalCta: () => null,
}));

vi.mock("@/components/replica/product/ProductFaq", () => ({
  ProductFaq: () => null,
}));

vi.mock("@/components/replica/product/ProductResources", () => ({
  ProductResources: () => null,
}));

import { productBlocks } from "@/puck/blocks/product/product-blocks";

function hasKeys(fields: Record<string, unknown>, keys: string[]) {
  for (const k of keys) expect(fields).toHaveProperty(k);
}

function hasDefaultProps(block: { defaultProps?: Record<string, unknown> }, keys: string[]) {
  expect(block.defaultProps).toBeDefined();
  for (const k of keys) expect(block.defaultProps).toHaveProperty(k);
}

describe("product CTAs editable", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("hero has primary/secondary CTA fields via ctaFields", () => {
    hasKeys(productBlocks.StackGenProductHero.fields as Record<string, unknown>, [
      "primaryCta",
      "primaryHref",
      "secondaryCta",
      "secondaryHref",
    ]);
    hasDefaultProps(productBlocks.StackGenProductHero, [
      "primaryCta",
      "primaryHref",
      "secondaryCta",
      "secondaryHref",
    ]);
  });

  it("final CTA has cta and href fields", () => {
    hasKeys(productBlocks.StackGenProductFinalCta.fields as Record<string, unknown>, [
      "cta",
      "href",
    ]);
    hasDefaultProps(productBlocks.StackGenProductFinalCta, ["cta", "href"]);
  });

  it("hero render passes CTAs into mergeProductContent", () => {
    const mergeSpy = vi.spyOn(mergeContent, "mergeProductContent");
    const props = {
      productSlug: "aiden-for-infraops",
      phase: "Phase",
      heading: "Heading",
      subhead: "Subhead",
      primaryCta: "Custom Primary",
      primaryHref: "/custom-primary",
      secondaryCta: "Custom Secondary",
      secondaryHref: "/custom-secondary",
    };
    const Render = productBlocks.StackGenProductHero.render!;
    render(createElement(Render, props));
    expect(mergeSpy).toHaveBeenCalledWith(
      "aiden-for-infraops",
      expect.objectContaining({
        hero: {
          heading: "Heading",
          subhead: "Subhead",
          primaryCta: "Custom Primary",
          primaryHref: "/custom-primary",
          secondaryCta: "Custom Secondary",
          secondaryHref: "/custom-secondary",
        },
      }),
    );
  });

  it("final CTA render passes cta/href into mergeProductContent", () => {
    const mergeSpy = vi.spyOn(mergeContent, "mergeProductContent");
    const props = {
      productSlug: "aiden-for-infraops",
      heading: "Final Heading",
      subhead: "Final Subhead",
      cta: "Book demo",
      href: "/book",
    };
    const Render = productBlocks.StackGenProductFinalCta.render!;
    render(createElement(Render, props));
    expect(mergeSpy).toHaveBeenCalledWith(
      "aiden-for-infraops",
      expect.objectContaining({
        finalCta: {
          heading: "Final Heading",
          subhead: "Final Subhead",
          cta: "Book demo",
          href: "/book",
        },
      }),
    );
  });
});
