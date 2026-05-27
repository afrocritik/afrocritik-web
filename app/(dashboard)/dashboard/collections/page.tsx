import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { CollectionsGrid } from "@/components/features/dashboard/CollectionsGrid";

export default function CollectionsPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="My Collections"
        description="Curated sets of works you've grouped together."
      />
      <CollectionsGrid />
    </div>
  );
}
