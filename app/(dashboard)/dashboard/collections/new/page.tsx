import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { NewCollectionView } from "@/components/features/dashboard/NewCollectionView";

export default function NewCollectionPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="Create New Collection"
        description="Group works into a new curated collection."
      />
      <NewCollectionView />
    </div>
  );
}
