import { WorkCard, type WorkCardProps } from "@/components/common/WorkCard";
import { cn } from "@/lib/utils";

export function WorksGrid({
  works,
  className,
}: Readonly<{ works: WorkCardProps[]; className?: string }>) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {works.map((work) => (
        <WorkCard key={work.href ?? work.slug} explore {...work} />
      ))}
    </div>
  );
}
