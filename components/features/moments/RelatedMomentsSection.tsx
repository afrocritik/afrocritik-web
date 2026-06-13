import Link from "next/link";
import Image from "next/image";

const RELATED_MOMENTS = [
  {
    slug: "igodo",
    title: "Igodo",
    director: "Andy Amenechi & Don Pedro Obaseki",
    desc: "An epic quest blending ancient curses with spiritual power — the Nigerian adventure that set the mold.",
    image: "/inner-anchor-1.png",
    rating: "9.8",
  },
  {
    slug: "rattlesnake",
    title: "Rattlesnake",
    director: "Amaka Igwe",
    desc: "A crime drama of betrayal and vengeance capturing the restless energy of urban Nigeria in transition.",
    image: "/inner-anchor-2.jpg",
    rating: "9.8",
  },
  {
    slug: "blood-money",
    title: "Blood Money",
    director: "Chico Ejiro",
    desc: "Ritual wealth and its consequences — crystallizing Nollywood's fascination with the moral costs of ambition.",
    image: "/inner-anchor-3.jpg",
    rating: "9.8",
  },
  {
    slug: "rattlesnake-ii",
    title: "Rattlesnake",
    director: "Amaka Igwe",
    desc: "A crime drama of betrayal and vengeance capturing the restless energy of urban Nigeria in transition.",
    image: "/inner-anchor-2.jpg",
    rating: "9.8",
  },
  {
    slug: "blood-money-ii",
    title: "Blood Money",
    director: "Chico Ejiro",
    desc: "Ritual wealth and its consequences — crystallizing Nollywood's fascination with the moral costs of ambition.",
    image: "/inner-anchor-3.jpg",
    rating: "9.8",
  },
];

export function RelatedMomentsSection() {
  if (RELATED_MOMENTS.length === 0) return null;

  return (
    <section id="related-works" className="pb-4">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 text-white text-2xl font-semibold font-baskervville leading-7">
          Related Moments
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {RELATED_MOMENTS.map((film) => (
            <Link
              key={film.slug}
              href={`/works/${film.slug}`}
              className="h-80 flex flex-col overflow-hidden bg-rose-100/10 rounded-md outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 hover:outline-2 hover:outline-orange-400 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative mx-2 mt-2.5 h-56 rounded-sm overflow-hidden shrink-0">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
