const TIMELINE = [
  { year: "1992", title: "The Spark", desc: "Survival strategies to ensure proactive domination Survival strategies to ensure proactive domination" },
  { year: "1999", title: "The Growth", desc: "Survival strategies to ensure proactive domination Survival strategies toensure proactivedomination" },
  { year: "2010", title: "The Expansion", desc: "Survival strategies to ensure proactive domination Survival strategies toensure proactivedomination" },
  { year: "2020", title: "The Global Shift", desc: "Survival strategies to ensure proactive domination Survival strategies toensure proactivedomination" },
];

export function WorkContextRow() {
  if (TIMELINE.length === 0) return null;

  return (
    <div
      id="key-moments"
      className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0"
    >
      <h2 className="w-full text-white text-xl font-semibold font-baskervville leading-5">
        Timeline: Key Moments in Nollywood
      </h2>
      <div className="mt-8 flex flex-col gap-4">
        {/* Track — dots + lines */}
        <div className="flex justify-start items-start">
          {TIMELINE.map((t, i) => (
            <div key={t.year} className="flex-1 h-2.5 relative">
              <div className="size-2.5 left-0 top-0 absolute">
                <div
                  className={`size-2.5 left-0 top-0 absolute rounded-full outline outline-[3.43px] outline-yellow-700/20 ${i < 3 ? "bg-orange-400" : "bg-zinc-400"}`}
                />
              </div>
              <div className="h-0 left-[13.13px] right-0 top-[5.71px] absolute outline outline-[3.43px] outline-offset-[-1.71px] outline-yellow-700/20" />
            </div>
          ))}
        </div>
        {/* Text items */}
        <div className="flex justify-start items-start">
          {TIMELINE.map((t) => (
            <div
              key={t.year}
              className="flex-1 inline-flex flex-col justify-start items-start gap-3 pr-4"
            >
              <div className="text-orange-400 text-sm font-normal font-inter leading-snug">
                {t.year}
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="text-white text-base font-medium font-inter leading-snug">
                  {t.title}
                </div>
                <div className="text-white text-sm font-normal font-inter leading-relaxed">
                  {t.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
