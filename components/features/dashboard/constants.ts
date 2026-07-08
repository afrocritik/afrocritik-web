export interface DashboardNavItem {
  label: string;
  href: string;
  icon:
    | "dashboard"
    | "library"
    | "saved"
    | "people"
    | "reports"
    | "contribution"
    | "settings";
}

export const NAV_ITEMS: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "My Library", href: "/dashboard/library", icon: "library" },
  { label: "Saved", href: "/dashboard/saved", icon: "saved" },
  { label: "People", href: "/dashboard/people", icon: "people" },
  { label: "Reports", href: "/dashboard/reports", icon: "reports" },
  { label: "Contribution", href: "/dashboard/contribution", icon: "contribution" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

export interface DashboardStat {
  label: string;
  value: string;
  delta: string;
  icon: "reviewed" | "following" | "collections" | "published";
}

export interface RecommendedItem {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
}

export interface CollectionItem {
  slug: string;
  name: string;
  count: number;
  image: string;
}
