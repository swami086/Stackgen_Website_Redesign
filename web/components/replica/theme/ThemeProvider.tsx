"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { STORAGE_KEY, type Theme } from "@/lib/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_CHANGE_EVENT = "stackgen-theme-change";

function validateTheme(value: string | null | undefined): Theme {
  return value === "light" || value === "dark" ? value : "dark";
}

function readThemeFromDocument(): Theme {
  return validateTheme(document.documentElement.dataset.theme);
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ponytail: private mode may block storage */
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function subscribe(onStoreChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY && e.key !== null) return;
    try {
      document.documentElement.dataset.theme = validateTheme(
        localStorage.getItem(STORAGE_KEY),
      );
    } catch {
      /* ponytail: private mode may block storage */
    }
    onStoreChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function getSnapshot(): Theme {
  return readThemeFromDocument();
}

function getServerSnapshot(): Theme {
  return "dark";
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  /** When set (Puck canvas), overrides stored preference on mount. */
  initialTheme?: Theme;
}) {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Re-apply stored preference after hydration. Under prefers-reduced-motion,
  // React can leave SSR `data-theme="dark"` on the document even when
  // theme-init / localStorage already chose light (Wave 5 race).
  useEffect(() => {
    if (initialTheme) {
      applyTheme(initialTheme);
      return;
    }
    try {
      applyTheme(validateTheme(localStorage.getItem(STORAGE_KEY)));
    } catch {
      applyTheme(readThemeFromDocument());
    }
  }, [initialTheme]);

  const setTheme = useCallback((t: Theme) => {
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
