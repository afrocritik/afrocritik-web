import { Users, Layers2 } from "lucide-react";
import { STATS, type DashboardStat } from "./constants";

function StatIcon({ icon }: Readonly<{ icon: DashboardStat["icon"] }>) {
  if (icon === "reviewed") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/dashboard-icon_works.png"
        alt=""
        aria-hidden="true"
        className="size-4 [filter:brightness(0)_saturate(100%)_invert(32%)_sepia(100%)_saturate(500%)_brightness(88%)]"
      />
    );
  }
  if (icon === "published") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/dashboard-Icon_write.png"
        alt=""
        aria-hidden="true"
        className="size-4 [filter:brightness(0)_saturate(100%)_invert(32%)_sepia(100%)_saturate(500%)_brightness(88%)]"
      />
    );
  }
  if (icon === "following") {
    return <Users className="size-4 text-yellow-700" />;
  }
  return <Layers2 className="size-4 text-yellow-700" />;
}

function StatCard({ stat }: Readonly<{ stat: DashboardStat }>) {
  return (
    <div className="flex h-32 w-full flex-col justify-between rounded-2xl bg-[#50321C80] px-6 py-5 outline outline-1 outline-offset-[-1.01px] outline-amber-600">
      <div className="flex items-center justify-between">
        <span className="font-inter text-sm font-semibold leading-3 text-white">
          {stat.label}
        </span>
        <StatIcon icon={stat.icon} />
      </div>
      <div>
        <p className="font-inter text-3xl font-semibold leading-7 text-white">
          {stat.value}
        </p>
        <p className="mt-2 font-inter text-[10.24px] font-light leading-[10.24px] text-white">
          {stat.delta}
        </p>
      </div>
    </div>
  );
}

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {STATS.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
