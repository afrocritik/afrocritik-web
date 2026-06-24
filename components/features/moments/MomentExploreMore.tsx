import Link from "next/link";

export interface MomentRelatedWork {
  slug: string;
  title: string;
  desc?: string;
}

export function MomentExploreMore({
  related = [],
}: Readonly<{ related?: MomentRelatedWork[] }>) {
  if (related.length === 0) return null;

  return (
    <section className="mt-10 pb-4">
      <h2 className="mb-6 text-white text-3xl font-bold font-baskervville leading-8">
        Explore more related works
      </h2>
      <div className="flex flex-col gap-4 md:flex-row">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/works/${item.slug}`}
            className="flex-1 p-4 bg-white/10 rounded-xl flex flex-col justify-start items-start transition-colors hover:bg-white/[0.14]"
          >
            <div className="self-stretch text-white text-2xl font-semibold font-baskervville capitalize leading-7">
              {item.title}
            </div>
            {item.desc && (
              <div className="self-stretch text-white text-base font-normal font-inter capitalize leading-relaxed mt-2">
                {item.desc}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
