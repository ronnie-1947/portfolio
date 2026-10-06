"use client";

import { GoCheck, GoCopy, GoTerminal } from "react-icons/go";
import { useCopyText } from "../../lib/useCopyText";

type TerminalCardProps = {
  remote: string;
  email: string;
};

// Always-dark terminal showing the email as a git remote, with a copy button.
export default function TerminalCard({ remote, email }: TerminalCardProps) {
  const { copied, copy } = useCopyText(email);
  return (
    <div className="flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-[#30363d] bg-[#010409] text-[#e6edf3]">
      <div className="flex items-center gap-2 border-b border-[#30363d] bg-[#161b22] py-1.5 pr-1.5 pl-4 font-code text-xs text-[#7d8590]">
        <GoTerminal aria-hidden="true" className="size-4 flex-none" />
        bash
        <button
          type="button"
          onClick={copy}
          aria-label="Copy email address"
          className="ml-auto inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-md border border-[rgba(240,246,252,0.1)] bg-[#21262d] px-2.5 text-xs text-[#e6edf3] transition-colors duration-200 hover:bg-[#30363d]"
        >
          {copied ? (
            <>
              <GoCheck aria-hidden="true" className="size-3.5 flex-none text-[#3fb950]" />
              Copied
            </>
          ) : (
            <>
              <GoCopy aria-hidden="true" className="size-3.5 flex-none" />
              Copy email
            </>
          )}
        </button>
      </div>
      <div className="flex-1 px-4 py-5 font-code text-sm leading-[1.75]">
        <div className="hidden wrap-anywhere md:block">
          <span className="text-[#3fb950]">$</span> git remote add {remote} <span className="text-[#a5d6ff]">mailto:{email}</span>
        </div>
        <div className="md:hidden">
          <div>
            <span className="text-[#3fb950]">$</span> git remote add {remote}
          </div>
          <div className="pl-[2ch] text-[#a5d6ff] wrap-anywhere">mailto:{email}</div>
        </div>
        <div>
          <span className="text-[#3fb950]">$</span>{" "}
          <span aria-hidden="true" className="inline-block h-[1.1em] w-[0.6em] bg-[#e6edf3] align-[-0.18em] opacity-70" />
        </div>
      </div>
      <div role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </div>
    </div>
  );
}
