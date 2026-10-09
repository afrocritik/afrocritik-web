"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api, getMediaUrl, mapWorkToCard } from "@/lib/api";
import { BROWN_GRADIENT, TABS, TAB_FILTERS } from "./constants";
import { ExploreHero } from "./ExploreHero";
import { ArchiveTabsBar } from "./ArchiveTabsBar";
import { ArchiveFilterBar } from "./ArchiveFilterBar";
import { ArchiveResults } from "./ArchiveResults";
import { YEAR_MAX, YEAR_MIN } from "./RefineSidebar";
import { plainText } from "@/lib/richText";

function resolveNames(arr: any): string {
  return Array.isArray(arr)
    ? arr
        .map((x: any) => (typeof x === "string" ? x : plainText(x?.name ?? "")))
        .filter(Boolean)
        .join(", ")
    : "";
}

// Each tab maps to its own detail route, so a card links to the right page.
const TAB_ROUTE: Record<string, string> = {
  works: "works",
  ideas: "ideas",
  people: "people",
  reports: "reports",
  moments: "moments",
};

// The archive endpoint returns raw Payload docs; normalise each to the card
// shape ArchiveResults / WorkCard expect, per tab.
function toCard(doc: any, tab: string) {
  const base = TAB_ROUTE[tab] ?? "works";
  if (tab === "people") {
    const slug = doc.slug ?? "";
    return {
      slug,
      href: `/${base}/${slug}`,
      title: plainText(doc.name ?? ""),
      type: "person",
      year: undefined,
      country: resolveNames(doc.country),
      rating: undefined,
      badge: undefined,
      image: getMediaUrl(doc.photo),
      description: plainText(doc.summary ?? ""),
      tags: resolveNames(doc.tags)
        ? resolveNames(doc.tags).split(", ")
        : [],
    };
  }
  // works / ideas / reports / moments all share coverImage + summary.
  const card = mapWorkToCard(doc);
  return { ...card, href: `/${base}/${card.slug}` };
}

// Filters live in the address (?tab=…&q=…&country=a,b) so refresh, back and
// shared links all land on the same view. Lists are comma-separated.
const listParam = (params: URLSearchParams, key: string) =>
  (params.get(key) ?? "").split(",").filter(Boolean);
