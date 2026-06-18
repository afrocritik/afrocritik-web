import type { EntityConfig, FormSection, SelectOption } from "./types";

/* ------------------------------------------------------------------ */
/* Shared option sets (mirrors the Payload collection definitions)     */
/* ------------------------------------------------------------------ */

const STATUS: SelectOption[] = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
];

const WORK_TYPES: SelectOption[] = [
  { label: "Film", value: "film" },
  { label: "Music", value: "music" },
  { label: "Literature", value: "literature" },
  { label: "Visual Art", value: "visual-art" },
  { label: "Theatre", value: "theatre" },
  { label: "Television", value: "television" },
];

const IDEA_CATEGORIES: SelectOption[] = [
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
];

const PERSON_ROLES: SelectOption[] = [
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
];

const opt = (labels: string[]): SelectOption[] =>
  labels.map((l) => ({ label: l, value: l.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));

const PEOPLE_OPTS = opt(["Chinua Achebe", "Fela Kuti", "Ngũgĩ wa Thiong'o", "Wole Soyinka", "Chimamanda Adichie", "Davido"]);
const IDEA_OPTS = opt(["Pan-Africanism", "Négritude", "Afrofuturism", "Ubuntu", "Decolonisation"]);
const MOMENT_OPTS = opt(["Birth of Nollywood", "Rise of Afrobeats", "FESTAC '77", "Drum Magazine Era"]);
const WORK_OPTS = opt(["Things Fall Apart", "Half of a Yellow Sun", "Living in Bondage", "Purple Hibiscus"]);
const THEME_OPTS = opt(["Colonialism", "Identity", "Diaspora", "Resistance", "Tradition", "Modernity"]);
const COUNTRY_OPTS = opt(["Nigeria", "Ghana", "Kenya", "South Africa", "Senegal", "Egypt"]);
const TAG_OPTS = opt(["Classic", "Award-winning", "Essential", "Contemporary", "Foundational"]);

const META_FIELDS = {
  name: "meta",
  label: "SEO & metadata",
  type: "group" as const,
  sidebar: true,
  fields: [
    { name: "title", label: "Meta title", type: "text" as const },
    { name: "description", label: "Meta description", type: "textarea" as const },
  ],
};

/**
 * Editorial detail-page sections shared by the rich detail layout
 * (used by both Works and Ideas). The order here mirrors the live page so
 * editors aren't confused: Timeline → Content → MultiMedia run down the main
 * column, while "At a glance" and "Quick facts" sit in the right-hand aside.
 * Free-form blocks like "Content" expose an editable title and a rich-text
 * body so editors are never locked into a fixed heading or text style.
 */
const IMAGE_SIZES: SelectOption[] = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "large" },
  { label: "Full width", value: "full" },
];

