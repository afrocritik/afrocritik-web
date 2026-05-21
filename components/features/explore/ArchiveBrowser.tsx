"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { BROWN_GRADIENT, FALLBACK_WORKS, TABS } from "./constants";
import { ExploreHero } from "./ExploreHero";
import { ArchiveTabsBar } from "./ArchiveTabsBar";
import { ArchiveResults } from "./ArchiveResults";

export function ArchiveBrowser() {
  const params = useSearchParams();
  const [tab, setTab] = useState(params.get("tab") || "works");
  const [query, setQuery] = useState(params.get("q") || "");
  const [view, setView] = useState<"grid" | "list">("grid");

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

  return (
    <div style={{ background: BROWN_GRADIENT }}>
      <ExploreHero query={query} onQueryChange={setQuery} />
      <ArchiveTabsBar activeKey={tab} onSelect={setTab} />
      <ArchiveResults
        works={works}
        resultCount={resultCount}
        tabLabel={activeTab.label}
        view={view}
        onViewChange={setView}
        onPopularSearch={setQuery}
      />
    </div>
  );
}
