"use client";

import { GoFile, GoFileCode } from "react-icons/go";
import Topic from "../ui/Topic";
import type { CodeLine, TokenKind } from "../../lib/skillCode";

const TOKEN_CLASS: Record<TokenKind, string> = {
  keyword: "text-syn-keyword",
  string: "text-syn-string",
  name: "text-syn-name",
  comment: "italic text-syn-comment",
  punct: "text-ink",
  func: "text-syn-func",
  plain: "",
};

type CodeViewerProps = {
  name: string;
  skills: string[];
  lines: CodeLine[];
};

// Blob view of one skills "file": header, numbered code, and the skills as topics.
// Phones wrap long lines; wider screens scroll them horizontally like GitHub.
export default function CodeViewer({ name, skills, lines }: CodeViewerProps) {
  const Icon = name.endsWith(".md") ? GoFile : GoFileCode;
  return (
    <div className="rb-sk-viewer flex min-w-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-4 py-2 font-code text-xs text-muted">
        <Icon aria-hidden="true" className="size-4 flex-none" />
        <span className="font-semibold text-ink">{name}</span>
        <span aria-hidden="true">·</span>
        <span>{lines.length} lines</span>
        <span aria-hidden="true">·</span>
        <span>{skills.length} skills</span>
      </div>
      <div
        role="region"
        aria-label={`${name} contents: ${skills.join(", ")}`}
        className="min-h-[200px] overflow-x-auto bg-canvas py-3 font-code text-[13px] leading-[22px]"
      >
        {lines.map((line, i) => (
          <div key={i} className="flex md:min-w-max">
            <span aria-hidden="true" className="w-10 flex-none select-none pr-3 text-right text-muted md:w-[52px] md:pr-4">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 whitespace-pre-wrap pr-3 wrap-anywhere md:flex-none md:whitespace-pre md:pr-4">
              {line.length ? line.map(([text, kind], j) => <span key={j} className={TOKEN_CLASS[kind]}>{text}</span>) : " "}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-line px-4 py-3">
        {skills.map((s) => (
          <Topic key={s}>{s}</Topic>
        ))}
      </div>
    </div>
  );
}
