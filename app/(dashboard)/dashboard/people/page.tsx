import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { FollowingView } from "@/components/features/dashboard/FollowingView";

export default function PeoplePage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="People"
        description="Check out icons, pioneers, personalities and people"
      />
      <FollowingView />
    </div>
  );
}
