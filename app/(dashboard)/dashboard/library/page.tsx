import { Suspense } from "react";
import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { LibraryView } from "@/components/features/dashboard/LibraryView";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="My Library"
        description="All cultural entries you've added to your library."
      />
      <Suspense fallback={null}>
        <LibraryView />
      </Suspense>
    </div>
  );
}
