import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";
import { StatsRow } from "@/components/features/dashboard/StatsRow";
import { ContinueExploringSection } from "@/components/features/dashboard/ContinueExploringSection";
import { RecentActivity } from "@/components/features/dashboard/RecentActivity";
import { FeaturedWorksSection } from "@/components/features/dashboard/FeaturedWorksSection";
import { RecommendedForYou } from "@/components/features/dashboard/RecommendedForYou";
import { MyCollectionsSection } from "@/components/features/dashboard/MyCollectionsSection";

export default function DashboardPage() {
  return (
    <div className="flex min-w-0 flex-col gap-6 px-4 py-6 sm:px-6 md:px-8 md:py-8">
      <DashboardHeader />

      <StatsRow />

      {/*
        Phone: one column. Tablet (md): the two wide sections span the row and
        Recent Activity + Recommended sit side by side beneath them. Desktop
        (lg): the original two rows of "wide section + side panel".
      */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="min-w-0 md:order-1 md:col-span-2 lg:order-none lg:col-span-2 lg:row-start-1">
          <ContinueExploringSection />
        </div>
        <div className="min-w-0 md:order-3 lg:order-none lg:row-start-1">
          <RecentActivity />
        </div>
        <div className="min-w-0 md:order-2 md:col-span-2 lg:order-none lg:col-span-2 lg:row-start-2">
          <FeaturedWorksSection />
        </div>
        <div className="min-w-0 md:order-4 lg:order-none lg:row-start-2">
          <RecommendedForYou />
        </div>
      </div>

      <MyCollectionsSection />
    </div>
  );
}
