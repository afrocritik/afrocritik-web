# Afrocritik — Content-Model Audit

> Goal: every section on every public page must be **fully editable from the admin**, with **no lorem / hardcoded leftovers**. This document maps each page section to its data source and flags what's needed.

**Legend**
- ✅ **Editable today** — field exists in the Payload collection *and* in the admin form.
- 🟡 **Admin-only fix** — field exists in Payload, but the admin form doesn't expose it yet (cheap fix, web repo only).
- 🔴 **Schema addition** — no field exists; requires a change to `afrocritik-api` + a mirror in the admin form.
- ⚙️ **Derived/computed** — not a stored field; needs a query/aggregation endpoint (counts, ratings rollups, trending).
- 🧩 **Unbacked page** — no collection exists at all for this page.

Collections today: `works`, `people`, `ideas`, `reports`, `users`, `media`, `tags`, `genres`, `countries`, `themes`. (No `moments`, no `collections`, no `interests`/`globals` content model.)

---

## 0. The one finding that matters most

**`Works` has no `rating` and no `badge`/review-type field.** Those two values appear on **seven** different card surfaces:

- Home → Essential Works, Essential Music, Essential Literature
- Explore → Works result cards
- Ideas detail → Essential Films
- Works detail → Related Works
- People detail → Selected Works

Add `rating` + `reviewType` (+ a short `cardDescription`) **once** on `Works` and all seven light up. This is the single highest-leverage change.

---

## 1. Home (`/`)

| Section | Data | Source | Status |
|---|---|---|---|
| Hero | headline, search | static / `globals` | 🔴 (homepage `globals` content) |
| Essential Works / Music / Literature | title, type, year, country, **rating**, **badge**, description, hoverDescription, tags, image | `works.*` + **rating/reviewType/cardDescription** | 🔴 rating+badge+desc; rest ✅ |
| Pillars | icon, title, desc | static marketing | 🔴 `globals` (or accept static) |
| Thinkers | name, role, photo | `people.*` | ✅ |
| Ideas | title, summary, image | `ideas.*` | ✅ |
| Report CTA | report title, stat badges ("151 PAGES", "5 SECTIONS", "20+ CONTRIBUTORS") | `reports.*` + **stats** | 🔴 report stats |
| Stats marquee | "50+ Countries", counts | aggregate counts | ⚙️ derived |
| Popular Interest | interest chips | `interests` / `tags` | 🔴 interests model (or `tags`) |
| Knowledge Pipeline | steps | static marketing | 🔴 `globals` (or accept static) |
| Join Network CTA | copy | static marketing | 🔴 `globals` (or accept static) |

## 2. Explore (`/explore`)

| Section | Data | Source | Status |
|---|---|---|---|
| Tabs + counts | Works 12,346 / Ideas / People / Reports | per-collection `totalDocs` | ⚙️ derived |
| Work result cards | …including **rating**, **badge** | `works.*` + rating/reviewType | 🔴 rating+badge; rest ✅ |
| Refine: Countries / Themes | facets | `countries`, `themes` | ✅ |
| Refine: Popular searches | trending terms | trending/log | ⚙️ derived (or static list) |
| Explore Ideas | ideas | `ideas.*` | ✅ |

## 3. Idea detail (`/ideas/[slug]`)  ← richest page

| Section | Data | Source | Status |
|---|---|---|---|
| Hero: title, summary, cover | | `title`, `summary`, `coverImage` | ✅ |
| Hero meta: Origin, Period | | `atAGlance.origin/period` | ✅ |
| Hero meta: **Type** ("Cultural Movement") | | — only fixed `category` | 🔴 add `typeLabel` |
| Related Themes chips | | `themes` | ✅ |
| Related Ideas | | `relatedIdeas` | ✅ |
| Timeline | | `timeline[]` | ✅ |
| At a Glance: Origin/Period/Global Impact | | `atAGlance.*` | ✅ |
| At a Glance: **Key Focus** | | — schema has `region` | 🔴 rename/add `keyFocus` |
| **Anchor Year · Circulation Era** + films | | — nothing | 🔴 add `anchor` group |
| Quick Facts | | `quickFacts[]` | 🟡 → now in admin form |
| Related Works | | `works` | ✅ |
| Watch Video Archive | title, thumb, **url**, duration | `videoArchive[]` (Option A embed) | 🟡 admin done; needs real player |
| Play Audio | title, **url**, duration | `audioArchive[]` (Option A embed) | 🟡 admin done; needs real player |
| Essential Films | work cards w/ **rating**, **badge** | `works.*` + rating/reviewType | 🔴 rating+badge |
| Pioneers & Icons | name, role, photo | `people.*` | ✅ (taller cards fixed) |
| **Impact card** (heading + body + image) | | — nothing | 🔴 add `impact` group |
| Explore More | related ideas/themes | `relatedIdeas`/`themes` | ✅ |

## 4. Work detail (`/works/[slug]`)  ← currently a simpler layout

