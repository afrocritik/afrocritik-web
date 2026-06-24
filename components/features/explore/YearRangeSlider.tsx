"use client";

import { useEffect, useRef, useState } from "react";

export function YearRangeSlider({
  min = 1950,
  max = 2025,
  onChange,
}: Readonly<{
  min?: number;
  max?: number;
  onChange?: (from: number, to: number) => void;
}>) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const containerRef = useRef<HTMLDivElement>(null);
  const minRef = useRef(min);
  const maxRef = useRef(max);
  minRef.current = minVal;
  maxRef.current = maxVal;

  const [trackW, setTrackW] = useState(180);
  const trackWRef = useRef(180);
  trackWRef.current = trackW;

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (!containerRef.current) return;
      setTrackW(containerRef.current.getBoundingClientRect().width - 12);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const toPos = (val: number) =>
    Math.round(((val - min) / (max - min)) * trackW);

  const toVal = (pos: number) =>
    Math.round((Math.max(0, Math.min(pos, trackWRef.current)) / trackWRef.current) * (max - min) + min);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // Only emit once the user releases a handle, so we don't refetch on every
    // pixel of movement.
    onChange?.(minRef.current, maxRef.current);
  };

  const onPointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    which: "min" | "max"
  ) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const val = toVal(e.clientX - rect.left);
    if (which === "min") setMinVal(Math.min(val, maxRef.current - 1));
    else setMaxVal(Math.max(val, minRef.current + 1));
  };

  const minPos = toPos(minVal);
  const maxPos = toPos(maxVal);

  return (
    <div>
      <div ref={containerRef} className="w-full h-3 relative select-none">
        {/* base track */}
        <div className="absolute h-1 rounded-lg bg-white/10" style={{ left: 6, right: 6, top: 4 }} />
        {/* filled yellow track */}
        <div
          className="absolute top-[4px] h-1 bg-yellow-700 rounded-lg"
          style={{ left: minPos + 6, width: Math.max(0, maxPos - minPos) }}
        />
        {/* unfilled right track */}
        <div
          className="absolute top-[4px] h-1 bg-zinc-100/30 rounded-lg"
          style={{ left: maxPos + 6, width: Math.max(0, trackW - maxPos) }}
        />
        {/* min handle */}
        <div
          role="slider"
          aria-label="Minimum year"
          aria-valuenow={minVal}
          aria-valuemin={min}
          aria-valuemax={maxVal - 1}
          tabIndex={0}
          className="absolute top-0 size-3 z-10 cursor-grab active:cursor-grabbing rounded-full bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.36)] outline outline-1 outline-zinc-100"
          style={{ left: minPos }}
          onPointerDown={onPointerDown}
          onPointerMove={(e) => onPointerMove(e, "min")}
          onPointerUp={onPointerUp}
        />
        {/* max handle */}
        <div
          role="slider"
          aria-label="Maximum year"
          aria-valuenow={maxVal}
          aria-valuemin={minVal + 1}
          aria-valuemax={max}
          tabIndex={0}
          className="absolute top-0 size-3 z-10 cursor-grab active:cursor-grabbing rounded-full bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.36)] outline outline-1 outline-zinc-100"
          style={{ left: maxPos }}
          onPointerDown={onPointerDown}
          onPointerMove={(e) => onPointerMove(e, "max")}
          onPointerUp={onPointerUp}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-white/40">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>
    </div>
  );
}
