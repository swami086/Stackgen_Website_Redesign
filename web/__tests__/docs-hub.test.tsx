import { render, screen, within } from "@testing-library/react";
import DocsHubPage from "@/app/(site)/docs/page";
import { docsHub } from "@/content/docs/hub";

test("hub lists three products and three developer tools", () => {
  render(<DocsHubPage />);
  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(docsHub.title);
  const productSection = screen.getByRole("heading", { name: docsHub.productsTitle }).closest("section")!;
  for (const p of docsHub.products) {
    expect(within(productSection).getByRole("link", { name: new RegExp(p.title) })).toHaveAttribute(
      "href",
      p.href,
    );
  }
  const toolsSection = screen.getByRole("heading", { name: docsHub.toolsTitle }).closest("section")!;
  for (const t of docsHub.tools) {
    expect(within(toolsSection).getByRole("link", { name: new RegExp(t.title) })).toHaveAttribute(
      "href",
      t.href,
    );
  }
});
