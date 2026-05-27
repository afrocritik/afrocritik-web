import { DashboardSection } from "./DashboardSection";
import { FeaturedWorkCard } from "./FeaturedWorkCard";
import { FEATURED_WORKS } from "./constants";

export function FeaturedWorksSection() {
  return (
    <DashboardSection title="Featured Works" viewAllHref="/explore" card>
      <div className="flex gap-3">
        {FEATURED_WORKS.map((work) => (
          <FeaturedWorkCard key={work.slug} {...work} />
        ))}
      </div>
    </DashboardSection>
  );
}
