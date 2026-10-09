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
  id?: string;
}

export function ExploreMoreSection({
  heading = "Explore more related ideas",
  hrefBase = "/ideas",
  related = [],
  id = "further-reading",
}: Readonly<Props> = {}) {
  if (related.length === 0) return null;

  return (
    <section id={id} className="mt-10 scroll-mt-28 pb-16">
      <h2 className="mb-6 text-white text-3xl font-bold font-baskervville leading-8">
        {heading}
      </h2>
      <div className="flex flex-col gap-4 md:flex-row">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`${hrefBase}/${item.slug}`}
            className="flex-1 p-4 bg-white/10 rounded-xl flex flex-col justify-start items-start"
          >
            <div className="self-stretch line-clamp-2 text-white text-lg font-semibold font-baskervville capitalize leading-6">
              {item.title}
            </div>
            {(item.desc || item.summary) && (
              <div className="self-stretch text-white text-[15px] font-normal font-inter capitalize leading-5 mt-2 line-clamp-2">
                {item.desc ?? item.summary}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
