import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  viewAllHref,
  badge,
  className,
  children,
}: Readonly<{
  title: string;
  viewAllHref?: string;
  /** Small pill shown next to the title, e.g. "Sample data". */
  badge?: string;
  className?: string;
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-yellow-700 p-5",
        className
      )}
      style={{ background: "#50321C80" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-baskervville text-xl font-semibold leading-6 text-white">{title}</h2>
          {badge && (
            <span className="rounded-full border border-yellow-700/60 px-2 py-0.5 font-inter text-[10px] font-medium uppercase tracking-wide text-orange-200/80">
              {badge}
            </span>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 font-inter text-xs font-medium text-amber transition-opacity hover:opacity-80"
          >
            View All
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
