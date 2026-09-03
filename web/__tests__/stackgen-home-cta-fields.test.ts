import { describe, expect, it, vi } from "vitest";

vi.mock("@delmaredigital/payload-puck/fields", () => ({
  createMediaField: () => ({ type: "custom" }),
}));

vi.mock("@/components/replica/theme/ThemeProvider", () => ({
  useTheme: () => ({ theme: "light" as const }),
}));

import { homeBlocks } from "@/puck/blocks/home/home-blocks";
import { chromeBlocks } from "@/puck/blocks/chrome/chrome-blocks";

function hasKeys(fields: Record<string, unknown>, keys: string[]) {
  for (const k of keys) expect(fields).toHaveProperty(k);
}

function hasDefaultProps(block: { defaultProps?: Record<string, unknown> }, keys: string[]) {
  expect(block.defaultProps).toBeDefined();
  for (const k of keys) expect(block.defaultProps).toHaveProperty(k);
}

describe("home CTAs editable", () => {
  it("hero has primary/secondary CTA fields", () => {
    hasKeys(homeBlocks.StackGenHomeHero.fields as Record<string, unknown>, [
      "primaryCta",
      "primaryHref",
      "secondaryCta",
      "secondaryHref",
    ]);
    hasDefaultProps(homeBlocks.StackGenHomeHero, [
      "primaryCta",
      "primaryHref",
      "secondaryCta",
      "secondaryHref",
    ]);
  });

  it("problem has learn-more CTA fields", () => {
    hasKeys(homeBlocks.StackGenHomeProblem.fields as Record<string, unknown>, [
      "learnMoreLabel",
      "learnMoreHref",
    ]);
    hasDefaultProps(homeBlocks.StackGenHomeProblem, ["learnMoreLabel", "learnMoreHref"]);
  });

  it("assemblies has learn-more CTA fields", () => {
    hasKeys(homeBlocks.StackGenHomeAssemblies.fields as Record<string, unknown>, [
      "learnMoreLabel",
      "learnMoreHref",
    ]);
    hasDefaultProps(homeBlocks.StackGenHomeAssemblies, ["learnMoreLabel", "learnMoreHref"]);
  });

  it("nav has CTA label and href fields", () => {
    hasKeys(chromeBlocks.StackGenNav.fields as Record<string, unknown>, ["ctaLabel", "ctaHref"]);
    hasDefaultProps(chromeBlocks.StackGenNav, ["ctaLabel", "ctaHref"]);
  });

  it("footer has CTA label and href fields", () => {
    hasKeys(chromeBlocks.StackGenFooter.fields as Record<string, unknown>, ["cta", "ctaHref"]);
    hasDefaultProps(chromeBlocks.StackGenFooter, ["cta", "ctaHref"]);
  });
});
