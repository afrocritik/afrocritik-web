import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { WorksGrid } from "@/components/features/dashboard/WorksGrid";
import { SAVED_WORKS } from "@/components/features/dashboard/constants";

export default function SavedPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="Saved"
        description="Works, reports and ideas you've bookmarked for later."
      />
      <WorksGrid works={SAVED_WORKS} />
    </div>
  );
}
