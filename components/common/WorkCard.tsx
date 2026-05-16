"use client";

import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WorkCardProps {
  slug?: string;
  title: string;
  image?: string;
  year?: number | string;
  country?: string;
  type?: string;
  rating?: number;
  essential?: boolean;
  className?: string;
}

export function WorkCard({
  slug = "#",
  title,
  image,
  year,
  country,
  type = "Film",
  rating,
  essential,
  className,
}: WorkCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full origin-top flex-col overflow-hidden rounded-xl border border-amber-line bg-bg-card transition-all duration-300 hover:z-10 hover:scale-[1.05] hover:border-amber/50 hover:shadow-2xl hover:shadow-black/40",
        className
      )}
    >
      <Link
        href={`/works/${slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-bg-secondary"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3D1F00] to-[#1C0A00] text-xs text-ink-muted">
            {type}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {essential && (
          <span className="absolute left-2.5 top-2.5 rounded bg-[#B81E1E] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Essential
          </span>
        )}
        <button
          aria-label="Save"
          className="absolute right-2.5 top-2.5 rounded-full bg-black/40 p-1.5 text-white/80 backdrop-blur transition-colors hover:text-amber"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link href={`/works/${slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-white transition-colors group-hover:text-amber">
            {title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center gap-2 text-xs text-ink-muted">
          {year && <span>{year}</span>}
          {year && country && (
            <span className="h-1 w-1 rounded-full bg-ink-muted/60" />
          )}
          {country && <span>{country}</span>}
        </div>
        <div className="flex items-center justify-between border-t border-amber-line pt-2">
          <span className="rounded bg-amber-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber">
            {type}
          </span>
          {typeof rating === "number" && (
            <span className="flex items-center gap-1 text-[11px] text-ink-secondary">
              <Star className="h-3 w-3 fill-amber text-amber" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
