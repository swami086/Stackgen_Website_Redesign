import { loadDoc } from "@/lib/docs/load";

test("observenow hub has telemetry intro", () => {
  const page = loadDoc(["observenow"]);
  expect(page).not.toBeNull();
  expect(page!.body).toMatch(/metrics, logs, and traces/i);
});
