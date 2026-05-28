import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  viewAllHref,
  className,
  children,
}: Readonly<{
  title: string;
  viewAllHref?: string;
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
        <h2 className="font-baskervville text-xl font-semibold leading-6 text-white">{title}</h2>
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
