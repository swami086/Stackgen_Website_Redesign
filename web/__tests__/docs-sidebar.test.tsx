import { render, screen } from "@testing-library/react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

vi.mock("next/navigation", () => ({
  usePathname: () => "/docs/stackgen/concepts/appstacks",
}));

test("stackgen sidebar includes product doc links", () => {
  render(<DocsSidebar product="stackgen" />);
  const links = screen.getAllByRole("link");
  const productLinks = links.filter((link) =>
    link.getAttribute("href")?.startsWith("/docs/stackgen/"),
  );
  expect(productLinks.length).toBeGreaterThan(0);
});

test("sidebar does not list dozens of identical Usage labels", () => {
  render(<DocsSidebar product="stackgen" />);
  expect(screen.queryAllByRole("link", { name: "Usage" }).length).toBeLessThan(3);
});
