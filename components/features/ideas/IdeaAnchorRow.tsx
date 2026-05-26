import Link from "next/link";
import Image from "next/image";

const ANCHOR_FILMS = [
  {
    title: "Igodo",
    director: "Andy Amenechi & Don Pedro Obaseki",
    desc: "An epic quest blending ancient curses with spiritual power — the Nigerian adventure that set the mold.",
    image: "/inner-anchor-1.png",
    rating: "9.8",
  },
  {
    title: "Rattlesnake",
    director: "Amaka Igwe",
    desc: "A crime drama of betrayal and vengeance capturing the restless energy of urban Nigeria in transition.",
    image: "/inner-anchor-2.jpg",
    rating: "9.8",
  },
  {
    title: "Domitilla",
    director: "Zeb Ejiro",
    desc: "A morality tale of survival and exploitation that became a cultural touchstone for a generation.",
    image: "/inner-anchor-3.jpg",
    rating: "9.8",
  },
  {
    title: "Blood Money",
    director: "Chico Ejiro",
    desc: "Ritual wealth and its consequences — crystallizing Nollywood's fascination with the moral costs of ambition.",
    image: "/inner-anchor-3.jpg",
    rating: "9.8",
  },
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

export function IdeaAnchorRow() {
  return (
    <section className="grid gap-4 lg:grid-cols-[210px_1fr_250px] lg:items-stretch pb-4">
      {/* Center: Anchor Year · Circulation Era — spans col 1+2 to match Related Ideas + Timeline above */}
      <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0 lg:col-span-2">
        <p className="justify-start text-white text-xl font-semibold font-baskervville leading-5">
          Anchor Year · Circulation Era
        </p>
        <h2 className="mt-2 justify-start text-yellow-700 text-xl font-semibold font-baskervville leading-5">
          1999 — The Reset
        </h2>
        <p className="mt-4 w-full justify-start text-white text-[16px] font-normal font-inter leading-[1.5]">
          Nollywood was in a transition phase marked by heavy VHS circulation
          and themes of spiritual power, ancient curses, and moral conflict. The
          industry was stabilizing after the explosive 1990s home-video rise — a
          nation grappling with its fears and beliefs, producing culture at
          extraordinary speed. Nollywood was in a transition phase marked by
          heavy VHS circulation and themes of spiritual power, ancient curses,
          and moral conflict. The industry was stabilizing after the explosive
          1990s home-video rise — a nation grappling with its fears and beliefs,
          producing culture at extraordinary speed.
          <br />
          <br />
          This era’s anchor film, “Rattlesnake” (1999), epitomizes the period’s
          themes and style — a gritty crime drama of betrayal and vengeance that
          captured the restless energy of urban Nigeria in transition. It set a
          new standard for production quality and storytelling ambition,
          solidifying Nollywood’s identity and paving the way for its global
          expansion in the 2000s.
        </p>
        <div className="mt-6 flex gap-3">
          {ANCHOR_FILMS.map((film) => (
            <div
              key={film.title}
              className="flex-1 h-64 flex flex-col overflow-hidden bg-rose-100/10 rounded-md outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 hover:outline-2 hover:outline-orange-400 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative mx-2 mt-2.5 h-40 rounded-sm overflow-hidden shrink-0">
                <Image src={film.image} alt={film.title} fill className="object-cover" />
              </div>
              {/* Info */}
              <div className="flex flex-col flex-1 px-[7px] pt-1.5 pb-2.5 min-h-0">
                <p className="text-stone-300 text-xs font-semibold font-inter leading-3 truncate">{film.title}</p>
                <div className="mt-1">
                  <span className="text-stone-300 text-[6px] font-semibold font-inter leading-[8.40px] block">Dir. {film.director}</span>
                  <span className="text-stone-300 text-[6px] font-normal font-inter leading-[8.40px] line-clamp-2">{film.desc}</span>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <div className="inline-flex items-center bg-yellow-700/20 rounded-sm px-[5px] py-[4px]">
                    <span className="text-white text-[6.44px] font-normal font-inter leading-none">NIGERIA</span>
                  </div>
                  <div className="inline-flex items-center bg-yellow-700/20 rounded-sm px-[5px] py-[4px]">
                    <span className="text-white text-[6.44px] font-normal font-inter leading-none">FILM</span>
                  </div>
                  <div className="inline-flex items-center bg-yellow-700/20 rounded-sm px-[5px] py-[4px]">
                    <span className="text-white text-[6.44px] font-normal font-inter leading-none">ENTERTAINMENT</span>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    <span className="text-white text-[8.59px] font-semibold font-inter leading-3">{film.rating}</span>
                    <span className="text-yellow-400 text-[8px] leading-none">★</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Quick Facts + Related Works */}
      <aside className="hidden lg:flex lg:flex-col lg:self-start gap-4">
        {/* Quick Facts */}
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

        {/* Related Works */}
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
      </aside>
    </section>
  );
}
