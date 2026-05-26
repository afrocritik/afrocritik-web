"use client";

import Image from "next/image";
import { useState } from "react";

const PILLARS = [
  { icon: "/TFP-Digital-Archive.png", title: "Digital Archive", desc: "A comprehensive, searchable database of African cultural works and critical analysis — the continent's cultural memory." },
  { icon: "/TFP-Critic.svg", title: "Critic & Journalist Development", desc: "Fellowships, mentorship, and editorial support for the next generation of African cultural critics and journalists." },
  { icon: "/TFP-Ratings.svg", title: "Ratings & Index", desc: "Structured evaluation frameworks that bring transparency and rigor to African cultural assessment." },
  { icon: "/TFP-Research.svg", title: "Research & Data", desc: "Annual reports, trend analysis, and data-driven cultural research that maps the continent's creative trajectory." },
  { icon: "/TFP-Philosophy.svg", title: "African Philosophy", desc: "Documenting and connecting the philosophical traditions — Ubuntu, Négritude, Maat, Sankofa, Omolúàbí — that undergird African cultural production." },
];

export function PillarsSection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {/* Heading */}
      <div className="flex flex-col">
        <span className="font-inter text-sm font-normal capitalize leading-[110%] text-[#ED9828]">
          Institutional Backbone
        </span>
        <h2 className="mt-2 max-w-[607px] font-baskervville text-[40px] font-bold capitalize leading-[110%] text-[#330F09]">
          The Five Pillars
        </h2>
        <p className="mt-2 max-w-[622px] font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
          The structural foundation of the Afrocritik Institute — designed to
          sustain, develop, and systematize African cultural knowledge for
          generations.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:pr-12">
        {PILLARS.map((p) => {
          const isSelected = selected === p.title;
          return (
            <button
              key={p.title}
              onClick={() => setSelected(isSelected ? null : p.title)}
              className={`flex w-full flex-col items-center justify-center gap-3 rounded-[15.409px] border bg-white px-4 py-6 transition-colors duration-300 ${
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
                className="h-12 w-12 object-contain"
              />
              <h3 className="w-full text-center font-inter text-[18px] font-bold leading-[120%] tracking-[-0.36px] text-[#330F09]">
                {p.title}
              </h3>
              <p className="w-full text-center font-inter text-xs font-normal leading-[140%] text-[#5C5A59]">
                {p.desc}
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
}
