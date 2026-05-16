import Link from "next/link";
import {
  ChevronRight,
  Bookmark,
  Share2,
  Play,
  MapPin,
  Calendar,
  Target,
  Globe,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { PersonCard } from "@/components/common/PersonCard";

const TOC = [
  "Overview",
  "Key Moments",
  "Pioneers & Icons",
  "Impact & Influence",
  "Global Reach",
  "Related Works",
  "Further Reading",
];

const RELATED_IDEAS = [
  "African Storytelling",
  "Afrobeat",
  "Pan-Africanism",
  "Diaspora Cinema",
];

const TIMELINE = [
  { year: "1992", title: "The Spark", desc: "Living in Bondage ignites the home-video movement." },
  { year: "1999", title: "The Growth", desc: "Circulation infrastructure scales the industry rapidly." },
  { year: "2010", title: "The Expansion", desc: "New Nollywood brings cinema-quality production." },
  { year: "2020", title: "The Global Shift", desc: "Streaming platforms carry Nollywood worldwide." },
];

const AT_A_GLANCE = [
  { icon: MapPin, label: "Origin", value: "Nigeria" },
  { icon: Calendar, label: "Period", value: "1992 – Present" },
  { icon: Target, label: "Key Focus", value: "Film production, Storytelling" },
  { icon: Globe, label: "Global Impact", value: "Viewed in 100+ countries" },
];

const QUICK_FACTS = [
  "Nollywood produces over 2,500 films a year.",
  "It is the second-largest film industry in the world by output.",
  "The industry contributes significantly to Nigeria's economy.",
];

const FILMS = [
  { title: "Living in Bondage", year: 1992, country: "Nigeria", rating: 4.7 },
  { title: "Rattlesnake", year: 1995, country: "Nigeria", rating: 4.4 },
  { title: "Domitilla", year: 1996, country: "Nigeria", rating: 4.5 },
  { title: "Blood Money", year: 1997, country: "Nigeria", rating: 4.3 },
  { title: "Glamour Girls", year: 1994, country: "Nigeria", rating: 4.2 },
];

const PIONEERS = [
  { name: "Amaka Igwe", role: "Director" },
  { name: "Kenneth Nnebue", role: "Producer" },
  { name: "Genevieve Nnaji", role: "Actress" },
  { name: "Pete Edochie", role: "Actor" },
  { name: "Liz Benson", role: "Actress" },
];

const RELATED_WORKS = [
  { title: "Living in Bondage", year: 1992 },
  { title: "The Wedding Party", year: 2016 },
  { title: "Lionheart", year: 2018 },
  { title: "Half of a Yellow Sun", year: 2013 },
];

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function IdeaDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const title = titleCase(params.slug || "nollywood-history");

  return (
    <div className="bg-bg-primary">
      {/* Breadcrumb */}
      <div className="container flex items-center gap-1.5 py-4 text-xs text-ink-muted">
        <Link href="/explore" className="hover:text-amber">
          Explore
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/explore?tab=ideas" className="hover:text-amber">
          Ideas
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink-secondary">{title}</span>
      </div>

      <div className="container grid gap-8 pb-16 lg:grid-cols-[220px_1fr_300px]">
        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="rounded-xl border border-amber-line bg-bg-card p-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                On this page
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-ink-secondary">
                {TOC.map((item, i) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className={
                        i === 0
                          ? "font-medium text-amber"
                          : "hover:text-amber"
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-line bg-bg-card p-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                Related Ideas
              </h3>
              <ul className="flex flex-col gap-3">
                {RELATED_IDEAS.map((idea) => (
                  <li key={idea}>
                    <Link
                      href={`/ideas/${idea.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-3"
                    >
                      <span className="h-9 w-9 shrink-0 rounded-md bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
                      <span className="text-sm text-ink-secondary hover:text-amber">
                        {idea}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div id="overview">
            <div className="grid gap-6 md:grid-cols-[1fr_240px]">
              <div>
                <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
                  {title}
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                  A cultural movement and home-grown film industry that
                  transformed how Africa tells its own stories — built on
                  resourcefulness, circulation, and an insatiable appetite for
                  narrative.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
                  <span>
                    Origin{" "}
                    <span className="text-ink-secondary">Nigeria</span>
                  </span>
                  <span>
                    Type{" "}
                    <span className="text-ink-secondary">
                      Cultural Movement
                    </span>
                  </span>
                  <span>
                    Period{" "}
                    <span className="text-ink-secondary">1992 – Present</span>
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-amber px-2.5 py-1 text-[11px] font-semibold text-white">
                    Cinema
                  </span>
                  {["African Storytelling", "Popular Culture", "Industry"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-amber-line px-3 py-1 text-[11px] text-ink-secondary"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="flex items-center gap-2 rounded-md border border-amber px-4 py-2 text-sm text-amber hover:bg-amber-soft">
                    <Bookmark className="h-4 w-4" /> Save
                  </button>
                  <button className="flex items-center gap-2 rounded-md border border-amber-line px-4 py-2 text-sm text-white hover:bg-amber-soft">
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                </div>
              </div>
              <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
            </div>
          </div>

          {/* Timeline */}
          <div
            id="key-moments"
            className="rounded-2xl border border-amber-line bg-bg-card p-6"
          >
            <h2 className="font-display text-xl font-bold text-white">
              Timeline: Key Moments in Nollywood
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TIMELINE.map((t) => (
                <div key={t.year} className="relative pt-5">
                  <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-amber" />
                  <span className="absolute left-1.5 top-1.5 h-px w-full bg-amber-line" />
                  <p className="text-xs text-ink-muted">{t.year}</p>
                  <h4 className="mt-1 font-display text-sm font-bold text-white">
                    {t.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Anchor Year */}
          <div
            id="impact-influence"
            className="rounded-2xl border border-amber-line bg-bg-card p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Anchor Year · Circulation Era
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-amber">
              1999 — The Reset
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
              By 1999, Nollywood had transformed from a novelty into a national
              industry. The mastery of low-cost production and informal
              distribution networks made Nigeria the cultural-export engine of
              the continent — a model later studied across emerging markets.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {FILMS.slice(0, 4).map((f) => (
                <WorkCard key={f.title} {...f} type="Film" />
              ))}
            </div>
          </div>

          {/* Video + Audio */}
          <div id="global-reach" className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="mb-4 font-display text-xl font-bold text-white">
                Watch Video Archive
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-amber-line bg-gradient-to-br from-[#3D1F00] to-[#1C0A00]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/90 text-white transition-transform group-hover:scale-110">
                      <Play className="h-5 w-5 fill-current" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-amber-line bg-bg-card p-5">
              <h3 className="mb-3 font-display text-base font-bold text-white">
                Play Audio
              </h3>
              <div className="flex flex-col gap-2">
                {["The Nollywood Origin", "Circulation Economics", "New Wave"].map(
                  (t, i) => (
                    <button
                      key={t}
                      className="flex items-center gap-3 rounded-lg p-2 text-left hover:bg-white/5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-soft text-amber">
                        <Play className="h-4 w-4 fill-current" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-white">
                          {t}
                        </span>
                        <span className="block text-xs text-ink-muted">
                          {12 + i * 7}:30
                        </span>
                      </span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Essential Films */}
          <div id="related-works">
            <SectionHeading
              title="Essential Nollywood Films"
              linkText="See all →"
              linkHref="/explore?q=nollywood"
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {FILMS.map((f) => (
                <WorkCard key={f.title} {...f} type="Film" essential />
              ))}
            </div>
          </div>

          {/* Pioneers */}
          <div id="pioneers-icons">
            <SectionHeading title="Pioneers & Icons" />
            <div className="grid grid-cols-3 gap-5 sm:grid-cols-5">
              {PIONEERS.map((p) => (
                <PersonCard key={p.name} {...p} />
              ))}
            </div>
          </div>

          {/* Further reading */}
          <div id="further-reading">
            <SectionHeading title="Explore more related works" />
            <div className="grid gap-4 sm:grid-cols-3">
              {["African Storytelling", "Diaspora Cinema", "Afrobeat"].map(
                (t) => (
                  <Link
                    key={t}
                    href={`/ideas/${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group rounded-xl border border-amber-line bg-bg-card p-5 transition-colors hover:border-amber/50"
                  >
                    <h4 className="font-display text-base font-bold text-white group-hover:text-amber">
                      {t}
                    </h4>
                    <p className="mt-2 line-clamp-3 text-sm text-ink-secondary">
                      A connected cultural thread exploring how African
                      narratives travel, evolve, and shape global audiences.
                    </p>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            <div className="rounded-xl border border-amber-line bg-bg-card p-5">
              <h3 className="mb-4 font-display text-base font-bold text-white">
                At a glance
              </h3>
              <ul className="flex flex-col gap-4">
                {AT_A_GLANCE.map((row) => (
                  <li key={row.label} className="flex gap-3">
                    <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    <span>
                      <span className="block text-xs text-ink-muted">
                        {row.label}
                      </span>
                      <span className="block text-sm text-white">
                        {row.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-line bg-bg-card p-5">
              <h3 className="mb-3 font-display text-base font-bold text-white">
                Quick Facts
              </h3>
              <ul className="flex flex-col gap-2.5">
                {QUICK_FACTS.map((f) => (
                  <li
                    key={f}
                    className="flex gap-2 text-xs leading-relaxed text-ink-secondary"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-line bg-bg-card p-5">
              <h3 className="mb-3 font-display text-base font-bold text-white">
                Related Works
              </h3>
              <ul className="flex flex-col gap-3">
                {RELATED_WORKS.map((w) => (
                  <li key={w.title}>
                    <Link href="#" className="flex items-center gap-3">
                      <span className="h-12 w-9 shrink-0 rounded bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-white hover:text-amber">
                          {w.title}
                        </span>
                        <span className="block text-xs text-ink-muted">
                          {w.year}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
