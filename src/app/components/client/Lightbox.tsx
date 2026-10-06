"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { GoChevronLeft, GoChevronRight, GoX } from "react-icons/go";
import type { CollageImage } from "./CollageTile";
import { trapTab } from "../../lib/focusTrap";

type LightboxProps = {
  images: CollageImage[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
};

const ROUND_BUTTON =
  "absolute top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[#30363d] bg-[rgba(22,27,34,0.85)] text-[#e6edf3] hover:bg-[#30363d]";

// Full-screen photo viewer: arrows / swipe to browse, Esc or × to close.
export default function Lightbox({ images, index, onIndex, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStart = useRef<number | null>(null);
  const image = images[index];
  const step = (d: number) => onIndex((index + d + images.length) % images.length);
  const stepRef = useRef(step);

  useEffect(() => {
    stepRef.current = step;
  });

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        stepRef.current(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        stepRef.current(-1);
      } else if (e.key === "Tab") {
        trapTab(e, dialogRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      data-overlay="lightbox"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-110 flex items-center justify-center bg-[rgba(1,4,9,0.92)] px-4 pt-[max(16px,env(safe-area-inset-top))] pb-[max(16px,env(safe-area-inset-bottom))] backdrop-blur-[4px]"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo viewer: ${image.alt}`}
        className="relative flex h-full max-h-[920px] w-full max-w-[1200px] flex-col gap-3 text-[#e6edf3]"
      >
        <div className="flex items-center gap-3">
          <span className="flex-none font-code text-xs text-[#7d8590]">
            {index + 1} / {images.length}
          </span>
          <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">{image.alt}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="grid size-11 flex-none cursor-pointer place-items-center rounded-md border border-[#30363d] bg-[#161b22] text-[#e6edf3] hover:bg-[#21262d]"
          >
            <GoX aria-hidden="true" className="size-4" />
          </button>
        </div>
        <div
          onPointerDown={(e) => (swipeStart.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeStart.current === null) return;
            const dx = e.clientX - swipeStart.current;
            swipeStart.current = null;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
          className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center"
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            draggable={false}
            sizes="(min-width: 1232px) 1200px, 100vw"
            className="h-auto max-h-full w-auto max-w-full select-none rounded-md border border-[#30363d] object-contain"
          />
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${ROUND_BUTTON} left-0`}>
            <GoChevronLeft aria-hidden="true" className="size-4" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${ROUND_BUTTON} right-0`}>
            <GoChevronRight aria-hidden="true" className="size-4" />
          </button>
        </div>
        <p className="m-0 text-center font-code text-xs text-[#7d8590]">
          <span className="coarse:hidden">← → to browse · Esc to close</span>
          <span className="hidden coarse:inline">Swipe to browse · tap × to close</span>
        </p>
      </div>
    </div>
  );
}
