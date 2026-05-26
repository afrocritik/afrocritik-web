import { WorkCard } from "@/components/common/WorkCard";
import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";
import { DashboardSection } from "@/components/features/dashboard/DashboardSection";
import { StatsRow } from "@/components/features/dashboard/StatsRow";
import { RecentActivity } from "@/components/features/dashboard/RecentActivity";
import { RecommendedForYou } from "@/components/features/dashboard/RecommendedForYou";
import { CollectionsGrid } from "@/components/features/dashboard/CollectionsGrid";
import {
  CONTINUE_EXPLORING,
  FEATURED_WORKS,
} from "@/components/features/dashboard/constants";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8 md:px-8">
      <DashboardHeader />

      <StatsRow />

      {/* Continue Exploring + Recent activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardSection title="Continue Exploring" viewAllHref="/explore">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {CONTINUE_EXPLORING.map((work) => (
                <WorkCard key={work.slug} explore {...work} />
              ))}
            </div>
          </DashboardSection>
        </div>
        <RecentActivity />
      </div>

      {/* Featured Works + Recommended for you */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardSection title="Featured Works" viewAllHref="/explore">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {FEATURED_WORKS.map((work) => (
                <WorkCard key={work.slug} explore {...work} />
              ))}
            </div>
          </DashboardSection>
        </div>
        <RecommendedForYou />
      </div>

      {/* My Collections */}
      <DashboardSection title="My Collections" viewAllHref="/dashboard/collections">
        <CollectionsGrid />
      </DashboardSection>
    </div>
  );
}
