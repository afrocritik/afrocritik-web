"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
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
      <PopoverContent className="w-60 rounded-xl border-amber-line bg-bg-secondary p-0 overflow-hidden text-white shadow-xl">
        <div className="flex flex-col gap-[3px]">
          {options.length === 0 && (
            <p className="px-3 py-3 font-inter text-xs text-ink-muted">No options</p>
          )}
          {options.map((opt) => {
            const isSel = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggle(opt.value)}
                style={{ backgroundColor: isSel ? "#DD962A" : "#A78F6F" }}
                className="flex items-center gap-2 w-full min-h-12 px-3 py-2 text-left transition-colors"
              >
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  {isSel && (
                    <Image
                      src="/explore-tab-check.png"
                      alt="selected"
                      width={20}
                      height={20}
                    />
                  )}
                </div>
                <span className="text-base font-normal font-inter leading-tight tracking-wide text-white">
                  {opt.label}
                </span>
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
            className="mt-[3px] w-full bg-[#A78F6F] px-3 py-2 text-left font-inter text-xs text-white/80 hover:text-white transition-colors"
          >
            Clear
          </button>
        )}
      </PopoverContent>
    </Popover>
  );
}
