"use client";

import { useTheme } from "@/components/replica/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      onClick={toggle}
      className="inline-flex h-8 shrink-0 items-center rounded-full border border-border bg-surface px-3 font-mono text-[11px] leading-none text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
