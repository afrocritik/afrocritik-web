import Link from "next/link";

interface RelatedItem {
  slug: string;
  title: string;
  desc?: string;
  summary?: string;
}

interface Props {
  heading?: string;
  hrefBase?: string;
  related?: RelatedItem[];
}

export function ExploreMoreSection({
  heading = "Explore more related ideas",
  hrefBase = "/ideas",
  related = [],
}: Readonly<Props> = {}) {
  if (related.length === 0) return null;

  return (
    <section id="further-reading" className="mt-10 pb-16">
      <h2 className="mb-6 text-white text-3xl font-bold font-baskervville leading-8">
        {heading}
      </h2>
      <div className="flex gap-4">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`${hrefBase}/${item.slug}`}
            className="flex-1 p-4 bg-white/10 rounded-xl flex flex-col justify-start items-start"
          >
            <div className="self-stretch text-white text-2xl font-semibold font-baskervville capitalize leading-7">
              {item.title}
            </div>
            {(item.desc || item.summary) && (
              <div className="self-stretch text-white text-base font-normal font-inter capitalize leading-relaxed mt-2 line-clamp-3">
                {item.desc ?? item.summary}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
