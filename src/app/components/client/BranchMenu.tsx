"use client";

import { useEffect, useState } from "react";
import { GoCheck, GoGitBranch, GoTriangleDown } from "react-icons/go";

// "main" branch switcher in the skills browser toolbar — one branch, for the look.
export default function BranchMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest?.("[data-menu]")) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div data-menu="" className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-md border border-btn-line bg-btn px-2.5 text-[13px] text-ink hover:bg-btn-hover"
      >
        <GoGitBranch aria-hidden="true" className="size-4 flex-none text-muted" />
        <span className="font-semibold">main</span>
        <GoTriangleDown aria-hidden="true" className="size-4 flex-none text-muted" />
      </button>
      {open && (
        <div role="menu" aria-label="Branches" className="absolute top-[calc(100%+6px)] left-0 z-5 w-60 rounded-xl border border-line bg-surface p-1.5 shadow-overlay">
          <div className="px-2.5 pt-1.5 pb-2 text-xs font-semibold text-muted">Switch branches</div>
          <button
            type="button"
            role="menuitemradio"
            aria-checked="true"
            onClick={() => setOpen(false)}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md border-0 bg-subtle px-2.5 py-2 text-left text-ink"
          >
            <GoCheck aria-hidden="true" className="size-4 flex-none text-accent" />
            <span className="flex-1 font-code text-[13px]">main</span>
            <span className="rounded-full border border-line px-1.75 text-[11px] leading-4.5 text-muted">default</span>
          </button>
        </div>
      )}
    </div>
  );
}
