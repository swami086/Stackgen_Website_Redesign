import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/layout/Nav";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LOGIN_ITEM, NAV_ITEMS, PRIMARY_CTA } from "@/lib/nav";

test("nav exposes canvas labels and hrefs", () => {
  render(
    <ThemeProvider>
      <Nav />
    </ThemeProvider>,
  );

  for (const { label, href } of NAV_ITEMS) {
    expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href);
  }

  expect(screen.getByRole("link", { name: LOGIN_ITEM.label })).toHaveAttribute(
    "href",
    LOGIN_ITEM.href,
  );
  expect(screen.getByRole("link", { name: PRIMARY_CTA.label })).toHaveAttribute(
    "href",
    PRIMARY_CTA.href,
  );
});
