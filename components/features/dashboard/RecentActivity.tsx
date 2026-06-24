"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

type ActivityAction = "saved" | "downloaded" | "followed" | "contributed" | "collection";

const ACTIVITY_ICONS: Record<ActivityAction, string> = {
  saved: "/dashboard-saved.png",
  downloaded: "/dashboard-download.png",
  followed: "/dashboard-contributor.png",
  contributed: "/dashboard-contributor.png",
  collection: "/dashboard-add-collections.png",
};

const ACTIVITY_VERB: Record<ActivityAction, string> = {
  saved: "You saved",
  downloaded: "You downloaded",
  followed: "You followed",
  contributed: "You contributed to",
  collection: "You created the collection",
};

function relativeTime(iso?: string): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function ActivityIcon({ action }: Readonly<{ action: ActivityAction }>) {
  return (
    <div className="relative size-7 shrink-0 overflow-hidden rounded-[89.43px] bg-white/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ACTIVITY_ICONS[action] ?? ACTIVITY_ICONS.saved}
        alt=""
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain [filter:brightness(0)_saturate(100%)_invert(34%)_sepia(98%)_saturate(600%)_hue-rotate(22deg)_brightness(88%)] ${
          action === "downloaded" ? "size-[1.375rem]" : "size-4"
        }`}
      />
    </div>
  );
}

export function RecentActivity() {
  const { data: session, status } = useSession();
  const token = (session?.user as { token?: string } | undefined)?.token;

  const { data } = useQuery({
    queryKey: ["recent-activity", token ?? "anon"],
    enabled: status !== "loading" && Boolean(token),
    queryFn: () => api.activity.list(token, { limit: 6 }),
  });

  const items: any[] = data?.docs ?? [];

  return (
    <div className="h-full rounded-xl border border-yellow-700 bg-[#50321C80] px-5 pt-5 pb-6">
      <h2 className="font-baskervville text-xl font-semibold leading-5 text-white">
        Recent activity
      </h2>
      {items.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-[17px]">
          {items.map((item) => {
            const action = item.action as ActivityAction;
            const verb = ACTIVITY_VERB[action] ?? "You";
            const body = (
              <div className="flex items-center gap-2.5">
                <ActivityIcon action={action} />
                <p className="font-inter text-sm font-normal leading-4 text-white">
                  {verb} <span className="font-semibold">{item.targetTitle}</span>
                </p>
              </div>
            );
            return (
              <li key={item.id} className="flex items-center justify-between gap-3">
                {item.targetUrl ? (
                  <Link href={item.targetUrl} className="transition-opacity hover:opacity-80">
                    {body}
                  </Link>
                ) : (
                  body
                )}
                <span className="shrink-0 font-inter text-xs font-light leading-3 text-white/50">
                  {relativeTime(item.createdAt)}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-5 flex min-h-[160px] items-center justify-center">
          <p className="text-center font-inter text-sm italic leading-relaxed text-white/40">
            No recent activity yet. Your saves, follows, downloads and new
            collections will show up here.
          </p>
        </div>
      )}
    </div>
  );
}
