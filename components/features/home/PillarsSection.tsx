"use client";

import Image from "next/image";
import { useState } from "react";

interface Pillar {
  icon: string;
  title: string;
  desc: string;
}

const DEFAULT_PILLARS: Pillar[] = [
  { icon: "/TFP-Digital-Archive.png", title: "Digital Archive", desc: "A comprehensive, searchable database of African cultural works and critical analysis — the continent's cultural memory." },
  { icon: "/TFP-Critic.svg", title: "Critic & Journalist Development", desc: "Fellowships, mentorship, and editorial support for the next generation of African cultural critics and journalists." },
  { icon: "/TFP-Ratings.svg", title: "Ratings & Index", desc: "Structured evaluation frameworks that bring transparency and rigor to African cultural assessment." },
  { icon: "/TFP-Research.svg", title: "Research & Data", desc: "Annual reports, trend analysis, and data-driven cultural research that maps the continent's creative trajectory." },
  { icon: "/TFP-Philosophy.svg", title: "African Philosophy", desc: "Documenting and connecting the philosophical traditions — Ubuntu, Négritude, Maat, Sankofa, Omolúàbí — that undergird African cultural production." },
];

export function PillarsSection({ pillars }: Readonly<{ pillars?: Pillar[] }>) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const items = pillars && pillars.length > 0 ? pillars : DEFAULT_PILLARS;
  // On the 2-col mobile grid an odd number of cards leaves the last one
  // stranded on its own row. Tuck it behind a "See More" until revealed.
  const hideLastOnMobile = items.length % 2 === 1;

  return (
    <>
      {/* Heading */}
      <div className="flex flex-col">
        <span className="font-inter text-sm font-normal capitalize leading-[110%] text-[#ED9828]">
          Institutional Backbone
        </span>
        <h2
          className="mt-2 max-w-[607px] font-baskervville font-bold capitalize leading-[110%] text-[#330F09]"
          style={{ fontSize: "clamp(24px, 5.5vw, 40px)" }}
        >
          The Five Pillars
        </h2>
        <p className="mt-2 max-w-[622px] font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
          The structural foundation of the Afrocritik Institute — designed to
          sustain, develop, and systematize African cultural knowledge for
          generations.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:pr-12">
        {items.map((p, i) => {
          const isSelected = selected === p.title;
          const isLast = i === items.length - 1;
          const hidden = hideLastOnMobile && isLast && !showAll;
          return (
            <button
              key={p.title}
              onClick={() => setSelected(isSelected ? null : p.title)}
              className={`w-full flex-col items-center justify-center gap-2 rounded-[15.409px] border bg-white px-3 py-4 transition-colors duration-300 sm:gap-3 sm:px-4 sm:py-6 ${
                hidden ? "hidden sm:flex" : "flex"
              } ${
                isSelected
                  ? "border-amber"
                  : "border-black/10 hover:border-amber"
              }`}
            >
              <Image
                src={p.icon}
                alt={p.title}
                width={48}
                height={48}
                className="h-10 w-10 object-contain sm:h-12 sm:w-12"
              />
              <h3 className="w-full text-center font-inter text-base font-bold leading-[120%] tracking-[-0.36px] text-[#330F09] sm:text-[18px]">
                {p.title}
              </h3>
              <p className="w-full text-center font-inter text-xs font-normal leading-[140%] text-[#5C5A59]">
                {p.desc}
              </p>
            </button>
          );
        })}
      </div>

      {hideLastOnMobile && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mx-auto mt-6 block font-inter text-base font-semibold text-[#9C5C08] underline-offset-4 hover:underline sm:hidden"
        >
          See More
        </button>
      )}
    </>
  );
}
