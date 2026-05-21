import Link from "next/link";

const CONNECTOR_NODES = [
  { left: "206.05px", top: "36.23px" },
  { left: "385.80px", top: "34.83px" },
  { left: "434.66px", top: "136.27px" },
  { left: "359.16px", top: "244.50px" },
  { left: "223.57px", top: "248.47px" },
  { left: "154.39px", top: "137.67px" },
];

export function ExploreIdeasSection() {
  return (
    <section
      className="relative h-[498px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/explore-ideas-bg.png')" }}
    >
      <div className="container h-full flex items-center gap-8">
        {/* Left content */}
        <div className="flex flex-col justify-between flex-1 h-72">
          <h2 className="text-white text-5xl font-bold capitalize leading-tight" style={{ fontFamily: "var(--font-baskervville)" }}>
            explore Ideas
          </h2>
          <p className="max-w-lg text-white text-[17px] font-normal capitalize leading-6" style={{ fontFamily: "var(--font-inter)" }}>
            Each year, the Afrocritik Report maps the cultural forces shaping Africa and its diaspora — the breakthroughs, the ruptures, and the tensions that define the moment. The 2025 edition reveals a continent whose creative output is globally ascendant, even as the infrastructure beneath it remains deeply contested.
          </p>
          <Link href="/explore?tab=ideas">
            <div
              className="w-48 px-7 py-2.5 rounded-xl inline-flex justify-center items-center gap-2.5 cursor-pointer"
              style={{ background: "linear-gradient(42deg, #B45309 15%, #FB923C 81%)" }}
            >
              <span className="text-yellow-950 text-xl font-medium capitalize leading-7" style={{ fontFamily: "var(--font-inter)" }}>
                Explore Ideas
              </span>
            </div>
          </Link>
        </div>

        {/* Right diagram */}
        <div className="w-[664px] h-72 relative shrink-0">
          {/* SVG connecting lines — polylines through connector midpoints */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
            <polyline points="134,31 222,52 316,141" stroke="#9C5C08" strokeWidth="1.37" strokeOpacity="0.7" />
            <polyline points="538,33 402,51 316,141" stroke="#9C5C08" strokeWidth="1.37" strokeOpacity="0.7" />
            <polyline points="583,154 451,152 316,141" stroke="#9C5C08" strokeWidth="1.37" strokeOpacity="0.7" />
            <polyline points="496,263 375,261 316,141" stroke="#9C5C08" strokeWidth="1.37" strokeOpacity="0.7" />
            <polyline points="120,265 240,264 316,141" stroke="#9C5C08" strokeWidth="1.37" strokeOpacity="0.7" />
            <polyline points="57,163 170,154 316,141" stroke="#9C5C08" strokeWidth="1.37" strokeOpacity="0.7" />
          </svg>

          {/* Culture */}
          <div className="w-24 h-11 absolute rounded-lg outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center" style={{ left: "86.19px", top: "9.16px", backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}>
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-inter)", color: "#9C5C08" }}>Culture</span>
          </div>
          {/* Fela Kuti */}
          <div className="w-28 h-12 absolute rounded-lg outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center" style={{ left: "0.69px", top: "138.89px", backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}>
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-inter)", color: "#9C5C08" }}>Fela Kuti</span>
          </div>
          {/* Political Music */}
          <div className="w-44 h-12 absolute rounded-lg outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center" style={{ left: "32.42px", top: "240.52px", backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}>
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-inter)", color: "#9C5C08" }}>Political Music</span>
          </div>
          {/* Black Consciousness */}
          <div className="w-44 h-16 absolute rounded-lg outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center text-center" style={{ left: "450.14px", top: "0.69px", backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}>
            <span className="text-base font-bold leading-tight" style={{ fontFamily: "var(--font-inter)", color: "#9C5C08" }}>Black<br/>Consciousness</span>
          </div>
          {/* Pan-Africanism */}
          <div className="w-44 h-12 absolute rounded-lg outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center" style={{ left: "495.02px", top: "130.42px", backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}>
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-inter)", color: "#9C5C08" }}>Pan-Africanism</span>
          </div>
          {/* Soweto Uprising */}
          <div className="w-44 h-12 absolute rounded-lg outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center" style={{ left: "408.06px", top: "239.12px", backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}>
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-inter)", color: "#9C5C08" }}>Soweto Uprising</span>
          </div>

          {/* Afrobeat — central circle */}
          <div className="size-24 absolute rounded-full outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center" style={{ left: "267.81px", top: "93.25px", backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}>
            <span className="text-center text-base font-bold" style={{ fontFamily: "var(--font-inter)", color: "#9C5C08" }}>Afrobeat</span>
          </div>

          {/* Connector nodes — circular with inner dot */}
          {CONNECTOR_NODES.map((pos) => (
            <div
              key={pos.left}
              className="size-8 absolute rounded-full outline outline-[1.37px] outline-offset-[-0.69px] flex items-center justify-center"
              style={{ ...pos, backgroundColor: "#4D311D", outlineColor: "#9C5C08" }}
            >
              <div className="size-4 rounded-full outline outline-[1.37px] outline-offset-[-0.69px]" style={{ backgroundColor: "#9C5C08", outlineColor: "#4D311D" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
