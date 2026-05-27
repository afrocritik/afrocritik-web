import { WorkCard, type WorkCardProps } from "@/components/common/WorkCard";

export function WorksGrid({ works }: Readonly<{ works: WorkCardProps[] }>) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
      {works.map((work) => (
        <WorkCard key={work.slug} explore {...work} />
      ))}
    </div>
  );
}
