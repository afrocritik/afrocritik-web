import { DashboardSection } from "./DashboardSection";
import { ContinueExploringCard } from "./ContinueExploringCard";
import { CONTINUE_EXPLORING } from "./constants";

export function ContinueExploringSection() {
  return (
    <DashboardSection title="Continue Exploring" viewAllHref="/explore" card>
      <div className="grid grid-cols-3 gap-3">
        {CONTINUE_EXPLORING.map((work) => (
          <ContinueExploringCard
            key={work.slug}
            title={work.title}
            description={work.description}
            image={work.image}
          />
        ))}
      </div>
    </DashboardSection>
  );
}
