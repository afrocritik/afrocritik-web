import Link from "next/link";
import Image from "next/image";

const RELATED_IDEAS = [
  "African Storytelling",
  "Afrobeat",
  "Pan-Africanism",
  "Diaspora Cinema",
];

const TIMELINE = [
  { year: "1992", title: "The Spark", desc: "Survival strategies to ensure proactive domination Survival strategies to ensure proactive domination" },
  { year: "1999", title: "The Growth", desc: "Survival strategies to ensure proactive domination Survival strategies toensure proactivedomination" },
  { year: "2010", title: "The Expansion", desc: "Survival strategies to ensure proactive domination Survival strategies toensure proactivedomination" },
  { year: "2020", title: "The Global Shift", desc: "Survival strategies to ensure proactive domination Survival strategies toensure proactivedomination" },
];

const AT_A_GLANCE = [
  { icon: "/inner-glance-origin.png", label: "Origin", value: "Nigeria" },
  { icon: "/inner-glance-period.png", label: "Period", value: "1992 – Present" },
  { icon: "/inner-glance-key-focus.png", label: "Key Focus", value: "Film production, Storytelling" },
  { icon: "/inner-glance-key-focus.png", label: "Global Impact", value: "Viewed in 100+ countries" },
];

export function IdeaContextRow() {
  return (
    <section className="grid gap-4 lg:grid-cols-[210px_1fr_250px] lg:items-stretch pb-4">
      {/* Related Ideas */}
      <aside className="hidden lg:flex lg:flex-col">
        <div className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-5 flex-1">
          <h3 className="mb-3 justify-start text-white text-base font-semibold font-inter leading-4">
            Related Ideas
          </h3>
          <ul className="flex flex-col gap-2">
            {RELATED_IDEAS.map((idea) => (
              <li key={idea}>
                <Link
                  href={`/ideas/${idea.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-center gap-3 group"
                >
                  <Image
                    src="/inner-related-image.png"
                    alt={idea}
                    width={32}
                    height={44}
                    className="w-8 h-11 shrink-0 rounded-[5px] object-cover"
                  />
                  <span className="flex flex-col gap-1">
                    <span className="w-24 justify-start text-white text-[10px] font-light font-inter leading-[10px] group-hover:text-amber transition-colors">
                      {idea}
                    </span>
                    <div className="p-1 bg-yellow-800/70 rounded-sm inline-flex justify-center items-center gap-1 self-start">
                      <span className="text-[7.06px] font-normal font-inter leading-[7.06px] text-amber">
                        Ideas
                      </span>
                    </div>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Timeline */}
      <div
        id="key-moments"
        className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0"
      >
        <h2 className="w-96 text-white text-xl font-semibold font-baskervville leading-5">
          Timeline: Key Moments in Nollywood
        </h2>
        <div className="mt-8 flex flex-col gap-4">
          {/* Track — dots + lines */}
          <div className="inline-flex justify-start items-start">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="w-40 h-2.5 relative">
                <div className="size-2.5 left-0 top-0 absolute">
                  <div
                    className={`size-2.5 left-0 top-0 absolute rounded-full outline outline-[3.43px] outline-yellow-700/20 ${i < 3 ? "bg-orange-400" : "bg-zinc-400"}`}
                  />
                </div>
                <div className="w-36 h-0 left-[13.13px] top-[5.71px] absolute outline outline-[3.43px] outline-offset-[-1.71px] outline-yellow-700/20" />
              </div>
            ))}
          </div>
          {/* Text items */}
          <div className="inline-flex justify-start items-start">
            {TIMELINE.map((t) => (
              <div
                key={t.year}
                className="w-40 inline-flex flex-col justify-start items-start gap-3"
              >
                <div className="text-orange-400 text-[10.11px] font-normal font-inter">
                  {t.year}
                </div>
                <div className="flex flex-col justify-start items-start gap-1.5">
                  <div className="text-white text-xs font-normal font-inter">
                    {t.title}
                  </div>
                  <div className="text-white text-[9.47px] font-normal font-inter leading-3">
                    {t.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* At a glance */}
      <aside className="hidden lg:flex lg:flex-col">
        <div className="bg-yellow-950/50 rounded-2xl border-[1.20px] border-yellow-700 p-5 flex-1">
          <h3 className="w-44 text-white text-lg font-semibold font-inter leading-5 mb-4">
            At a glance
          </h3>
          <ul className="flex flex-col gap-2">
            {AT_A_GLANCE.map((row) => (
              <li key={row.label} className="flex items-center gap-1.5">
                <div className="size-6 relative overflow-hidden shrink-0">
                  <Image
                    src={row.icon}
                    alt={row.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="flex flex-col gap-px">
                  <div className="self-stretch justify-start">
                    <span className="text-white text-xs font-medium font-inter leading-3">
                      {row.label}
                    </span>
                  </div>
                  <div className="self-stretch text-white text-[10px] font-light font-inter leading-3">
                    {row.value}
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
