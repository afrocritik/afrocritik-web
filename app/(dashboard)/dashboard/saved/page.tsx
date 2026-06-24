import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { SavedWorksView } from "@/components/features/dashboard/SavedWorksView";

export default function SavedPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="Saved"
        description="Works, reports and ideas you've bookmarked for later."
      />
      <SavedWorksView emptyLabel="You haven't saved anything yet. Browse the archive and bookmark works to find them here." />
    </div>
  );
}
