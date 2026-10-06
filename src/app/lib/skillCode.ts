/**
 * Renders a skill group as a few lines of "source" in the language its file
 * extension suggests (core.md → Markdown list, backend.go → a Go slice …), as
 * tokens the code viewer colours. Pure data in, tokens out.
 */
export type TokenKind = "keyword" | "string" | "name" | "comment" | "punct" | "func" | "plain";
export type CodeToken = [text: string, kind: TokenKind];
export type CodeLine = CodeToken[];

export function skillCode(fileName: string, skills: string[]): CodeLine[] {
  const [base, ext] = fileName.split(".");
  const lines: CodeLine[] = [];
  const quoted = (s: string) => `"${s}"`;

  switch (ext) {
    case "md":
      lines.push([[`# ${base}`, "keyword"]], []);
      skills.forEach((s) => lines.push([["- ", "keyword"], [s, "punct"]]));
      break;
    case "tsx":
      lines.push([["export const ", "keyword"], [base, "name"], [" = [", "punct"]]);
      skills.forEach((s) => lines.push([["  ", "plain"], [quoted(s), "string"], [",", "punct"]]));
      lines.push([["] ", "punct"], ["as const", "keyword"], [";", "punct"]]);
      break;
    case "go": {
      const name = base.charAt(0).toUpperCase() + base.slice(1);
      lines.push([["package ", "keyword"], ["skills", "name"]], []);
      lines.push([["var ", "keyword"], [name, "name"], [" = []", "punct"], ["string", "keyword"], ["{", "punct"]]);
      skills.forEach((s) => lines.push([["    ", "plain"], [quoted(s), "string"], [",", "punct"]]));
      lines.push([["}", "punct"]]);
      break;
    }
    case "sql":
      lines.push([["SELECT ", "keyword"], ["name ", "punct"], ["FROM ", "keyword"], [base, "name"]]);
      lines.push([["WHERE ", "keyword"], ["name ", "punct"], ["IN ", "keyword"], ["(", "punct"]]);
      skills.forEach((s, i) => lines.push([["  ", "plain"], [`'${s}'`, "string"], [i < skills.length - 1 ? "," : "", "punct"]]));
      lines.push([[");", "punct"]]);
      break;
    case "yaml":
      lines.push([[base, "name"], [":", "punct"]]);
      skills.forEach((s) => {
        // "AWS (EC2, EKS, S3)" → "- AWS: [EC2, EKS, S3]"
        const nested = s.match(/^(.+?) \((.+)\)$/);
        if (nested) lines.push([["  - ", "punct"], [nested[1], "name"], [": ", "punct"], [`[${nested[2]}]`, "string"]]);
        else lines.push([["  - ", "punct"], [s, "string"]]);
      });
      break;
    case "sh":
      lines.push([["#!/usr/bin/env bash", "comment"]]);
      lines.push([["tools", "name"], ["=(", "punct"]]);
      skills.forEach((s) => lines.push([["  ", "plain"], s.includes(" ") ? [quoted(s), "string"] : [s, "func"]]));
      lines.push([[")", "punct"]]);
      break;
    case "py":
      lines.push([[base, "name"], [" = [", "punct"]]);
      skills.forEach((s) => lines.push([["    ", "plain"], [quoted(s), "string"], [",", "punct"]]));
      lines.push([["]", "punct"]]);
      break;
    default:
      skills.forEach((s) => lines.push([[s, "plain"]]));
  }
  return lines;
}
