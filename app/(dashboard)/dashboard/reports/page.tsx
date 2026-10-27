import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { MyReportsView } from "@/components/features/dashboard/MyReportsView";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="Reports"
        description="Explore key insights and intelligence shaping African culture."
      />
      <MyReportsView />
    </div>
  );
}
