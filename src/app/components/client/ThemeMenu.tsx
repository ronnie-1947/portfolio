"use client";

import { useEffect } from "react";
import { GoCheck } from "react-icons/go";
import { THEME_OPTIONS } from "./homeNav";
import { setTheme, useTheme } from "../../lib/useTheme";

type ThemeMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Header theme picker (tablet and up; phones get it in the menu sheet).
export default function ThemeMenu({ open, onOpenChange }: ThemeMenuProps) {
  const theme = useTheme();
  const current = THEME_OPTIONS.find((o) => o.id === theme) ?? THEME_OPTIONS[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest?.("[data-menu]")) onOpenChange(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  return (
    <div data-menu="" className="relative hidden md:block">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.label}`}
        className="grid size-11 cursor-pointer place-items-center rounded-md border border-line bg-transparent text-muted transition-colors duration-200 hover:bg-subtle hover:text-ink lg:size-8"
      >
        <CurrentIcon className="size-4" />
      </button>
      {open && (
        <div
          role="menu"
          aria-label="Theme"
          className="absolute right-0 top-[calc(100%+8px)] z-5 w-[260px] rounded-xl border border-line bg-surface p-1.5 shadow-overlay"
        >
          <div className="px-2.5 pt-1.5 pb-2 text-xs font-semibold text-muted">Theme</div>
          {THEME_OPTIONS.map(({ id, label, description, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="menuitemradio"
              aria-checked={theme === id}
              onClick={() => {
                setTheme(id);
                onOpenChange(false);
              }}
              className="flex w-full cursor-pointer items-start gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-2 text-left text-ink hover:bg-subtle"
            >
              <Icon className="mt-0.5 size-4 flex-none text-muted" />
              <span className="flex flex-1 flex-col gap-0.5">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-xs text-muted">{description}</span>
              </span>
              {theme === id ? <GoCheck className="size-4 flex-none text-accent" /> : <span className="w-4 flex-none" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
