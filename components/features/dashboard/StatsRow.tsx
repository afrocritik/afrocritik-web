"use client";

import { Users, Layers2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
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
  const { data: session } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;
  const { data: user } = useCurrentUser();

  const { data: collectionsData } = useQuery({
    queryKey: ["stats-collections", token ?? "anon"],
    enabled: Boolean(token),
    queryFn: () => api.collections.list(token, { limit: 0 }),
  });

  const savedCount = Array.isArray(user?.savedWorks) ? user.savedWorks.length : 0;
  const followingCount = Array.isArray(user?.following) ? user.following.length : 0;
  const downloadedCount = Array.isArray(user?.downloadedReports)
    ? user.downloadedReports.length
    : 0;
  const collectionsCount = collectionsData?.totalDocs ?? 0;

  const stats: DashboardStat[] = [
    {
      label: "Saved Works",
      value: String(savedCount),
      delta: savedCount > 0 ? "in your library" : undefined,
      icon: "reviewed",
    },
    {
      label: "Following",
      value: String(followingCount),
      delta: followingCount > 0 ? "people you follow" : undefined,
      icon: "following",
    },
    {
      label: "Collections",
      value: String(collectionsCount),
      delta: collectionsCount > 0 ? "curated sets" : undefined,
      icon: "collections",
    },
    {
      label: "Reports",
      value: String(downloadedCount),
      delta: downloadedCount > 0 ? "downloaded" : undefined,
      icon: "published",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
