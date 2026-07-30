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
 * multi-megabyte PNG, so `w_`/`f_auto`/`q_auto` are essential — without them
 * Cloudinary returns the full-resolution PNG and a cold transform can take
 * upwards of ten seconds.
 */
function fillChain(aspectRatio: string, width: number): string {
  return `e_trim:10/c_fill,ar_${aspectRatio},g_north,w_${width},f_auto,q_auto:good`;
}

/**
 * Build a `next/image` loader for a fixed aspect ratio. Using a loader (rather
 * than pre-transforming `src`) keeps the request on Cloudinary's CDN instead of
 * routing it through Next's own optimizer, which would re-download the
 * multi-megabyte original once per width variant before re-encoding it.
 *
 * Pass the raw delivery URL as `src`; the loader adds the transform chain.
 */
export function cloudinaryLoader(aspectRatio: string): ImageLoader {
  return ({ src, width }) => withTransform(src, fillChain(aspectRatio, width));
}

export const coverLoader = cloudinaryLoader("16:10"); // project cards
export const slideLoader = cloudinaryLoader("16:9"); // modal carousel + hero
export const thumbLoader = cloudinaryLoader("4:3"); // featured strip thumbnails

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
