"use client";

import { Eye } from "lucide-react";
import { TOP_CONTENT } from "./constants";
import { useDashboardData } from "./useDashboardData";

export function TopContent() {
  const { data, isLoading } = useDashboardData();
  if (isLoading && !data)
    return (
      <ul className="flex flex-col">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="flex items-center gap-3 py-2.5">
            <span className="size-10 shrink-0 animate-pulse rounded-lg bg-[#50321C40]" />
            <span className="h-3 flex-1 animate-pulse rounded bg-[#50321C40]" />
          </li>
        ))}
      </ul>
    );
  const items = data?.topContent?.length ? data.topContent : TOP_CONTENT;
  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li
          key={item.title}
          className="flex items-center gap-3 border-b border-line/60 py-2.5 last:border-b-0"
        >
          {/* Plain img: real media is on DigitalOcean Spaces, not configured
              for next/image. eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.title}
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-inter text-sm font-medium text-white">
              {item.title}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-[3.16px] px-1.5 py-0.5 font-inter text-[10px] font-medium text-white"
                  style={{ background: "#94623EB2" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 font-inter text-xs font-medium text-white">
            <Eye className="size-3.5 text-white" />
            {item.views}
          </span>
        </li>
      ))}
    </ul>
  );
}
