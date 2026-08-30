import { loadDoc } from "@/lib/docs/load";

test("cli create fence has no blank line after backslash", () => {
  const page = loadDoc(["stackgen", "cli-guide", "usage", "appstack", "create"]);
  expect(page).not.toBeNull();
  expect(page!.body).toContain("stackgen appstack create [flags]");
  expect(page!.body).not.toMatch(/\\\n\n/);
});
