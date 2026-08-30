import { beforeEach, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { ThemeToggle } from "@/components/replica/theme/ThemeToggle";

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.dataset.theme = "dark";
});

test("reads initial theme from documentElement (theme-init sync)", async () => {
  document.documentElement.dataset.theme = "dark";
  window.localStorage.setItem("stackgen-theme", "dark");
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
  expect(
    await screen.findByRole("button", { name: /switch to light theme/i }),
  ).toHaveTextContent("Light");
});

test("toggle sets data-theme on documentElement", async () => {
  document.documentElement.dataset.theme = "light";
  window.localStorage.setItem("stackgen-theme", "light");
  const user = userEvent.setup();
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
  await user.click(
    await screen.findByRole("button", { name: /switch to dark theme/i }),
  );
  expect(document.documentElement.dataset.theme).toBe("dark");
});

test("re-applies light preference from storage after mount", async () => {
  document.documentElement.dataset.theme = "dark";
  window.localStorage.setItem("stackgen-theme", "light");
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
  await screen.findByRole("button", { name: /switch to dark theme/i });
  expect(document.documentElement.dataset.theme).toBe("light");
});
