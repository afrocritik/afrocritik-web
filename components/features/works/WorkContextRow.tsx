interface TimelineItem {
  year: string;
  label: string;
  description?: string;
}

interface Props {
  workTitle?: string;
  timeline?: TimelineItem[];
}

export function WorkContextRow({ workTitle, timeline = [] }: Props) {
  if (timeline.length === 0) return null;

  return (
    <div
      id="key-moments"
      className="bg-yellow-950/50 rounded-xl border border-yellow-700 p-6 min-w-0"
    >
      <h2 className="w-full text-white text-xl font-semibold font-baskervville leading-5">
        Timeline: Key Moments{workTitle ? ` in ${workTitle}` : ""}
      </h2>
      <div className="mt-8 flex flex-col gap-4">
        {/* Track — dots + lines (horizontal only where the items sit in a row) */}
        <div className="hidden justify-start items-start md:flex">
          {timeline.map((t, i) => (
            <div key={t.year} className="flex-1 h-2.5 relative">
              <div className="size-2.5 left-0 top-0 absolute">
                <div
                  className={`size-2.5 left-0 top-0 absolute rounded-full outline outline-[3.43px] outline-yellow-700/20 ${i < timeline.length - 1 ? "bg-orange-400" : "bg-zinc-400"}`}
                />
              </div>
              <div className="h-0 left-[13.13px] right-0 top-[5.71px] absolute outline outline-[3.43px] outline-offset-[-1.71px] outline-yellow-700/20" />
            </div>
          ))}
        </div>
        {/* Text items — stacked on small screens, row on md+ */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-0 md:justify-start md:items-start">
          {timeline.map((t) => (
            <div
              key={t.year}
              className="w-full min-w-0 md:flex-1 inline-flex flex-col justify-start items-start gap-3 md:pr-4 border-l-2 border-yellow-700/40 pl-4 md:border-l-0 md:pl-0"
            >
              <div className="text-orange-400 text-sm font-normal font-inter leading-snug">
                {t.year}
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <div className="text-white text-base font-medium font-inter leading-snug">
                  {t.label}
                </div>
                {t.description && (
                  <div className="text-white text-sm font-normal font-inter leading-relaxed">
                    {t.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
