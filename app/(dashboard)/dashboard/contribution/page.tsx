import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { ContributionsView } from "@/components/features/dashboard/ContributionsView";

export default function ContributionPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="Contribution"
        description="Your contributions to works, ideas and the archive."
      />
      <ContributionsView />
    </div>
  );
}
