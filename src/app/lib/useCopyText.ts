import { useCallback, useEffect, useRef, useState } from "react";

/** Copy `text` to the clipboard; `copied` stays true for `resetMs` afterwards. */
export function useCopyText(text: string, resetMs = 1800) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(() => {
    const done = () => {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), resetMs);
    };
    // Older Safari / insecure contexts: fall back to a hidden textarea.
    const fallback = () => {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
      } catch {
        // Nothing else to try.
      }
      area.remove();
      done();
    };
    try {
      navigator.clipboard.writeText(text).then(done, fallback);
    } catch {
      fallback();
    }
  }, [text, resetMs]);

  return { copied, copy };
}
