"use client";

import { Fragment } from "react";
import Image from "next/image";
import { FilterPill } from "@/components/common/FilterPill";
import { formatCount } from "@/lib/utils";
import { TABS } from "./constants";

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "A – Z", value: "az" },
  { label: "Top Rated", value: "rating" },
];

const SORT_LABELS: Record<string, string> = Object.fromEntries(
  SORT_OPTIONS.map((o) => [o.value, o.label])
);

type ArchiveTabsBarProps = Readonly<{
  activeKey: string;
  onSelect: (key: string) => void;
  counts?: Record<string, number>;
  sort: string;
  onSortChange: (value: string) => void;
}>;

export function ArchiveTabsBar({
  activeKey,
  onSelect,
  counts,
  sort,
  onSortChange,
}: ArchiveTabsBarProps) {
  return (
    <section>
      {/* top line */}
      <div className="h-px bg-orange-400/15" />

      {/* TAB CARDS — horizontally scrollable on small screens */}
      <div className="container flex items-center overflow-x-auto hide-scrollbar py-4 md:py-0 md:h-[145px]">
        {TABS.map((t, i) => {
          const active = t.key === activeKey;
          return (
            <Fragment key={t.key}>
              <div className="relative z-10 w-px self-stretch shrink-0 bg-orange-400/20 pointer-events-none" />
              <button
                onClick={() => onSelect(t.key)}
                data-has-icon="true"
                className={`flex-1 min-w-[132px] h-24 md:h-36 px-4 inline-flex justify-center items-center gap-2 md:gap-3 transition-all ${
                  active
                    ? "bg-[#50321C80] rounded-2xl bg-opacity-50 outline outline-1 outline-offset-[-1.13px] outline-amber-600"
                    : "hover:bg-[#50321C80] hover:rounded-2xl hover:bg-opacity-50"
                }`}
              >
                <Image
                  src={t.iconSrc}
                  alt={t.label}
                  width={24}
                  height={24}
                  className={`transition-all shrink-0 ${active ? "w-11 h-11" : "w-8 h-8 opacity-60"}`}
                />
                <div className="inline-flex flex-col justify-start items-start gap-1">
                  <div
                    className={`text-white font-semibold font-inter transition-all ${
                      active ? "text-2xl leading-6" : "text-base leading-5"
                    }`}
                  >
                    {t.label}
                  </div>
                  <div
                    className={`text-white font-light font-inter transition-all ${
                      active ? "text-sm leading-4" : "text-xs"
                    }`}
                  >
                    {counts && typeof counts[t.key] === "number"
                      ? `${formatCount(counts[t.key])}+`
                      : "…"}
                  </div>
                </div>
              </button>
              {i === TABS.length - 1 && (
                <div className="relative z-10 w-px self-stretch shrink-0 bg-orange-400/20 pointer-events-none" />
              )}
            </Fragment>
          );
        })}
      </div>

      {/* middle line */}
      <div className="h-px bg-orange-400/15" />

      {/* FILTER ROW — 104px */}
      <div className="container flex flex-wrap items-center gap-2 py-6 md:py-0 md:h-[104px]">
        <p className="font-inter text-sm text-white/60">
          Use{" "}
          <span className="font-semibold text-white/80">Refine results</span> to
          filter by country, theme and year.
        </p>
        <div className="ml-auto">
          <FilterPill
            label={`Sort by: ${SORT_LABELS[sort] ?? "Relevance"}`}
            options={SORT_OPTIONS}
            onSelect={(values) => onSortChange(values[values.length - 1] || "newest")}
          />
        </div>
      </div>

      {/* bottom line */}
      <div className="h-px bg-orange-400/15" />
    </section>
  );
}
