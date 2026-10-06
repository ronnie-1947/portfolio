"use client";

import { GoChevronDown, GoGitBranch } from "react-icons/go";
import Label from "../ui/Label";
import Topic from "../ui/Topic";

export type CommitView = {
  id: string;
  hash: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge?: string;
  // Side-branch role (tablet up draws it on a second lane) and the role it ran beside.
  branch: boolean;
  parallelTo?: string;
  // The entry right above a side branch, where that branch forks off.
  forksBranch: boolean;
  details: string[];
  tech: string[];
};

type CommitItemProps = {
  commit: CommitView;
  head: boolean;
  first: boolean;
  last: boolean;
  open: boolean;
  tagsOpen: boolean;
  onToggle: () => void;
  onToggleTags: () => void;
};

// Phones show four tags and a "+N" toggle under the header; wider screens show them all inside it.
const PHONE_TAG_LIMIT = 4;
const LANE_LINE = "absolute w-0.5 rounded-[1px]";

/** One role in the `git log --graph`: graph lanes on the left, an expandable "diff" card on the right. */
export default function CommitItem({ commit: c, head, first, last, open, tagsOpen, onToggle, onToggleTags }: CommitItemProps) {
  const extraTags = c.tech.length - PHONE_TAG_LIMIT;
  const phoneTags = tagsOpen || extraTags <= 0 ? c.tech : c.tech.slice(0, PHONE_TAG_LIMIT);
  const diffId = `diff-${c.id}`;

  return (
    <li className={`relative pl-7 md:pl-14 ${last ? "" : "pb-4"}`}>
      {/* Phone: a single lane. */}
      <span
        aria-hidden="true"
        className={`rb-graph-main ${LANE_LINE} left-[11px] md:hidden ${first ? "top-[30px]" : "top-0"} ${last ? "h-[30px]" : "bottom-0"}`}
      />
      {/* Tablet up: main lane, plus the side branch forking off and merging back. */}
      <span aria-hidden="true" className={`rb-graph-main ${LANE_LINE} bottom-0 left-[11px] hidden md:block ${first ? "top-[30px]" : "top-0"}`} />
      {c.forksBranch && (
        <>
          <svg aria-hidden="true" width="56" height="24" viewBox="0 0 56 24" className="absolute top-0 left-0 hidden md:block">
            <path d="M12 0 C12 14 36 10 36 24" fill="none" strokeWidth="2" className="stroke-done" />
          </svg>
          <span aria-hidden="true" className={`${LANE_LINE} top-6 bottom-0 left-[35px] hidden bg-done md:block`} />
        </>
      )}
      {c.branch && (
        <>
          <span aria-hidden="true" className={`${LANE_LINE} top-0 bottom-6 left-[35px] hidden bg-done md:block`} />
          <svg aria-hidden="true" width="56" height="24" viewBox="0 0 56 24" className="absolute bottom-0 left-0 hidden md:block">
            <path d="M36 0 C36 14 12 10 12 24" fill="none" strokeWidth="2" className="stroke-done" />
          </svg>
        </>
      )}
      {last && (
        <span
          aria-hidden="true"
          className="absolute -bottom-[5px] left-[7px] hidden size-2.5 rounded-full border-2 border-[color-mix(in_srgb,var(--rb-ac)_55%,transparent)] bg-canvas md:block"
        />
      )}
      <span
        data-node=""
        aria-hidden="true"
        className={`rb-graph-node absolute z-3 rounded-full border-2 ${
          head
            ? "rb-graph-head top-5 left-1 size-4 border-accent bg-accent"
            : `top-[22px] left-1.5 size-3 bg-canvas ${c.branch ? "border-done md:left-[30px]" : "border-accent"}`
        }`}
      />

      <div className="relative z-2 overflow-hidden rounded-md border border-line bg-canvas">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={diffId}
          className="flex w-full cursor-pointer items-start gap-3.5 border-0 bg-transparent px-4 py-3.5 text-left text-inherit transition-colors duration-200 hover:bg-subtle"
        >
          <span className="mt-px hidden flex-none rounded-md border border-line px-1.5 font-code text-xs leading-5 text-accent md:inline">
            {c.hash}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="font-code text-xs text-muted md:hidden">
              <span className="text-accent">{c.hash}</span> · {c.period}
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="text-base font-semibold leading-[1.35] text-ink">{c.role}</span>
              {head && (
                <Label tone="accent" mono>
                  HEAD -&gt; main
                </Label>
              )}
              {c.badge && (
                <Label tone="done" mono className="tracking-[0.06em]">
                  {c.badge}
                </Label>
              )}
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
              <span className="font-semibold text-ink">{c.company}</span>
              <span aria-hidden="true">·</span>
              <span>{c.location}</span>
              {c.parallelTo && (
                <span className="inline-flex items-center gap-1 font-code text-xs text-done">
                  <GoGitBranch aria-hidden="true" className="size-3.5 flex-none" />
                  parallel to {c.parallelTo}
                </span>
              )}
            </span>
            <span className="hidden font-code text-xs text-muted md:inline lg:hidden">{c.period}</span>
            <span className="mt-0.5 hidden flex-wrap gap-1.5 md:flex">
              {c.tech.map((t) => (
                <Topic key={t}>{t}</Topic>
              ))}
            </span>
          </span>
          <span className="hidden flex-none whitespace-nowrap pt-0.5 font-code text-xs text-muted lg:inline">{c.period}</span>
          <GoChevronDown
            aria-hidden="true"
            className={`mt-0.5 size-4 flex-none text-muted transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div className="flex flex-wrap gap-1.5 px-3.5 pb-3.5 md:hidden">
          {phoneTags.map((t) => (
            <Topic key={t}>{t}</Topic>
          ))}
          {extraTags > 0 && (
            <button
              type="button"
              onClick={onToggleTags}
              aria-expanded={tagsOpen}
              aria-label={tagsOpen ? "Show fewer technologies" : `Show ${extraTags} more technologies`}
              className="-my-[3px] h-7 min-w-11 cursor-pointer rounded-full border border-line bg-canvas px-2.5 font-code text-xs text-ink"
            >
              {tagsOpen ? "Less" : `+${extraTags}`}
            </button>
          )}
        </div>

        <div id={diffId} className="rb-collapse" data-open={open}>
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-line">
              <div className="bg-hunk px-4 py-1.5 font-code text-xs text-muted wrap-anywhere">
                @@ -0,0 +1,{c.details.length} @@ {c.company}
              </div>
              {c.details.map((line, i) => (
                <div key={i} className="grid grid-cols-[32px_18px_minmax(0,1fr)] bg-diff text-sm leading-[1.55] md:grid-cols-[44px_22px_minmax(0,1fr)]">
                  <span className="bg-diff-num py-[5px] pr-2 text-right font-code text-xs text-ink">{i + 1}</span>
                  <span className="py-1 pl-2 font-code font-semibold text-success">+</span>
                  <span className="py-1 pr-4 text-ink text-pretty">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
