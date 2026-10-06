"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { YearRangeSlider } from "./YearRangeSlider";

export const YEAR_MIN = 1950;
export const YEAR_MAX = 2025;

// Facet lists show this many options until "Show all" is pressed.
const FACET_PREVIEW = 6;

interface Facet {
  id: string;
  name: string;
}

type RefineSidebarProps = Readonly<{
  selectedCountries: string[];
  onToggleCountry: (id: string) => void;
  selectedThemes: string[];
  onToggleTheme: (id: string) => void;
  onYearChange: (from: number, to: number) => void;
  onSearch: (term: string) => void;
  /** The year slider is narrower than the full range. */
  yearActive: boolean;
  onClearAll: () => void;
}>;

function CheckRow({
  label,
  checked,
  onToggle,
}: Readonly<{ label: string; checked: boolean; onToggle: () => void }>) {
  return (
    <button
      onClick={onToggle}
      className="w-full inline-flex justify-start items-center gap-2"
    >
      <div className="size-4 relative shrink-0">
        <div className="size-4 rounded-sm border border-gray-200" />
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/Vector (Stroke).svg" alt="" width={13} height={9} />
          </div>
        )}
      </div>
      <span className="text-gray-200 text-sm font-semibold font-inter leading-4 text-left">
        {label}
      </span>
    </button>
  );
}

/** Collapsible block: the heading stays visible so every filter is discoverable. */
function Section({
  title,
  badge = 0,
  defaultOpen = true,
  children,
}: Readonly<{ title: string; badge?: number; defaultOpen?: boolean; children: ReactNode }>) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-orange-400/15 py-3 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="flex items-center gap-2 font-inter text-sm font-bold leading-4 text-white">
          {title}
          {badge > 0 && (
            <span className="rounded-full bg-amber px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
              {badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/70 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

/** Checkbox list that shows a short preview with a "Show all (N)" toggle. */
function FacetList({
  items,
  selected,
  onToggle,
  emptyText,
  expandAll = false,
}: Readonly<{
  items: Facet[];
  selected: string[];
  onToggle: (id: string) => void;
  emptyText: string;
  /** Skip the preview limit (e.g. while the visitor is searching the list). */
  expandAll?: boolean;
}>) {
  const [showAll, setShowAll] = useState(false);
  if (items.length === 0) {
    return <span className="font-inter text-[11px] italic text-white/40">{emptyText}</span>;
  }
  const full = showAll || expandAll;
  // Selected options past the preview stay visible so applied filters never hide.
  const shown = full
    ? items
    : items.filter((item, i) => i < FACET_PREVIEW || selected.includes(item.id));
  const hidden = items.length - shown.length;

  return (
    <div className="flex flex-col items-start gap-3">
      {shown.map((item) => (
        <CheckRow
          key={item.id}
          label={item.name}
          checked={selected.includes(item.id)}
          onToggle={() => onToggle(item.id)}
        />
      ))}
      {!expandAll && (hidden > 0 || showAll) && items.length > FACET_PREVIEW && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="font-inter text-xs font-semibold text-orange-400 hover:text-orange-300"
        >
          {showAll ? "Show less" : `Show all (${items.length})`}
        </button>
      )}
    </div>
  );
}

export function RefineSidebar({
  selectedCountries,
  onToggleCountry,
  selectedThemes,
  onToggleTheme,
  onYearChange,
  onSearch,
  yearActive,
  onClearAll,
}: RefineSidebarProps) {
  const [countrySearch, setCountrySearch] = useState("");
  // Bumped on "Clear all" so the (uncontrolled) year slider remounts at full range.
  const [resetKey, setResetKey] = useState(0);
  const activeCount = selectedCountries.length + selectedThemes.length + (yearActive ? 1 : 0);

  const { data: countriesData } = useQuery({
    queryKey: ["facet-countries"],
    queryFn: () => api.countries.list(),
    staleTime: 5 * 60_000,
  });
  const { data: popularData } = useQuery({
    queryKey: ["popular-searches"],
    queryFn: () => api.popularSearches(8),
    staleTime: 5 * 60_000,
  });
  const popularTerms = popularData?.terms ?? [];

  const { data: themesData } = useQuery({
    queryKey: ["facet-themes"],
    queryFn: () => api.themes.list(),
    staleTime: 5 * 60_000,
  });

  const countries: Facet[] = (countriesData?.docs ?? []).map((c: any) => ({
    id: String(c.id),
    name: c.name,
  }));
  const themes: Facet[] = (themesData?.docs ?? []).map((t: any) => ({
    id: String(t.id),
    name: t.name,
  }));

  const visibleCountries = countrySearch
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(countrySearch.toLowerCase())
      )
    : countries;

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="w-full rounded-xl border border-yellow-700 bg-yellow-950/50 p-5 lg:w-64">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="text-white text-base font-semibold font-inter leading-4">
            Refine results
          </h3>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setResetKey((k) => k + 1);
                setCountrySearch("");
                onClearAll();
              }}
              className="font-inter text-xs font-semibold text-orange-400 hover:text-orange-300"
            >
              Clear all ({activeCount})
            </button>
          )}
        </div>

        <Section title="Year Range" badge={yearActive ? 1 : 0}>
          <YearRangeSlider key={resetKey} min={YEAR_MIN} max={YEAR_MAX} onChange={onYearChange} />
        </Section>

        <Section title="Country" badge={selectedCountries.length}>
          <div className="relative mb-3 h-7 w-full">
            <div className="absolute inset-0 rounded-md border-[0.30px] border-yellow-700 bg-yellow-950/20" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 70 71"
              fill="none"
              className="pointer-events-none absolute left-[9px] top-[7px]"
            >
              <path
                d="M49.37 50.1779L59.5 60.0721M33.25 21.2019C39.049 21.2019 43.75 25.9481 43.75 31.8029M56.2333 33.6875C56.2333 46.4378 45.9956 56.774 33.3667 56.774C20.7378 56.774 10.5 46.4378 10.5 33.6875C10.5 20.9371 20.7378 10.601 33.3667 10.601C45.9956 10.601 56.2333 20.9371 56.2333 33.6875Z"
                stroke="rgba(156, 92, 8, 0.70)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              placeholder="Search..."
              className="absolute inset-0 rounded-md bg-transparent pl-[29px] pr-2 font-inter text-[11px] text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
          <FacetList
            items={visibleCountries}
            selected={selectedCountries}
            onToggle={onToggleCountry}
            emptyText={countrySearch ? "No matching countries." : "No countries yet."}
            expandAll={Boolean(countrySearch)}
          />
        </Section>

        <Section title="Theme" badge={selectedThemes.length} defaultOpen={selectedThemes.length > 0}>
          <FacetList
            items={themes}
            selected={selectedThemes}
            onToggle={onToggleTheme}
            emptyText="No themes yet."
          />
        </Section>

        {popularTerms.length > 0 && (
          <Section title="Popular Searches">
            <div className="flex flex-wrap gap-2">
              {popularTerms.map(({ term }) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onSearch(term)}
                  className="rounded-lg border border-amber-line bg-black/20 px-3 py-1.5 font-inter text-xs capitalize text-gray-200 transition-colors hover:border-orange-400 hover:text-white"
                >
                  {term}
                </button>
              ))}
            </div>
          </Section>
        )}
      </div>
    </aside>
  );
}
