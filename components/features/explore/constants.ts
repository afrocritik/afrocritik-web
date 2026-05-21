export const BROWN_GRADIENT =
  "linear-gradient(180deg, #4D311D 17.79%, #794C2D 62.4%, #4D311D 85.19%)";

export const TABS = [
  { key: "works", label: "Works", count: 12346, iconSrc: "/explore-icon_works.svg" },
  { key: "ideas", label: "Ideas", count: 1284, iconSrc: "/explore-icon_ideas.svg" },
  { key: "people", label: "People", count: 3902, iconSrc: "/explore-icon_people.svg" },
  { key: "reports", label: "Report", count: 18, iconSrc: "/explore-icon_analytics.svg" },
];

export const FALLBACK_WORKS = Array.from({ length: 8 }).map((_, i) => ({
  slug: `work-${i}`,
  title: "Lorem ipsum dolor sit amet consect etur neque",
  type: "Music",
  year: 2024 - i,
  country: "Nigeria",
  rating: 4 + ((i % 9) / 10),
  badge: "ALBUM REVIEW",
  image: `/explore-works-Image-${(i % 2) + 1}.png`,
  description: "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....",
  tags: ["Nigeria", "Afrobeat", "Music"],
}));
