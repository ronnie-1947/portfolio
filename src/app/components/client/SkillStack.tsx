"use client";

import { useEffect, useRef, useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import SparkleFillIcon from "../ui/SparkleFillIcon";
import { prefersReducedMotion } from "../../lib/useMediaQuery";

export type StackLayer = "cloud" | "databases" | "backend" | "frontend" | "ai" | "security" | "all";

// Bottom to top. Geometry and colours live in globals.css (.rb-layer--<key>).
const LAYERS: { key: StackLayer; file: string; title: string }[] = [
  { key: "cloud", file: "cloud.yaml", title: "Cloud / DevOps" },
  { key: "databases", file: "databases.sql", title: "Databases" },
  { key: "backend", file: "backend.go", title: "Backend" },
  { key: "frontend", file: "frontend.tsx", title: "Frontend" },
  { key: "ai", file: "ai.py", title: "AI" },
];

// The scene is authored at 520px and scaled to fit, capped per tier.
const SCENE = 520;
const sceneCap = (vw: number) => (vw >= 1920 ? 640 : vw >= 1440 ? 560 : vw >= 1024 ? 520 : vw >= 768 ? 360 : 240);

type SkillStackProps = {
  current: StackLayer | null; // layer of the file open in the viewer
  hovered: StackLayer | null;
  onHover: (layer: StackLayer | null) => void;
  onPick: (fileName: string) => void;
};

/**
 * Isometric stack of skill layers wrapped in a dashed security ring. Layers
 * spread apart the first time the stack scrolls into view; hovering or picking
 * a file lights its layer. Decorative — the file browser beside it is the
 * accessible control, so the whole stack is aria-hidden.
 */
export default function SkillStack({ current, hovered, onHover, onPick }: SkillStackProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);

  // Scale the 520px scene to the column.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const fit = () => {
      const scale = Math.min(sceneCap(window.innerWidth), wrap.clientWidth || SCENE) / SCENE;
      wrap.style.setProperty("--rb-stack-scale", String(scale));
      wrap.style.height = `${SCENE * scale}px`;
    };
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);
    fit();
    return () => resizeObserver.disconnect();
  }, []);

  // Spread the layers once the stack is ~70% up the viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || prefersReducedMotion()) return;
    const check = () => {
      const r = wrap.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.72 && r.bottom > 0) {
        setExploded(true);
        window.removeEventListener("scroll", check);
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    const raf = requestAnimationFrame(check);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
    };
  }, []);

  const securityLit = hovered === "security" || current === "security";

  return (
    <div ref={wrapRef} aria-hidden="true" className="relative h-[240px] min-w-0 md:h-[360px] lg:h-[520px]">
      <div className="rb-stack-scene" data-exploded={exploded} data-sec-lit={securityLit}>
        <div className="rb-stack-origin">
          {LAYERS.map(({ key, file, title }) => {
            const lit = hovered === key || current === key;
            return (
              <div key={key} className={`rb-layer rb-layer--${key}`} data-lit={lit} data-soft={current === "all" && !lit}>
                <div className="rb-layer-inner" onClick={() => onPick(file)} onMouseEnter={() => onHover(key)} onMouseLeave={() => onHover(null)}>
                  <div className="rb-layer-top">
                    <span
                      className={`rb-layer-label absolute bottom-3 left-3.5 whitespace-nowrap font-code font-semibold tracking-[0.02em] ${
                        key === "cloud" ? "text-sm" : "text-[13px]"
                      }`}
                    >
                      {title}
                    </span>
                    {key === "ai" && <SparkleFillIcon className="absolute top-1/2 left-1/2 -mt-3.5 -ml-3.5 size-7 text-[var(--c)]" />}
                  </div>
                  <div className="rb-layer-south" />
                  <div className="rb-layer-west" />
                </div>
              </div>
            );
          })}
          <div className="rb-ring-wrap rb-ring-wrap--inner">
            <div className="rb-ring" />
          </div>
          <div className="rb-ring-wrap rb-ring-wrap--outer">
            <div className="rb-ring" />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onPick("security.sh")}
              onMouseEnter={() => onHover("security")}
              onMouseLeave={() => onHover(null)}
              className="rb-sec-chip pointer-events-auto absolute inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full px-2.5 font-code text-xs font-semibold"
            >
              <GoShieldCheck className="size-3.5" />
              Security
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
