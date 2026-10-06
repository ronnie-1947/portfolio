// Shared button looks for the home page (GitHub Primer style). Returns class
// strings so the same look works on <button>, <a> and next/link.
//
// Display is a separate argument so responsive visibility ("hidden lg:inline-flex")
// never competes with a built-in display class.

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg" | "hero" | "touch";

const BASE =
  "items-center justify-center gap-2 whitespace-nowrap rounded-md border transition-colors duration-200 ease-out cursor-pointer";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "border-btn-line bg-primary font-semibold text-white hover:bg-primary-hover",
  secondary: "border-btn-line bg-btn font-medium text-ink hover:bg-btn-hover",
};

// Heights: sm 32px (header), md 36px (cards), lg 44px (touch target), hero 44px with larger
// type (overview CTAs), touch 44px with tight padding (grid cells).
const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-9 px-3 text-sm",
  lg: "h-11 px-4 text-sm",
  hero: "h-11 px-4 text-[15px]",
  touch: "h-11 px-2 text-sm",
};

export function buttonClass(variant: ButtonVariant, size: ButtonSize, extra = "", display = "inline-flex") {
  return `${display} ${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${extra}`;
}

/** Square icon-only button with a 44px touch target. */
export function iconButtonClass(display = "grid") {
  return `${display} size-11 flex-none place-items-center rounded-md border border-btn-line bg-btn text-ink transition-colors duration-200 ease-out hover:bg-btn-hover`;
}
