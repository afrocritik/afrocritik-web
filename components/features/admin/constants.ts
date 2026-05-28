import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Clock,
  Hash,
  Image as ImageIcon,
  LayoutDashboard,
  Settings,
  Shield,
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
    items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
  },
  {
    heading: "Archive",
    items: [
      { label: "Works", href: "/admin/works", icon: "dashboard-icon_works.png" },
      { label: "Ideas", href: "/admin/ideas", icon: "explore-icon_ideas.svg" },
      { label: "People", href: "/admin/people", icon: "explore-icon_people.svg" },
      { label: "Reports", href: "/admin/reports", icon: "explore-icon_analytics.svg" },
      { label: "Collections", href: "/admin/collections", icon: "dashboard-Icon_write.png" },
    ],
  },
  {
    heading: "Taxonomy",
    items: [
      { label: "Genres", href: "/admin/genres", icon: "admin-genre-icon.png" },
      { label: "Themes", href: "/admin/themes", icon: "admin-themes-icon.png" },
      { label: "Countries", href: "/admin/countries", icon: "admin-country-icon.png" },
      { label: "Movements", href: "/admin/movements", icon: Users },
    ],
  },
  {
    heading: "Relationships",
    items: [{ label: "Timeline", href: "/admin/timeline", icon: Clock }],
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
      { label: "Roles & Permissions", href: "/admin/roles", icon: Shield },
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

export const ADMIN_STATS: AdminStat[] = [
  { label: "Total Works", value: "1,248", pct: "12%", icon: "dashboard-icon_works.png" },
  { label: "People", value: "500", pct: "10%", icon: "explore-icon_people.svg" },
  { label: "Ideas", value: "800", pct: "8%", icon: "explore-icon_ideas.svg" },
  { label: "Reports", value: "28", pct: "16%", icon: "explore-icon_analytics.svg" },
  { label: "Connections", value: "3,123", pct: "7%", icon: "inner-Share.png" },
  { label: "Users", value: "165", pct: "18%", icon: "explore-icon_people.svg" },
];

/* ------------------------------------------------------------------ */
/* Content Growth Overview — stacked area chart                        */
/* ------------------------------------------------------------------ */

export interface GrowthSeries {
  key: string;
  label: string;
  color: string;
}

export const GROWTH_SERIES: GrowthSeries[] = [
  { key: "film", label: "Film", color: "#B91C1C" },
  { key: "music", label: "Music", color: "#EA580C" },
  { key: "literature", label: "Literature", color: "#C8922A" },
  { key: "ideas", label: "Ideas", color: "#15803D" },
  { key: "people", label: "People", color: "#0E7490" },
];

export interface GrowthPoint {
  date: string;
  film: number;
  music: number;
  literature: number;
  ideas: number;
  people: number;
}

export const GROWTH_DATA: GrowthPoint[] = [
  { date: "Apr 25", film: 10, music: 8, literature: 6, ideas: 5, people: 4 },
  { date: "Apr 27", film: 11, music: 8, literature: 6, ideas: 5, people: 4 },
  { date: "Apr 29", film: 11, music: 9, literature: 7, ideas: 6, people: 5 },
  { date: "May 1", film: 12, music: 9, literature: 7, ideas: 6, people: 5 },
  { date: "May 3", film: 13, music: 10, literature: 8, ideas: 7, people: 5 },
  { date: "May 5", film: 14, music: 11, literature: 8, ideas: 7, people: 6 },
  { date: "May 7", film: 15, music: 11, literature: 9, ideas: 8, people: 6 },
  { date: "May 9", film: 16, music: 12, literature: 9, ideas: 8, people: 7 },
  { date: "May 11", film: 17, music: 13, literature: 10, ideas: 9, people: 7 },
  { date: "May 13", film: 18, music: 14, literature: 11, ideas: 10, people: 8 },
  { date: "May 15", film: 19, music: 15, literature: 12, ideas: 10, people: 8 },
  { date: "May 17", film: 21, music: 16, literature: 13, ideas: 11, people: 9 },
  { date: "May 19", film: 22, music: 17, literature: 14, ideas: 12, people: 9 },
  { date: "May 21", film: 24, music: 18, literature: 15, ideas: 13, people: 10 },
  { date: "May 24", film: 26, music: 20, literature: 16, ideas: 14, people: 11 },
];

/* ------------------------------------------------------------------ */
/* Content by Category — donut chart                                   */
/* ------------------------------------------------------------------ */

export interface CategorySlice {
  label: string;
  value: number;
  color: string;
}

export const CATEGORY_DATA: CategorySlice[] = [
  { label: "Film", value: 32, color: "#B91C1C" },
  { label: "Ideas", value: 24, color: "#15803D" },
  { label: "Music", value: 22, color: "#C8922A" },
  { label: "Literature", value: 18, color: "#1D4ED8" },
  { label: "Others", value: 14, color: "#7E22CE" },
];

/* ------------------------------------------------------------------ */
/* Engagement by Entity Type — bar chart                               */
/* ------------------------------------------------------------------ */

export interface EngagementBar {
  entity: string;
  value: number;
}

export const ENGAGEMENT_DATA: EngagementBar[] = [
  { entity: "Works", value: 80 },
  { entity: "Ideas", value: 100 },
  { entity: "People", value: 65 },
  { entity: "Reports", value: 45 },
  { entity: "Connections", value: 20 },
];

/* ------------------------------------------------------------------ */
/* Top Content                                                         */
/* ------------------------------------------------------------------ */

export interface TopContentItem {
  title: string;
  tags: string[];
  views: string;
  image: string;
}

export const TOP_CONTENT: TopContentItem[] = [
  {
    title: "Davido",
    tags: ["Person", "Music"],
    views: "12.4K",
    image: "/inner-pioneer-Image-1.png",
  },
  {
    title: "Half of a Yellow Sun",
    tags: ["Work", "Literature"],
    views: "9.8k",
    image: "/inner-pioneer-Image-3.png",
  },
  {
    title: "Fela Kuti: Rebel and Icon",
    tags: ["Person", "Music"],
    views: "7.6k",
    image: "/EW-Image-2.png",
  },
  {
    title: "Ngũgĩ wa Thiong'o",
    tags: ["Person", "History"],
    views: "6.3k",
    image: "/inner-pioneer-Image-2.png",
  },
  {
    title: "Nollywood History",
    tags: ["Work", "Film"],
    views: "4.8k",
    image: "/inner-anchor-1.png",
  },
];

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

export const RECENT_ENTRIES: RecentEntry[] = [
  {
    title: "Living in Bondage (1992)",
    type: "Work",
    category: "Film",
    addedBy: "Admin",
    date: "May 19, 2025",
    status: "Published",
    image: "/inner-pioneer-Image-1.png",
  },
  {
    title: "Fela Kuti",
    type: "Person",
    category: "Music",
    addedBy: "Admin",
    date: "May 19, 2025",
    status: "Published",
    image: "/EW-Image-2.png",
  },
  {
    title: "Afrobeats Global Impact",
    type: "Idea",
    category: "Culture",
    addedBy: "Editor",
    date: "May 19, 2025",
    status: "Published",
    image: "/EW-Image-1.png",
  },
  {
    title: "Purple Hibiscus",
    type: "Work",
    category: "Literature",
    addedBy: "Editor",
    date: "May 19, 2025",
    status: "Draft",
    image: "/inner-pioneer-Image-3.png",
  },
  {
    title: "Afrocritik 2025 Report",
    type: "Report",
    category: "Research",
    addedBy: "Admin",
    date: "May 19, 2025",
    status: "Published",
    image: "/inner-pioneer-Image-2.png",
  },
];
