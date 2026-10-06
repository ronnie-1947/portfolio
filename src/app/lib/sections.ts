import type { MouseEvent } from "react";
import { prefersReducedMotion } from "./useMediaQuery";

// Home sections, in page order. Each section's <h2> carries data-anchor="<id>".
export const HOME_SECTION_IDS = ["about", "experience", "projects", "skills", "education", "contact"] as const;
export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

// Below this width the header is two rows and its top row hides on scroll.
export const PHONE_MAX_WIDTH = 768;
const PHONE_TAB_ROW_HEIGHT = 44;

export function getSiteHeader() {
  return document.querySelector<HTMLElement>("[data-site-header]");
}

/** Scroll so a section's heading lands just under the sticky header. */
export function scrollToSection(id: string, instant = false) {
  const behavior: ScrollBehavior = instant || prefersReducedMotion() ? "auto" : "smooth";
  if (id === "about") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.querySelector<HTMLElement>(`[data-anchor="${id}"]`) ?? document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY;
  const goingDown = y > window.scrollY;
  // Scrolling down on a phone slides the header's top row away, leaving only the tab row.
  const headerHeight =
    window.innerWidth < PHONE_MAX_WIDTH && goingDown ? PHONE_TAB_ROW_HEIGHT : (getSiteHeader()?.offsetHeight ?? 64);
  window.scrollTo({ top: Math.max(0, y - headerHeight - 20), behavior });
}

/** onClick for `<a href="#section">` links: smooth-scroll instead of jumping, keep the hash in the URL. */
export function handleSectionLinkClick(e: MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href") ?? "";
  if (!href.startsWith("#")) return;
  e.preventDefault();
  scrollToSection(href.slice(1));
  try {
    history.replaceState(null, "", href);
  } catch {
    // Sandboxed frames can refuse history writes; scrolling already happened.
  }
}
