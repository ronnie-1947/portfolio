"use client";

import { useCallback, useRef, useState } from "react";
import CollageTile, { type CollageImage } from "./CollageTile";
import Lightbox from "./Lightbox";

type PhotoCollageProps = {
  images: CollageImage[];
  className?: string;
};

// Campus photo collage (layout in `.rb-collage`); any tile opens the lightbox.
export default function PhotoCollage({ images, className = "" }: PhotoCollageProps) {
  const [open, setOpen] = useState(-1);
  const returnFocus = useRef<HTMLElement | null>(null);

  const show = (i: number) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(i);
  };
  const close = useCallback(() => {
    setOpen(-1);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <div className={`rb-collage min-w-0 ${className}`}>
        {images.map((image, i) => (
          <CollageTile key={image.src} image={image} index={i} onOpen={() => show(i)} />
        ))}
      </div>
      {open >= 0 && <Lightbox images={images} index={open} onIndex={setOpen} onClose={close} />}
    </>
  );
}
