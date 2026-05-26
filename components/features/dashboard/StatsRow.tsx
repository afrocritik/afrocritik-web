import { BarChart3, FileText, Heart, Users } from "lucide-react";
import { STATS, type DashboardStat } from "./constants";

const ICONS: Record<DashboardStat["icon"], typeof FileText> = {
  reviewed: FileText,
  following: Users,
  collections: Heart,
  published: BarChart3,
};

function StatCard({ stat }: Readonly<{ stat: DashboardStat }>) {
  const Icon = ICONS[stat.icon];
  return (
    <div className="rounded-xl border border-amber-line bg-white/[0.03] p-5">
      <div className="flex items-start justify-between">
        <span className="font-inter text-sm text-ink-secondary">{stat.label}</span>
        <Icon className="size-4 text-amber" />
      </div>
      <p className="mt-4 font-montserrat text-3xl font-bold text-white">
        {stat.value}
      </p>
      <p className="mt-1 font-inter text-xs text-ink-muted">{stat.delta}</p>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
