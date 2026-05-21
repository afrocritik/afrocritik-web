"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkCard } from "@/components/common/WorkCard";
import { FilterPill } from "@/components/common/FilterPill";
import { PopularInterestSection } from "@/components/features/home/PopularInterestSection";
import { ReportCTA } from "@/components/features/home/ReportCTA";
import { JoinNetworkCTA } from "@/components/features/home/JoinNetworkCTA";
import { api } from "@/lib/api";
import { formatCount } from "@/lib/utils";

const BROWN_GRADIENT =
  "linear-gradient(180deg, #4D311D 17.79%, #794C2D 62.4%, #4D311D 85.19%)";

const TABS = [
  { key: "works", label: "Works", count: 12346, iconSrc: "/explore-icon_works.svg" },
  { key: "ideas", label: "Ideas", count: 1284, iconSrc: "/explore-icon_ideas.svg" },
  { key: "people", label: "People", count: 3902, iconSrc: "/explore-icon_people.svg" },
  { key: "reports", label: "Report", count: 18, iconSrc: "/explore-icon_analytics.svg" },
];

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

const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "Others"];
const THEMES = ["Black Consciousness", "Nollywood", "Afrobeat", "Audio"];
const POPULAR = ["Fela Kuti", "Nollywood", "Chimamanda", "Makossa", "Sankofa"];

const SEARCH_TAGS = [
  "Nollywood",
  "Afrobeat",
  "Fela",
  "Wizkid",
  "Reports",
  "Chimamanda",
];

const FALLBACK_WORKS = Array.from({ length: 8 }).map((_, i) => ({
  slug: `work-${i}`,
  title: "Lorem ipsum dolor sit amet consect etur neque",
  type: "Music",
  year: 2024 - i,
  country: "Nigeria",
  rating: 4 + ((i % 9) / 10),
  badge: "ALBUM REVIEW",
  image: `/explore-works-Image-${(i % 2) + 1}.png`,
  description: "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....",
  tags: ["Nigeria", "Afrobeat", "Music"],
}));

function YearRangeSlider({ min = 1950, max = 2025 }: { min?: number; max?: number }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const containerRef = useRef<HTMLDivElement>(null);
  const minRef = useRef(min);
  const maxRef = useRef(max);
  minRef.current = minVal;
  maxRef.current = maxVal;

  const [trackW, setTrackW] = useState(180);
  const trackWRef = useRef(180);
  trackWRef.current = trackW;

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (!containerRef.current) return;
      setTrackW(containerRef.current.getBoundingClientRect().width - 12);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const toPos = (val: number) =>
    Math.round(((val - min) / (max - min)) * trackW);

  const toVal = (pos: number) =>
    Math.round((Math.max(0, Math.min(pos, trackWRef.current)) / trackWRef.current) * (max - min) + min);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    which: "min" | "max"
  ) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const val = toVal(e.clientX - rect.left);
    if (which === "min") setMinVal(Math.min(val, maxRef.current - 1));
    else setMaxVal(Math.max(val, minRef.current + 1));
  };

  const minPos = toPos(minVal);
  const maxPos = toPos(maxVal);

  return (
    <div>
      <div ref={containerRef} className="w-full h-3 relative select-none">
        {/* base track */}
        <div className="absolute h-1 rounded-lg bg-white/10" style={{ left: 6, right: 6, top: 4 }} />
        {/* filled yellow track */}
        <div
          className="absolute top-[4px] h-1 bg-yellow-700 rounded-lg"
          style={{ left: minPos + 6, width: Math.max(0, maxPos - minPos) }}
        />
        {/* unfilled right track */}
        <div
          className="absolute top-[4px] h-1 bg-zinc-100/30 rounded-lg"
          style={{ left: maxPos + 6, width: Math.max(0, trackW - maxPos) }}
        />
        {/* min handle */}
        <div
          role="slider"
          aria-label="Minimum year"
          aria-valuenow={minVal}
          aria-valuemin={min}
          aria-valuemax={maxVal - 1}
          tabIndex={0}
          className="absolute top-0 size-3 z-10 cursor-grab active:cursor-grabbing rounded-full bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.36)] outline outline-1 outline-zinc-100"
          style={{ left: minPos }}
          onPointerDown={onPointerDown}
          onPointerMove={(e) => onPointerMove(e, "min")}
        />
        {/* max handle */}
        <div
          role="slider"
          aria-label="Maximum year"
          aria-valuenow={maxVal}
          aria-valuemin={minVal + 1}
          aria-valuemax={max}
          tabIndex={0}
          className="absolute top-0 size-3 z-10 cursor-grab active:cursor-grabbing rounded-full bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.36)] outline outline-1 outline-zinc-100"
          style={{ left: maxPos }}
          onPointerDown={onPointerDown}
          onPointerMove={(e) => onPointerMove(e, "max")}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-white/40">
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>
    </div>
  );
}

