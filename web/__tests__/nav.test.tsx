import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/layout/Nav";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

test("nav exposes canvas labels", () => {
  render(
    <ThemeProvider>
      <Nav />
    </ThemeProvider>,
  );
  for (const label of [
    "Product",
    "Platform",
    "Enterprise",
    "Pricing",
    "News",
    "Company",
    "Login",
    "Schedule demo",
  ]) {
    expect(screen.getByText(label)).toBeInTheDocument();
  }
});
