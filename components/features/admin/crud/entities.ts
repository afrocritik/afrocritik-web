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

// Drives the red badge shown top-left on cards (Work.reviewType in Payload).
const REVIEW_TYPES: SelectOption[] = [
  { label: "Album Review", value: "album-review" },
  { label: "Book Review", value: "book-review" },
  { label: "Film Review", value: "film-review" },
  { label: "Biography", value: "biography" },
  { label: "Essay", value: "essay" },
  { label: "Feature", value: "feature" },
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

// Build select options from plain labels (used for fixed taxonomy like regions).
const opt = (labels: string[]): SelectOption[] =>
  labels.map((l) => ({ label: l, value: l.toLowerCase().replace(/[^a-z0-9]+/g, "-") }));

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
            allowImages: true,
            placeholder: "Write this section's content…",
            description:
              "Style with bold, italics, headings, lists and links. Use the image button to drop a picture where your cursor is — then drag its corner to resize, or wrap text to its left or right.",
          },
          { name: "films", label: "Featured works", type: "relationship", relationTo: "works" },
        ],
      },
    ],
  },
  {
    title: "MultiMedia",
    description:
      "Video clips and audio tracks shown on the detail page. (Inline images now live in the Content body — add them right where your cursor is.)",
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
          { name: "reviewType", label: "Review type (badge)", type: "select", options: REVIEW_TYPES, description: "Red badge shown top-left on cards, e.g. Album Review. Leave empty for no badge." },
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
          { name: "people", label: "Pioneers & icons", type: "relationship", relationTo: "people", description: "Directors, authors, musicians shown in Pioneers & Icons." },
          { name: "ideas", label: "Ideas", type: "relationship", relationTo: "ideas" },
          { name: "country", label: "Country", type: "relationship", relationTo: "countries" },
          { name: "themes", label: "Themes", type: "relationship", relationTo: "themes" },
          { name: "tags", label: "Tags", type: "relationship", relationTo: "tags", description: "Pick from existing tags. Add new ones in Taxonomy → Tags." },
        ],
      },
      {
        title: "Related works",
        fields: [
          { name: "relatedWorks", label: "Related works", type: "relationship", sidebar: true, relationTo: "works", description: "Shown in the Related Works card and 'Explore more'." },
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
          { name: "country", label: "Country", type: "relationship", relationTo: "countries" },
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
        description: "Summary, Key Ideas and Knowledge Sovereignty drive the Thinkers card on the homepage.",
        fields: [
          { name: "summary", label: "Core contribution (summary)", type: "textarea", required: true, description: "Shown as 'Core Contribution' in the Thinkers card." },
          { name: "keyIdeas", label: "Key ideas", type: "textarea", description: "Shown as 'Key Ideas' in the Thinkers card." },
          { name: "knowledgeSovereignty", label: "Knowledge sovereignty", type: "textarea", description: "Shown as 'Knowledge Sovereignty' in the Thinkers card." },
          { name: "biography", label: "Biography", type: "richtext" },
        ],
      },
      {
        title: "Relationships",
        fields: [
          { name: "works", label: "Works", type: "relationship", relationTo: "works" },
          { name: "ideas", label: "Ideas", type: "relationship", relationTo: "ideas" },
          { name: "themes", label: "Themes", type: "relationship", relationTo: "themes" },
          { name: "tags", label: "Tags", type: "relationship", relationTo: "tags", description: "Pick from existing tags. Add new ones in Taxonomy → Tags." },
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
          { name: "people", label: "Key thinkers", type: "relationship", relationTo: "people" },
          { name: "works", label: "Works", type: "relationship", relationTo: "works" },
          { name: "country", label: "Country", type: "relationship", relationTo: "countries" },
          { name: "themes", label: "Themes", type: "relationship", relationTo: "themes" },
          { name: "tags", label: "Tags", type: "relationship", relationTo: "tags", description: "Pick from existing tags. Add new ones in Taxonomy → Tags." },
        ],
      },
      {
        title: "Related ideas",
        fields: [
          { name: "relatedIdeas", label: "Related ideas", type: "relationship", sidebar: true, relationTo: "ideas" },
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
          { name: "themes", label: "Themes", type: "relationship", relationTo: "themes" },
          { name: "relatedWorks", label: "Related works", type: "relationship", relationTo: "works" },
          { name: "relatedPeople", label: "Related people", type: "relationship", relationTo: "people" },
          { name: "tags", label: "Tags", type: "relationship", relationTo: "tags", description: "Pick from existing tags. Add new ones in Taxonomy → Tags." },
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
          { name: "people", label: "Pioneers & icons", type: "relationship", relationTo: "people" },
          { name: "works", label: "Works", type: "relationship", relationTo: "works" },
          { name: "relatedMoments", label: "Related moments", type: "relationship", relationTo: "moments" },
          { name: "country", label: "Country", type: "relationship", relationTo: "countries" },
          { name: "themes", label: "Themes", type: "relationship", relationTo: "themes" },
          { name: "tags", label: "Tags", type: "relationship", relationTo: "tags", description: "Pick from existing tags. Add new ones in Taxonomy → Tags." },
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
  },

};

export function getEntity(slug: string): EntityConfig | undefined {
  return ENTITIES[slug];
}

export const ENTITY_SLUGS = Object.keys(ENTITIES);
