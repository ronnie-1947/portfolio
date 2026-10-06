"use client";

import type { MouseEvent } from "react";
import { hasFinePointer, prefersReducedMotion } from "../../lib/useMediaQuery";

type TiltCardProps = {
  className?: string;
  children: React.ReactNode;
};

/** Card shell that tilts toward the pointer with a soft glare (mouse only; reduced motion just lifts). */
export default function TiltCard({ className = "", children }: TiltCardProps) {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transition = "transform .12s ease-out, box-shadow .3s ease-out";
    el.style.transform = `perspective(1000px) rotateX(${((0.5 - py) * 12).toFixed(2)}deg) rotateY(${((px - 0.5) * 12).toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };
  const onEnter = (e: MouseEvent<HTMLElement>) => {
    if (!hasFinePointer()) return;
    const el = e.currentTarget;
    el.style.setProperty("--gl", "1");
    el.style.boxShadow = "var(--rb-lift)";
    if (prefersReducedMotion()) el.style.transform = "translateY(-2px)";
  };
  const onLeave = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.transition = "";
    el.style.transform = "";
    el.style.boxShadow = "";
    el.style.removeProperty("--gl");
  };

  return (
    <article
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`rb-tilt relative overflow-hidden rounded-md border border-line bg-surface focus-within:shadow-lift ${className}`}
    >
      <span aria-hidden="true" className="rb-glare pointer-events-none absolute inset-0 z-3" />
      {children}
    </article>
  );
}
