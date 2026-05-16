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
}: IdeaCardProps) {
  const light = theme === "light";

  return (
    <Link
      href={`/ideas/${slug}`}
      className={cn(
        "group flex h-full flex-col rounded-xl border p-5 transition-colors",
        light
          ? "border-black/10 bg-white hover:border-amber"
          : "border-amber-line bg-bg-card hover:border-amber/50",
        className
      )}
    >
      {category && (
        <span className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-amber">
          {category}
        </span>
      )}
      <h3
        className={cn(
          "font-display text-xl font-bold",
          light ? "text-ink-dark" : "text-white"
        )}
      >
        {title}
      </h3>
      {subtitle && (
        <p
          className={cn(
            "mt-0.5 text-sm italic",
            light ? "text-[#8B6B4A]" : "text-ink-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
      {excerpt && (
        <p
          className={cn(
            "mt-3 line-clamp-4 flex-1 text-sm leading-relaxed",
            light ? "text-[#5B4530]" : "text-ink-secondary"
          )}
        >
          {excerpt}
        </p>
      )}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-medium",
                light
                  ? "bg-[#F0E6D0] text-[#6B4A2A]"
                  : "bg-amber-soft text-amber"
              )}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
