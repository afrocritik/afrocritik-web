import Link from "next/link";
import Image from "next/image";

const AT_A_GLANCE = [
  { icon: "/inner-glance-origin.png", label: "Origin", value: "Nigeria" },
  { icon: "/inner-glance-period.png", label: "Period", value: "1992 – Present" },
  { icon: "/inner-glance-key-focus.png", label: "Key Focus", value: "Film production, Storytelling" },
  { icon: "/inner-glance-key-focus.png", label: "Global Impact", value: "Viewed in 100+ countries" },
];

const QUICK_FACTS = [
  "Nollywood produces over 2,500 films a year.",
  "It is the 2nd largest film industry in the world by volume.",
  "Nollywood films are distributed in 100+ countries.",
  "Contributes billions to Nigeria's economy and creates millions of jobs.",
  "Nollywood films are viewed across 6 continents.",
];

const RELATED_WORKS = [
  { title: "Living in Bondage", year: 1992 },
  { title: "The Wedding Party", year: 2016 },
  { title: "Lionheart", year: 2018 },
  { title: "Half of a Yellow Sun", year: 2013 },
];

export function WorkInfoAside() {
  // Collapse the whole aside (and its layout column) when no card has content.
  if (
    AT_A_GLANCE.length === 0 &&
    QUICK_FACTS.length === 0 &&
    RELATED_WORKS.length === 0
  ) {
    return null;
  }

  return (
    <aside className="hidden lg:flex lg:w-[250px] lg:shrink-0 lg:flex-col gap-4">
      {/* At a glance */}
      {AT_A_GLANCE.length > 0 && (
      <div className="bg-yellow-950/50 rounded-2xl border-[1.20px] border-yellow-700 p-5">
        <h3 className="w-44 text-white text-lg font-semibold font-inter leading-5 mb-4">
          At a glance
        </h3>
        <ul className="flex flex-col gap-2">
          {AT_A_GLANCE.map((row) => (
            <li key={row.label} className="flex items-start gap-1.5">
              <div className="size-6 relative overflow-hidden shrink-0">
                <Image
                  src={row.icon}
                  alt={row.label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="flex flex-col gap-1">
                <div className="self-stretch justify-start">
                  <span className="text-white text-base font-medium font-inter leading-snug">
                    {row.label}
                  </span>
                </div>
                <div className="self-stretch text-white text-xs font-light font-inter leading-snug">
                  {row.value}
                </div>
              </span>
            </li>
          ))}
        </ul>
      </div>
      )}

      {/* Quick Facts */}
      {QUICK_FACTS.length > 0 && (
      <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-5 flex flex-col">
        <h3 className="w-44 text-white text-lg font-semibold font-inter leading-5 mb-4">
          Quick Facts
        </h3>
        <ul className="flex flex-col gap-3">
          {QUICK_FACTS.map((fact) => (
            <li key={fact} className="flex items-start gap-2">
              <span className="mt-[3px] size-1.5 shrink-0 rounded-full bg-white/60" />
              <span className="text-white text-[11px] font-normal font-inter leading-[1.4]">{fact}</span>
            </li>
          ))}
        </ul>
      </div>
      )}

      {/* Related Works */}
      {RELATED_WORKS.length > 0 && (
      <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-5">
        <h3 className="text-white text-base font-semibold font-inter leading-4 mb-3">
          Related Works
        </h3>
        <ul className="flex flex-col gap-2">
          {RELATED_WORKS.map((w) => (
            <li key={w.title}>
              <Link href="#" className="flex items-center gap-3 group">
                <Image
                  src="/inner-related-image.png"
                  alt={w.title}
                  width={32}
                  height={44}
                  className="w-8 h-11 shrink-0 rounded-[5px] object-cover"
                />
                <span className="flex flex-col gap-1">
                  <span className="w-24 justify-start text-white text-[10px] font-light font-inter leading-[10px] group-hover:text-amber transition-colors">
                    {w.title}
                  </span>
                  <div className="p-1 bg-yellow-800/70 rounded-sm inline-flex justify-center items-center gap-1 self-start">
                    <span className="text-[7.06px] font-normal font-inter leading-[7.06px] text-amber">
                      Film
                    </span>
                  </div>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      )}
    </aside>
  );
}
