"use client";

import { useTheme } from "@/components/replica/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      onClick={toggle}
      className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
