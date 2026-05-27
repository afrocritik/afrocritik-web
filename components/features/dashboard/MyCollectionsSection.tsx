import { DashboardSection } from "./DashboardSection";
import { CollectionsGrid } from "./CollectionsGrid";

export function MyCollectionsSection() {
  return (
    <DashboardSection
      title="My Collections"
      viewAllHref="/dashboard/collections"
      card
    >
      <CollectionsGrid />
    </DashboardSection>
  );
}
