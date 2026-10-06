export const BROWN_GRADIENT =
  "linear-gradient(180deg, #4D311D 17.79%, #794C2D 62.4%, #4D311D 85.19%)";

export const TABS = [
  { key: "works", label: "Works", iconSrc: "/explore-icon_works.svg" },
  { key: "ideas", label: "Ideas", iconSrc: "/explore-icon_ideas.svg" },
  { key: "people", label: "People", iconSrc: "/explore-icon_people.svg" },
  { key: "reports", label: "Report", iconSrc: "/explore-icon_analytics.svg" },
];

// "Categories" dropdown options per tab — the main classification of each kind
// of content (values match the Payload select values the API filters on).
export const CATEGORY_OPTIONS: Record<string, { label: string; value: string }[]> = {
  works: [
    { label: "Film", value: "film" },
    { label: "Music", value: "music" },
    { label: "Literature", value: "literature" },
    { label: "Visual Art", value: "visual-art" },
    { label: "Theatre", value: "theatre" },
    { label: "Television", value: "television" },
  ],
  ideas: [
    { label: "Identity", value: "identity" },
    { label: "Symbols", value: "symbols" },
    { label: "Legal", value: "legal" },
    { label: "Norms", value: "norms" },
    { label: "Philosophy", value: "philosophy" },
    { label: "Politics", value: "politics" },
    { label: "Economics", value: "economics" },
    { label: "Art & Aesthetics", value: "art-aesthetics" },
    { label: "Religion & Spirituality", value: "religion-spirituality" },
    { label: "Science & Technology", value: "science-technology" },
  ],
  people: [
    { label: "Director", value: "director" },
    { label: "Author", value: "author" },
    { label: "Musician", value: "musician" },
    { label: "Philosopher", value: "philosopher" },
    { label: "Scholar", value: "scholar" },
    { label: "Activist", value: "activist" },
    { label: "Artist", value: "artist" },
    { label: "Producer", value: "producer" },
    { label: "Critic", value: "critic" },
    { label: "Poet", value: "poet" },
  ],
};

// Which top-bar filters each tab supports (mirrors what the API can filter on).
export const TAB_FILTERS: Record<string, { year: boolean; country: boolean; subcategory: boolean }> = {
  works: { year: true, country: true, subcategory: true },
  ideas: { year: false, country: true, subcategory: false },
  people: { year: false, country: true, subcategory: false },
  reports: { year: true, country: false, subcategory: false },
};
