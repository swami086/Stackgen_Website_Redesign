import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

test("reads initial theme from documentElement (theme-init sync)", () => {
  document.documentElement.dataset.theme = "dark";
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
  expect(screen.getByRole("button", { name: /theme|dark|light/i })).toHaveTextContent(
    "Light",
  );
});

test("toggle sets data-theme on documentElement", async () => {
  document.documentElement.dataset.theme = "light";
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
  await user.click(screen.getByRole("button", { name: /theme|dark|light/i }));
  expect(document.documentElement.dataset.theme).toBe("dark");
});
