"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardSection } from "./DashboardSection";
import { ContinueExploringCard } from "./ContinueExploringCard";
import { api, getMediaUrl } from "@/lib/api";

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
        <div className="grid grid-cols-3 gap-3">
          {works.map((work) => (
            <ContinueExploringCard
              key={work.slug ?? work.id}
              title={work.title ?? ""}
              description={work.cardDescription || work.summary || ""}
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
