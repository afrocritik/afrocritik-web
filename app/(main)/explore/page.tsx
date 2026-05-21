"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, Suspense, useMemo, useState } from "react";
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

const FALLBACK_WORKS = Array.from({ length: 12 }).map((_, i) => ({
  slug: `work-${i}`,
  title:
    [
      "Living in Bondage",
      "Half of a Yellow Sun",
      "Zombie",
      "Tsotsi",
      "Sankofa",
      "Things Fall Apart",
    ][i % 6] + ` `,
  type: ["Film", "Literature", "Music", "Film", "Film", "Literature"][i % 6],
  year: 2024 - i,
  country: ["Nigeria", "Nigeria", "Nigeria", "South Africa", "Ghana", "Nigeria"][
    i % 6
  ],
  rating: 4 + ((i % 9) / 10),
}));

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
      </div>
      {/* END gradient wrapper */}

      {/* RESULTS */}
      <section className="container flex flex-col gap-8 py-10 lg:flex-row">
        {/* Sidebar */}
        <aside className="shrink-0 lg:w-64">
          <div className="rounded-xl border border-amber-line bg-bg-card p-5">
            <h3 className="font-display text-base font-bold text-white">
              Refine results
            </h3>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Year Range
              </p>
              <input
                type="range"
                min={1950}
                max={2025}
                defaultValue={2000}
                className="w-full accent-amber"
              />
              <div className="mt-1 flex justify-between text-[11px] text-ink-muted">
                <span>1950</span>
                <span>2025</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Country
              </p>
              <div className="flex flex-col gap-2">
                {COUNTRIES.map((c) => (
                  <label
                    key={c}
                    className="flex cursor-pointer items-center gap-2 text-sm text-ink-secondary"
                  >
                    <input
                      type="checkbox"
                      checked={checkedCountries.includes(c)}
                      onChange={() =>
                        toggle(checkedCountries, setCheckedCountries, c)
                      }
                      className="h-4 w-4 accent-amber"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Theme
              </p>
              <div className="flex flex-col gap-2">
                {THEMES.map((t) => (
                  <label
                    key={t}
                    className="flex cursor-pointer items-center gap-2 text-sm text-ink-secondary"
                  >
                    <input
                      type="checkbox"
                      checked={checkedThemes.includes(t)}
                      onChange={() =>
                        toggle(checkedThemes, setCheckedThemes, t)
                      }
                      className="h-4 w-4 accent-amber"
                    />
                    {t}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-secondary">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-1.5">
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
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">
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

          <div
            className={
              view === "grid"
                ? "grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4"
                : "flex flex-col gap-3"
            }
          >
            {works.map((w: any, i: number) => (
              <WorkCard
                key={w.slug ?? i}
                slug={w.slug}
                title={w.title}
                type={w.type}
                year={w.year}
                country={w.country}
                rating={w.rating}
              />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              className="rounded-md border-amber bg-transparent px-8 text-amber hover:bg-amber-soft"
            >
              Load More
            </Button>
          </div>
        </div>
      </section>

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
