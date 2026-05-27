import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardSection({
  title,
  viewAllHref,
  children,
  card = false,
}: Readonly<{
  title: string;
  viewAllHref?: string;
  children: React.ReactNode;
  card?: boolean;
}>) {
  const header = (
    <div className="mb-4 flex items-center justify-between">
      <h2
        className={cn(
          card
            ? "font-['Baskervville'] text-xl font-semibold leading-5 text-white"
            : "font-montserrat text-lg font-semibold text-white"
        )}
      >
        {title}
      </h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={cn(
            card
              ? "inline-flex items-center gap-2 rounded-lg px-2.5 py-2 font-inter text-sm font-semibold leading-4 text-yellow-700 transition-opacity hover:opacity-70"
              : "inline-flex items-center gap-1 font-inter text-sm font-medium text-amber transition-colors hover:text-amber-hover"
          )}
        >
          View All
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );

  if (card) {
    return (
      <section className="rounded-xl border border-yellow-700 bg-[#50321C80] p-5">
        {header}
        {children}
      </section>
    );
  }

  return (
    <section>
      {header}
      {children}
    </section>
  );
}
