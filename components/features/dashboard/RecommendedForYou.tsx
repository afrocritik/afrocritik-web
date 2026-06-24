"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { api, getMediaUrl } from "@/lib/api";

interface RecommendedItem {
  slug: string;
  title: string;
  subtitle?: string;
  type: string;
  image?: string;
}

function mapItem(work: any): RecommendedItem {
  const country = Array.isArray(work.country)
    ? work.country
        .map((c: any) => (typeof c === "string" ? c : c?.name ?? ""))
        .filter(Boolean)
        .join(", ")
    : "";
  return {
    slug: work.slug ?? "",
    title: work.title ?? "",
    subtitle: country || undefined,
    type: work.type ? work.type.charAt(0).toUpperCase() + work.type.slice(1) : "Work",
    image: getMediaUrl(work.coverImage),
  };
}

export function RecommendedForYou() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-recommended"],
    queryFn: () => api.works.list({ limit: 3, sort: "-rating", depth: 1 }),
  });

  const items: RecommendedItem[] = (data?.docs ?? []).map(mapItem);

  return (
    <div className="h-full rounded-xl border border-yellow-700 bg-[#50321C80] p-5">
      <h2 className="font-baskervville text-xl font-semibold leading-5 text-white">
        Recommended for you
      </h2>
      {items.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-5">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/works/${item.slug}`}
                className="group flex items-start gap-3.5"
              >
                <div className="h-[72px] w-16 shrink-0 overflow-hidden rounded-md bg-bg-secondary">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-yellow-950/50">
                      <span className="font-baskervville text-xl text-white/30">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-inter text-sm font-normal leading-[1.3] text-white transition-colors group-hover:line-clamp-none group-hover:text-amber">
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="mt-1 line-clamp-1 font-inter text-[10px] font-light leading-[1.3] text-white/60 group-hover:line-clamp-none">
                      {item.subtitle}
                    </p>
                  )}
                  <span className="mt-2 inline-flex items-center rounded-[3px] bg-yellow-800/70 px-[6px] py-[3.5px] font-inter text-[8px] font-normal leading-none text-white">
                    {item.type}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 font-inter text-sm italic text-white/40">
          {isLoading ? "Loading recommendations…" : "No recommendations yet."}
        </p>
      )}
    </div>
  );
}
