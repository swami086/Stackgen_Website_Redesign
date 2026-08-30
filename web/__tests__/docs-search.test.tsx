import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DocsSearch } from "@/components/docs/DocsSearch";

test("filters nav titles and shows result links", async () => {
  const user = userEvent.setup();
  render(<DocsSearch />);

  const input = screen.getByRole("searchbox", { name: "Search docs" });
  await user.type(input, "automatic");

  const link = await screen.findByRole("link", { name: "Automatic Events" });
  expect(link).toHaveAttribute("href", "/docs/stackgen/analytics/tracked-events");
});
