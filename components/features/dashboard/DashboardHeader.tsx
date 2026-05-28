"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

export function DashboardHeader() {
  const { data: session } = useSession();
  const name = session?.user?.name || "Abdul Lawal";
  const [range, setRange] = useState("Last 30 days");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-baskervville text-3xl font-semibold capitalize leading-8 text-white">
          Hello, {name}
        </h1>
        <p className="mt-[10px] font-inter text-base font-light leading-4 text-orange-100">
          Check your activities in this dashboard.
        </p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#50321C80] px-3 py-2 outline outline-[0.45px] outline-offset-[-0.45px] outline-yellow-700/50 transition-opacity hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/dashboard-calendar.png" alt="" aria-hidden="true" className="size-3.5 shrink-0 brightness-0 invert" />
            <span className="font-inter text-sm font-normal leading-4 text-white">
              {range}
            </span>
            <ChevronDown className="size-3.5 shrink-0 text-white" />
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
