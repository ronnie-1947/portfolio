"use client";

import { useEffect, useRef, useState, type FocusEvent, type PointerEvent } from "react";
import { GoFile, GoFileCode } from "react-icons/go";
import BranchMenu from "./BranchMenu";
import CodeViewer from "./CodeViewer";
import SkillStack, { type StackLayer } from "./SkillStack";
import type { CodeLine } from "../../lib/skillCode";
import { useFinePointer, useMediaQuery, useReducedMotion } from "../../lib/useMediaQuery";

export type SkillFileView = {
  name: string;
  layer: StackLayer;
  skills: string[];
  lines: CodeLine[];
};

/**
 * Skills as a repo: the isometric stack plus a file browser. How the browser
 * lays out is CSS (see "Skills: file browser modes" in globals.css):
 * tabs above the file below 1024px, list ⇄ file swap to 1440px, side by side above.
 *
 * While on screen it auto-advances through the files (core.md → … → ai.py → core.md).
 * It pauses while a mouse is over it or keyboard focus is inside, a manual pick
 * restarts the countdown, and reduced motion turns it off.
 */
const AUTOPLAY_MS = 4000;

export default function SkillsExplorer({ files }: { files: SkillFileView[] }) {
  const [current, setCurrent] = useState(files[0].name);
  const [view, setView] = useState<"list" | "file">("list");
  const [hovered, setHovered] = useState<StackLayer | null>(null);
  const fine = useFinePointer();
  // Only the 1024–1439px "swap" layout can hide the viewer (while showing the list).
  const swapLayout = useMediaQuery("(min-width: 64rem) and (max-width: 89.99rem)", false);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [keyboardInside, setKeyboardInside] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // Keyed on `current`, so every change (automatic or a click) restarts the countdown.
  useEffect(() => {
    if (!inView || pointerInside || keyboardInside || reduced) return;
    const timer = window.setTimeout(() => {
      const i = files.findIndex((f) => f.name === current);
      setCurrent(files[(i + 1) % files.length].name);
      setView("file");
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [current, files, inView, pointerInside, keyboardInside, reduced]);

  // Phones/tablets: keep the active file tab in view as it advances (horizontal scroll only).
  useEffect(() => {
    const tabs = tabsRef.current;
    const tab = tabs?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!tabs || !tab || !tabs.clientWidth) return;
    tabs.scrollTo({ left: Math.max(0, tab.offsetLeft - (tabs.clientWidth - tab.offsetWidth) / 2), behavior: reduced ? "auto" : "smooth" });
  }, [current, reduced]);

  // Touch "hover" sticks after a tap, so only a real mouse pauses on pointer.
  const onPointerEnter = (e: PointerEvent) => e.pointerType === "mouse" && setPointerInside(true);
  const onPointerLeave = (e: PointerEvent) => e.pointerType === "mouse" && setPointerInside(false);
  // Mouse clicks also focus buttons; only keyboard focus (focus-visible) should pause.
  const onFocus = (e: FocusEvent) => setKeyboardInside((e.target as HTMLElement).matches(":focus-visible"));
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardInside(false);
  };

  const file = files.find((f) => f.name === current) ?? files[0];
  const viewerShown = !swapLayout || view === "file";
  const pick = (name: string) => {
    setCurrent(name);
    setView("file");
  };
  const hover = (layer: StackLayer | null) => {
    if (layer === null || fine) setHovered(layer);
  };

  return (
    <div
      ref={rootRef}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      className="grid grid-cols-1 items-center gap-[clamp(24px,4vw,56px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
    >
      <SkillStack current={viewerShown ? file.layer : null} hovered={hovered} onHover={hover} onPick={pick} />
      <p className="sr-only">
        Skills stack, bottom to top: Cloud and DevOps platform, Databases, Backend, Frontend, and an AI layer on top, wrapped by a Security ring.
      </p>

      <div data-view={view} className="min-w-0 overflow-hidden rounded-md border border-line bg-canvas">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line bg-surface px-3 py-2.5">
          <BranchMenu />
          <nav aria-label="Path" className="flex min-w-0 items-center gap-1.5 font-code text-[13px]">
            <button
              type="button"
              onClick={() => setView("list")}
              className="rb-sk-back cursor-pointer border-0 bg-transparent p-0 font-semibold text-accent hover:underline"
            >
              skills
            </button>
            <span className="rb-sk-crumb font-semibold text-accent">skills</span>
            <span className="text-muted">/</span>
            <span className="rb-sk-path font-semibold text-ink">{file.name}</span>
          </nav>
          <span className="ml-auto font-code text-xs text-muted">{files.length} files</span>
        </div>
        <div className="rb-sk-body">
          <ul aria-label="Files" className="rb-sk-list m-0 list-none p-0">
            {files.map((f) => {
              const Icon = f.name.endsWith(".md") ? GoFile : GoFileCode;
              const isCurrent = f.name === current;
              return (
                <li key={f.name} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => pick(f.name)}
                    onMouseEnter={() => hover(f.layer)}
                    onMouseLeave={() => hover(null)}
                    aria-current={isCurrent ? "true" : undefined}
                    data-current={isCurrent}
                    data-lit={hovered === f.layer && !isCurrent}
                    className="rb-sk-row flex min-h-11 w-full cursor-pointer items-center gap-2.5 border-0 bg-transparent px-4 py-2.5 text-left text-inherit transition-colors duration-200 data-[lit=true]:bg-subtle"
                  >
                    <Icon aria-hidden="true" className="size-4 flex-none text-muted" />
                    <span className="rb-sk-name overflow-hidden text-ellipsis whitespace-nowrap font-code text-[13px] text-accent">{f.name}</span>
                    <span className="rb-sk-count ml-auto font-code text-xs text-muted">{f.skills.length} skills</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div ref={tabsRef} role="tablist" aria-label="Files" className="rb-sk-tabs rb-no-scrollbar flex gap-1 overflow-x-auto border-b border-line p-2">
            {files.map((f) => {
              const selected = f.name === current;
              return (
                <button
                  key={f.name}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => pick(f.name)}
                  className={`h-11 flex-none cursor-pointer whitespace-nowrap rounded-md border px-3 font-code text-[13px] ${
                    selected ? "border-line bg-subtle font-semibold text-ink" : "border-transparent bg-transparent text-accent"
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
          <CodeViewer name={file.name} skills={file.skills} lines={file.lines} />
        </div>
      </div>
    </div>
  );
}
