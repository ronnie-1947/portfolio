"use client";

import { useEffect, useRef } from "react";
import { GoDownload, GoX } from "react-icons/go";
import { buttonClass } from "../ui/buttonStyles";
import { THEME_OPTIONS, type SiteLinks } from "./homeNav";
import { trapTab } from "../../lib/focusTrap";
import { useCopyText } from "../../lib/useCopyText";
import { setTheme, useTheme } from "../../lib/useTheme";

type MenuSheetProps = {
  links: SiteLinks;
  onClose: () => void;
};

// Phone-only bottom sheet: theme, resume and profile links.
export default function MenuSheet({ links, onClose }: MenuSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const { copied, copy } = useCopyText(links.email);

  useEffect(() => {
    sheetRef.current?.querySelector("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "Tab") trapTab(e, sheetRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      data-band="sheet"
      data-tone="dark"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-90 flex items-end bg-[rgba(1,4,9,0.55)]"
    >
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="w-full rounded-t-xl border-t border-line bg-surface px-4 pt-2 pb-[max(24px,env(safe-area-inset-bottom))] text-ink shadow-overlay"
      >
        <div aria-hidden="true" className="mx-auto mt-1 mb-2 h-1 w-10 rounded-sm bg-line" />
        <div className="mb-2 flex items-center justify-between">
          <span className="text-base font-semibold">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid size-11 cursor-pointer place-items-center rounded-md border-0 bg-transparent text-ink"
          >
            <GoX className="size-4" />
          </button>
        </div>
        <div className="mt-1 mb-2 text-xs font-semibold text-muted">Theme</div>
        <div role="radiogroup" aria-label="Theme" className="grid grid-cols-3 gap-1 rounded-md border border-line p-1">
          {THEME_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={theme === id}
              onClick={() => setTheme(id)}
              className={`h-11 cursor-pointer rounded border-0 text-sm text-ink ${
                theme === id ? "bg-btn font-semibold shadow-[0_0_0_1px_var(--rb-bd)]" : "bg-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <a href={links.resume} download className={buttonClass("primary", "hero", "mt-4 w-full", "flex")}>
          <GoDownload className="size-4" />
          Download resume
        </a>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <a href={links.github} target="_blank" rel="noopener" className={buttonClass("secondary", "touch", "", "flex")}>
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener" className={buttonClass("secondary", "touch", "", "flex")}>
            LinkedIn
          </a>
          <button type="button" onClick={copy} className={buttonClass("secondary", "touch", "", "flex")}>
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
      </div>
    </div>
  );
}
