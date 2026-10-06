import { useSyncExternalStore } from "react";
import { readTheme, THEME_STORAGE_KEY, type Theme } from "./theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "mixed") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }
  listeners.forEach((listener) => listener());
}

/** Current home theme. Renders as "mixed" on the server, then settles on the stored choice. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "mixed");
}
