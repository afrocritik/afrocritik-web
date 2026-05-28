import type { LucideIcon } from "lucide-react";
import { ADMIN_STATS, type AdminStat } from "./constants";

function StatIcon({ icon }: Readonly<{ icon: AdminStat["icon"] }>) {
  if (typeof icon === "string") {
    return (
      <span
        aria-hidden="true"
        className="size-4 shrink-0 bg-yellow-700"
        style={{
          WebkitMask: `url('/${icon}') no-repeat center / contain`,
          mask: `url('/${icon}') no-repeat center / contain`,
        }}
      />
    );
  }
  const Icon = icon as LucideIcon;
  return <Icon className="size-4 shrink-0 text-yellow-700" />;
}

function StatCard({ stat }: Readonly<{ stat: AdminStat }>) {
  return (
    <div className="flex h-32 flex-col justify-between rounded-2xl px-[26.69px] py-[22.24px] outline outline-1 outline-offset-[-1.01px] outline-yellow-700" style={{ background: "#50321C80" }}>
      <div className="flex items-center justify-between">
        <span className="font-inter text-sm font-semibold text-white">{stat.label}</span>
        <StatIcon icon={stat.icon} />
      </div>
      <div>
        <p className="font-inter text-3xl font-semibold leading-7 text-white">{stat.value}</p>
        <div className="mt-[9.5px] flex items-center gap-[10.67px]">
          <div className="size-2 shrink-0 rounded-sm bg-green-500" />
          <p className="font-inter text-[10.19px] leading-[10.19px]">
            <span className="font-medium text-green-500">{stat.pct}</span>
            <span className="font-normal text-white"> this month</span>
          </p>
        </div>
      </div>
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
