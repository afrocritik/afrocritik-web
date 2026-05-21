"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterPillProps {
  label: string;
  options: FilterOption[];
  onSelect?: (values: string[]) => void;
}

export function FilterPill({ label, options, onSelect }: Readonly<FilterPillProps>) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggle = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(next);
    onSelect?.(next);
  };

  const active = selected.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "h-11 px-7 rounded-lg inline-flex justify-center items-center gap-2 transition-colors outline outline-[0.50px] outline-offset-[-0.50px]",
            active || open
              ? "bg-yellow-950/70 outline-yellow-700/70 text-white"
              : "bg-yellow-950/40 outline-yellow-700/50 text-white hover:outline-yellow-700/70",
          )}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 transition-transform",
              open && "rotate-180",
            )}
          />
          <span className="text-sm text-white font-normal font-inter leading-4 whitespace-nowrap">
            {label}
          </span>
          {active && (
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber text-[9px] text-white">
              {selected.length}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 rounded-xl border-amber-line bg-bg-secondary p-2 text-white shadow-xl">
        <div className="custom-scrollbar flex max-h-60 flex-col gap-0.5 overflow-y-auto">
          {options.length === 0 && (
            <p className="px-2 py-3 text-xs text-ink-muted">No options</p>
          )}
          {options.map((opt) => {
            const isSel = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition-colors hover:bg-white/5"
              >
                <span>{opt.label}</span>
                {isSel && <Check className="h-4 w-4 text-amber" />}
              </button>
            );
          })}
        </div>
        {active && (
          <button
            onClick={() => {
              setSelected([]);
              onSelect?.([]);
            }}
            className="mt-1 w-full border-t border-amber-line pt-2 text-left text-xs text-ink-muted hover:text-white"
          >
            Clear
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
