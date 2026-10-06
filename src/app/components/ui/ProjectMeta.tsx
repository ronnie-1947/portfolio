import Label from "./Label";
import type { ProjectStatus } from "../../config/portfolio";

// GitHub-style language dot colours, keyed by a project's first tech.
const LANGUAGE_DOTS: Record<string, string> = {
  "Next.js": "bg-[#2f81f7]",
  "Node.js": "bg-[#3fb950]",
  React: "bg-[#56d4dd]",
  Solidity: "bg-[#aa6746]",
  Python: "bg-[#3572a5]",
};

const STATUS_TONES = {
  "Live demo": "success",
  "In production": "done",
  Research: "muted",
} as const;

export function LanguageDot({ language }: { language: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span aria-hidden="true" className={`size-3 rounded-full ${LANGUAGE_DOTS[language] ?? "bg-[#8c959f]"}`} />
      {language}
    </span>
  );
}

export function StatusLabel({ status }: { status: ProjectStatus }) {
  return <Label tone={STATUS_TONES[status]}>{status}</Label>;
}
