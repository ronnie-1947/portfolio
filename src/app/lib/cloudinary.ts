/**
 * Cover/media screenshots are captured as windowed browser shots with dark
 * canvas padding baked in, so they don't fill a fixed-ratio frame cleanly. For
 * Cloudinary uploads, trim that surrounding border and crop to the given aspect
 * ratio (keeping the top chrome) so the app UI reaches the frame edges.
 * Non-Cloudinary URLs (e.g. YouTube thumbnails) don't contain the upload
 * segment and pass through unchanged.
 *
 * @param aspectRatio Cloudinary `ar` value, e.g. "16:10" or "16:9".
 */
export function cloudinaryFill(url: string, aspectRatio: string): string {
  return url.replace(
    "/image/upload/",
    `/image/upload/e_trim:10/c_fill,ar_${aspectRatio},g_north/`,
  );
}
