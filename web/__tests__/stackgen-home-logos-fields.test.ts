import { describe, expect, it, vi } from "vitest";

vi.mock("@delmaredigital/payload-puck/fields", () => ({
  createMediaField: () => ({ type: "custom" }),
}));

vi.mock("@/components/replica/theme/ThemeProvider", () => ({
  useTheme: () => ({ theme: "light" as const }),
}));

import { replicaContent } from "@/content/replica";
import { homeBlocks } from "@/puck/blocks/home/home-blocks";
import { buildHomePuckDataFromContent } from "@/puck/lib/build-page-data";
import { mergeReplicaContent } from "@/puck/lib/merge-content";

describe("StackGenHomeLogos", () => {
  it("exposes items array field", () => {
    const fields = homeBlocks.StackGenHomeLogos.fields as Record<string, { type?: string }>;
    expect(fields.items?.type).toBe("array");
  });

  it("defaultProps items come from replicaContent.logos", () => {
    const defaultProps = homeBlocks.StackGenHomeLogos.defaultProps as {
      eyebrow?: string;
      items?: Array<{ src: string; alt: string }>;
    };
    expect(defaultProps.eyebrow).toBe(replicaContent.logos.eyebrow);
    expect(defaultProps.items).toEqual(replicaContent.logos.items);
  });

  it("mergeReplicaContent accepts logos.items overrides", () => {
    const override = [{ src: "/custom.png", alt: "Custom" }];
    const merged = mergeReplicaContent({ logos: { items: override } });
    expect(merged.logos.items).toEqual(override);
  });

  it("buildHomePuckDataFromContent hydrates logos items", () => {
    const data = buildHomePuckDataFromContent(replicaContent);
    const logosBlock = data.content?.find((b) => b.type === "StackGenHomeLogos");
    expect(logosBlock?.props.items).toEqual(
      replicaContent.logos.items.map((logo) => ({ src: logo.src, alt: logo.alt })),
    );
  });
});
