"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Clock } from "lucide-react";
import { apiClient, getMediaUrl } from "@/lib/api";
import type {
  AdminStat,
  CategorySlice,
  EngagementBar,
  GrowthPoint,
  RecentEntry,
  TopContentItem,
} from "./constants";

/* Colours reused from the static palette so the charts stay on-brand. */
const TYPE_COLORS: Record<string, string> = {
  film: "#C2410C",
  music: "#CA8A04",
  literature: "#065F46",
  ideas: "#0C4A6E",
  art: "#7C3AED",
  other: "#A855F7",
};

type Raw = { docs?: any[]; totalDocs?: number };

export interface DashboardData {
  stats: AdminStat[];
  category: CategorySlice[];
  growth: GrowthPoint[];
  recent: RecentEntry[];
  engagement: EngagementBar[];
  topContent: TopContentItem[];
}

const fmtViews = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : String(n);

const cap = (s?: string) =>
  (s ?? "")
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ") || "—";

const fmtDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const thisMonth = (docs: any[] = []) => {
  const now = new Date();
  return docs.filter((d) => {
    const c = new Date(d?.createdAt);
    return c.getMonth() === now.getMonth() && c.getFullYear() === now.getFullYear();
  }).length;
};

/** Last n months as { label, end } where end is the last instant of the month. */
function lastNMonths(n: number) {
  const out: { label: string; end: Date }[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
    out.push({ label: d.toLocaleDateString("en-US", { month: "short" }), end: d });
  }
  return out;
}

