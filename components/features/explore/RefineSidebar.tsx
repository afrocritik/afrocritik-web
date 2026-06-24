"use client";

import { useState } from "react";
import Image from "next/image";
import { YearRangeSlider } from "./YearRangeSlider";

const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "Others"];
const THEMES = ["Black Consciousness", "Nollywood", "Afrobeat", "Audio"];
const POPULAR: string[] = [];

const toggle = (
  list: string[],
  setList: (v: string[]) => void,
  value: string
) =>
  setList(
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
  );

type RefineSidebarProps = Readonly<{
  onPopularSearch: (value: string) => void;
}>;

export function RefineSidebar({ onPopularSearch }: RefineSidebarProps) {
  const [checkedCountries, setCheckedCountries] = useState<string[]>([]);
  const [checkedThemes, setCheckedThemes] = useState<string[]>([]);

  return (
    <aside className="shrink-0">
      <div className="w-64 h-[612px] bg-yellow-950/50 rounded-xl border border-yellow-700 p-5 overflow-y-auto">
        <h3 className="w-36 justify-start text-white text-base font-semibold font-inter leading-4">
          Refine results
        </h3>

        <div className="mt-2">
          <p className="mb-2 w-36 justify-start text-white text-xs font-light font-inter leading-3">
            Year Range
          </p>
          <YearRangeSlider min={1950} max={2025} />
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
              placeholder="Search..."
              className="absolute inset-0 bg-transparent rounded-md pl-[29px] pr-2 font-inter text-[11px] text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>
          <div className="mt-2 w-full p-4 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] inline-flex flex-col justify-start items-start gap-3">
            {COUNTRIES.map((c) => {
              const checked = checkedCountries.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => toggle(checkedCountries, setCheckedCountries, c)}
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
                  <span className="text-gray-200 text-sm font-semibold font-inter leading-4">
                    {c}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <p className="w-16 justify-start text-white text-sm font-bold font-inter leading-4">
            Theme
          </p>
          <div className="mt-2 w-full p-4 rounded-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.12)] inline-flex flex-col justify-start items-start gap-3">
            {THEMES.map((t) => {
              const checked = checkedThemes.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggle(checkedThemes, setCheckedThemes, t)}
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
                    {t}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <p className="w-36 justify-start text-white text-base font-semibold font-inter leading-4">
            Popular Searches
          </p>
          {POPULAR.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {POPULAR.map((p) => (
                <button
                  key={p}
                  onClick={() => onPopularSearch(p)}
                  className="rounded-full border border-amber-line px-2.5 py-1 text-[11px] text-amber hover:bg-amber-soft"
                >
                  {p}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-2 font-inter text-[11px] italic leading-4 text-white/40">
              No popular searches yet — they&apos;ll appear here as the archive
              grows.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
