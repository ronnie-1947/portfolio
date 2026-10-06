import { useEffect, useRef, useState, type RefObject } from "react";
import { PHONE_MAX_WIDTH } from "./sections";

/**
 * Tracks which home section is in view (its heading has passed 30% down the
 * viewport, below the header) and, on phones, whether the header's top row
 * should slide away because the user is scrolling down.
 */
export function useScrollSpy(ids: readonly string[], headerRef: RefObject<HTMLElement | null>, holdHeader: boolean) {
  const [active, setActive] = useState(ids[0]);
  const [headerHidden, setHeaderHidden] = useState(false);
  const holdRef = useRef(holdHeader);

  useEffect(() => {
    holdRef.current = holdHeader;
  }, [holdHeader]);

  useEffect(() => {
    let lastY = window.scrollY;
    let hide = false;

    const update = () => {
      const y = window.scrollY;
      if (window.innerWidth < PHONE_MAX_WIDTH && !holdRef.current) {
        if (y > lastY + 6 && y > 140) hide = true;
        else if (y < lastY - 6 || y < 60) hide = false;
      } else {
        hide = false;
      }
      lastY = y;
      setHeaderHidden(hide);

      const headerBottom = Math.max(0, headerRef.current?.getBoundingClientRect().bottom ?? 64);
      let current = ids[0];
      for (const id of ids.slice(1)) {
        const el = document.querySelector(`[data-anchor="${id}"]`);
        if (el && el.getBoundingClientRect().top <= headerBottom + window.innerHeight * 0.3) current = id;
      }
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = ids[ids.length - 1];
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, headerRef]);

  return { active, headerHidden: headerHidden && !holdHeader };
}
