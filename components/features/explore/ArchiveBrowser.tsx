"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api, getMediaUrl, mapWorkToCard } from "@/lib/api";
import { BROWN_GRADIENT, TABS } from "./constants";
import { ExploreHero } from "./ExploreHero";
import { ArchiveTabsBar } from "./ArchiveTabsBar";
import { ArchiveResults } from "./ArchiveResults";

function resolveNames(arr: any): string {
  return Array.isArray(arr)
    ? arr
        .map((x: any) => (typeof x === "string" ? x : x?.name ?? ""))
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
      title: doc.name ?? "",
      type: "person",
      year: undefined,
      country: resolveNames(doc.country),
      rating: undefined,
      badge: undefined,
      image: getMediaUrl(doc.photo),
      description: doc.summary ?? "",
      tags: resolveNames(doc.tags)
        ? resolveNames(doc.tags).split(", ")
        : [],
    };
  }
  // works / ideas / reports / moments all share coverImage + summary.
  const card = mapWorkToCard(doc);
  return { ...card, href: `/${base}/${card.slug}` };
}

export function ArchiveBrowser({ signedIn = false }: { signedIn?: boolean }) {
  const params = useSearchParams();
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const [tab, setTab] = useState(params.get("tab") || "works");
  const [query, setQuery] = useState(params.get("q") || "");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("newest");
  const [countries, setCountries] = useState<string[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [yearFrom, setYearFrom] = useState<number | undefined>(undefined);
  const [yearTo, setYearTo] = useState<number | undefined>(undefined);

  // Search as the visitor pauses typing, not on every keystroke — saves requests
  // and keeps half-typed words out of the Popular Searches tally.
  const [searchTerm, setSearchTerm] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(query), 600);
    return () => clearTimeout(t);
  }, [query]);

  const { data: countsData } = useQuery({
    queryKey: ["archive-counts"],
    queryFn: () => api.counts(),
    staleTime: 5 * 60_000,
  });

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["archive", tab, searchTerm, sort, countries, themes, yearFrom, yearTo, token ?? "anon"],
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
  const isSearchingOrSorting = query.trim().length > 0 || sort !== "newest";
  const gated =
    firstPage?.gated ??
    (status === "unauthenticated" && isSearchingOrSorting);

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    id: string
  ) =>
    setter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const onYearChange = (from: number, to: number) => {
    setYearFrom(from);
    setYearTo(to);
  };

  return (
    <div style={{ background: BROWN_GRADIENT }}>
      <ExploreHero query={query} onQueryChange={setQuery} />
      <ArchiveTabsBar
        activeKey={tab}
        onSelect={setTab}
        counts={countsData}
        sort={sort}
        onSortChange={setSort}
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
        }}
        loading={isLoading}
        hasMore={Boolean(hasNextPage)}
        loadingMore={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
        gated={gated}
        showRefine={signedIn}
      />
    </div>
  );
}
