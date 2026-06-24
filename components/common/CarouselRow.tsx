"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CarouselNextButton } from "@/components/common/CarouselNextButton";

interface CarouselRowProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Vertical position of the Next button (forwarded to CarouselNextButton). */
  buttonTop?: string;
}

/**
 * Horizontally scrollable row with a Next button that scrolls the row into view.
 * The button only renders when the content overflows the viewport and there is
 * more to reveal — so it never shows for empty or short rows with no hidden items.
 */
export function CarouselRow({ children, className, style, buttonTop }: Readonly<CarouselRowProps>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setCanScrollNext(maxScroll > 8 && el.scrollLeft < maxScroll - 8);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [children]);

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={scrollRef} className={className} style={style}>
        {children}
      </div>
      {canScrollNext && <CarouselNextButton top={buttonTop} onClick={scrollNext} />}
    </div>
  );
}
