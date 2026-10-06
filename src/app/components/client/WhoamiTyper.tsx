"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../lib/useMediaQuery";

type WhoamiTyperProps = {
  roles: string[];
  className?: string;
};

// `$ whoami` terminal line that types and deletes each role in turn.
// Reduced motion shows every role at once instead.
export default function WhoamiTyper({ roles, className = "" }: WhoamiTyperProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (reduced) {
      el.textContent = roles.join(" · ");
      return;
    }
    el.textContent = roles[0];
    let role = 0;
    let length = roles[0].length;
    let deleting = false;
    let timer = 0;
    // Written straight to the DOM so typing doesn't re-render React every few ms.
    const tick = () => {
      const word = roles[role];
      if (!deleting) {
        if (length < word.length) {
          length++;
          el.textContent = word.slice(0, length);
          timer = window.setTimeout(tick, 55 + Math.random() * 45);
        } else {
          deleting = true;
          timer = window.setTimeout(tick, 1900);
        }
      } else if (length > 0) {
        length--;
        el.textContent = word.slice(0, length);
        timer = window.setTimeout(tick, 26);
      } else {
        deleting = false;
        role = (role + 1) % roles.length;
        timer = window.setTimeout(tick, 320);
      }
    };
    timer = window.setTimeout(tick, 1900);
    return () => window.clearTimeout(timer);
  }, [roles, reduced]);

  return (
    <div className={`rounded-md border border-line bg-inset font-code ${className}`}>
      <div>
        <span className="text-success">$</span> whoami
      </div>
      <div className="min-h-[22px]">
        <span aria-hidden="true" className="text-muted">
          &gt;{" "}
        </span>
        <span ref={textRef} aria-hidden="true">
          {roles[0]}
        </span>
        <span aria-hidden="true" className="rb-cursor" />
        <span className="sr-only">{roles.join(", ")}</span>
      </div>
    </div>
  );
}
