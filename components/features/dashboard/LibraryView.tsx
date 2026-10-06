"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { LayoutGrid, Lightbulb, Users, Layers, type LucideIcon } from "lucide-react";
import { api, getMediaUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { PersonLibraryCard, mapPerson } from "./PersonLibraryCard";
import { FeaturedWorkCard, type FeaturedWorkItem } from "./FeaturedWorkCard";
import { mapFeatured } from "./FeaturedWorksSection";
import { CollectionsGrid } from "./CollectionsGrid";

type TabKey = "works" | "ideas" | "people" | "collections";

const TABS: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: "works", label: "Works", icon: LayoutGrid },
  { key: "ideas", label: "Idea", icon: Lightbulb },
  { key: "people", label: "People", icon: Users },
  { key: "collections", label: "Collections", icon: Layers },
];

// Ideas share the Works card in the Figma: cover, title, summary and
// country/category tags, linking to the idea page.
function mapIdea(idea: any): FeaturedWorkItem {
  const countries: string[] = Array.isArray(idea.country)
    ? idea.country.map((c: any) => (typeof c === "string" ? c : c?.name ?? ""))
    : [];
  const category = idea.typeLabel || idea.category;
  const tags = [...countries, category]
    .filter(Boolean)
    .slice(0, 3)
    .map((t: string) => t.replace(/-/g, " ").toUpperCase());
  return {
    slug: idea.slug ?? "",
    href: `/ideas/${idea.slug}`,
    title: idea.title ?? "",
    description: idea.summary ?? "",
    image: getMediaUrl(idea.coverImage),
    tags,
  };
}

function Empty({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="py-12 text-center font-inter text-sm italic text-white/40">
      {children}
    </p>
  );
}

/**
 * My Library — everything the user has opened, read or watched across the
 * archive (works, ideas, people), most recently engaged first. Filled
 * automatically by ViewTracker; there is no manual "add".
 */
export function LibraryView() {
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  // ?tab=collections lets other pages (e.g. a collection's Back link) deep-link a sub-tab.
  const initial = useSearchParams().get("tab");
  const [tab, setTab] = useState<TabKey>(
    TABS.some((t) => t.key === initial) ? (initial as TabKey) : "works"
  );

  const { data: library, isLoading } = useQuery({
    queryKey: ["library", token ?? "anon"],
    enabled: Boolean(token),
    queryFn: () => api.library.me(token as string),
  });

  // Same key + fetcher as CollectionsGrid so the count and grid share one request.
  const { data: collectionsData } = useQuery({
    queryKey: ["collections", token ?? "anon"],
    enabled: Boolean(token),
    queryFn: () => api.collections.list(token, { depth: 2 }),
  });

  const works: any[] = library?.works ?? [];
  const ideas: any[] = library?.ideas ?? [];
  const people: any[] = library?.people ?? [];
  const counts: Record<TabKey, number | undefined> = {
    works: works.length,
    ideas: ideas.length,
    people: people.length,
    collections: collectionsData?.totalDocs,
  };
  const loading = status === "loading" || (Boolean(token) && isLoading);

  return (
    <div className="flex flex-col gap-8">
      {/* Sub-tabs */}
      <div className="max-w-full self-start overflow-x-auto rounded-full bg-white/[0.04] px-2.5 py-2.5 [scrollbar-width:none] sm:px-5">
        <div className="flex items-center gap-1 sm:gap-5">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = tab === key;
            const count = counts[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-[26px] shrink-0 items-center justify-center gap-[5px] rounded-full px-2.5 font-inter text-xs sm:min-w-[100px] sm:px-[11px] font-normal text-white transition-colors",
                  active
                    ? "bg-rose-100/5 outline outline-1 -outline-offset-1 outline-yellow-700/15"
                    : "hover:bg-white/5"
                )}
              >
                <Icon className="hidden size-3 sm:block" />
                {label}
                {key !== "collections" && typeof count === "number" && count > 0 && ` (${count})`}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "collections" ? (
        <CollectionsGrid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5" />
      ) : loading ? (
        <Empty>Loading…</Empty>
      ) : tab === "works" ? (
        works.length === 0 ? (
          <Empty>
            Nothing here yet. Works you open, read or watch will appear in your library.
          </Empty>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {works.map((work) => (
              <FeaturedWorkCard key={work.id} {...mapFeatured(work)} />
            ))}
          </div>
        )
      ) : tab === "ideas" ? (
        ideas.length === 0 ? (
          <Empty>Ideas you open or read will appear in your library.</Empty>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {ideas.map((idea) => (
              <FeaturedWorkCard key={idea.id} {...mapIdea(idea)} />
            ))}
          </div>
        )
      ) : people.length === 0 ? (
        <Empty>People whose profiles you visit will appear in your library.</Empty>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {people.map((p) => (
            <PersonLibraryCard key={p.id} {...mapPerson(p)} />
          ))}
        </div>
      )}
    </div>
  );
}
