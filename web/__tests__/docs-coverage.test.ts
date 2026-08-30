import manifest from "@/content/docs/manifest.json";

test("imported page count covers the live map minus skips", () => {
  expect(manifest.length).toBeGreaterThanOrEqual(400);
  const denied = manifest.filter((m: { status: string }) => m.status === "denied");
  expect(denied).toEqual([]);
});
