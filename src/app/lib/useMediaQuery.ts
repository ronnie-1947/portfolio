import { useSyncExternalStore } from "react";

export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function hasFinePointer() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

/** Subscribe to a media query. `serverValue` is what renders before hydration. */
export function useMediaQuery(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Mouse/trackpad (true) vs touch (false). Assumes a mouse until hydrated. */
export function useFinePointer() {
  return useMediaQuery(FINE_POINTER_QUERY, true);
}

export function useReducedMotion() {
  return useMediaQuery(REDUCED_MOTION_QUERY, false);
}
