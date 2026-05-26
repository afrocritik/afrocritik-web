"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Calendar, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

export function DashboardHeader() {
  const { data: session } = useSession();
  const firstName = (session?.user?.name || "Abdul Lawal").split(" ")[0];
  const [range, setRange] = useState("Last 30 days");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-montserrat text-2xl font-bold text-white md:text-3xl">
          Hello, {firstName}
        </h1>
        <p className="mt-1 font-inter text-sm text-ink-muted">
          Check your activities in this dashboard.
        </p>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-amber-line bg-white/[0.03] px-4 py-2.5 font-inter text-sm font-medium text-ink-secondary transition-colors hover:border-amber/50"
          >
            <Calendar className="size-4 text-ink-muted" />
            {range}
            <ChevronDown className="size-4 text-ink-muted" />
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