const EDITORIAL_SECTIONS: FormSection[] = [
  {
    title: "Timeline",
    description: "Key moments shown on the detail page.",
    fields: [
      {
        name: "timelineHeading",
        label: "Section title",
        type: "text",
        full: true,
        placeholder: "Key Moments in Nollywood",
        description: 'Shown after the fixed "Timeline:" prefix in the card heading.',
      },
      {
        name: "timeline",
        label: "Event",
        type: "repeater",
        addLabel: "Add timeline event",
        fields: [
          { name: "year", label: "Year", type: "text" },
          { name: "label", label: "Label", type: "text" },
          { name: "description", label: "Description", type: "richtext" },
        ],
      },
    ],
  },
  {
    title: "Content",
    description:
      'A free-form editorial block (e.g. "Anchor Year · Circulation Era"). The title is editable and the body can be styled with the toolbar.',
    fields: [
      {
        name: "anchor",
        label: "Content block",
        type: "group",
        fields: [
          {
            name: "heading",
            label: "Section title",
            type: "text",
            placeholder: "Anchor Year · Circulation Era",
            description: "Editable — name this content block whatever fits.",
          },
          { name: "subheading", label: "Subheading", type: "text", placeholder: "1999 — The Reset" },
          {
            name: "body",
            label: "Body",
            type: "richtext",
            placeholder: "Write this section's content…",
            description: "Style with bold, italics, headings, lists and links — your choice.",
          },
          { name: "films", label: "Featured works", type: "relationship", options: WORK_OPTS },
        ],
      },
    ],
  },
  {
    title: "MultiMedia",
    description: "Images, video clips and audio tracks shown on the detail page.",
    fields: [
      {
        name: "images",
        label: "Image",
        type: "repeater",
        addLabel: "Add image",
        fields: [
          { name: "image", label: "Image", type: "image", minWidth: 320, minHeight: 180, maxSizeMB: 5 },
          { name: "caption", label: "Caption", type: "text" },
          {
            name: "size",
            label: "Display size",
            type: "select",
            options: IMAGE_SIZES,
            placeholder: "Medium",
            description: "Expand or reduce how large this image appears.",
          },
        ],
      },
      {
        name: "videoArchive",
        label: "Video",
        type: "repeater",
        addLabel: "Add video",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "thumbnail", label: "Thumbnail", type: "image", minWidth: 320, minHeight: 180, maxSizeMB: 3 },
          { name: "url", label: "Video URL", type: "url" },
          { name: "duration", label: "Duration", type: "text", placeholder: "4:32" },
        ],
      },
      {
        name: "audioArchive",
        label: "Track",
        type: "repeater",
        addLabel: "Add track",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "url", label: "Audio URL", type: "url" },
          { name: "duration", label: "Duration", type: "text", placeholder: "3:10" },
        ],
      },
    ],
  },
  {
    title: "At a glance",
    description: "Key facts shown in the right-hand 'At a glance' card.",
    fields: [
      {
        name: "atAGlance",
        label: "At a glance",
        type: "group",
        sidebar: true,
        fields: [
          { name: "origin", label: "Origin", type: "text" },
          { name: "period", label: "Period", type: "text" },
          { name: "region", label: "Region", type: "text" },
          { name: "keyFocus", label: "Key focus", type: "text", placeholder: "Film production, Storytelling" },
          { name: "globalImpact", label: "Global impact", type: "text" },
        ],
      },
    ],
  },
  {
    title: "Quick facts",
    description: "Bullet facts shown in the Quick Facts card.",
    fields: [
      {
        name: "quickFacts",
        label: "Quick fact",
        type: "repeater",
        sidebar: true,
        addLabel: "Add quick fact",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "value", label: "Value", type: "text" },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

export const ENTITIES: Record<string, EntityConfig> = {
  /* ---------------------------------------------------------------- */
  works: {
    slug: "works",
    singular: "Work",
    plural: "Works",
    description: "Manage films, albums, books and other archived works.",
    titleField: "title",
    searchPlaceholder: "Search works by title...",
    columns: [
      { key: "title", label: "Title", render: "media", subKey: "year" },
      { key: "type", label: "Type", className: "capitalize" },
      { key: "country", label: "Country" },
      { key: "status", label: "Status", render: "status", align: "center" },
    ],
    filters: [
      { key: "type", label: "All types", options: WORK_TYPES },
      { key: "status", label: "All statuses", options: STATUS },
    ],
    form: [
      {
        title: "Overview",
        description: "Shown in the hero — title, type and intro.",
        fields: [
          { name: "title", label: "Title", type: "text", required: true, maxLength: 160, placeholder: "e.g. Things Fall Apart" },
          { name: "type", label: "Type", type: "select", required: true, options: WORK_TYPES },
          { name: "typeLabel", label: "Type label", type: "text", placeholder: "Cultural Movement", description: "Free-text label shown in the hero." },
          { name: "year", label: "Year", type: "number", min: 1800, max: 2030, placeholder: "1992" },
          { name: "summary", label: "Intro", type: "textarea", required: true, description: "Intro paragraph shown in the hero and in cards." },
        ],
      },
      {
        title: "Media",
        fields: [{ name: "coverImage", label: "Cover image", type: "image", sidebar: true, minWidth: 800, minHeight: 500, maxSizeMB: 5, description: "Landscape image, at least 800×500px." }],
      },
      ...EDITORIAL_SECTIONS,
      {
        title: "Relationships",
        description: "Connect this work to the rest of the archive.",
        fields: [
          { name: "people", label: "Pioneers & icons", type: "relationship", options: PEOPLE_OPTS, description: "Directors, authors, musicians shown in Pioneers & Icons." },
          { name: "ideas", label: "Ideas", type: "relationship", options: IDEA_OPTS },
          { name: "country", label: "Country", type: "relationship", options: COUNTRY_OPTS },
          { name: "themes", label: "Themes", type: "relationship", options: THEME_OPTS },
          { name: "tags", label: "Tags", type: "tags" },
        ],
      },
      {
        title: "Related works",
        fields: [
          { name: "relatedWorks", label: "Related works", type: "relationship", sidebar: true, options: WORK_OPTS, description: "Shown in the Related Works card and 'Explore more'." },
        ],
      },
      {
        title: "",
        fields: [
          { name: "status", label: "Status", type: "select", required: true, options: STATUS, sidebar: true },
          { name: "isFeatured", label: "Featured", type: "toggle", sidebar: true, description: "Highlight on the homepage." },
          META_FIELDS,
        ],
      },
    ],
    sample: [
      { id: "w1", title: "Living in Bondage", year: 1992, type: "film", country: "Nigeria", status: "published", image: "/EBOPI-Image-2.jpg" },
      { id: "w2", title: "Things Fall Apart", year: 1958, type: "literature", country: "Nigeria", status: "published", image: "/EWIL-Image-1.png" },
      { id: "w3", title: "Zombie", year: 1976, type: "music", country: "Nigeria", status: "published", image: "/EW-Image-4.jpg" },
      { id: "w4", title: "Half of a Yellow Sun", year: 2006, type: "literature", country: "Nigeria", status: "draft", image: "/EBOPI-Image-2.jpg" },
      { id: "w5", title: "Purple Hibiscus", year: 2003, type: "literature", country: "Nigeria", status: "published", image: "/EWIL-Image-2.png" },
      { id: "w6", title: "Sarafina!", year: 1992, type: "film", country: "South Africa", status: "draft", image: "/inner-anchor-2.jpg" },
      { id: "w7", title: "Black Star", year: 2018, type: "music", country: "Ghana", status: "published", image: "/EWIM-Image-1.png" },
      { id: "w8", title: "Tsotsi", year: 2005, type: "film", country: "South Africa", status: "published", image: "/EW-Image-3.png" },
      { id: "w9", title: "The Famished Road", year: 1991, type: "literature", country: "Nigeria", status: "draft", image: "/EWIL-Image-3.png" },
    ],
  },

  /* ---------------------------------------------------------------- */
  people: {
    slug: "people",
    singular: "Person",
    plural: "People",
    description: "Manage directors, authors, musicians, thinkers and artists.",
    titleField: "name",
    searchPlaceholder: "Search people by name...",
    columns: [
      { key: "name", label: "Name", render: "media", subKey: "born" },
      { key: "role", label: "Role", render: "badges" },
      { key: "country", label: "Country" },
      { key: "status", label: "Status", render: "status", align: "center" },
    ],
    filters: [
      { key: "role", label: "All roles", options: PERSON_ROLES },
      { key: "status", label: "All statuses", options: STATUS },
    ],
    form: [
      {
        title: "Basics",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "role", label: "Roles", type: "multiselect", options: PERSON_ROLES },
          { name: "born", label: "Born", type: "text", placeholder: "1938, Kampala, Uganda" },
          { name: "died", label: "Died", type: "text", description: "Leave empty if still alive." },
          { name: "country", label: "Country", type: "relationship", options: COUNTRY_OPTS },
        ],
      },
      {
        title: "Media",
        fields: [
          {
            name: "photo",
            label: "Photo",
            type: "image",
            minWidth: 400,
            minHeight: 400,
            maxSizeMB: 5,
            description: "Square portrait works best, at least 400×400px.",
          },
        ],
      },
      {
        title: "Content",
        fields: [
          { name: "summary", label: "Summary", type: "textarea", required: true },
          { name: "biography", label: "Biography", type: "richtext" },
        ],
      },
      {
        title: "Relationships",
        fields: [
          { name: "works", label: "Works", type: "relationship", options: WORK_OPTS },
          { name: "ideas", label: "Ideas", type: "relationship", options: IDEA_OPTS },
          { name: "themes", label: "Themes", type: "relationship", options: THEME_OPTS },
          { name: "tags", label: "Tags", type: "tags" },
        ],
      },
      {
        title: "Social links",
        fields: [
          {
            name: "socialLinks",
            label: "Social links",
            type: "group",
            fields: [
              { name: "website", label: "Website", type: "url" },
              { name: "twitter", label: "Twitter / X", type: "url", placeholder: "https://x.com/username" },
              { name: "instagram", label: "Instagram", type: "url", placeholder: "https://instagram.com/username" },
              { name: "wikipedia", label: "Wikipedia", type: "url" },
            ],
          },
        ],
      },
      {
        title: "",
        fields: [
          { name: "status", label: "Status", type: "select", required: true, options: STATUS, sidebar: true },
          { name: "isFeatured", label: "Featured", type: "toggle", sidebar: true },
          { name: "isFounder", label: "Founder", type: "toggle", sidebar: true, description: "Show in Thinkers Who Built The Foundations." },
          META_FIELDS,
        ],
      },
    ],
    sample: [
      { id: "p1", name: "Chinua Achebe", born: "1930, Ogidi, Nigeria", role: ["author"], country: "Nigeria", status: "published", image: "/EW-Image-3.png" },
      { id: "p2", name: "Fela Kuti", born: "1938, Abeokuta, Nigeria", role: ["musician", "activist"], country: "Nigeria", status: "published", image: "/EW-Image-4.jpg" },
      { id: "p3", name: "Ngũgĩ wa Thiong'o", born: "1938, Kamiriithu, Kenya", role: ["author", "scholar"], country: "Kenya", status: "published", image: "/Image-Ngugi.png" },
      { id: "p4", name: "Wole Soyinka", born: "1934, Abeokuta, Nigeria", role: ["author", "poet"], country: "Nigeria", status: "published", image: "/admin-image-4.png" },
      { id: "p5", name: "Chimamanda Adichie", born: "1977, Enugu, Nigeria", role: ["author"], country: "Nigeria", status: "draft", image: "/EBOPI-Image-2.jpg" },
      { id: "p6", name: "Davido", born: "1992, Atlanta, USA", role: ["musician"], country: "Nigeria", status: "published", image: "/EW-Image-3.png" },
    ],
  },

  /* ---------------------------------------------------------------- */
  ideas: {
    slug: "ideas",
    singular: "Idea",
    plural: "Ideas",
    description: "Manage concepts, movements and intellectual ideas.",
    titleField: "title",
    searchPlaceholder: "Search ideas...",
    columns: [
      { key: "title", label: "Title", render: "media", subKey: "category" },
      { key: "category", label: "Category", className: "capitalize" },
      { key: "status", label: "Status", render: "status", align: "center" },
    ],
    filters: [
      { key: "category", label: "All categories", options: IDEA_CATEGORIES },
      { key: "status", label: "All statuses", options: STATUS },
    ],
    form: [
      {
        title: "Overview",
        description: "Shown in the hero — title, category and intro.",
        fields: [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "category", label: "Category", type: "select", required: true, options: IDEA_CATEGORIES },
          { name: "typeLabel", label: "Type label", type: "text", placeholder: "Cultural Movement", description: "Free-text label shown in the hero." },
          { name: "summary", label: "Intro", type: "textarea", required: true, description: "Intro paragraph shown in the hero and in cards." },
        ],
      },
      { title: "Media", fields: [{ name: "coverImage", label: "Cover image", type: "image", sidebar: true, minWidth: 800, minHeight: 500, maxSizeMB: 5, description: "Landscape image, at least 800×500px." }] },
      ...EDITORIAL_SECTIONS,
      {
        title: "Relationships",
        fields: [
          { name: "people", label: "Key thinkers", type: "relationship", options: PEOPLE_OPTS },
          { name: "works", label: "Works", type: "relationship", options: WORK_OPTS },
          { name: "country", label: "Country", type: "relationship", options: COUNTRY_OPTS },
          { name: "themes", label: "Themes", type: "relationship", options: THEME_OPTS },
          { name: "tags", label: "Tags", type: "tags" },
        ],
      },
      {
        title: "Related ideas",
        fields: [
          { name: "relatedIdeas", label: "Related ideas", type: "relationship", sidebar: true, options: IDEA_OPTS },
        ],
      },
      {
        title: "",
        fields: [
          { name: "status", label: "Status", type: "select", required: true, options: STATUS, sidebar: true },
          { name: "isFeatured", label: "Featured", type: "toggle", sidebar: true },
          META_FIELDS,
        ],
      },
    ],
    sample: [
      { id: "i1", title: "Pan-Africanism", category: "politics", status: "published", image: "/admin-image-4.png" },
      { id: "i2", title: "Négritude", category: "philosophy", status: "published", image: "/EW-Image-3.png" },
      { id: "i3", title: "Afrofuturism", category: "art-aesthetics", status: "published", image: "/EWIM-Image-2.png" },
      { id: "i4", title: "Ubuntu", category: "philosophy", status: "draft", image: "/EWIL-Image-4.png" },
      { id: "i5", title: "Decolonisation", category: "politics", status: "published", image: "/inner-anchor-3.jpg" },
      { id: "i6", title: "Afrobeats Global Impact", category: "art-aesthetics", status: "draft", image: "/EW-Image-4.jpg" },
    ],
  },

  /* ---------------------------------------------------------------- */
  reports: {
    slug: "reports",
    singular: "Report",
    plural: "Reports",
    description: "Manage research reports and downloadable publications.",
    titleField: "title",
    searchPlaceholder: "Search reports...",
    columns: [
      { key: "title", label: "Title", render: "media", subKey: "subtitle" },
      { key: "year", label: "Year" },
      { key: "status", label: "Status", render: "status", align: "center" },
    ],
    filters: [{ key: "status", label: "All statuses", options: STATUS }],
    form: [
      {
        title: "Basics",
        fields: [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "year", label: "Year", type: "number", required: true, min: 1800, max: 2030 },
        ],
      },
      {
        title: "Media & download",
        fields: [
          { name: "coverImage", label: "Cover image", type: "image", minWidth: 800, minHeight: 500, maxSizeMB: 5, description: "Landscape image, at least 800×500px." },
          { name: "pdfFile", label: "PDF file", type: "file", accept: "pdf", maxSizeMB: 25, description: "PDF file for download (max 25MB)." },
        ],
      },
      {
        title: "Content",
        fields: [
          { name: "summary", label: "Summary", type: "textarea", required: true },
          { name: "content", label: "Full content", type: "richtext" },
        ],
      },
      {
        title: "Stat badges",
        description: "Badges shown in the hero (e.g. 151 Pages, 20+ Contributors).",
        fields: [
          {
            name: "stats",
            label: "Stat",
            type: "repeater",
            addLabel: "Add stat",
            fields: [
              { name: "value", label: "Value", type: "text", placeholder: "151" },
              { name: "label", label: "Label", type: "text", placeholder: "Pages" },
            ],
          },
        ],
      },
      {
        title: "Signals",
        description: "Key signals / findings from the report.",
        fields: [
          {
            name: "signals",
            label: "Signal",
            type: "repeater",
            addLabel: "Add signal",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        title: "Relationships",
        fields: [
          { name: "themes", label: "Themes", type: "relationship", options: THEME_OPTS },
          { name: "relatedWorks", label: "Related works", type: "relationship", options: WORK_OPTS },
          { name: "relatedPeople", label: "Related people", type: "relationship", options: PEOPLE_OPTS },
          { name: "tags", label: "Tags", type: "tags" },
        ],
      },
      {
        title: "",
        fields: [
          { name: "status", label: "Status", type: "select", required: true, options: STATUS, sidebar: true },
          { name: "requiresEmail", label: "Require email to download", type: "toggle", sidebar: true },
          { name: "isFeatured", label: "Featured", type: "toggle", sidebar: true },
          META_FIELDS,
        ],
      },
    ],
    sample: [
      { id: "r1", title: "Afrocritik 2025 State of African Cinema", subtitle: "Annual industry review", year: 2025, status: "published", image: "/EW-Image-3.png" },
      { id: "r2", title: "The Afrobeats Economy", subtitle: "Streaming & global reach", year: 2024, status: "published", image: "/EWIM-Image-3.png" },
      { id: "r3", title: "African Literature in Translation", subtitle: "Market study", year: 2024, status: "draft", image: "/EWIL-Image-5.png" },
      { id: "r4", title: "Nollywood at 30", subtitle: "A retrospective", year: 2023, status: "published", image: "/EBOPI-Image-2.jpg" },
    ],
  },

  /* ---------------------------------------------------------------- */
  moments: {
    slug: "moments",
    singular: "Moment",
    plural: "Moments",
    description: "Manage pivotal cultural moments and milestones.",
    titleField: "title",
    searchPlaceholder: "Search moments...",
    columns: [
      { key: "title", label: "Title", render: "media", subKey: "year" },
      { key: "typeLabel", label: "Type" },
      { key: "status", label: "Status", render: "status", align: "center" },
    ],
    filters: [{ key: "status", label: "All statuses", options: STATUS }],
    form: [
      {
        title: "Basics",
        fields: [
          { name: "title", label: "Title", type: "text", required: true },
          { name: "typeLabel", label: "Type label", type: "text", placeholder: "Cultural Moment" },
          { name: "year", label: "Year", type: "text", placeholder: "1992 or 1992 – Present" },
        ],
      },
      { title: "Media", fields: [{ name: "coverImage", label: "Cover image", type: "image", minWidth: 800, minHeight: 500, maxSizeMB: 5, description: "Landscape image, at least 800×500px." }] },
      {
        title: "Content",
        fields: [
          { name: "summary", label: "Summary", type: "textarea", required: true },
          { name: "content", label: "Full content", type: "richtext" },
        ],
      },
      {
        title: "At a glance",
        fields: [
          {
            name: "atAGlance",
            label: "At a glance",
            type: "group",
            fields: [
              { name: "origin", label: "Origin", type: "text" },
              { name: "period", label: "Period", type: "text" },
              { name: "region", label: "Region", type: "text" },
              { name: "keyFocus", label: "Key focus", type: "text" },
              { name: "globalImpact", label: "Global impact", type: "text" },
            ],
          },
        ],
      },
      {
        title: "Timeline",
        fields: [
          {
            name: "timeline",
            label: "Event",
            type: "repeater",
            addLabel: "Add timeline event",
            fields: [
              { name: "year", label: "Year", type: "text" },
              { name: "label", label: "Label", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        title: "Video archive",
        fields: [
          {
            name: "videoArchive",
            label: "Video",
            type: "repeater",
            addLabel: "Add video",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "thumbnail", label: "Thumbnail", type: "image", minWidth: 320, minHeight: 180, maxSizeMB: 3 },
              { name: "url", label: "Video URL", type: "url" },
              { name: "duration", label: "Duration", type: "text", placeholder: "4:32" },
            ],
          },
        ],
      },
      {
        title: "Audio archive",
        fields: [
          {
            name: "audioArchive",
            label: "Track",
            type: "repeater",
            addLabel: "Add track",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "url", label: "Audio URL", type: "url" },
              { name: "duration", label: "Duration", type: "text", placeholder: "3:10" },
            ],
          },
        ],
      },
      {
        title: "Relationships",
        fields: [
          { name: "people", label: "Pioneers & icons", type: "relationship", options: PEOPLE_OPTS },
          { name: "works", label: "Works", type: "relationship", options: WORK_OPTS },
          { name: "relatedMoments", label: "Related moments", type: "relationship", options: MOMENT_OPTS },
          { name: "country", label: "Country", type: "relationship", options: COUNTRY_OPTS },
          { name: "themes", label: "Themes", type: "relationship", options: THEME_OPTS },
          { name: "tags", label: "Tags", type: "tags" },
        ],
      },
      {
        title: "",
        fields: [
          { name: "status", label: "Status", type: "select", required: true, options: STATUS, sidebar: true },
          { name: "isFeatured", label: "Featured", type: "toggle", sidebar: true },
          META_FIELDS,
        ],
      },
    ],
    sample: [
      { id: "mo1", title: "Birth of Nollywood", typeLabel: "Cultural Moment", year: "1992", status: "published", image: "/EBOPI-Image-2.jpg" },
      { id: "mo2", title: "Rise of Afrobeats", typeLabel: "Music Movement", year: "2010 – Present", status: "published", image: "/EW-Image-4.jpg" },
      { id: "mo3", title: "FESTAC '77", typeLabel: "Festival", year: "1977", status: "published", image: "/admin-image-4.png" },
      { id: "mo4", title: "Drum Magazine Era", typeLabel: "Print Culture", year: "1950s", status: "draft", image: "/EWIL-Image-1.png" },
    ],
  },

  /* ------------------------- Taxonomy ----------------------------- */
  genres: {
    slug: "genres",
    singular: "Genre",
    plural: "Genres",
    description: "Classify works by genre.",
    titleField: "name",
    columns: [
      { key: "name", label: "Name", render: "media", subKey: "slug" },
      { key: "works", label: "Works" },
    ],
    form: [
      {
        title: "Genre details",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    sample: [
      { id: "g1", name: "Drama", slug: "drama", works: 142 },
      { id: "g2", name: "Afrobeats", slug: "afrobeats", works: 98 },
      { id: "g3", name: "Highlife", slug: "highlife", works: 41 },
      { id: "g4", name: "Fiction", slug: "fiction", works: 213 },
      { id: "g5", name: "Documentary", slug: "documentary", works: 37 },
      { id: "g6", name: "Poetry", slug: "poetry", works: 64 },
    ],
  },

  themes: {
    slug: "themes",
    singular: "Theme",
    plural: "Themes",
    description: "Group works, people and ideas under shared themes.",
    titleField: "name",
    columns: [
      { key: "name", label: "Name", render: "media", subKey: "slug" },
      { key: "entries", label: "Entries" },
    ],
    form: [
      {
        title: "Theme details",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
    sample: [
      { id: "t1", name: "Colonialism", slug: "colonialism", entries: 87 },
      { id: "t2", name: "Identity", slug: "identity", entries: 124 },
      { id: "t3", name: "Diaspora", slug: "diaspora", entries: 76 },
      { id: "t4", name: "Resistance", slug: "resistance", entries: 53 },
      { id: "t5", name: "Tradition", slug: "tradition", entries: 69 },
    ],
  },

  countries: {
    slug: "countries",
    singular: "Country",
    plural: "Countries",
    description: "Manage countries used across the archive.",
    titleField: "name",
    columns: [
      { key: "name", label: "Name", render: "media", subKey: "code" },
      { key: "region", label: "Region" },
      { key: "entries", label: "Entries" },
    ],
    filters: [
      {
        key: "region",
        label: "All regions",
        options: opt(["West Africa", "East Africa", "Southern Africa", "North Africa", "Central Africa"]),
      },
    ],
    form: [
      {
        title: "Country details",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "code", label: "ISO code", type: "text", maxLength: 3, placeholder: "NG" },
          {
            name: "region",
            label: "Region",
            type: "select",
            options: opt(["West Africa", "East Africa", "Southern Africa", "North Africa", "Central Africa"]),
          },
        ],
      },
    ],
    sample: [
      { id: "co1", name: "Nigeria", code: "NG", region: "West Africa", entries: 312 },
      { id: "co2", name: "Ghana", code: "GH", region: "West Africa", entries: 96 },
      { id: "co3", name: "Kenya", code: "KE", region: "East Africa", entries: 88 },
      { id: "co4", name: "South Africa", code: "ZA", region: "Southern Africa", entries: 134 },
      { id: "co5", name: "Senegal", code: "SN", region: "West Africa", entries: 47 },
      { id: "co6", name: "Egypt", code: "EG", region: "North Africa", entries: 52 },
    ],
  },

  movements: {
    slug: "movements",
    singular: "Movement",
    plural: "Movements",
    description: "Track cultural and intellectual movements.",
    titleField: "name",
    columns: [
      { key: "name", label: "Name", render: "media", subKey: "period" },
      { key: "region", label: "Region" },
    ],
    form: [
      {
        title: "Movement details",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "period", label: "Period", type: "text", placeholder: "1930s–1950s" },
          { name: "region", label: "Region", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "relatedPeople", label: "Key figures", type: "relationship", options: PEOPLE_OPTS },
        ],
      },
    ],
    sample: [
      { id: "m1", name: "Négritude", period: "1930s–1950s", region: "Francophone Africa" },
      { id: "m2", name: "Black Consciousness", period: "1960s–1970s", region: "South Africa" },
      { id: "m3", name: "Afrofuturism", period: "1990s–present", region: "Diaspora" },
      { id: "m4", name: "Onitsha Market Literature", period: "1950s–1970s", region: "Nigeria" },
    ],
  },

  tags: {
    slug: "tags",
    singular: "Tag",
    plural: "Tags",
    description: "Lightweight labels for cross-cutting classification.",
    titleField: "name",
    columns: [
      { key: "name", label: "Name", render: "media", subKey: "slug" },
      { key: "usage", label: "Usage" },
    ],
    form: [
      {
        title: "Tag details",
        fields: [{ name: "name", label: "Name", type: "text", required: true }],
      },
    ],
    sample: [
      { id: "tg1", name: "Classic", slug: "classic", usage: 64 },
      { id: "tg2", name: "Award-winning", slug: "award-winning", usage: 41 },
      { id: "tg3", name: "Essential", slug: "essential", usage: 88 },
      { id: "tg4", name: "Contemporary", slug: "contemporary", usage: 53 },
      { id: "tg5", name: "Foundational", slug: "foundational", usage: 29 },
    ],
  },

  /* -------------------------- Timeline ---------------------------- */
  timeline: {
    slug: "timeline",
    singular: "Timeline Event",
    plural: "Timeline",
    description: "Curate the historical timeline of African cultural milestones.",
    titleField: "title",
    searchPlaceholder: "Search events...",
    columns: [
      { key: "year", label: "Year", align: "left" },
      { key: "title", label: "Event", render: "media", subKey: "category" },
      { key: "status", label: "Status", render: "status", align: "center" },
    ],
    filters: [{ key: "status", label: "All statuses", options: STATUS }],
    form: [
      {
        title: "Event details",
        fields: [
          { name: "year", label: "Year", type: "text", required: true, placeholder: "1958" },
          { name: "title", label: "Title", type: "text", required: true },
          { name: "category", label: "Category", type: "text", placeholder: "Literature" },
          { name: "description", label: "Description", type: "textarea", required: true },
        ],
      },
      {
        title: "Relationships",
        fields: [
          { name: "works", label: "Related works", type: "relationship", options: WORK_OPTS },
          { name: "people", label: "Related people", type: "relationship", options: PEOPLE_OPTS },
        ],
      },
      {
        title: "",
        fields: [
          { name: "status", label: "Status", type: "select", required: true, options: STATUS, sidebar: true },
        ],
      },
    ],
    sample: [
      { id: "tl1", year: "1958", title: "Things Fall Apart published", category: "Literature", status: "published" },
      { id: "tl2", year: "1976", title: "Fela releases Zombie", category: "Music", status: "published" },
      { id: "tl3", year: "1992", title: "Living in Bondage launches Nollywood", category: "Film", status: "published" },
      { id: "tl4", year: "2006", title: "Half of a Yellow Sun published", category: "Literature", status: "draft" },
    ],
  },

  /* ------------------------ Users & access ------------------------ */
  users: {
    slug: "users",
    singular: "User",
    plural: "Users",
    description: "Manage platform accounts and access levels.",
    titleField: "name",
    searchPlaceholder: "Search users by name or email...",
    columns: [
      { key: "name", label: "User", render: "media", subKey: "email" },
      { key: "role", label: "Role", className: "capitalize" },
      { key: "status", label: "Status", render: "status", align: "center" },
      { key: "joined", label: "Joined" },
    ],
    filters: [
      {
        key: "role",
        label: "All roles",
        options: [
          { label: "Admin", value: "admin" },
          { label: "Editor", value: "editor" },
          { label: "Member", value: "member" },
        ],
      },
      {
        key: "status",
        label: "All statuses",
        options: [
          { label: "Active", value: "active" },
          { label: "Suspended", value: "suspended" },
        ],
      },
    ],
    form: [
      {
        title: "Account",
        fields: [
          { name: "name", label: "Full name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "avatar", label: "Avatar", type: "image", minWidth: 200, minHeight: 200, maxSizeMB: 2, description: "Square image, at least 200×200px." },
        ],
      },
      {
        title: "",
        fields: [
          {
            name: "role",
            label: "Role",
            type: "select",
            required: true,
            sidebar: true,
            options: [
              { label: "Admin", value: "admin" },
              { label: "Editor", value: "editor" },
              { label: "Member", value: "member" },
            ],
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            sidebar: true,
            options: [
              { label: "Active", value: "active" },
              { label: "Suspended", value: "suspended" },
            ],
          },
        ],
      },
    ],
    sample: [
      { id: "u1", name: "Adaeze Okafor", email: "adaeze@afrocritik.com", role: "admin", status: "active", joined: "Jan 12, 2025", image: "/Interest-Avatar.png" },
      { id: "u2", name: "Kwame Mensah", email: "kwame@afrocritik.com", role: "editor", status: "active", joined: "Feb 03, 2025" },
      { id: "u3", name: "Zainab Bello", email: "zainab@afrocritik.com", role: "editor", status: "active", joined: "Feb 20, 2025" },
      { id: "u4", name: "Thabo Nkosi", email: "thabo@example.com", role: "member", status: "active", joined: "Mar 11, 2025" },
      { id: "u5", name: "Amina Diallo", email: "amina@example.com", role: "member", status: "suspended", joined: "Apr 02, 2025" },
    ],
  },

  roles: {
    slug: "roles",
    singular: "Role",
    plural: "Roles & Permissions",
    description: "Define roles and the permissions attached to them.",
    titleField: "name",
    columns: [
      { key: "name", label: "Role", render: "media", subKey: "description" },
      { key: "permissions", label: "Permissions", render: "badges" },
      { key: "users", label: "Users" },
    ],
    form: [
      {
        title: "Role details",
        fields: [
          { name: "name", label: "Name", type: "text", required: true },
          { name: "description", label: "Description", type: "textarea" },
          {
            name: "permissions",
            label: "Permissions",
            type: "multiselect",
            options: [
              { label: "Create content", value: "create" },
              { label: "Edit content", value: "edit" },
              { label: "Delete content", value: "delete" },
              { label: "Publish", value: "publish" },
              { label: "Manage users", value: "manage-users" },
              { label: "Manage settings", value: "manage-settings" },
            ],
          },
        ],
      },
    ],
    sample: [
      { id: "ro1", name: "Administrator", description: "Full access", permissions: ["create", "edit", "delete", "publish", "manage-users"], users: 3 },
      { id: "ro2", name: "Editor", description: "Create and publish content", permissions: ["create", "edit", "publish"], users: 8 },
      { id: "ro3", name: "Contributor", description: "Create drafts only", permissions: ["create", "edit"], users: 21 },
      { id: "ro4", name: "Member", description: "Read & save", permissions: [], users: 130 },
    ],
  },
};

export function getEntity(slug: string): EntityConfig | undefined {
  return ENTITIES[slug];
}

export const ENTITY_SLUGS = Object.keys(ENTITIES);
