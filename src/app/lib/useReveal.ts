import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "./useMediaQuery";

/**
 * Fade-and-rise an element the first time it scrolls into view. Elements that
 * are already on screen at mount are left alone, and nothing is hidden before
 * hydration, so content never depends on JS to appear. `index` staggers
 * siblings by 70ms each.
 */
export function useReveal(ref: RefObject<HTMLElement | null>, index = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || document.hidden) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const delay = index * 70;
        el.style.transition = `opacity .7s ease-out ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "none";
        timer = window.setTimeout(() => {
          el.style.transition = "";
          el.style.transform = "";
          el.style.opacity = "";
        }, 950 + delay);
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, index]);
}
