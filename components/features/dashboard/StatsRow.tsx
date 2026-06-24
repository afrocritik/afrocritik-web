"use client";

import { Users, Layers2 } from "lucide-react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

type StatIconKind = "reviewed" | "following" | "collections" | "published";

interface DashboardStat {
  label: string;
  value: string;
  delta?: string;
  icon: StatIconKind;
}

function StatIcon({ icon }: Readonly<{ icon: StatIconKind }>) {
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
        {stat.delta && (
          <p className="mt-2 font-inter text-[10.24px] font-light leading-[10.24px] text-white/70">
            {stat.delta}
          </p>
        )}
      </div>
    </div>
  );
}

export function StatsRow() {
  const { data: user } = useCurrentUser();

  const savedCount = Array.isArray(user?.savedWorks) ? user.savedWorks.length : 0;
  const interestsCount = Array.isArray(user?.interests) ? user.interests.length : 0;

  const stats: DashboardStat[] = [
    {
      label: "Saved Works",
      value: String(savedCount),
      delta: savedCount > 0 ? "in your library" : undefined,
      icon: "reviewed",
    },
    {
      label: "Interests",
      value: String(interestsCount),
      delta: interestsCount > 0 ? "topics you follow" : undefined,
      icon: "following",
    },
    { label: "Collections", value: "—", icon: "collections" },
    { label: "Reports", value: "—", icon: "published" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
