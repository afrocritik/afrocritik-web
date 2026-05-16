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

export function FilterPill({ label, options, onSelect }: FilterPillProps) {
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
            "flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
            active || open
              ? "border-amber bg-amber-soft text-amber"
              : "border-amber-line text-ink-secondary hover:border-amber/50 hover:text-white"
          )}
        >
          {label}
          {active && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber text-[9px] text-white">
              {selected.length}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              open && "rotate-180"
            )}
          />
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
