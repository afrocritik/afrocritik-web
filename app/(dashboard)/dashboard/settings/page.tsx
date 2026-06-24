import { DashboardPageHeader } from "@/components/features/dashboard/DashboardPageHeader";
import { SettingsView } from "@/components/features/dashboard/SettingsView";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 md:px-8">
      <DashboardPageHeader
        title="Settings"
        description="Manage your account, profile and preferences."
      />
      <SettingsView />
    </div>
  );
}
