"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  LayoutGrid,
  List,
  FileText,
  Lightbulb,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkCard } from "@/components/common/WorkCard";
import { FilterPill } from "@/components/common/FilterPill";
import { SectionHeading } from "@/components/common/SectionHeading";
import { api } from "@/lib/api";
import { formatCount } from "@/lib/utils";

const TABS = [
  { key: "works", label: "Works", count: 12346, icon: FileText },
  { key: "ideas", label: "Ideas", count: 1284, icon: Lightbulb },
  { key: "people", label: "People", count: 3902, icon: Users },
  { key: "reports", label: "Report", count: 18, icon: BarChart3 },
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
  "Reference",
  "Afrobeat",
  "Film",
  "Music",
  "Report",
  "Literature",
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
      {/* HERO */}
      <section className="bg-gradient-to-b from-bg-secondary to-bg-primary">
        <div className="container flex flex-col items-center py-14 text-center">
          <h1 className="font-display text-3xl font-bold text-white md:text-5xl">
            Explore African Archive
          </h1>
          <p className="mt-3 max-w-xl text-sm text-ink-secondary">
            Search and discover works, ideas, and people that shape our past,
            present, and future.
          </p>

          <div className="relative mt-8 w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Works, Ideas, People, Reports..."
              className="w-full rounded-full border border-amber-line bg-bg-card py-4 pl-12 pr-4 text-sm text-white placeholder:text-ink-muted focus:border-amber focus:outline-none"
            />
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SEARCH_TAGS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-amber-line px-3 py-1 text-xs text-ink-secondary"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TAB CARDS */}
      <div className="container -mt-2">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? "border-amber bg-amber-soft"
                    : "border-amber-line bg-bg-card hover:border-amber/50"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    active ? "bg-amber text-white" : "bg-amber-soft text-amber"
                  }`}
                >
                  <t.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {t.label}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {formatCount(t.count)}+
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER ROW */}
      <div className="container mt-6 flex flex-wrap items-center gap-2 border-b border-amber-line pb-4">
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
                      onChange={() => toggle(checkedThemes, setCheckedThemes, t)}
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
              movements — and see how creative output across the continent
              stays deeply connected.
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
      <section className="bg-bg-primary py-14">
        <div className="container">
          <SectionHeading
            title="Explore Based On Popular Interest"
            linkText="See more →"
            linkHref="/explore"
          />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {["Movies", "Literature", "Report", "Biography"].map((i) => (
              <Link
                key={i}
                href={`/explore?q=${i.toLowerCase()}`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl border border-amber-line bg-gradient-to-br from-[#3D1F00] to-[#1C0A00]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="relative z-10 p-4 font-display text-lg font-bold text-white">
                  {i}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg-secondary py-16">
        <div className="container flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-display text-2xl font-bold text-white md:text-3xl">
            Join The Network Building Africa&apos;s Cultural Infrastructure
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="rounded-md bg-amber px-7 text-white hover:bg-amber-hover"
            >
              <Link href="/signup">Subscribe</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-md border-amber bg-transparent px-7 text-amber hover:bg-amber-soft"
            >
              <Link href="/signup">Become a Contributor</Link>
            </Button>
          </div>
        </div>
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
