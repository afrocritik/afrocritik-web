import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { SavedWorksView } from "@/components/features/dashboard/SavedWorksView";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="My Library"
        description="Works you've saved and added to your library."
      />
      <SavedWorksView emptyLabel="Your library is empty. Save works from the archive to build your collection here." />
    </div>
  );
}
