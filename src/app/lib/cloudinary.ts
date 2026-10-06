import type { ImageLoader } from "next/image";

const UPLOAD_SEGMENT = "/image/upload/";

/**
 * Insert a Cloudinary transformation chain into a delivery URL. Non-Cloudinary
 * URLs (e.g. YouTube thumbnails) don't contain the upload segment and pass
 * through unchanged.
 */
function withTransform(url: string, chain: string): string {
  return url.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}${chain}/`);
}

/**
 * Cover/media screenshots are captured as windowed browser shots with dark
 * canvas padding baked in, so they don't fill a fixed-ratio frame cleanly.
 * `e_trim:10` strips that surrounding border, then `c_fill` crops to the given
 * aspect ratio (keeping the top chrome) so the app UI reaches the frame edges.
 *
 * The trim runs on the *original* upload, which for these screenshots can be a
 * multi-megabyte PNG, so `w_`/`q_auto` are essential — without them Cloudinary
 * returns the full-resolution PNG and a cold transform can take upwards of ten
 * seconds.
 *
 * `f_webp` rather than `f_auto`: `f_auto` makes Cloudinary vary the response on
 * `Accept` and `User-Agent`, so iOS Safari, Android and desktop each warm their
 * own copy and a phone visitor often pays for a cold transform a desktop
 * visitor already triggered. Every supported browser decodes WebP, so one
 * format means one cached derivative per image for everyone.
 */
function fillChain(aspectRatio: string, width: number): string {
  return `e_trim:10/c_fill,ar_${aspectRatio},g_north,w_${width},f_webp,q_auto:good`;
}

/**
 * Build a `next/image` loader for a fixed aspect ratio and a single output
 * width. Using a loader (rather than pre-transforming `src`) keeps the request
 * on Cloudinary's CDN instead of routing it through Next's own optimizer, which
 * would re-download the multi-megabyte original once per width variant before
 * re-encoding it.
 *
 * The width `next/image` asks for is deliberately ignored. The browser picks a
 * srcset candidate by CSS width × device pixel ratio, so a 343px card on a 3x
 * phone asked for w_1200 while a desktop card asked for w_640/w_1080 — every
 * width is another derivative Cloudinary builds from the original on first
 * request. One width per frame type means every device shares the same, already
 * warm, derivative.
 *
 * Pass the raw delivery URL as `src`; the loader adds the transform chain.
 */
export function cloudinaryLoader(aspectRatio: string, width: number): ImageLoader {
  return ({ src }) => withTransform(src, fillChain(aspectRatio, width));
}

export const coverLoader = cloudinaryLoader("16:10", 800); // project cards (≤480px wide)
export const slideLoader = cloudinaryLoader("16:9", 1200); // modal carousel + hero (≤768px wide)
export const thumbLoader = cloudinaryLoader("4:3", 640); // featured strip thumbnails

/**
 * A ~300-byte, 16px-wide version of the same crop, used as a CSS background
 * behind the real image so a card paints something immediately instead of a
 * black rectangle. Scaling 16px up to card width blurs it for free.
 */
export function cloudinaryBlur(url: string, aspectRatio: string): string {
  return withTransform(
    url,
    `e_trim:10/c_fill,ar_${aspectRatio},g_north,w_16,f_jpg,q_40,fl_strip_profile`,
  );
}

/** Inline style that paints the low-quality placeholder behind an image frame. */
export function blurBackground(url: string, aspectRatio: string) {
  return {
    backgroundImage: `url("${cloudinaryBlur(url, aspectRatio)}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as const;
}
