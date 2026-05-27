import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";
import { StatsRow } from "@/components/features/dashboard/StatsRow";
import { ContinueExploringSection } from "@/components/features/dashboard/ContinueExploringSection";
import { RecentActivity } from "@/components/features/dashboard/RecentActivity";
import { FeaturedWorksSection } from "@/components/features/dashboard/FeaturedWorksSection";
import { RecommendedForYou } from "@/components/features/dashboard/RecommendedForYou";
import { MyCollectionsSection } from "@/components/features/dashboard/MyCollectionsSection";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardHeader />

      <StatsRow />

      {/* Continue Exploring + Recent activity */}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContinueExploringSection />
        </div>
        <RecentActivity />
      </div>

      {/* Featured Works + Recommended for you */}
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FeaturedWorksSection />
        </div>
        <RecommendedForYou />
      </div>

      <MyCollectionsSection />
    </div>
  );
}
