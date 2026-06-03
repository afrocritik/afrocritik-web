import Image from "next/image";

const PIONEERS = [
  { name: "Ngũgĩ wa Thiong'o", tags: ["NOVELIST", "EAST AFRICA"], image: "/Image-Ngugi.png" },
  { name: "Ngũgĩ wa Thiong'o", tags: ["NOVELIST", "EAST AFRICA"], image: "/Image-Ngugi.png" },
  { name: "Ngũgĩ wa Thiong'o", tags: ["NOVELIST", "EAST AFRICA"], image: "/Image-Ngugi.png" },
  { name: "Ngũgĩ wa Thiong'o", tags: ["NOVELIST", "EAST AFRICA"], image: "/Image-Ngugi.png" },
  { name: "Ngũgĩ wa Thiong'o", tags: ["NOVELIST", "EAST AFRICA"], image: "/Image-Ngugi.png" },
];

export function MomentPioneersSection() {
  return (
    <section id="pioneers-icons" className="pb-16">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 text-white text-2xl font-semibold font-baskervville leading-7">
          Pioneers &amp; Icons
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {PIONEERS.map((p, i) => (
            <div
              key={i}
              className="h-80 flex flex-col bg-orange-950 rounded-3xl outline outline-[0.83px] outline-offset-[-0.83px] outline-yellow-700 hover:outline-2 hover:outline-orange-400 transition-all duration-300 p-2.5"
            >
              {/* Image — padded on all sides, rounded on all corners */}
              <div className="relative flex-1 rounded-[19px] overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover" />
              </div>
              {/* Name + tags */}
              <div className="pt-3 px-0.5">
                <div className="text-orange-400 text-sm font-semibold font-inter leading-5">
                  {p.name}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-sm bg-yellow-700/30 px-2 py-1 text-[9px] font-normal font-inter leading-none text-stone-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
