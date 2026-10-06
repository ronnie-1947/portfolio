/**
 * Home page theme: "mixed" keeps each band's own tone (dark hero, light content),
 * "light" / "dark" force every band to one tone. The choice lives on
 * <html data-theme> (absent = mixed) and in localStorage, and globals.css
 * resolves each band's palette from it.
 *
 * This module has no React imports so the root layout (a server component) can
 * inline `themeInitScript`; the hook lives in `useTheme.ts`.
 */
export type Theme = "dark" | "light";

export const THEMES: Theme[] = ["dark", "light"];
export const THEME_STORAGE_KEY = "rb-portfolio-theme";

/** Runs before first paint so a stored light/dark choice never flashes the mixed theme. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();`;

export function readTheme(): Theme {
  const t = document.documentElement.getAttribute("data-theme");
  return  t === "dark" ? "dark" : "light";
}
