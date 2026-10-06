"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReveal } from "../../lib/useReveal";

export type CollageImage = { src: string; alt: string; width: number; height: number; focus: string };

type CollageTileProps = {
  image: CollageImage;
  index: number;
  onOpen: () => void;
};

// One collage photo. The caption shows on hover/focus with a mouse, always on touch.
export default function CollageTile({ image, index, onOpen }: CollageTileProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useReveal(ref, index);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`Open photo: ${image.alt}`}
      aria-haspopup="dialog"
      className="group relative block min-h-0 min-w-0 cursor-zoom-in overflow-hidden rounded-md border border-line bg-surface p-0"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={index === 0 ? "(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 50vw"}
        className="object-cover transition-transform duration-400 ease-out motion-safe:fine:group-hover:scale-[1.03] motion-safe:fine:group-focus-visible:scale-[1.03]"
        style={{ objectPosition: image.focus }}
      />
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 max-w-[calc(100%-16px)] truncate rounded-md bg-[rgba(13,17,23,0.78)] px-2 py-0.5 font-code text-[11px] leading-[18px] text-[#e6edf3] fine:opacity-0 fine:group-hover:opacity-100 fine:group-focus-visible:opacity-100"
      >
        {image.alt}
      </span>
    </button>
  );
}
