import { loadDoc } from "@/lib/docs/load";

test("aiden 2 overview is not access denied", () => {
  const page = loadDoc(["aiden", "2.0"]);
  expect(page).not.toBeNull();
  expect(page!.frontmatter.status).toBe("ok");
  expect(page!.body).toMatch(/Agentic AI Operating System/i);
  expect(page!.body).not.toMatch(/AccessDenied/);
});
