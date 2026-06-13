"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Share2 } from "lucide-react";

const TOC = [
  "Overview",
  "Key Movements",
  "Pioneers & Icons",
  "Impact & Influence",
  "Global Reach",
  "Related Works",
  "Further Reading",
];

const META = [
  { label: "Origin", value: "Nigeria" },
  { label: "Type", value: "Cultural Movement" },
  { label: "Period", value: "1992 – Present" },
];

const RELATED_THEMES = ["African Storytelling", "Popular Culture", "Industry"];

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path
        d="M6 4L10 8L6 12"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WorkHeroSection({
  title,
  sectionLabel = "Works",
  sectionHref = "/explore?tab=works",
}: Readonly<{ title: string; sectionLabel?: string; sectionHref?: string }>) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="grid gap-6 lg:grid-cols-[210px_1fr_350px] lg:items-stretch pt-12 pb-4">
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
          <Chevron />
          <Link
            href={sectionHref}
            className="justify-start text-white/50 text-base font-semibold font-inter leading-4 hover:text-amber transition-colors"
          >
            {sectionLabel}
          </Link>
          <Chevron />
          <span className="justify-start text-orange-400/50 text-base font-semibold font-inter leading-4">
            {title}
          </span>
        </div>

        {/* Header / Overview */}
        <div id="overview">
          <h1 className="justify-start text-white text-4xl font-normal font-baskervville leading-10">
            {title}
          </h1>
          <p className="mt-4 w-[600px] text-white text-base font-normal font-inter leading-relaxed">
            A cultural movement and home-grown film industry that transformed
            how Africa tells its own stories — built on resourcefulness,
            circulation, and an insatiable appetite for narrative.
          </p>
          <div className="mt-8 w-[600px] flex flex-wrap gap-x-6 gap-y-2">
            {META.map(({ label, value }) => (
              <div
                key={label}
                className="inline-flex justify-start items-center gap-3"
              >
                <span className="text-orange-400/50 text-base font-semibold font-inter leading-4">
                  {label}
                </span>
                <span className="text-stone-300/50 text-base font-semibold font-inter leading-4">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <button className="px-1.5 py-2 bg-orange-400/60 rounded-[3px] inline-flex justify-start items-center gap-1.5">
              <Image
                src="/inner-Save.png"
                alt=""
                width={10}
                height={10}
                className="size-2.5"
              />
              <span className="text-black text-xs font-semibold font-inter leading-3">
                Save
              </span>
            </button>
            <button className="px-1.5 py-2 rounded-[3px] outline outline-1 outline-offset-[-1px] outline-orange-400/20 inline-flex justify-start items-center gap-1.5">
              <Share2 className="size-3 text-stone-300" />
              <span className="text-stone-300 text-xs font-semibold font-inter leading-3">
                Share
              </span>
            </button>
          </div>
          <div className="mt-4 w-[600px] flex flex-wrap items-center gap-2">
            <span className="text-orange-400/50 text-base font-semibold font-inter leading-4">
              Related themes
            </span>
            {RELATED_THEMES.map((t) => (
              <div
                key={t}
                className="pl-2.5 pr-3 py-[5px] bg-yellow-700/40 rounded-[5px] inline-flex justify-center items-center gap-2.5"
              >
                <span className="text-stone-300 text-base font-semibold font-inter leading-4">
                  {t}
                </span>
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
  );
}
