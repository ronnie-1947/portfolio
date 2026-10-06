"use client";

import { useEffect, useRef, useState } from "react";
import { createCareerGlobe, type GlobeController } from "../../lib/careerGlobe";
import { prefersReducedMotion } from "../../lib/useMediaQuery";
import { useTheme } from "../../lib/useTheme";

export type CareerStop = {
  label: string;
  place: string;
  lat: number;
  lon: number;
  company: string;
  role: string;
  date: string;
};

// Canvas globe touring the career path, with the stops listed underneath as
// buttons (the accessible way to explore it — the canvas itself is decorative).
export default function CareerGlobe({ stops }: { stops: CareerStop[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeController | null>(null);
  const [reached, setReached] = useState(0);
  const [pin, setPin] = useState(-1);
  // The overview band is dark in every theme except "light".
  const dark = useTheme() !== "light";
  const darkRef = useRef(dark);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!canvas || !wrap || !tip) return;
    globe.current = createCareerGlobe(
      { canvas, wrap, tip, fallback: fallbackRef.current },
      {
        stops,
        dark: darkRef.current,
        reduced: prefersReducedMotion(),
        dotsUrl: "/globe/land-dots.json",
        onReached: setReached,
        onPin: setPin,
      },
    );
    return () => {
      globe.current?.destroy();
      globe.current = null;
    };
  }, [stops]);

  useEffect(() => {
    darkRef.current = dark;
    globe.current?.setDark(dark);
  }, [dark]);

  const pinned = pin >= 0 ? stops[pin] : null;
  const places = stops.map((s) => s.place.replace(",", ""));

  return (
    <div className="flex min-w-0 flex-col items-center gap-3.5">
      <div ref={wrapRef} className="rb-globe relative mx-auto aspect-square">
        <div ref={fallbackRef} aria-hidden="true" className="rb-globe-fallback absolute inset-[12%] rounded-full" />
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block size-full touch-pan-y" />
        <div
          ref={tipRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-3 opacity-0 transition-opacity duration-200 ease-out"
        >
          {pinned && (
            <div className="w-[232px] rounded-md border border-line bg-surface px-3 py-2.5 text-[13px] leading-[1.45] shadow-overlay">
              <div className="font-code text-[11px] text-muted">{pinned.place}</div>
              <div className="font-semibold text-ink">{pinned.company}</div>
              <div className="text-ink">{pinned.role}</div>
              <div className="mt-1 font-code text-[11px] text-muted">{pinned.date}</div>
            </div>
          )}
        </div>
      </div>
      <p className="sr-only">
        Globe showing career path: {places.slice(0, -1).join(", ")}, then {places[places.length - 1]} today.
      </p>
      <ol aria-label="Career path, in order" className="m-0 flex list-none flex-wrap items-center justify-center gap-0.5 p-0">
        {stops.map((s, i) => {
          const isLast = i === stops.length - 1;
          const color = i <= reached ? (isLast ? "text-success" : "text-ink") : "text-muted";
          return (
            <li key={s.label} className="flex items-center gap-0.5">
              {i > 0 && (
                <span aria-hidden="true" className="font-code text-xs text-muted">
                  →
                </span>
              )}
              <button
                type="button"
                onClick={() => globe.current?.focus(i)}
                aria-label={`${s.place}: ${s.company}, ${s.role}, ${s.date}`}
                className={`min-h-10 cursor-pointer rounded-md border-0 px-1.5 py-0.5 font-code text-xs transition-colors duration-300 fine:min-h-7 ${color} ${
                  pin === i ? "bg-subtle" : "bg-transparent"
                }`}
              >
                {s.label}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
