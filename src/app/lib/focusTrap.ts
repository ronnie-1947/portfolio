import type { KeyboardEvent as ReactKeyboardEvent } from "react";

const FOCUSABLE = 'button, a[href], input, textarea, [tabindex]:not([tabindex="-1"])';

/** Keep Tab / Shift+Tab cycling inside `root` (for modal dialogs). */
export function trapTab(e: KeyboardEvent | ReactKeyboardEvent, root: HTMLElement | null) {
  if (!root) return;
  const items = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => !(el as HTMLButtonElement).disabled && el.offsetParent !== null,
  );
  if (!items.length) return;
  e.preventDefault();
  const i = items.indexOf(document.activeElement as HTMLElement);
  const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i < 0 || i === items.length - 1 ? 0 : i + 1;
  items[next].focus();
}