function ExploreContent() {
  const params = useSearchParams();
  const initialTab = params.get("tab") || "works";
  const initialQuery = params.get("q") || "";

  const [tab, setTab] = useState(initialTab);
  const [query, setQuery] = useState(initialQuery);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [checkedCountries, setCheckedCountries] = useState<string[]>([
    "Nigeria",
    "Kenya",
  ]);
  const [checkedThemes, setCheckedThemes] = useState<string[]>(["Afrobeat"]);

  const { data } = useQuery({
    queryKey: ["archive", tab, query],
    queryFn: () => api.archive({ q: query, type: tab }),
    retry: false,
    staleTime: 60_000,
  });

  const works = useMemo(() => {
    const docs = (data as any)?.docs;
    return Array.isArray(docs) && docs.length > 0 ? docs : FALLBACK_WORKS;
  }, [data]);

  const activeTab = TABS.find((t) => t.key === tab) ?? TABS[0];
  const resultCount = (data as any)?.totalDocs ?? activeTab.count;

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    value: string
  ) =>
    setList(
      list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value]
    );

  return (
    <>
      {/* HERO + TABS + FILTER — single gradient flows through all three */}
      <div style={{ background: BROWN_GRADIENT }}>
        <section>
          <div className="container flex flex-col items-center justify-center py-14 text-center md:py-16 h-[508px]">
            <h1
              style={{
                width: "824px",
                fontFamily: "Baskerville",
                fontSize: "56px",
                fontWeight: 700,
                lineHeight: "110%",
                textTransform: "capitalize",
                color: "#FFF",
                textAlign: "center",
              }}
            >
              Explore African Archive
            </h1>
            <p
              className="mt-5 font-semibold leading-[110%]"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                textTransform: "capitalize",
                color: "#F3E5D0",
              }}
            >
              Search and discover works, ideas, and people that shape our past,
              present, and future.
            </p>

            <div className="mt-9 w-full max-w-[888px]">
              <div
                className="flex items-center gap-4 px-6"
                style={{
                  height: "105px",
                  borderRadius: "12px",
                  border: "1px solid #6E4205",
                  background: "rgba(65, 40, 23, 0.50)",
                }}
              >
                <button type="button" className="shrink-0">
                  <Image
                    src="/search-icon.svg"
                    alt="Search"
                    width={70}
                    height={71}
                    priority
                  />
                </button>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search works, ideas, people, reports..."
                  className="flex-1 bg-transparent text-white focus:outline-none"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "140%",
                    textTransform: "capitalize",
                  }}
                />
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SEARCH_TAGS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="inline-flex items-center"
                    style={{
                      height: "36px",
                      padding: "8px 10px",
                      gap: "8px",
                      borderRadius: "10px",
                      border: "1px solid #9C5C08",
                      background: "rgba(65, 40, 23, 0.40)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "15px",
                        fontWeight: 400,
                        lineHeight: "140%",
                        textTransform: "capitalize",
                        color: "#FFF",
                        opacity: 0.2,
                      }}
                    >
                      {t}
                    </span>
                    <div
                      style={{
                        width: "8.091px",
                        height: "11px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                        style={{ width: "100%", height: "100%" }}
                      >
                        <path
                          d="M0.500061 0.500061L8.59097 6.16673L0.500061 11.5001"
                          stroke="#9C5C08"
                          strokeWidth="1px"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* TABS + FILTER — 249px total, still inside gradient wrapper */}
        {/* hover:outline hover:outline-1 hover:outline-offset-[-1.13px] */}
        <section style={{ height: "249px" }}>
          {/* top line */}
          <div className="h-px bg-orange-400/15" />

          {/* TAB CARDS — 145px */}
          <div
            className="container flex items-center"
            style={{ height: "145px" }}
          >
            {TABS.map((t, i) => {
              const active = t.key === tab;
              return (
                <Fragment key={t.key}>
                  <div className="relative z-10 w-px self-stretch shrink-0 bg-orange-400/20 pointer-events-none" />
                  <button
                    onClick={() => setTab(t.key)}
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

        {/* RESULTS */}
        <section className="container py-10">
          {/* Full-width header row — above both sidebar and cards */}
          <div className="mb-5 flex items-center justify-between">
            <p className="w-64 justify-start text-white text-2xl font-semibold font-inter leading-6">
              {formatCount(resultCount)} {activeTab.label} Found
            </p>
            <div className="flex items-center gap-1 rounded-md border border-amber-line p-1">
              <button
                onClick={() => setView("grid")}
                className={`rounded p-1.5 ${
                  view === "grid"
                    ? "bg-amber text-white"
                    : "text-ink-muted hover:text-white"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
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
                        <span className="text-gray-200 text-sm font-semibold font-montserrat leading-4">
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
                        <span className="text-gray-200 text-sm font-semibold font-montserrat leading-4 text-left">
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
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {POPULAR.map((p) => (
                    <button
                      key={p}
                      onClick={() => setQuery(p)}
                      className="rounded-full border border-amber-line px-2.5 py-1 text-[11px] text-amber hover:bg-amber-soft"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-4 gap-4"
                  : "flex flex-col gap-3"
              }
            >
              {works.map((w: any, i: number) => (
                <WorkCard
                  key={w.slug ?? i}
                  explore
                  slug={w.slug}
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
                  <span className="text-stone-200 text-base font-normal font-inter leading-4">View More</span>
                  <Image src="/Arrow right.svg" alt="" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
          </div>{/* end sidebar+cards row */}
        </section>
      </div>
      {/* END gradient wrapper */}

      {/* EXPLORE IDEAS NETWORK */}
      <section className="bg-bg-secondary py-16">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Explore Ideas
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-secondary">
              Navigate the interconnected web of ideas, themes, and cultural
              movements — and see how creative output across the continent stays
              deeply connected.
            </p>
            <Button
              asChild
              className="mt-5 rounded-md bg-amber px-7 text-white hover:bg-amber-hover"
            >
              <Link href="/explore?tab=ideas">Explore Ideas</Link>
            </Button>
          </div>
          <div className="relative h-72 overflow-hidden rounded-2xl border border-amber-line bg-gradient-to-br from-[#3D1F00] to-[#1C0A00]">
            {[
              { label: "Culture", x: "20%", y: "22%" },
              { label: "Black Consciousness", x: "70%", y: "20%" },
              { label: "Pan-Africanism", x: "78%", y: "55%" },
              { label: "Political Music", x: "22%", y: "70%" },
              { label: "Diaspora", x: "62%", y: "80%" },
            ].map((node) => (
              <span
                key={node.label}
                style={{ left: node.x, top: node.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/40 bg-bg-card px-3 py-1 text-[11px] text-amber"
              >
                {node.label}
              </span>
            ))}
            <span className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber bg-amber-soft" />
          </div>
        </div>
      </section>

      {/* POPULAR INTEREST */}
      <section className="bg-[#59341F] pt-32 pb-12">
        <div className="container">
          <PopularInterestSection />
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-950 from-[18%] via-yellow-900 to-yellow-950">
        <ReportCTA />
      </section>

      {/* JOIN NETWORK CTA */}
      <section className="bg-[#59341F] pt-32 pb-24">
        <JoinNetworkCTA />
      </section>
    </>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      <ExploreContent />
    </Suspense>
  );
}
