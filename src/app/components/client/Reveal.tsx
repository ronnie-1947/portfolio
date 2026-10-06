"use client";

import { useRef } from "react";
import { useReveal } from "../../lib/useReveal";

type RevealProps = {
  index?: number; // stagger position among sibling reveals
  className?: string;
  children: React.ReactNode;
};

// Wrapper that fades its content up the first time it scrolls into view.
export default function Reveal({ index = 0, className = "", children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref, index);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
