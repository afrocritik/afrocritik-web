"use client";

import Image from "next/image";
import { LayoutGrid, List } from "lucide-react";
import { WorkCard } from "@/components/common/WorkCard";
import { formatCount } from "@/lib/utils";
import { RefineSidebar } from "./RefineSidebar";

type RefineState = Readonly<{
  selectedCountries: string[];
  onToggleCountry: (id: string) => void;
  selectedThemes: string[];
  onToggleTheme: (id: string) => void;
  onYearChange: (from: number, to: number) => void;
}>;

type ArchiveResultsProps = Readonly<{
  works: any[];
  resultCount: number;
  tabLabel: string;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  refine: RefineState;
  loading?: boolean;
}>;

export function ArchiveResults({
  works,
  resultCount,
  tabLabel,
  view,
  onViewChange,
  refine,
  loading,
}: ArchiveResultsProps) {
  return (
    <section className="container py-10">
      {/* Full-width header row — above both sidebar and cards */}
      <div className="mb-5 flex items-center justify-between">
        <p className="w-64 justify-start text-white text-2xl font-semibold font-inter leading-6">
          {formatCount(resultCount)} {tabLabel} Found
        </p>
        <div className="flex items-center gap-1 rounded-md border border-amber-line p-1">
          <button
            onClick={() => onViewChange("grid")}
            className={`rounded p-1.5 ${
              view === "grid"
                ? "bg-amber text-white"
                : "text-ink-muted hover:text-white"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`rounded p-1.5 ${
              view === "list"
                ? "bg-amber text-white"
                : "text-ink-muted hover:text-white"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Sidebar + Cards — same top baseline so bottoms align */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <RefineSidebar {...refine} />

        {/* Main */}
        <div className="flex-1">
          {works.length > 0 ? (
            <>
              <div
                className={
                  view === "grid" ? "grid grid-cols-4 gap-4" : "flex flex-col gap-3"
                }
              >
                {works.map((w) => (
                  <WorkCard
                    key={w.slug}
                    explore
                    slug={w.slug}
                    href={w.href}
                    title={w.title}
                    type={w.type}
                    year={w.year}
                    country={w.country}
                    rating={w.rating}
                    badge={w.badge}
                    image={w.image}
                    description={w.description}
                    tags={w.tags}
                  />
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <div className="inline-flex justify-start items-center gap-2">
                  <button className="px-3 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-white/5 transition-colors">
                    <span className="text-stone-200 text-base font-normal font-inter leading-4">
                      View More
                    </span>
                    <Image src="/Arrow right.svg" alt="" width={16} height={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="py-20 text-center font-inter text-base italic text-white/40">
              {loading
                ? "Loading the archive…"
                : `No ${tabLabel.toLowerCase()} found yet. Try another search or check back soon.`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
