"use client";

import { useEffect, useRef } from "react";
import Counter from "../ui/Counter";
import { SECTION_NAV } from "./homeNav";
import { HOME_SECTION_IDS, handleSectionLinkClick, type HomeSectionId } from "../../lib/sections";
import { prefersReducedMotion } from "../../lib/useMediaQuery";

type SectionTabsProps = {
  // "inline" sits in the header's single row (laptop up); "row" is the phone/tablet second row.
  variant: "inline" | "row";
  active: string;
  counts: Partial<Record<HomeSectionId, number>>;
};

export default function SectionTabs({ variant, active, counts }: SectionTabsProps) {
  const navRef = useRef<HTMLElement>(null);
  const inline = variant === "inline";

  // Keep the active tab centred when the row scrolls horizontally.
  useEffect(() => {
    const nav = navRef.current;
    const tab = nav?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!nav || !tab || !nav.clientWidth) return;
    const left = tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      ref={navRef}
      aria-label="Sections"
      className={
        inline
          ? "rb-no-scrollbar ml-3 hidden min-w-0 flex-auto gap-0.5 overflow-x-auto lg:flex"
          : "rb-no-scrollbar rb-edge-mask -mx-[var(--rb-g)] flex gap-0.5 overflow-x-auto px-[calc(var(--rb-g)-6px)] lg:hidden"
      }
    >
      {HOME_SECTION_IDS.map((id) => {
        const { label, icon: Icon } = SECTION_NAV[id];
        const on = active === id;
        const count = counts[id];
        return (
          <a
            key={id}
            href={`#${id}`}
            data-tab={id}
            onClick={handleSectionLinkClick}
            aria-current={on ? "true" : undefined}
            className={`relative flex flex-none items-center whitespace-nowrap px-0.5 text-sm text-ink ${inline ? "h-16" : "h-11"}`}
          >
            <span className="flex items-center gap-2 rounded-md px-2 py-[5px] transition-colors duration-200 hover:bg-subtle">
              <Icon className={`size-4 flex-none text-muted ${inline ? "hidden xl:inline" : ""}`} />
              <span className={on ? "font-semibold" : ""}>{label}</span>
              {count ? <Counter>{count}</Counter> : null}
            </span>
            {on && <span aria-hidden="true" className="absolute inset-x-2 -bottom-px h-0.5 rounded-md bg-tab-line" />}
          </a>
        );
      })}
    </nav>
  );
}
