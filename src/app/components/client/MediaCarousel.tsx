"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "../../config/portfolio";
import { blurBackground, slideLoader } from "../../lib/cloudinary";

const SWIPE_THRESHOLD = 50; // px
// How many slides either side of the current one keep their image mounted.
// Mounting all of them fires up to six full-size requests the moment the modal
// opens; one neighbour each way is enough to make a swipe look instant.
const PRELOAD_RADIUS = 1;

/**
 * YouTube always has `hqdefault` but it's 480x360 (4:3, letterboxed) — soft and
 * badly cropped in a 16:9 frame. `maxresdefault` is a true 16:9 1280x720 but
 * only exists for videos uploaded above 720p, so fall back when it 404s.
 */
function YouTubeThumb({ videoId, title }: { videoId: string; title: string }) {
  const [src, setSrc] = useState(
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  );

  return (
    <Image
      src={src}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, 48rem"
      onError={() => setSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`)}
      className="object-cover"
    />
  );
}

export default function MediaCarousel({ media }: { media: ProjectMedia[] }) {
  const [index, setIndex] = useState(0);
  // Index of the slide whose YouTube iframe is mounted — null means "no iframe".
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const count = media.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      // Unmount any playing iframe so audio stops when the slide changes.
      setPlayingIndex(null);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Arrow-key navigation while the carousel (i.e. the modal) is mounted.
  useEffect(() => {
    if (count < 2) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) prev();
    else next();
  };

  if (count === 0) return null;

  return (
    <div className="w-full">
      {/* Frame */}
      <div
        className="relative w-full aspect-video overflow-hidden rounded-xl bg-black/40 border border-white/8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {media.map((item, i) => {
            const isNear = Math.abs(i - index) <= PRELOAD_RADIUS;
            return (
            <div
              key={i}
              className="relative w-full h-full shrink-0"
              style={
                item.type === "image"
                  ? blurBackground(item.src, "16:9")
                  : undefined
              }
            >
              {item.type === "image" ? (
                isNear && (
                  <Image
                    loader={slideLoader}
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 48rem"
                    className="object-cover"
                  />
                )
              ) : playingIndex === i ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1`}
                  title={item.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlayingIndex(i)}
                  aria-label={`Play video: ${item.title}`}
                  className="group absolute inset-0 w-full h-full cursor-pointer"
                >
                  {isNear && (
                    <YouTubeThumb videoId={item.videoId} title={item.title} />
                  )}
                  <span className="absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/20" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600/90 text-white shadow-lg shadow-indigo-500/40 transition-transform duration-300 group-hover:scale-110">
                      <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
            );
          })}
        </div>

        {/* Prev / next */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-gray-200 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-indigo-600 hover:text-white cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-gray-200 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-indigo-600 hover:text-white cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="flex items-center justify-center gap-2 mt-3">
          {media.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? "w-6 bg-indigo-500" : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
