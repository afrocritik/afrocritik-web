import { ArrowUp } from "lucide-react";
import { ADMIN_STATS, type AdminStat } from "./constants";

function StatCard({ stat }: Readonly<{ stat: AdminStat }>) {
  const Icon = stat.icon;
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-bg-secondary px-5 py-4">
      <div className="flex items-center justify-between">
        <span className="font-inter text-sm font-medium text-ink-secondary">
          {stat.label}
        </span>
        <Icon className="size-[18px] text-ink-muted" />
      </div>
      <p className="font-inter text-3xl font-semibold leading-8 text-white">
        {stat.value}
      </p>
      <p className="inline-flex items-center gap-1 font-inter text-xs font-medium text-emerald-500">
        <ArrowUp className="size-3" />
        {stat.delta}
      </p>
    </div>
  );
}

export function AdminStatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {ADMIN_STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
