const STATS = [
  { value: "5,000+", label: "Works" },
  { value: "12,000+", label: "Articles" },
  { value: "12+", label: "Countries" },
  { value: "120,000+", label: "Data Points" },
];

function StatGroup() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {STATS.map((s) => (
        <div key={s.label} className="flex items-center">
          <span className="flex items-baseline gap-1.5 px-8 text-white">
            <span className="font-display text-lg font-bold md:text-xl">
              {s.value}
            </span>
            <span className="text-xs uppercase tracking-wide md:text-sm">
              {s.label}
            </span>
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-white/50" />
        </div>
      ))}
    </div>
  );
}

export function StatsMarquee() {
  return (
    <div className="group overflow-hidden border-y border-amber-line bg-amber py-4">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {/* Two identical halves give a seamless -50% loop */}
        <StatGroup />
        <StatGroup />
      </div>
    </div>
  );
}
