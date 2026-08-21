"use client";

import { useTheme } from "@/components/layout/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button type="button" aria-label="Toggle color theme" onClick={toggle}>
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
