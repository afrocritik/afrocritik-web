"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardSection } from "./DashboardSection";
import { FeaturedWorkCard, type FeaturedWorkItem } from "./FeaturedWorkCard";
import { api, getMediaUrl } from "@/lib/api";

function mapFeatured(work: any): FeaturedWorkItem {
  const tags = [
    ...(Array.isArray(work.country)
      ? work.country.map((c: any) => (typeof c === "string" ? c : c?.name ?? ""))
      : []),
    work.type,
  ]
    .filter(Boolean)
    .slice(0, 3)
    .map((t: string) => t.toUpperCase());

  const director = Array.isArray(work.people)
    ? work.people
        .map((p: any) => (typeof p === "object" ? p?.name : null))
        .filter(Boolean)
        .join(" & ")
    : undefined;

  return {
    slug: work.slug ?? "",
    title: work.title ?? "",
    director: director || undefined,
    description: work.cardDescription || work.summary || "",
    image: getMediaUrl(work.coverImage),
    tags,
    rating: typeof work.rating === "number" ? work.rating : undefined,
  };
}

export function FeaturedWorksSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-featured-works"],
    queryFn: () =>
      api.works.list({
        "where[isFeatured][equals]": true,
        limit: 3,
        depth: 1,
      }),
  });

  let works: any[] = data?.docs ?? [];

  // Fall back to latest works if nothing is explicitly featured.
  const { data: fallback } = useQuery({
    queryKey: ["dashboard-featured-works-fallback"],
    queryFn: () => api.works.list({ limit: 3, sort: "-createdAt", depth: 1 }),
    enabled: !isLoading && works.length === 0,
  });
  if (works.length === 0) works = fallback?.docs ?? [];

  return (
    <DashboardSection
      title="Featured Works"
      viewAllHref={works.length > 0 ? "/explore" : undefined}
      card
    >
      {works.length > 0 ? (
        <div className="flex gap-3">
          {works.map((work) => (
            <FeaturedWorkCard key={work.slug ?? work.id} {...mapFeatured(work)} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center font-inter text-sm italic text-white/40">
          {isLoading ? "Loading featured works…" : "No featured works yet."}
        </p>
      )}
    </DashboardSection>
  );
}
