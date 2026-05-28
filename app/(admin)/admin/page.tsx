import { AdminPageHeader } from "@/components/features/admin/AdminPageHeader";
import { AdminStatCards } from "@/components/features/admin/AdminStatCards";
import { ChartCard } from "@/components/features/admin/ChartCard";
import { ContentGrowthChart } from "@/components/features/admin/ContentGrowthChart";
import { ContentByCategoryChart } from "@/components/features/admin/ContentByCategoryChart";
import { EngagementChart } from "@/components/features/admin/EngagementChart";
import { TopContent } from "@/components/features/admin/TopContent";
import { RecentEntriesTable } from "@/components/features/admin/RecentEntriesTable";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6">
      <AdminPageHeader />

      <AdminStatCards />

      {/* Content Growth (2/3) + Content by Category (1/3) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Content Growth Overview" className="lg:col-span-2">
          <ContentGrowthChart />
        </ChartCard>
        <ChartCard title="Content by Category">
          <ContentByCategoryChart />
        </ChartCard>
      </div>

      {/* Engagement (2/3) + Top Content (1/3) */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Engagement by Entity Type" className="lg:col-span-2">
          <EngagementChart />
        </ChartCard>
        <ChartCard title="Top Content" viewAllHref="/admin/works">
          <TopContent />
        </ChartCard>
      </div>

      <RecentEntriesTable />
    </div>
  );
}