function compute(raw: Record<string, Raw>): DashboardData {
  const works = raw.works?.docs ?? [];
  const people = raw.people?.docs ?? [];
  const ideas = raw.ideas?.docs ?? [];
  const reports = raw.reports?.docs ?? [];
  const moments = raw.moments?.docs ?? [];
  const users = raw.users?.docs ?? [];
  const n = (r?: Raw) => r?.totalDocs ?? r?.docs?.length ?? 0;
  const fmt = (v: number) => v.toLocaleString();
  const plus = (docs: any[]) => `+${thisMonth(docs)}`;

  const stats: AdminStat[] = [
    { label: "Total Works", value: fmt(n(raw.works)), pct: plus(works), icon: "dashboard-icon_works.png" },
    { label: "People", value: fmt(n(raw.people)), pct: plus(people), icon: "explore-icon_people.svg" },
    { label: "Ideas", value: fmt(n(raw.ideas)), pct: plus(ideas), icon: "explore-icon_ideas.svg" },
    { label: "Reports", value: fmt(n(raw.reports)), pct: plus(reports), icon: "explore-icon_analytics.svg" },
    { label: "Users", value: fmt(n(raw.users)), pct: plus(users), icon: "explore-icon_people.svg" },
    { label: "Moments", value: fmt(n(raw.moments)), pct: plus(moments), icon: Clock },
  ];

  // Content by category — works grouped by type.
  const byType: Record<string, number> = {};
  works.forEach((w) => {
    const t = (w?.type || "other").toLowerCase();
    byType[t] = (byType[t] || 0) + 1;
  });
  const category: CategorySlice[] = Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .map(([t, v]) => ({ label: cap(t), value: v, color: TYPE_COLORS[t] ?? TYPE_COLORS.other }));

  // Content growth — cumulative counts per type / ideas across recent months.
  const months = lastNMonths(6);
  const cum = (docs: any[], end: Date, pred: (d: any) => boolean = () => true) =>
    docs.filter((d) => pred(d) && new Date(d?.createdAt) <= end).length;
  const growth: GrowthPoint[] = months.map(({ label, end }) => ({
    date: label,
    film: cum(works, end, (w) => (w?.type || "").toLowerCase() === "film"),
    music: cum(works, end, (w) => (w?.type || "").toLowerCase() === "music"),
    literature: cum(works, end, (w) => (w?.type || "").toLowerCase() === "literature"),
    ideas: cum(ideas, end),
  }));

  // Recent entries — newest documents across the main collections.
  type R = RecentEntry & { createdAt?: string };
  const toStatus = (s?: string): RecentEntry["status"] =>
    s === "published" ? "Published" : "Draft";
  const merged: R[] = [
    ...works.map((w) => ({ title: w.title, type: "Work", category: cap(w.type), addedBy: "—", date: fmtDate(w.createdAt), status: toStatus(w.status), image: getMediaUrl(w.coverImage) || "/EW-Image-3.png", createdAt: w.createdAt })),
    ...people.map((p) => ({ title: p.name, type: "Person", category: cap(Array.isArray(p.role) ? p.role[0] : p.role), addedBy: "—", date: fmtDate(p.createdAt), status: toStatus(p.status), image: getMediaUrl(p.photo) || "/EW-Image-3.png", createdAt: p.createdAt })),
    ...ideas.map((i) => ({ title: i.title, type: "Idea", category: cap(i.category), addedBy: "—", date: fmtDate(i.createdAt), status: toStatus(i.status), image: getMediaUrl(i.coverImage) || "/EW-Image-3.png", createdAt: i.createdAt })),
    ...reports.map((r) => ({ title: r.title, type: "Report", category: "Research", addedBy: "—", date: fmtDate(r.createdAt), status: toStatus(r.status), image: getMediaUrl(r.coverImage) || "/EW-Image-3.png", createdAt: r.createdAt })),
  ];
  const recent: RecentEntry[] = merged
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 8)
    .map(({ createdAt, ...rest }) => rest);

  // Engagement by entity type — total views per collection.
  const sumViews = (docs: any[]) =>
    docs.reduce((acc, d) => acc + (Number(d?.views) || 0), 0);
  const engagement: EngagementBar[] = [
    { entity: "Works", value: sumViews(works) },
    { entity: "Ideas", value: sumViews(ideas) },
    { entity: "People", value: sumViews(people) },
    { entity: "Reports", value: sumViews(reports) },
  ];

  // Top content — most-viewed documents across collections.
  const topContent: TopContentItem[] = [
    ...works.map((w) => ({ title: w.title, tags: ["Work", cap(w.type)], v: Number(w.views) || 0, image: getMediaUrl(w.coverImage) || "/EW-Image-3.png" })),
    ...people.map((p) => ({ title: p.name, tags: ["Person", cap(Array.isArray(p.role) ? p.role[0] : p.role)], v: Number(p.views) || 0, image: getMediaUrl(p.photo) || "/EW-Image-3.png" })),
    ...ideas.map((i) => ({ title: i.title, tags: ["Idea", cap(i.category)], v: Number(i.views) || 0, image: getMediaUrl(i.coverImage) || "/EW-Image-3.png" })),
    ...reports.map((r) => ({ title: r.title, tags: ["Report"], v: Number(r.views) || 0, image: getMediaUrl(r.coverImage) || "/EW-Image-3.png" })),
  ]
    .sort((a, b) => b.v - a.v)
    .slice(0, 5)
    .map(({ v, ...rest }) => ({ ...rest, views: fmtViews(v) }));

  return { stats, category, growth, recent, engagement, topContent };
}

export function useDashboardData() {
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const auth = token ? { Authorization: `Bearer ${token}` } : undefined;

  return useQuery<DashboardData>({
    queryKey: ["admin-dashboard", token ?? "anon"],
    staleTime: 60_000,
    queryFn: async () => {
      const get = (slug: string) =>
        apiClient
          .get(`/api/${slug}`, { params: { limit: 200, depth: 0, sort: "-createdAt" }, headers: auth })
          .then((r) => r.data as Raw)
          .catch(() => ({ docs: [], totalDocs: 0 } as Raw));

      const [works, people, ideas, reports, moments, users] = await Promise.all([
        get("works"),
        get("people"),
        get("ideas"),
        get("reports"),
        get("moments"),
        get("users"),
      ]);
      return compute({ works, people, ideas, reports, moments, users });
    },
  });
}
