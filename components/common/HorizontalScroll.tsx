"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HorizontalScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="group relative">
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-amber/40 bg-bg-primary p-2 text-amber opacity-0 shadow-lg transition-opacity hover:bg-amber hover:text-white group-hover:opacity-100 md:block"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-amber/40 bg-bg-primary p-2 text-amber opacity-0 shadow-lg transition-opacity hover:bg-amber hover:text-white group-hover:opacity-100 md:block"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {children}
      </div>
    </div>
  );
}
