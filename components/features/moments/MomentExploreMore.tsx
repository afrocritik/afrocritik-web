import Link from "next/link";

const LOREM =
  "Lorem ipsum dolor sit amet consectetur. Congue id sapien ibh ac.suspendisse et nibh laoreet viverra. Augue metus pharetra nibh ac m dolor sit amet consectetur. Congue id Lorem ipsum dolor sit amet consectetur. Con";

const RELATED = [
  { slug: "nollywood-golden-age", title: "Lorem Ipsum", desc: LOREM },
  { slug: "vhs-circulation-era", title: "Lorem Ipsum", desc: LOREM },
  { slug: "new-nollywood", title: "Lorem Ipsum", desc: LOREM },
];

export function MomentExploreMore() {
  return (
    <section className="mt-10 pb-4">
      <h2 className="mb-6 text-white text-3xl font-bold font-baskervville leading-8">
        Explore more related works
      </h2>
      <div className="flex flex-col gap-4 md:flex-row">
        {RELATED.map((item) => (
          <Link
            key={item.slug}
            href={`/moments/${item.slug}`}
            className="flex-1 p-4 bg-white/10 rounded-xl flex flex-col justify-start items-start transition-colors hover:bg-white/[0.14]"
          >
            <div className="self-stretch text-white text-2xl font-semibold font-baskervville capitalize leading-7">
              {item.title}
            </div>
            <div className="self-stretch text-white text-base font-normal font-inter capitalize leading-relaxed mt-2">
              {item.desc}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
