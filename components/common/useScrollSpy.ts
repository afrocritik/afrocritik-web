"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

const LINE = 180; // reading line, px from viewport top
const TIE = 120; // anchors this close share a "row"; the earlier one wins

/**
 * Drives the "On this page" marker. The active entry follows scroll position,
 * but a clicked entry stays active until the user scrolls on their own, so
 * sections near the page bottom (which can't reach the reading line) still
 * get the dot when clicked.
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(0);
  const locked = useRef(false);
  const key = ids.join("|");

  useEffect(() => {
    const list = key ? key.split("|") : [];
    const update = () => {
      if (locked.current) return;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let best = 0;
      let bestTop = -Infinity;
      list.forEach((id, i) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top === undefined) return;
        if (top < LINE && top > bestTop + TIE) {
          best = i;
          bestTop = top;
        }
      });
      if (atBottom && window.scrollY > 0) best = list.length - 1;
      setActive(best);
    };
    const unlock = () => {
      locked.current = false;
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchmove", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchmove", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [key]);

  const select = useCallback((i: number) => {
    locked.current = true;
    setActive(i);
  }, []);

  return { active, select };
}
