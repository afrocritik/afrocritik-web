"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, List, Lock } from "lucide-react";
import { WorkCard } from "@/components/common/WorkCard";
import { formatCount } from "@/lib/utils";
import { RefineSidebar } from "./RefineSidebar";

// How many result cards a signed-out visitor sees before the sign-in wall.
const PREVIEW_LIMIT = 3;

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
  /** Signed-out visitor searching/sorting — show a few cards then a sign-in wall. */
  gated?: boolean;
  /** Show the Refine sidebar (signed-in only); signed-out gets a full-width grid. */
  showRefine?: boolean;
}>;

export function ArchiveResults({
  works,
  resultCount,
  tabLabel,
  view,
  onViewChange,
  refine,
  loading,
  gated,
  showRefine = true,
}: ArchiveResultsProps) {
  // When gated, only the first few cards render; the rest sit behind the wall.
  const visibleWorks = gated ? works.slice(0, PREVIEW_LIMIT) : works;
  const hiddenCount = gated ? Math.max(resultCount - visibleWorks.length, 0) : 0;
  // Without the sidebar the grid spans the full width, so fit more columns.
  const gridCols = showRefine
    ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";
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
        {showRefine && <RefineSidebar {...refine} />}

        {/* Main */}
        <div className="flex-1">
          {works.length > 0 ? (
            <>
              <div
                className={
                  view === "grid" ? `grid ${gridCols} gap-4` : "flex flex-col gap-3"
                }
              >
                {visibleWorks.map((w) => (
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

              {gated ? (
                <div className="mt-8 flex flex-col items-center gap-4 rounded-xl border border-amber-line bg-black/30 px-6 py-10 text-center">
                  <Lock className="h-7 w-7 text-amber" />
                  <p className="font-inter text-xl font-semibold text-white">
                    {formatCount(resultCount)} {tabLabel} found
                  </p>
                  <p className="max-w-md font-inter text-sm text-ink-muted">
                    {hiddenCount > 0
                      ? `Sign in or create a free account to view ${formatCount(hiddenCount)} more ${tabLabel.toLowerCase()}.`
                      : `Sign in or create a free account to explore the full archive.`}
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <Link
                      href="/signin?callbackUrl=/explore"
                      className="rounded-lg bg-amber px-5 py-2.5 font-inter text-sm font-medium text-white transition-opacity hover:opacity-90"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/signup?callbackUrl=/explore"
                      className="rounded-lg border border-amber-line px-5 py-2.5 font-inter text-sm font-medium text-white transition-colors hover:bg-white/5"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              ) : (
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
              )}
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
