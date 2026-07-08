"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Clock } from "lucide-react";
import { api } from "@/lib/api";
import { rangeToDays, useDashboardFilter } from "./DashboardFilterContext";
import type {
  AdminStat,
  CategorySlice,
  EngagementBar,
  GrowthPoint,
  RecentEntry,
  TopContentItem,
} from "./constants";

export interface DashboardData {
  stats: AdminStat[];
  category: CategorySlice[];
  growth: GrowthPoint[];
  recent: RecentEntry[];
  engagement: EngagementBar[];
  topContent: TopContentItem[];
}

// Stat icons live on the client so we can mix image assets with Lucide icons;
// the server returns stats keyed only by label.
const ICON_BY_LABEL: Record<string, AdminStat["icon"]> = {
  "Total Works": "dashboard-icon_works.png",
  People: "explore-icon_people.svg",
  Ideas: "explore-icon_ideas.svg",
  Reports: "explore-icon_analytics.svg",
  Users: "explore-icon_people.svg",
  Moments: Clock,
};

type RawStat = { label: string; value: string; pct: string };

/**
 * Admin dashboard metrics. All aggregation happens server-side in
 * /api/analytics/dashboard (exact counts, no client-side row cap); this hook
 * just fetches the shaped result for the selected range and attaches stat icons.
 */
export function useDashboardData() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { range } = useDashboardFilter();
  const days = rangeToDays(range);

  return useQuery<DashboardData>({
    queryKey: ["admin-dashboard", token ?? "anon", range],
    staleTime: 60_000,
    queryFn: async () => {
      const d = (await api.analytics.dashboard(token, days == null ? "all" : days)) ?? {};
      const stats: AdminStat[] = (d.stats ?? []).map((s: RawStat) => ({
        ...s,
        icon: ICON_BY_LABEL[s.label] ?? "explore-icon_analytics.svg",
      }));
      return {
        stats,
        category: d.category ?? [],
        growth: d.growth ?? [],
        recent: d.recent ?? [],
        engagement: d.engagement ?? [],
        topContent: d.topContent ?? [],
      };
    },
  });
}
