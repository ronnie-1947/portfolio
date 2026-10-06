"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { GoCodeSquare, GoCopy, GoDownload, GoLinkExternal, GoRepo, GoSearch } from "react-icons/go";
import Kbd from "../ui/Kbd";
import { SECTION_NAV, type SiteLinks } from "./homeNav";
import { HOME_SECTION_IDS, scrollToSection } from "../../lib/sections";
import { useCopyText } from "../../lib/useCopyText";

export type PaletteProject = { id: string; title: string; status: string };

type Command = {
  group: string;
  label: string;
  hint: string;
  icon: ComponentType<{ className?: string }>;
  run: () => void;
};

type CommandPaletteProps = {
  projects: PaletteProject[];
  links: SiteLinks;
  onClose: () => void;
};

// ⌘K / "/" launcher: jump to a section, open a project, copy the email.
export default function CommandPalette({ projects, links, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const { copy } = useCopyText(links.email);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Command[]>(() => {
    const openExternal = (url: string) => () => {
      window.open(url, "_blank", "noopener");
      onClose();
    };
    const goTo = (path: string) => () => {
      onClose();
      router.push(path);
    };
    const list: Command[] = HOME_SECTION_IDS.map((id) => ({
      group: "Jump to",
      label: SECTION_NAV[id].label,
      hint: `#${id}`,
      icon: SECTION_NAV[id].icon,
      run: () => {
        onClose();
        scrollToSection(id);
      },
    }));
    projects.forEach((p) => list.push({ group: "Projects", label: p.title, hint: p.status, icon: GoRepo, run: goTo(`/projects#${p.id}`) }));
    list.push({ group: "Projects", label: "All projects", hint: "/projects", icon: GoRepo, run: goTo("/projects") });
    list.push({
      group: "Actions",
      label: "Copy email address",
      hint: links.email,
      icon: GoCopy,
      run: () => {
        copy();
        onClose();
      },
    });
    list.push({ group: "Actions", label: "Open GitHub profile", hint: links.githubHandle, icon: GoCodeSquare, run: openExternal(links.github) });
    list.push({ group: "Actions", label: "Open LinkedIn", hint: links.linkedinHandle, icon: GoLinkExternal, run: openExternal(links.linkedin) });
    list.push({
      group: "Actions",
      label: "Download resume",
      hint: "PDF",
      icon: GoDownload,
      run: () => {
        const a = document.createElement("a");
        a.href = links.resume;
        a.download = "";
        a.click();
        onClose();
      },
    });
    return list;
  }, [projects, links, copy, onClose, router]);

  const q = query.trim().toLowerCase();
  const items = q ? commands.filter((c) => `${c.label} ${c.group} ${c.hint}`.toLowerCase().includes(q)) : commands;
  const sel = Math.min(selected, Math.max(0, items.length - 1));

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Keep the highlighted row in view while arrowing through the list.
  useEffect(() => {
    const list = listRef.current;
    const row = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !row) return;
    const top = row.offsetTop;
    const bottom = top + row.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top - 8;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight + 8;
  }, [sel]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected(items.length ? (sel + 1) % items.length : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected(items.length ? (sel - 1 + items.length) % items.length : 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      items[sel]?.run();
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <div
      data-band="palette"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="rb-pal-wrap"
    >
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="rb-pal-box bg-surface text-ink shadow-overlay">
        <div className="flex h-14 flex-none items-center gap-2.5 border-b border-line px-3.5">
          <GoSearch aria-hidden="true" className="size-4 flex-none text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={onInputKey}
            role="combobox"
            aria-expanded="true"
            aria-controls="rb-pal-list"
            aria-activedescendant={items.length ? `rb-pal-${sel}` : undefined}
            aria-label="Search commands"
            placeholder="Search or jump to…"
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <span className="hidden text-muted lg:inline">
            <Kbd>Esc</Kbd>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="h-11 cursor-pointer border-0 bg-transparent px-1.5 text-[15px] font-semibold text-accent lg:hidden"
          >
            Cancel
          </button>
        </div>
        <div ref={listRef} id="rb-pal-list" role="listbox" aria-label="Commands" className="rb-pal-list">
          {items.map((c, i) => {
            const on = i === sel;
            const Icon = c.icon;
            return (
              <div key={`${c.group}-${c.label}`} role="presentation">
                {(i === 0 || items[i - 1].group !== c.group) && (
                  <div className="px-2.5 pt-2.5 pb-1 text-xs font-semibold text-muted">{c.group}</div>
                )}
                <div
                  id={`rb-pal-${i}`}
                  role="option"
                  aria-selected={on}
                  onClick={() => c.run()}
                  onMouseMove={() => selected !== i && setSelected(i)}
                  className={`flex min-h-12 cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-sm fine:min-h-10 ${
                    on ? "bg-subtle shadow-[inset_2px_0_0_var(--rb-ac)]" : ""
                  }`}
                >
                  <Icon className={`size-4 flex-none ${on ? "text-ink" : "text-muted"}`} />
                  <span className="min-w-0 flex-1 truncate">{c.label}</span>
                  <span className="whitespace-nowrap font-code text-xs text-muted">{c.hint}</span>
                </div>
              </div>
            );
          })}
          {items.length === 0 && <div className="px-4 py-7 text-center text-muted">No results for “{query}”</div>}
        </div>
        <div className="hidden flex-wrap gap-4 border-t border-line px-3.5 py-2.5 text-xs text-muted lg:flex">
          <span>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
          </span>
          <span>
            <Kbd>↵</Kbd> select
          </span>
          <span>
            <Kbd>⌘K</Kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
}
