"use client";

import { useState } from "react";
import Link from "next/link";
import {
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
import Image from "next/image";

const TOC = [
  "Overview",
  "Key Movements",
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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#160907]">
      <div className="container">
        <section className="grid gap-8 lg:grid-cols-[210px_1fr_350px] lg:items-stretch pt-12 pb-4">
          {/* ── LEFT SIDEBAR ──────────────────────────────────────────── */}
          <aside className="hidden lg:flex lg:flex-col">
            <div className="flex flex-col gap-5 h-full">
              {/* On this page */}
              <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6 h-full flex flex-col justify-center">
                <h3 className="w-36 justify-start text-white text-base font-semibold font-inter leading-4">
                  On this page
                </h3>
                <div className="relative flex gap-3 pt-4">
                  {/* Track + marker column */}
                  <div className="relative w-3 self-stretch shrink-0">
                    {/* Full track line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0 outline outline-2 outline-offset-[-1px] outline-yellow-700/30" />
                    {/* Active marker — orange dot, moves to active item */}
                    <div
                      className="absolute size-3 bg-orange-400 rounded-full shadow-[0px_4px_12px_0px_rgba(0,0,0,0.36)] outline outline-1 outline-amber-600 z-10 transition-all duration-300 left-0"
                      style={{ top: `${activeIndex * 28}px` }}
                    />
                  </div>
                  {/* TOC items */}
                  <ul className="flex flex-col gap-4 justify-start text-white text-xs font-light font-inter leading-3">
                    {TOC.map((item, i) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                          onClick={() => setActiveIndex(i)}
                          className={
                            i === activeIndex
                              ? "font-medium text-amber"
                              : "hover:text-amber transition-colors"
                          }
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Ideas */}
              {/* <div className="rounded-xl border border-amber-line bg-bg-card p-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                  Related Ideas
                </h3>
                <ul className="flex flex-col gap-3">
                  {RELATED_IDEAS.map((idea) => (
                    <li key={idea}>
                      <Link
                        href={`/ideas/${idea.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center gap-3 group"
                      >
                        <span className="h-9 w-9 shrink-0 rounded-md bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
                        <span>
                          <span className="block text-sm leading-tight text-ink-secondary group-hover:text-amber transition-colors">
                            {idea}
                          </span>
                          <span className="mt-0.5 inline-block rounded bg-amber/15 px-1.5 py-0.5 text-[9px] font-medium text-amber">
                            Ideas
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </aside>

          {/* ── CENTER CONTENT ────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-ink-muted">
              <Link
                href="/explore"
                className="justify-start text-white/50 text-base font-semibold font-inter leading-4 hover:text-amber transition-colors"
              >
                Explore
              </Link>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Link
                href="/explore?tab=ideas"
                className="justify-start text-white/50 text-base font-semibold font-inter leading-4 hover:text-amber transition-colors"
              >
                Ideas
              </Link>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M6 4L10 8L6 12"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="justify-start text-orange-400/50 text-base font-semibold font-inter leading-4">
                {title}
              </span>
            </div>

            {/* Header / Overview */}
            <div id="overview">
              <h1 className="justify-start text-white text-4xl font-normal font-baskervville leading-10">
                {title}
              </h1>
              <p className="mt-4 w-[600px] text-white text-base font-normal font-inter leading-4">
                A cultural movement and home-grown film industry that
                transformed how Africa tells its own stories — built on
                resourcefulness, circulation, and an insatiable appetite for
                narrative.
              </p>
              <div className="mt-8 w-[600px] flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { label: "Origin", value: "Nigeria" },
                  { label: "Type", value: "Cultural Movement" },
                  { label: "Period", value: "1992 – Present" },
                ].map(({ label, value }) => (
                  <div key={label} className="inline-flex justify-start items-center gap-3">
                    <span className="text-orange-400/50 text-base font-semibold font-inter leading-4">{label}</span>
                    <span className="text-stone-300/50 text-base font-semibold font-inter leading-4">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                <button className="px-1.5 py-2 bg-orange-400/60 rounded-[3px] inline-flex justify-start items-center gap-1.5">
                  <Image src="/inner-Save.png" alt="" width={10} height={10} className="size-2.5" />
                  <span className="text-black text-xs font-semibold font-inter leading-3">Save</span>
                </button>
                <button className="px-1.5 py-2 rounded-[3px] outline outline-1 outline-offset-[-1px] outline-orange-400/20 inline-flex justify-start items-center gap-1.5">
                  <Share2 className="size-3 text-stone-300" />
                  <span className="text-stone-300 text-xs font-semibold font-inter leading-3">Share</span>
                </button>
              </div>
              <div className="mt-4 w-[600px] flex flex-wrap items-center gap-2">
                <span className="text-orange-400/50 text-base font-semibold font-inter leading-4">Related themes</span>
                {["African Storytelling", "Popular Culture", "Industry"].map((t) => (
                  <div key={t} className="pl-2.5 pr-3 py-[5px] bg-yellow-700/40 rounded-[5px] inline-flex justify-center items-center gap-2.5">
                    <span className="text-stone-300 text-base font-semibold font-inter leading-4">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Header image */}
          <div className="relative overflow-hidden rounded-xl border border-amber-line/40 h-[280px]">
            <Image
              src="/inner-Image-1.png"
              alt="Nollywood History"
              fill
              className="h-full object-cover"
            />
          </div>
        </section>

        {/* TO BE WORKED ON */}
        <div>
          <div>
            {/* Timeline */}
            <div
              id="key-moments"
              className="rounded-2xl border border-amber-line bg-bg-card p-6"
            >
              <h2 className="font-display text-xl font-bold text-white">
                Timeline: Key Moments in Nollywood
              </h2>
              <div className="relative mt-8">
                {/* Horizontal track */}
                <div className="absolute left-0 right-0 top-[5px] h-0 outline outline-[1.5px] outline-yellow-700/30" />
                <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 gap-x-4">
                  {TIMELINE.map((t, i) => (
                    <div key={t.year} className="relative pt-8">
                      {/* Dot on track */}
                      <div
                        className="absolute top-0 size-[11px] rounded-full bg-amber shadow-[0px_4px_10px_rgba(0,0,0,0.4)] -translate-x-1/2"
                        style={{ left: i === 0 ? "5px" : "50%" }}
                      />
                      <p className="text-xs font-medium text-amber">{t.year}</p>
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
                By 1999, Nollywood had transformed from a novelty into a
                national industry. The mastery of low-cost production and
                informal distribution networks made Nigeria the cultural-export
                engine of the continent — a model later studied across emerging
                markets.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {FILMS.slice(0, 4).map((f) => (
                  <WorkCard key={f.title} {...f} type="Film" />
                ))}
              </div>
            </div>

            {/* Video + Audio */}
            <div
              id="global-reach"
              className="grid gap-6 lg:grid-cols-[1fr_280px]"
            >
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
                  {[
                    "The Nollywood Origin",
                    "Circulation Economics",
                    "New Wave",
                  ].map((t, i) => (
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
                  ))}
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
              <div className="flex gap-4 overflow-x-auto pb-2">
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

            {/* Further Reading */}
            <div id="further-reading" className="pb-16">
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
                  ),
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ─────────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="flex flex-col gap-6 pt-[72px]">
              {/* At a glance */}
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

              {/* Quick Facts */}
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

              {/* Related Works */}
              <div className="rounded-xl border border-amber-line bg-bg-card p-5">
                <h3 className="mb-3 font-display text-base font-bold text-white">
                  Related Works
                </h3>
                <ul className="flex flex-col gap-3">
                  {RELATED_WORKS.map((w) => (
                    <li key={w.title}>
                      <Link href="#" className="flex items-center gap-3 group">
                        <span className="h-12 w-9 shrink-0 rounded bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
                        <span className="min-w-0">
                          <span className="block truncate text-sm text-white group-hover:text-amber transition-colors">
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
    </div>
  );
}
