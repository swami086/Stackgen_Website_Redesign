import {
  nestLeaves,
  titleFromSegment,
  uniquifyLeafTitles,
} from "@/lib/docs/nav-tree";

test("titleFromSegment expands cloud flags", () => {
  expect(titleFromSegment("awsflags")).toBe("AWS flags");
  expect(titleFromSegment("cli-guide")).toBe("CLI Guide");
});

test("uniquifyLeafTitles replaces colliding Usage labels", () => {
  const unique = uniquifyLeafTitles([
    { title: "Usage", href: "/docs/stackgen/cli-guide/cloud2code/awsflags", slug: ["stackgen", "cli-guide", "cloud2code", "awsflags"] },
    { title: "Usage", href: "/docs/stackgen/cli-guide/cloud2code/azureflags", slug: ["stackgen", "cli-guide", "cloud2code", "azureflags"] },
    { title: "Automatic Events", href: "/docs/stackgen/analytics/tracked-events", slug: ["stackgen", "analytics", "tracked-events"] },
  ]);
  expect(unique.map((leaf) => leaf.title)).toEqual(["AWS flags", "Azure flags", "Automatic Events"]);
});

test("nestLeaves builds a folder tree from slugs", () => {
  const tree = nestLeaves("stackgen", "StackGen", [
    { title: "Get Started", href: "/docs/stackgen", slug: ["stackgen"] },
    { title: "AppStacks", href: "/docs/stackgen/concepts/appstacks", slug: ["stackgen", "concepts", "appstacks"] },
    { title: "AWS flags", href: "/docs/stackgen/cli-guide/cloud2code/awsflags", slug: ["stackgen", "cli-guide", "cloud2code", "awsflags"] },
  ]);
  expect(tree.children.map((node) => node.title)).toEqual(["Concepts", "CLI Guide"]);
  const concepts = tree.children[0]!;
  expect(concepts.href).toBeUndefined();
  expect(concepts.children[0]?.title).toBe("AppStacks");
  expect(concepts.children[0]?.href).toBe("/docs/stackgen/concepts/appstacks");
});
