import { loadDoc } from "@/lib/docs/load";

test("release notes versions page imported", () => {
  const page = loadDoc(["stackgen", "release-notes"]);
  expect(page).not.toBeNull();
  expect(page!.frontmatter.status).not.toBe("denied");
});
