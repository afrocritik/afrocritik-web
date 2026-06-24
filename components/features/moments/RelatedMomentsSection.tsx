import Link from "next/link";
import Image from "next/image";

export interface RelatedMomentCard {
  slug: string;
  title: string;
  director?: string;
  desc?: string;
  image?: string;
  rating?: string;
  tags?: string[];
}

export function RelatedMomentsSection({
  moments = [],
}: Readonly<{ moments?: RelatedMomentCard[] }>) {
  if (moments.length === 0) return null;

  return (
    <section id="related-works" className="pb-4">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 text-white text-2xl font-semibold font-baskervville leading-7">
          Related Moments
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {moments.map((film) => (
            <Link
              key={film.slug}
              href={`/moments/${film.slug}`}
              className="h-80 flex flex-col overflow-hidden bg-rose-100/10 rounded-md outline outline-[0.72px] outline-offset-[-0.72px] outline-yellow-700 hover:outline-2 hover:outline-orange-400 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative mx-2 mt-2.5 h-56 rounded-sm overflow-hidden shrink-0">
                {film.image ? (
                  <Image src={film.image} alt={film.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-yellow-950/50">
                    <span className="font-baskervville text-3xl text-white/30">{film.title.charAt(0)}</span>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex flex-col flex-1 px-[7px] pt-1.5 pb-2.5 min-h-0">
                <p className="text-stone-300 text-xs font-semibold font-inter leading-3 truncate">{film.title}</p>
                <div className="mt-1">
                  {film.director && (
                    <span className="text-stone-300 text-[6px] font-semibold font-inter leading-[8.40px] block">Dir. {film.director}</span>
                  )}
                  {film.desc && (
                    <span className="text-stone-300 text-[6px] font-normal font-inter leading-[8.40px] line-clamp-2">{film.desc}</span>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-1">
                  {(film.tags ?? []).slice(0, 3).map((tag) => (
                    <div key={tag} className="inline-flex items-center bg-yellow-700/20 rounded-sm px-[5px] py-[4px]">
                      <span className="text-white text-[6.44px] font-normal font-inter leading-none">{tag.toUpperCase()}</span>
                    </div>
                  ))}
                  {film.rating && (
                    <div className="ml-auto flex items-center gap-0.5">
                      <span className="text-white text-[8.59px] font-semibold font-inter leading-3">{film.rating}</span>
                      <span className="text-yellow-400 text-[8px] leading-none">★</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
