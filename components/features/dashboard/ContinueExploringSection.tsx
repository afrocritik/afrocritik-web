"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardSection } from "./DashboardSection";
import { ContinueExploringCard } from "./ContinueExploringCard";
import { api, getMediaUrl } from "@/lib/api";
import { plainText } from "@/lib/richText";

export function ContinueExploringSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-continue-exploring"],
    queryFn: () => api.works.list({ limit: 3, sort: "-createdAt", depth: 1 }),
  });

  const works: any[] = data?.docs ?? [];

  return (
    <DashboardSection
      title="Continue Exploring"
      viewAllHref={works.length > 0 ? "/explore" : undefined}
      card
    >
      {works.length > 0 ? (
        <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {works.map((work) => (
            <ContinueExploringCard
              key={work.slug ?? work.id}
              slug={work.slug}
              title={work.title ?? ""}
              description={plainText(work.cardDescription || work.summary || "")}
              image={getMediaUrl(work.coverImage) ?? ""}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center font-inter text-sm italic text-white/40">
          {isLoading
            ? "Loading works…"
            : "Nothing to explore yet — new works are on the way."}
        </p>
      )}
    </DashboardSection>
  );
}
