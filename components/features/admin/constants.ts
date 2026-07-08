import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Clock,
  Hash,
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Sidebar navigation                                                  */
/* ------------------------------------------------------------------ */

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon | string;
}

export interface AdminNavGroup {
  heading: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    heading: "Main",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Homepage", href: "/admin/homepage", icon: Home },
    ],
  },
  {
    heading: "Archive",
    items: [
      { label: "Works", href: "/admin/works", icon: "dashboard-icon_works.png" },
      { label: "Ideas", href: "/admin/ideas", icon: "explore-icon_ideas.svg" },
      { label: "Moments", href: "/admin/moments", icon: Clock },
      { label: "People", href: "/admin/people", icon: "explore-icon_people.svg" },
      { label: "Reports", href: "/admin/reports", icon: "explore-icon_analytics.svg" },
    ],
  },
  {
    heading: "Taxonomy",
    items: [
      { label: "Genres", href: "/admin/genres", icon: "admin-genre-icon.png" },
      { label: "Themes", href: "/admin/themes", icon: "admin-themes-icon.png" },
      { label: "Countries", href: "/admin/countries", icon: "admin-country-icon.png" },
    ],
  },
  {
    heading: "Contents",
    items: [
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
      { label: "Tags", href: "/admin/tags", icon: Hash },
    ],
  },
  {
    heading: "Users & Access",
    items: [
      { label: "Users", href: "/admin/users", icon: Users },
    ],
  },
  {
    heading: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Activity Log", href: "/admin/activity", icon: Activity },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Stat cards                                                          */
/* ------------------------------------------------------------------ */

export interface AdminStat {
  label: string;
  value: string;
  pct: string;
  icon: LucideIcon | string;
}

/* ------------------------------------------------------------------ */
/* Content Growth Overview — stacked area chart                        */
/* ------------------------------------------------------------------ */

export interface GrowthSeries {
  key: string;
  label: string;
  color: string;
}

export const GROWTH_SERIES: GrowthSeries[] = [
  { key: "film", label: "Film", color: "#C2410C" },
  { key: "music", label: "Music", color: "#CA8A04" },
  { key: "literature", label: "Literature", color: "#065F46" },
  { key: "ideas", label: "Ideas", color: "#0C4A6E" },
];

export interface GrowthPoint {
  date: string;
  film: number;
  music: number;
  literature: number;
  ideas: number;
}

/* ------------------------------------------------------------------ */
/* Content by Category — donut chart                                   */
/* ------------------------------------------------------------------ */

export interface CategorySlice {
  label: string;
  value: number;
  color: string;
}

/* ------------------------------------------------------------------ */
/* Engagement by Entity Type — bar chart                               */
/* ------------------------------------------------------------------ */

export interface EngagementBar {
  entity: string;
  value: number;
}

/* ------------------------------------------------------------------ */
/* Top Content                                                         */
/* ------------------------------------------------------------------ */

export interface TopContentItem {
  title: string;
  tags: string[];
  views: string;
  image: string;
}

/* ------------------------------------------------------------------ */
/* Recent Entries table                                                */
/* ------------------------------------------------------------------ */

export type EntryStatus = "Published" | "Draft";

export interface RecentEntry {
  title: string;
  type: string;
  category: string;
  addedBy: string;
  date: string;
  status: EntryStatus;
  image: string;
}
