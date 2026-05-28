"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

export function AdminPageHeader() {
  const [range, setRange] = useState("Last 30 days");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-['Baskervville'] text-3xl font-semibold leading-9 text-white">
          Dashboard
        </h1>
        <p className="mt-1.5 font-inter text-sm font-light text-ink-secondary">
          Welcome back, Admin. Check the activities in this dashboard.
        </p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-bg-secondary px-3 py-2 transition-colors hover:bg-white/5"
          >
            <Calendar className="size-4 shrink-0 text-ink-secondary" />
            <span className="font-inter text-sm font-normal text-white">{range}</span>
            <ChevronDown className="size-4 shrink-0 text-ink-secondary" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-1">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRange(r);
                setOpen(false);
              }}
              className={cn(
                "block w-full rounded-md px-3 py-2 text-left font-inter text-sm transition-colors hover:bg-amber-soft",
                r === range ? "text-amber" : "text-ink-secondary"
              )}
            >
              {r}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
