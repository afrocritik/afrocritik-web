import type { WorkCardProps } from "@/components/common/WorkCard";

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

export const STATS: DashboardStat[] = [
  { label: "Works Reviewed", value: "47", delta: "+3 this month", icon: "reviewed" },
  { label: "Following", value: "128", delta: "+12 this week", icon: "following" },
  { label: "Collections", value: "12", delta: "3 recently added", icon: "collections" },
  { label: "Reports Published", value: "8", delta: "1 this month", icon: "published" },
];

const PLACEHOLDER_DESC =
  "Lorem ipsum dolor sit amet sectetur. Vivamus nec neque tempus.";

export const CONTINUE_EXPLORING: WorkCardProps[] = [
  {
    slug: "afrobeat-origins",
    title: "Lorem ipsum dolor sit amet",
    description: PLACEHOLDER_DESC,
    image: "/EW-Image-1.png",
    tags: ["Afrobeat", "Music"],
    rating: 9.8,
  },
  {
    slug: "fela-zombie",
    title: "Lorem ipsum dolor sit amet",
    description: PLACEHOLDER_DESC,
    image: "/EW-Image-2.png",
    badge: "ALBUM REVIEW",
    tags: ["Afrobeat", "Music"],
    rating: 9.8,
  },
  {
    slug: "highlife-roots",
    title: "Lorem ipsum dolor sit amet",
    description: PLACEHOLDER_DESC,
    image: "/EW-Image-3.png",
    tags: ["Afrobeat", "Music"],
    rating: 9.8,
  },
];

import type { FeaturedWorkItem } from "./FeaturedWorkCard";

export const FEATURED_WORKS: FeaturedWorkItem[] = [
  {
    slug: "igodo",
    title: "Igodo",
    director: "Andy Amenechi & Don Pedro Obaseki",
    description:
      "An epic quest blending ancient curses with spiritual power — the Nigerian adventure that set the mold.",
    image: "/inner-anchor-1.png",
    tags: ["NIGERIA", "FILM", "ENTERTAINMENT"],
    rating: 9.8,
  },
  {
    slug: "rattlesnake",
    title: "Rattlesnake",
    director: "Amaka Igwe",
    description:
      "A crime drama of betrayal and vengeance capturing the restless energy of urban Nigeria in transition.",
    image: "/inner-anchor-2.jpg",
    tags: ["NIGERIA", "FILM", "ENTERTAINMENT"],
    rating: 9.8,
  },
  {
    slug: "domitilla",
    title: "Domitilla",
    director: "Zeb Ejiro",
    description:
      "A morality tale of survival and exploitation that became a cultural touchstone for a generation.",
    image: "/inner-anchor-3.jpg",
    tags: ["NIGERIA", "FILM", "ENTERTAINMENT"],
    rating: 9.8,
  },
];

export interface ActivityItem {
  id: string;
  text: string;
  highlight: string;
  time: string;
  icon: "saved" | "downloaded" | "contributed" | "collection";
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: "1", text: "You saved", highlight: "Purple Hibiscus", time: "2h ago", icon: "saved" },
  { id: "2", text: "You downloaded", highlight: "Afrocritik 2025 report", time: "5h ago", icon: "downloaded" },
  { id: "3", text: "You saved", highlight: "Purple Hibiscus", time: "8h ago", icon: "saved" },
  { id: "4", text: "You contributed to", highlight: "Black Consciousness", time: "1d ago", icon: "contributed" },
  { id: "5", text: "You added a new", highlight: "collection", time: "2d ago", icon: "collection" },
];

export interface RecommendedItem {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  image: string;
}

export const RECOMMENDED: RecommendedItem[] = [
  {
    slug: "living-in-bondage-1992",
    title: "Living in Bondage (1992)",
    subtitle: "Kenneth Nnebue",
    type: "Film",
    image: "/inner-pioneer-Image-1.png",
  },
  {
    slug: "making-of-modern-africa-2023",
    title: "The Making of Modern Africa (2023)",
    subtitle: "Afrocritik Institute",
    type: "Report",
    image: "/inner-pioneer-Image-2.png",
  },
  {
    slug: "purple-hibiscus",
    title: "Purple Hibiscus",
    subtitle: "Chimamanda Ngozi Adichie",
    type: "Novel",
    image: "/inner-pioneer-Image-3.png",
  },
];

export interface CollectionItem {
  slug: string;
  name: string;
  count: number;
  image: string;
}

export const COLLECTIONS: CollectionItem[] = [
  { slug: "african-music", name: "African Music", count: 20, image: "/explore-works-Image-1.png" },
  { slug: "african-writers", name: "African Writers", count: 12, image: "/EBOPI-Image-2.jpg" },
  { slug: "political-movements", name: "Political Movements", count: 2, image: "/EBOPI-Image-3.png" },
  { slug: "african-history", name: "African History", count: 5, image: "/EBOPI-Image-4.jpg" },
];
