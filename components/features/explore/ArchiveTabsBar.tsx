"use client";

import { Fragment } from "react";
import Image from "next/image";
import { FilterPill } from "@/components/common/FilterPill";
import { formatCount } from "@/lib/utils";
import { TABS } from "./constants";

const FILTER_OPTIONS = {
  Year: [
    { label: "2020 – Present", value: "2020s" },
    { label: "2000 – 2019", value: "2000s" },
    { label: "1980 – 1999", value: "1980s" },
    { label: "Pre-1980", value: "pre1980" },
  ],
  Country: [
    { label: "Nigeria", value: "nigeria" },
    { label: "Ghana", value: "ghana" },
    { label: "Kenya", value: "kenya" },
    { label: "Others", value: "others" },
  ],
  Genre: [
    { label: "Music", value: "music" },
    { label: "Films", value: "films" },
    { label: "Literature", value: "literature" },
    { label: "Event", value: "event" },
    { label: "Politics", value: "politics" },
    { label: "Report", value: "report" },
  ],
  Theme: [
    { label: "Black Consciousness", value: "black-consciousness" },
    { label: "Nollywood", value: "nollywood" },
    { label: "Afrobeat", value: "afrobeat" },
    { label: "Audio", value: "audio" },
  ],
  Medium: [
    { label: "Print", value: "print" },
    { label: "Audio", value: "audio" },
    { label: "Video", value: "video" },
  ],
};

type ArchiveTabsBarProps = Readonly<{
  activeKey: string;
  onSelect: (key: string) => void;
}>;

export function ArchiveTabsBar({ activeKey, onSelect }: ArchiveTabsBarProps) {
  return (
    <section style={{ height: "249px" }}>
      {/* top line */}
      <div className="h-px bg-orange-400/15" />

      {/* TAB CARDS — 145px */}
      <div className="container flex items-center" style={{ height: "145px" }}>
        {TABS.map((t, i) => {
          const active = t.key === activeKey;
          return (
            <Fragment key={t.key}>
              <div className="relative z-10 w-px self-stretch shrink-0 bg-orange-400/20 pointer-events-none" />
              <button
                onClick={() => onSelect(t.key)}
                data-has-icon="true"
                className={`flex-1 h-36 px-4 inline-flex justify-center items-center gap-3 transition-all ${
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
                    {formatCount(t.count)}+
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
      <div
        className="container flex flex-wrap items-center gap-2"
        style={{ height: "104px" }}
      >
        {Object.entries(FILTER_OPTIONS).map(([label, options]) => (
          <FilterPill key={label} label={label} options={options} />
        ))}
        <div className="ml-auto">
          <FilterPill
            label="Sort by: Relevance"
            options={[
              { label: "Relevance", value: "relevance" },
              { label: "Newest", value: "newest" },
              { label: "Top Rated", value: "rating" },
            ]}
          />
        </div>
      </div>

      {/* bottom line */}
      <div className="h-px bg-orange-400/15" />
    </section>
  );
}
