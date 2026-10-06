"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoDownload, GoSearch } from "react-icons/go";
import BrandMark from "../ui/BrandMark";
import Kbd from "../ui/Kbd";
import ThreeBarsIcon from "../ui/ThreeBarsIcon";
import { buttonClass, iconButtonClass } from "../ui/buttonStyles";
import CommandPalette, { type PaletteProject } from "./CommandPalette";
import MenuSheet from "./MenuSheet";
import SectionTabs from "./SectionTabs";
import ThemeMenu from "./ThemeMenu";
import type { SiteLinks } from "./homeNav";
import { HOME_SECTION_IDS, handleSectionLinkClick, scrollToSection, type HomeSectionId } from "../../lib/sections";
import { useScrollSpy } from "../../lib/useScrollSpy";

type SiteHeaderClientProps = {
  handle: string;
  counts: Partial<Record<HomeSectionId, number>>;
  projects: PaletteProject[];
  links: SiteLinks;
};

/**
 * Home chrome: sticky header (one row on laptops, two rows below) and the
 * overlays it opens — command palette and phone menu.
 */
export default function SiteHeaderClient({ handle, counts, projects, links }: SiteHeaderClientProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [overlay, setOverlay] = useState<"palette" | "sheet" | null>(null);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const { active, headerHidden } = useScrollSpy(HOME_SECTION_IDS, headerRef, overlay !== null);

  const openOverlay = useCallback((which: "palette" | "sheet") => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setThemeMenuOpen(false);
    setOverlay(which);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay(null);
    const el = returnFocus.current;
    if (el && document.contains(el)) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  // ⌘K / Ctrl+K toggles the palette; "/" opens it unless the user is typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.querySelector('[data-overlay="lightbox"]')) return;
      const t = e.target as HTMLElement | null;
      const typing = !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (overlay === "palette") closeOverlay();
        else openOverlay("palette");
      } else if (e.key === "/" && !typing && overlay !== "palette") {
        e.preventDefault();
        openOverlay("palette");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlay, openOverlay, closeOverlay]);

  // Arriving at /#experience etc.: land under the sticky header, not behind it.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || id === "about" || !(HOME_SECTION_IDS as readonly string[]).includes(id)) return;
    const timer = window.setTimeout(() => scrollToSection(id, true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        data-site-header=""
        data-band="header"
        data-tone="dark"
        data-hidden={headerHidden ? "true" : undefined}
        className="rb-header"
      >
        <div className="rb-container-header">
          <div className="flex h-12 items-center gap-3 md:h-14 lg:h-16">
            <a
              href="#about"
              onClick={handleSectionLinkClick}
              aria-label="Ripunjoy Buddha — back to top"
              className="flex min-w-0 flex-none items-center gap-2.5 text-ink"
            >
              <BrandMark />
              <span className="hidden whitespace-nowrap text-[15px] font-semibold xs:inline">{handle}</span>
            </a>
            <SectionTabs variant="inline" active={active} counts={counts} />
            <span className="flex-1 lg:hidden" />
            <div className="flex flex-none items-center gap-2">
              <button
                type="button"
                onClick={() => openOverlay("palette")}
                aria-label="Search or jump to — press slash or Command K"
                className="hidden h-8 w-[clamp(180px,15vw,240px)] cursor-text items-center gap-2 rounded-md border border-line bg-transparent pr-2 pl-2.5 text-sm text-muted transition-colors duration-200 hover:border-muted xl:flex"
              >
                <GoSearch aria-hidden="true" className="size-4 flex-none" />
                <span className="min-w-0 flex-1 truncate text-left">
                  Type <Kbd>/</Kbd> to search
                </span>
              </button>
              <button
                type="button"
                onClick={() => openOverlay("palette")}
                aria-label="Search or jump to — press slash"
                className="hidden h-8 cursor-pointer items-center gap-2 rounded-md border border-line bg-transparent pr-2 pl-2.5 text-muted hover:border-muted lg:flex xl:hidden"
              >
                <GoSearch aria-hidden="true" className="size-4 flex-none" />
                <Kbd>/</Kbd>
              </button>
              <button
                type="button"
                onClick={() => openOverlay("palette")}
                aria-label="Search or jump to"
                className="grid size-11 cursor-pointer place-items-center rounded-md border border-line bg-transparent text-ink lg:hidden"
              >
                <GoSearch aria-hidden="true" className="size-4" />
              </button>
              <ThemeMenu open={themeMenuOpen} onOpenChange={setThemeMenuOpen} />
              <a href={links.resume} download className={buttonClass("secondary", "sm", "", "hidden lg:inline-flex")}>
                <GoDownload aria-hidden="true" className="size-4" />
                Resume
              </a>
              <a href={links.resume} download aria-label="Download resume" className={iconButtonClass("hidden md:grid lg:hidden")}>
                <GoDownload aria-hidden="true" className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => openOverlay("sheet")}
                aria-label="Open menu"
                aria-haspopup="dialog"
                className="grid size-11 cursor-pointer place-items-center rounded-md border border-line bg-transparent text-ink md:hidden"
              >
                <ThreeBarsIcon className="size-4" />
              </button>
            </div>
          </div>
          <SectionTabs variant="row" active={active} counts={counts} />
        </div>
      </header>
      {overlay === "palette" && <CommandPalette projects={projects} links={links} onClose={closeOverlay} />}
      {overlay === "sheet" && <MenuSheet links={links} onClose={closeOverlay} />}
    </>
  );
}
