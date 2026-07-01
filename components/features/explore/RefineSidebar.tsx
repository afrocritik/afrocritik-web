"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { YearRangeSlider } from "./YearRangeSlider";

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

export function RefineSidebar({
  selectedCountries,
  onToggleCountry,
  selectedThemes,
  onToggleTheme,
  onYearChange,
}: RefineSidebarProps) {
  const [countrySearch, setCountrySearch] = useState("");

  const { data: countriesData } = useQuery({
    queryKey: ["facet-countries"],
    queryFn: () => api.countries.list(),
    staleTime: 5 * 60_000,
  });
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
      <div className="w-full lg:w-64 max-h-[680px] bg-yellow-950/50 rounded-xl border border-yellow-700 p-5 overflow-y-auto">
        <h3 className="w-36 justify-start text-white text-base font-semibold font-inter leading-4">
          Refine results
        </h3>

        <div className="mt-2">
          <p className="mb-2 w-36 justify-start text-white text-xs font-light font-inter leading-3">
            Year Range
          </p>
          <YearRangeSlider min={1950} max={2025} onChange={onYearChange} />
        </div>

        <div className="h-px mt-4 bg-orange-400/15" />

        <div className="mt-4">
          <p className="w-16 justify-start text-white text-sm font-bold font-inter leading-4">
            Country
          </p>
          <div className="mt-2 w-full h-7 relative">
            <div className="absolute inset-0 bg-yellow-950/20 rounded-md border-[0.30px] border-yellow-700" />
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
              className="absolute inset-0 bg-transparent rounded-md pl-[29px] pr-2 font-inter text-[11px] text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
          <div className="mt-2 w-full p-4 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] inline-flex flex-col justify-start items-start gap-3">
            {visibleCountries.length > 0 ? (
              visibleCountries.map((c) => (
                <CheckRow
                  key={c.id}
                  label={c.name}
                  checked={selectedCountries.includes(c.id)}
                  onToggle={() => onToggleCountry(c.id)}
                />
              ))
            ) : (
              <span className="font-inter text-[11px] italic text-white/40">
                No countries yet.
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="w-16 justify-start text-white text-sm font-bold font-inter leading-4">
            Theme
          </p>
          <div className="mt-2 w-full p-4 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] inline-flex flex-col justify-start items-start gap-3">
            {themes.length > 0 ? (
              themes.map((t) => (
                <CheckRow
                  key={t.id}
                  label={t.name}
                  checked={selectedThemes.includes(t.id)}
                  onToggle={() => onToggleTheme(t.id)}
                />
              ))
            ) : (
              <span className="font-inter text-[11px] italic text-white/40">
                No themes yet.
              </span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <p className="w-36 justify-start text-white text-base font-semibold font-inter leading-4">
            Popular Searches
          </p>
          <p className="mt-2 font-inter text-[11px] italic leading-4 text-white/40">
            No popular searches yet — they&apos;ll appear here as the archive
            grows.
          </p>
        </div>
      </div>
    </aside>
  );
}
