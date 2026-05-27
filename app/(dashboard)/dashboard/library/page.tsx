import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { WorksGrid } from "@/components/features/dashboard/WorksGrid";
import { LIBRARY_WORKS } from "@/components/features/dashboard/constants";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="My Library"
        description="Works you've reviewed and added to your library."
      />
      <WorksGrid works={LIBRARY_WORKS} />
    </div>
  );
}
