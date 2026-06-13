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

export const GROWTH_DATA: GrowthPoint[] = [
  { date: "Apr 25", film: 48, music: 30, literature: 22, ideas: 13 },
  { date: "Apr 27", film: 55, music: 35, literature: 26, ideas: 16 },
  { date: "Apr 29", film: 60, music: 32, literature: 23, ideas: 10 },
  { date: "May 1",  film: 53, music: 41, literature: 30, ideas: 17 },
  { date: "May 3",  film: 58, music: 36, literature: 25, ideas: 12 },
  { date: "May 5",  film: 65, music: 38, literature: 28, ideas: 14 },
  { date: "May 7",  film: 56, music: 31, literature: 21, ideas: 8 },
  { date: "May 9",  film: 50, music: 34, literature: 27, ideas: 16 },
  { date: "May 11", film: 46, music: 28, literature: 23, ideas: 11 },
  { date: "May 13", film: 54, music: 40, literature: 30, ideas: 14 },
  { date: "May 15", film: 62, music: 37, literature: 26, ideas: 9 },
  { date: "May 17", film: 72, music: 44, literature: 32, ideas: 17 },
  { date: "May 19", film: 78, music: 48, literature: 28, ideas: 13 },
  { date: "May 21", film: 85, music: 46, literature: 31, ideas: 12 },
  { date: "May 24", film: 80, music: 50, literature: 28, ideas: 15 },
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
  { label: "Film", value: 32, color: "#C2410C" },
  { label: "Ideas", value: 24, color: "#0C4A6E" },
  { label: "Music", value: 22, color: "#CA8A04" },
  { label: "Literature", value: 18, color: "#065F46" },
  { label: "Others", value: 14, color: "#A855F7" },
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
    image: "/EW-Image-3.png",
  },
  {
    title: "Half of a Yellow Sun",
    tags: ["Work", "Literature"],
    views: "9.8k",
    image: "/EBOPI-Image-2.jpg",
  },
  {
    title: "Fela Kuti: Rebel and Icon",
    tags: ["Person", "Music"],
    views: "7.6k",
    image: "/EW-Image-4.jpg",
  },
  {
    title: "Ngũgĩ wa Thiong'o",
    tags: ["Person", "History"],
    views: "6.3k",
    image: "/admin-image-4.png",
  },
  {
    title: "Nollywood History",
    tags: ["Work", "Film"],
    views: "4.8k",
    image: "/inner-anchor-2.jpg",
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
    image: "/EBOPI-Image-2.jpg",
  },
  {
    title: "Fela Kuti",
    type: "Person",
    category: "Music",
    addedBy: "Admin",
    date: "May 19, 2025",
    status: "Published",
    image: "/EW-Image-4.jpg",
  },
  {
    title: "Afrobeats Global Impact",
    type: "Idea",
    category: "Culture",
    addedBy: "Editor",
    date: "May 19, 2025",
    status: "Published",
    image: "/admin-image-4.png",
  },
  {
    title: "Purple Hibiscus",
    type: "Work",
    category: "Literature",
    addedBy: "Editor",
    date: "May 19, 2025",
    status: "Draft",
    image: "/EBOPI-Image-2.jpg",
  },
  {
    title: "Afrocritik 2025 Report",
    type: "Report",
    category: "Research",
    addedBy: "Admin",
    date: "May 19, 2025",
    status: "Published",
    image: "/EW-Image-3.png",
  },
];
