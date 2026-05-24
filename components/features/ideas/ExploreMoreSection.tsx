import Link from "next/link";

const LOREM =
  "Lorem ipsum dolor sit amet consectetur. Congue id sapien ibh ac.suspendisse et nibh laoreet viverra. Augue metus pharetra nibh ac m dolor sit amet consectetur. Congue id Lorem ipsum dolor sit amet consectetur. Con";

const RELATED = [
  { slug: "african-storytelling", title: "African Storytelling", desc: LOREM },
  { slug: "diaspora-cinema", title: "Diaspora Cinema", desc: LOREM },
  { slug: "afrobeat", title: "Afrobeat", desc: LOREM },
];

export function ExploreMoreSection() {
  return (
    <section id="further-reading" className="mt-10 pb-16">
      <h2 className="mb-6 text-white text-3xl font-bold font-baskervville leading-8">
        Explore more related works
      </h2>
      <div className="flex gap-4">
        {RELATED.map((item) => (
          <Link
            key={item.slug}
            href={`/ideas/${item.slug}`}
            className="flex-1 p-4 bg-white/10 rounded-xl flex flex-col justify-start items-start"
          >
            <div className="self-stretch text-white text-2xl font-semibold font-baskervville capitalize leading-7">
              {item.title}
            </div>
            <div className="self-stretch text-white text-base font-normal font-inter capitalize leading-4 mt-2">
              {item.desc}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