const numParam = (params: URLSearchParams, key: string) => {
  const n = Number(params.get(key));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export function ArchiveBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const [tab, setTab] = useState(params.get("tab") || "works");
  const [query, setQuery] = useState(params.get("q") || "");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState(params.get("sort") || "newest");
  const [countries, setCountries] = useState<string[]>(() => listParam(params, "country"));
  const [themes, setThemes] = useState<string[]>(() => listParam(params, "theme"));
  const [yearFrom, setYearFrom] = useState<number | undefined>(() => numParam(params, "yearFrom"));
  const [yearTo, setYearTo] = useState<number | undefined>(() => numParam(params, "yearTo"));
  // Top-bar dropdown filters (country is shared with the sidebar above).
  const [years, setYears] = useState<string[]>(() => listParam(params, "year"));
  const [categories, setCategories] = useState<string[]>(() => listParam(params, "category"));
  const [genres, setGenres] = useState<string[]>(() => listParam(params, "genre"));

  // Categories / sub-categories / specific years mean different things per tab.
  const selectTab = (key: string) => {
    setTab(key);
    setCategories([]);
    setGenres([]);
    setYears([]);
    // The sidebar remounts per tab (see ArchiveResults), so its year slider
    // returns to the full range — keep the filter state in step with it.
    setYearFrom(undefined);
    setYearTo(undefined);
  };

  // Search as the visitor pauses typing, not on every keystroke — saves requests
  // and keeps half-typed words out of the Popular Searches tally.
  const [searchTerm, setSearchTerm] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(query), 600);
    return () => clearTimeout(t);
  }, [query]);

  // Mirror the active view into the address bar (replace, so back doesn't step
  // through every keystroke or checkbox).
  useEffect(() => {
    const sp = new URLSearchParams();
    if (tab !== "works") sp.set("tab", tab);
    if (searchTerm) sp.set("q", searchTerm);
    if (sort !== "newest") sp.set("sort", sort);
    const lists: [string, string[]][] = [
      ["country", countries],
      ["theme", themes],
      ["year", years],
      ["category", categories],
      ["genre", genres],
    ];
    for (const [key, vals] of lists) if (vals.length) sp.set(key, vals.join(","));
    if (yearFrom !== undefined) sp.set("yearFrom", String(yearFrom));
    if (yearTo !== undefined) sp.set("yearTo", String(yearTo));
    const qs = sp.toString();
    if (qs === window.location.search.replace(/^\?/, "")) return;
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [tab, searchTerm, sort, countries, themes, years, categories, genres, yearFrom, yearTo, pathname, router]);

  const { data: countsData } = useQuery({
    queryKey: ["archive-counts"],
    queryFn: () => api.counts(),
    staleTime: 5 * 60_000,
  });

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["archive", tab, searchTerm, sort, countries, themes, yearFrom, yearTo, years, categories, genres, token ?? "anon"],
    initialPageParam: 1,
    getNextPageParam: (last: any) => (last?.hasNextPage ? (last.page ?? 1) + 1 : undefined),
    queryFn: ({ pageParam }) =>
      api.archive(
        {
          type: tab,
          page: pageParam,
          q: searchTerm || undefined,
          track: searchTerm ? 1 : undefined,
          sort,
          country: countries.length ? countries : undefined,
          theme: themes.length ? themes : undefined,
          yearFrom,
          yearTo,
          year: years.length ? years : undefined,
          category: categories.length ? categories : undefined,
          genre: genres.length ? genres : undefined,
        },
        token,
      ),
    retry: false,
    staleTime: 60_000,
  });

  // Pages accumulate as "View More" is pressed; the first page carries the
  // totals and the gating flag.
  const firstPage: any = data?.pages?.[0];
  const works = useMemo(
    () =>
      (data?.pages ?? []).flatMap((p: any) =>
        Array.isArray(p?.docs) ? p.docs.map((d: any) => toCard(d, tab)) : [],
      ),
    [data, tab],
  );

  const activeTab = TABS.find((t) => t.key === tab) ?? TABS[0];
  const resultCount = firstPage?.totalDocs ?? 0;

  // Signed-out visitors get a preview-then-wall once they actively search or
  // change the sort: they see the result count and a few cards, then a prompt
  // to sign in / up to view the rest. Plain browsing stays open. The API is the
  // source of truth (it withholds the withheld docs); the client check is just
  // a fallback for the brief window before the response lands.
  const gated = firstPage?.gated ?? false;

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    id: string
  ) =>
    setter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onYearChange = (from: number, to: number) => {
    // The full range means "no year filter" — it must not drop undated entries.
    const full = from <= YEAR_MIN && to >= YEAR_MAX;
    setYearFrom(full ? undefined : from);
    setYearTo(full ? undefined : to);
  };

  const clearFilters = () => {
    setCountries([]);
    setThemes([]);
    setYearFrom(undefined);
    setYearTo(undefined);
    setYears([]);
    setCategories([]);
    setGenres([]);
  };

  const support = TAB_FILTERS[tab] ?? { year: false, country: false, subcategory: false };
  const yearRangeActive = support.year && (yearFrom !== undefined || yearTo !== undefined);
  const activeCount =
    (support.country ? countries.length : 0) +
    themes.length +
    (yearRangeActive ? 1 : 0) +
    (support.year ? years.length : 0) +
    categories.length +
    (support.subcategory ? genres.length : 0);

  return (
    <div style={{ background: BROWN_GRADIENT }}>
      <ExploreHero query={query} onQueryChange={setQuery} />
      <ArchiveTabsBar
        activeKey={tab}
        onSelect={selectTab}
        counts={countsData}
        sort={sort}
        onSortChange={setSort}
        filterBar={
          <ArchiveFilterBar
            tab={tab}
            filters={{ years, setYears, categories, setCategories, genres, setGenres, countries, setCountries }}
          />
        }
      />
      <ArchiveResults
        works={works}
        resultCount={resultCount}
        tabLabel={activeTab.label}
        view={view}
        onViewChange={setView}
        refine={{
          selectedCountries: countries,
          onToggleCountry: (id) => toggle(setCountries, id),
          selectedThemes: themes,
          onToggleTheme: (id) => toggle(setThemes, id),
          onYearChange,
          onSearch: setQuery,
          yearActive: yearRangeActive,
          activeCount,
          showYear: support.year,
          showCountry: support.country,
          onClearAll: clearFilters,
        }}
        loading={isLoading}
        hasMore={Boolean(hasNextPage)}
        loadingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        gated={gated}
        showRefine
      />
    </div>
  );
}
