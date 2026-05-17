import Link from "next/link";
import { cn } from "@/lib/utils";

export interface IdeaCardProps {
  slug?: string;
  title: string;
  category?: string;
  subtitle?: string;
  excerpt?: string;
  tags?: string[];
  theme?: "dark" | "light";
  className?: string;
}

export function IdeaCard({
  slug = "#",
  title,
  category,
  subtitle,
  excerpt,
  tags = [],
  theme = "light",
  className,
}: Readonly<IdeaCardProps>) {
  const light = theme === "light";

  return (
    <Link
      href={`/ideas/${slug}`}
      className={cn(
        "group flex h-full flex-col rounded-xl border p-5 transition-colors",
        light
          ? "border-black/10 bg-white hover:border-amber"
          : "border-amber-line bg-bg-card hover:border-amber/50",
        className,
      )}
    >
      {category && (
        <span className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-amber">
          {category}
        </span>
      )}
      <h3
        className={cn(
          "w-60 justify-start text-2xl font-baskervville leading-7",
          light ? "text-orange-950 font-bold" : "text-white",
        )}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          className={cn(
            "mt-0.5 italic w-60 justify-center text-base font-normal font-inter leading-5",
            light ? "text-yellow-700" : "text-ink-secondary",
          )}
        >
          {subtitle}
        </p>
      )}
      {excerpt && (
        <p
          className={cn(
            "mt-3 line-clamp-4 flex-1 w-60 justify-start text-base font-normal font-['Inter'] leading-5",
            light ? "text-zinc-600" : "text-ink-secondary",
          )}
        >
          {excerpt}
        </p>
      )}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <div
              key={t}
              className="h-8 px-2.5 py-2 bg-yellow-700/20 rounded-md inline-flex justify-center items-center gap-3 overflow-hidden"
            >
              <span
                key={t}
                className={cn(
                  "justify-start text-yellow-700 text-xs font-normal font-['Inter'] leading-4",
                  light
                    ? "bg-[#F0E6D0] text-yellow-700"
                    : "bg-amber-soft text-amber",
                )}
              >
                {t}
              </span>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}
