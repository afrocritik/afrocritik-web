import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DashboardSection({
  title,
  viewAllHref,
  children,
}: Readonly<{
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-montserrat text-lg font-semibold text-white">
          {title}
        </h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 font-inter text-sm font-medium text-amber transition-colors hover:text-amber-hover"
          >
            View All
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
