import Image from "next/image";
import Link from "next/link";

export interface MomentPioneer {
  slug?: string;
  name: string;
  tags: string[];
  image?: string;
}

export function MomentPioneersSection({
  people = [],
}: Readonly<{ people?: MomentPioneer[] }>) {
  if (people.length === 0) return null;

  return (
    <section id="pioneers-icons" className="pb-16">
      <div className="rounded-xl border border-yellow-700 bg-yellow-950/50 p-6">
        <h2 className="mb-6 text-white text-2xl font-semibold font-baskervville leading-7">
          Pioneers &amp; Icons
        </h2>
        <div className="grid grid-cols-5 gap-4">
          {people.map((p, i) => {
            const card = (
              <>
                {/* Image — padded on all sides, rounded on all corners */}
                <div className="relative flex-1 rounded-[19px] overflow-hidden">
                  {p.image ? (
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-yellow-950/50">
                      <span className="font-baskervville text-4xl text-white/30">{p.name.charAt(0)}</span>
                    </div>
                  )}
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
              </>
            );
            const className =
              "h-80 flex flex-col bg-orange-950 rounded-3xl outline outline-[0.83px] outline-offset-[-0.83px] outline-yellow-700 hover:outline-2 hover:outline-orange-400 transition-all duration-300 p-2.5";
            return p.slug ? (
              <Link key={p.slug} href={`/people/${p.slug}`} className={className}>
                {card}
              </Link>
            ) : (
              <div key={i} className={className}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
