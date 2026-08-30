import {
  destFromSourcePath,
  rewriteDocsHref,
  sourceFromDestSlug,
} from "@/lib/docs/paths";

test("hub and product roots", () => {
  expect(destFromSourcePath("/")).toEqual({ kind: "hub", slug: [] });
  expect(destFromSourcePath("/docs")).toEqual({
    kind: "page",
    slug: ["stackgen"],
  });
  expect(destFromSourcePath("/aiden")).toEqual({
    kind: "page",
    slug: ["aiden"],
  });
  expect(destFromSourcePath("/observenow")).toEqual({
    kind: "page",
    slug: ["observenow"],
  });
});

test("nests stackgen under /docs/stackgen", () => {
  expect(destFromSourcePath("/docs/cli-guide/usage/appstack/create")).toEqual({
    kind: "page",
    slug: ["stackgen", "cli-guide", "usage", "appstack", "create"],
  });
});

test("keeps aiden and observenow prefixes", () => {
  expect(destFromSourcePath("/aiden/2.0/settings/workspace")).toEqual({
    kind: "page",
    slug: ["aiden", "2.0", "settings", "workspace"],
  });
  expect(
    destFromSourcePath("/observenow/integrations/infrastructure/kubernetes"),
  ).toEqual({
    kind: "page",
    slug: ["observenow", "integrations", "infrastructure", "kubernetes"],
  });
});

test("skips docusaurus chrome routes", () => {
  expect(destFromSourcePath("/search").kind).toBe("skip");
  expect(destFromSourcePath("/blog").kind).toBe("skip");
  expect(destFromSourcePath("/markdown-page").kind).toBe("skip");
  expect(destFromSourcePath("/docs/category/quickstart").kind).toBe("skip");
});

test("strips trailing slashes", () => {
  expect(destFromSourcePath("/aiden/2.0/")).toEqual(
    destFromSourcePath("/aiden/2.0"),
  );
});

test("round-trips dest slugs", () => {
  const slug = ["stackgen", "concepts", "appstacks"];
  expect(sourceFromDestSlug(slug)).toBe("/docs/concepts/appstacks");
  expect(sourceFromDestSlug(["aiden", "1.0", "integrations", "github"])).toBe(
    "/aiden/1.0/integrations/github",
  );
  expect(sourceFromDestSlug([])).toBe("/");
});

test("does not re-nest dest paths already under a product", () => {
  expect(destFromSourcePath("/docs/stackgen/concepts/appstacks")).toEqual({
    kind: "page",
    slug: ["stackgen", "concepts", "appstacks"],
  });
  expect(destFromSourcePath("/docs/aiden/2.0")).toEqual({
    kind: "page",
    slug: ["aiden", "2.0"],
  });
  expect(destFromSourcePath("/docs/observenow/alerting")).toEqual({
    kind: "page",
    slug: ["observenow", "alerting"],
  });
});

test("rewriteDocsHref keeps dest article hrefs", () => {
  expect(rewriteDocsHref("/docs/stackgen/concepts/appstacks")).toBe(
    "/docs/stackgen/concepts/appstacks",
  );
  expect(rewriteDocsHref("/docs/aiden/2.0/settings")).toBe(
    "/docs/aiden/2.0/settings",
  );
  expect(rewriteDocsHref("/docs/observenow/alerting#rules")).toBe(
    "/docs/observenow/alerting#rules",
  );
});

test("rewriteDocsHref maps source docs.stackgen.com paths", () => {
  expect(rewriteDocsHref("https://docs.stackgen.com/docs/concepts/appstacks")).toBe(
    "/docs/stackgen/concepts/appstacks",
  );
  expect(rewriteDocsHref("/docs/concepts/appstacks")).toBe(
    "/docs/stackgen/concepts/appstacks",
  );
  expect(rewriteDocsHref("/aiden/2.0")).toBe("/docs/aiden/2.0");
});

test("rewriteDocsHref maps omitted /docs prefix to stackgen", () => {
  expect(destFromSourcePath("/setup/pat")).toEqual({
    kind: "page",
    slug: ["stackgen", "setup", "pat"],
  });
  expect(rewriteDocsHref("https://docs.stackgen.com/setup/pat")).toBe(
    "/docs/stackgen/setup/pat",
  );
});

test("rewriteDocsHref leaves non-docs hosts unchanged", () => {
  expect(rewriteDocsHref("https://intent2infra.cloud.stackgen.com/")).toBe(
    "https://intent2infra.cloud.stackgen.com/",
  );
});

test("rewriteDocsHref leaves docs CDN and image paths on docs.stackgen.com", () => {
  expect(rewriteDocsHref("https://docs.stackgen.com/cdn/datadog.svg")).toBe(
    "https://docs.stackgen.com/cdn/datadog.svg",
  );
  expect(
    rewriteDocsHref("https://docs.stackgen.com/assets/images/topology.png"),
  ).toBe("https://docs.stackgen.com/assets/images/topology.png");
});
