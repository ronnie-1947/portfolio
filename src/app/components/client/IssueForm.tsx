"use client";

import { useState, type FormEvent } from "react";
import { GoIssueOpened, GoMail, GoPerson } from "react-icons/go";
import { buttonClass } from "../ui/buttonStyles";

type IssueFormProps = {
  owner: string;
  email: string;
};

const FIELD = "rounded-md border border-line bg-inset px-3 text-base font-normal text-ink placeholder:text-muted";

// "New issue" contact form. No backend: submitting opens a pre-filled email.
export default function IssueForm({ owner, email }: IssueFormProps) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = [];
    if (title.trim()) params.push(`subject=${encodeURIComponent(title.trim())}`);
    if (body.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);
    window.location.href = `mailto:${email}${params.length ? `?${params.join("&")}` : ""}`;
  };

  return (
    <form onSubmit={submit} className="w-full min-w-0 overflow-hidden rounded-md border border-line bg-canvas">
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3 text-sm">
        <GoIssueOpened aria-hidden="true" className="size-4 flex-none text-success" />
        <span className="min-w-0 font-code text-[13px] wrap-anywhere">
          <span className="text-accent">{owner}</span>
          <span className="text-muted"> / </span>
          <span className="font-semibold">contact</span>
        </span>
        <span className="ml-auto flex-none text-xs text-muted">New issue</span>
      </div>
      <div className="flex gap-3 p-4">
        <span aria-hidden="true" className="grid size-10 flex-none place-items-center rounded-full border border-line bg-surface text-muted">
          <GoPerson className="size-5" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Add a title
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project, role, or question"
              className={`${FIELD} h-10`}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold">
            Add a description
            <textarea
              name="body"
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="A few lines about what you have in mind"
              className={`${FIELD} resize-y py-2.5 leading-normal`}
            />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <GoMail aria-hidden="true" className="size-4 flex-none" />
              Opens your email client
            </span>
            <button type="submit" className={buttonClass("primary", "lg", "basis-full md:h-9 md:basis-auto")}>
              <GoIssueOpened aria-hidden="true" className="size-4" />
              Open an issue
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
