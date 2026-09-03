import { describe, expect, it, vi } from "vitest";

vi.mock("@delmaredigital/payload-puck/config", () => ({
  baseConfig: {},
  mergeConfigs: (cfg: {
    components?: Record<string, unknown>;
    categories?: Record<string, unknown>;
    root?: unknown;
    base?: unknown;
  }) => ({
    ...cfg.base,
    components: cfg.components,
    categories: cfg.categories,
    root: cfg.root,
  }),
}));

vi.mock("@delmaredigital/payload-puck/config/editor", () => ({
  editorConfig: {},
}));

vi.mock("@delmaredigital/payload-puck/fields", () => ({
  createMediaField: () => ({ type: "custom" }),
}));

vi.mock("@/puck/PuckRenderProviders", () => ({
  PuckRenderProviders: ({ children }: { children: React.ReactNode }) => children,
}));

import { stackgenConfig } from "@/puck/stackgen-config";

describe("stackgenConfig", () => {
  it("does not register PenPage", () => {
    expect(stackgenConfig.components).not.toHaveProperty("PenPage");
  });
  it("registers StackGenHomeHero", () => {
    expect(stackgenConfig.components).toHaveProperty("StackGenHomeHero");
  });
  it("does not use Legacy StackGen category title", () => {
    const titles = Object.values(stackgenConfig.categories ?? {}).map(
      (c: { title?: string }) => c.title,
    );
    expect(titles.join(" ")).not.toMatch(/Legacy StackGen/i);
  });
});
