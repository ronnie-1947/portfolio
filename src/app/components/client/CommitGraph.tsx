"use client";

import { useEffect, useRef, useState } from "react";
import { GoUnfold } from "react-icons/go";
import CommitItem, { type CommitView } from "./CommitItem";
import { prefersReducedMotion } from "../../lib/useMediaQuery";

type CommitGraphProps = {
  heading: React.ReactNode;
  commits: CommitView[];
};

/**
 * Experience as `git log --graph`. The newest role starts expanded. As the list
 * scrolls up, a cover over the graph gutter slides down so the lanes appear to
 * draw themselves, and each commit node pops in as the line reaches it.
 */
export default function CommitGraph({ heading, commits }: CommitGraphProps) {
  const [open, setOpen] = useState<Record<string, boolean>>(() => ({ [commits[0]?.id]: true }));
  const [tagsOpen, setTagsOpen] = useState<Record<string, boolean>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const allOpen = commits.every((c) => open[c.id]);

  useEffect(() => {
    const list = listRef.current;
    const cover = coverRef.current;
    if (!list || !cover) return;
    const reduced = prefersReducedMotion();
    const update = () => {
      const r = list.getBoundingClientRect();
      const drawn = reduced ? r.height : Math.max(0, Math.min(r.height, window.innerHeight * 0.66 - r.top));
      cover.style.top = `${drawn}px`;
      list.querySelectorAll<HTMLElement>("[data-node]").forEach((node) => {
        const on = reduced || node.getBoundingClientRect().top - r.top + 6 <= drawn;
        node.style.transform = on ? "scale(1)" : "scale(0.2)";
        node.style.opacity = on ? "1" : "0";
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Expanding or collapsing a card changes the list height mid-scroll.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(list);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
    };
  }, []);

  const toggleAll = () => setOpen(Object.fromEntries(commits.map((c) => [c.id, !allOpen])));

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        {heading}
        <button
          type="button"
          onClick={toggleAll}
          className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-md border border-btn-line bg-btn px-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-btn-hover"
        >
          <GoUnfold aria-hidden="true" className="size-4 flex-none" />
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <div ref={listRef} className="relative">
        <div ref={coverRef} aria-hidden="true" className="pointer-events-none absolute top-full bottom-0 left-0 z-1 w-14 bg-canvas" />
        <ol aria-label="Roles, newest first" className="m-0 list-none p-0">
          {commits.map((c, i) => (
            <CommitItem
              key={c.id}
              commit={c}
              head={i === 0}
              first={i === 0}
              last={i === commits.length - 1}
              open={!!open[c.id]}
              tagsOpen={!!tagsOpen[c.id]}
              onToggle={() => setOpen((s) => ({ ...s, [c.id]: !s[c.id] }))}
              onToggleTags={() => setTagsOpen((s) => ({ ...s, [c.id]: !s[c.id] }))}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
