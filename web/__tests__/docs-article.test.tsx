import { loadDoc } from "@/lib/docs/load";

test("appstacks page imported", () => {
  const page = loadDoc(["stackgen", "concepts", "appstacks"]);
  expect(page).not.toBeNull();
  expect(page!.body).toMatch(/appStack/i);
  expect(page!.body).not.toMatch(/Skip to main content/);
  expect(page!.frontmatter.sourcePath).toBe("/docs/concepts/appstacks");
});
