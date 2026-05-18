import Image from "next/image";

const PILLARS = [
  { icon: "/TFP-Digital-Archive.png", title: "Digital Archive", desc: "A comprehensive, searchable database of African cultural works and critical analysis — the continent's cultural memory." },
  { icon: "/TFP-Critic.svg", title: "Critic & Journalist Development", desc: "Fellowships, mentorship, and editorial support for the next generation of African cultural critics and journalists." },
  { icon: "/TFP-Ratings.svg", title: "Ratings & Index", desc: "Structured evaluation frameworks that bring transparency and rigor to African cultural assessment." },
  { icon: "/TFP-Research.svg", title: "Research & Data", desc: "Annual reports, trend analysis, and data-driven cultural research that maps the continent's creative trajectory." },
  { icon: "/TFP-Philosophy.svg", title: "African Philosophy", desc: "Documenting and connecting the philosophical traditions — Ubuntu, Négritude, Maat, Sankofa, Omolúàbí — that undergird African cultural production." },
];

export function PillarsSection() {
  return (
    <>
      {/* Heading */}
      <div className="flex flex-col">
        <span className="font-hedvig text-sm font-normal capitalize leading-[110%] text-[#ED9828]">
          Institutional Backbone
        </span>
        <h2 className="mt-3 max-w-[607px] font-baskervville text-[40px] font-bold capitalize leading-[110%] text-[#330F09]">
          The Five Pillars
        </h2>
        <p className="mt-3 flex h-[86px] max-w-[622px] flex-col justify-center font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
          The structural foundation of the Afrocritik Institute — designed to
          sustain, develop, and systematize African cultural knowledge for
          generations.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-10 flex flex-wrap justify-start gap-5">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="flex h-[279px] w-[218px] flex-col items-center gap-3 rounded-[15.409px] bg-white px-4 py-6"
          >
            <Image
              src={p.icon}
              alt={p.title}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <h3 className="w-[180px] text-center font-baskervville text-[18px] font-bold leading-[120%] tracking-[-0.36px] text-[#330F09]">
              {p.title}
            </h3>
            <p className="w-[183px] text-center font-inter text-xs font-normal leading-[140%] text-[#5C5A59]">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