| Section | Data | Source | Status |
|---|---|---|---|
| Type badge, title, year, country | | `type`, `title`, `year`, `country` | ✅ |
| **Rating** (4.7★) | | — | 🔴 add `rating` |
| Summary | | `summary` | ✅ |
| Save to archive | user action | `users`/saves | ⚙️ (interaction, later) |
| Related Works | | `relatedWorks` (+ rating) | 🔴 rating only |

## 5. Person detail (`/people/[slug]`)

| Section | Data | Source | Status |
|---|---|---|---|
| Photo, name | | `photo`, `name` | ✅ |
| Role ("Author & Cultural Critic") | | `role` | ✅ |
| Tag chips | | `themes`/`tags` | ✅ |
| Bio | | `summary` / `biography` | ✅ |
| Selected Works | | `works` (+ rating) | 🔴 rating only |

## 6. Report detail (`/reports/[slug]`)

| Section | Data | Source | Status |
|---|---|---|---|
| Cover, kicker, title | | `coverImage`, `title`, `subtitle` | ✅ |
| Summary | | `summary` | ✅ |
| Download | | `pdfFile`, `requiresEmail` | ✅ |
| Stat badges ("151 PAGES"…) | | — | 🔴 add `stats[]` (label/value) |
| What The Report Signals | | `signals[]` | ✅ |

## 7. Moment detail (`/moments/[slug]`)  ← near-clone of Ideas, but…

**There is no `moments` collection.** The page (hero, TOC, video/audio, pioneers, related moments) is entirely unbacked. Decision required:
- **(a)** Create a full `Moments` collection (mirrors Ideas), **or**
- **(b)** Treat "moments" as a *curated view* of existing `ideas`/`works` (no new collection), **or**
- **(c)** Drop the page if it's redundant with Ideas.

🧩 Blocked on this decision.

---

## Consolidated work

### A. Payload schema additions (`afrocritik-api`)
1. **`Works`**: `rating` (number 0–5 or 0–10), `reviewType` (select: Album Review / Book Review / Biography / …), `cardDescription` (short text for card/hover). *(unblocks 7 surfaces)*
2. **`Ideas`**: `typeLabel` (text); `keyFocus` (text — or rename `atAGlance.region`); `anchor` group (`year` + `anchorWorks` relationship); `impact` group (`heading`, `body`, `image`).
3. **`Reports`**: `stats[]` repeater (`label`, `value`) for the page/section/contributor badges.
4. **(Decision)** `Moments` collection — only if option (a).
5. **(Optional)** `globals`/homepage content for hero, pillars, pipeline, CTAs — or accept these as static marketing copy.

### B. Admin form mirrors (web repo)
- Add every field above to the matching entity config in `entities.ts`.
- Already done this pass: Ideas `quickFacts`, `videoArchive`, `audioArchive`, `country`.

### C. Derived/computed endpoints (⚙️)
- Explore tab counts + Stats marquee → collection count queries.
- Popular searches → static list now, trending later.
- Aggregate rating displays → from the new `Works.rating`.

### D. Frontend wiring
- Video/Audio: URL normalizer (YouTube/Vimeo → embed; SoundCloud/Spotify/direct file) + replace the mockup player in `IdeaMediaRow` (and `MomentMediaRow`) with a real `<iframe>` / `<audio>`.
- Point all `[slug]` pages and home/explore sections at the API (`lib/api.ts` already has the fetchers).

### Decisions (resolved — professional defaults, pending designer)
1. **Moments** → ✅ built a real `Moments` collection (mirrors Ideas) + admin CRUD + nav.
2. **Marketing copy** → already CMS-editable via the existing `Homepage`/`SiteSettings` globals; no schema work, just wiring.
3. **Rating scale** → **0–5, one decimal, ★** (`Works.rating`, min 0 max 5).
4. **Embed providers** → Video: YouTube + Vimeo + direct file; Audio: Spotify + SoundCloud + direct file (`lib/media-embed.ts`).

---

## ✅ Implemented in this pass

**Payload schema (`afrocritik-api`)**
- `Works`: `rating`, `reviewType`, `cardDescription`
- `Ideas`: `typeLabel`, `atAGlance.keyFocus`, `anchor` group (year/eraLabel/films), `impact` group (heading/body/image)
- `Reports`: `stats[]` (value/label)
- New `Moments` collection + registered in `payload.config.ts`

**Admin (web)**
- Mirrored every new field in `entities.ts`; earlier added Ideas `quickFacts`/`videoArchive`/`audioArchive`/`country`
- New Moments entity config + list/new/edit pages + sidebar nav entry

**Frontend media (Option A)**
- `lib/media-embed.ts` URL normalizer; `VideoEmbed` (click-to-play) + `AudioEmbed` components
- `IdeaMediaRow` and `MomentMediaRow` rewired from mockups to real players

**Still pending (separate phase):** connect admin forms → Payload REST, and public pages → API (`lib/api.ts` fetchers exist but are unused); derived count endpoints (explore tabs, stats marquee).
