import { WorkHeroSection } from "@/components/features/works/WorkHeroSection";
import { WorkContextRow } from "@/components/features/works/WorkContextRow";
import { WorkAnchorRow } from "@/components/features/works/WorkAnchorRow";
import { WorkMediaRow } from "@/components/features/works/WorkMediaRow";
import { WorkInfoAside } from "@/components/features/works/WorkInfoAside";
import { EssentialFilmsSection } from "@/components/features/works/EssentialFilmsSection";
import { PioneersSection } from "@/components/features/works/PioneersSection";
import { ExploreMoreSection } from "@/components/features/works/ExploreMoreSection";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function IdeaDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const title = titleCase(params.slug || "nollywood-history");

  return (
    <div className="bg-[#160907]">
      <div className="container">
        {/* HERO — TOC + breadcrumb/header + image */}
        <WorkHeroSection
          title={title}
          sectionLabel="Ideas"
          sectionHref="/explore?tab=ideas"
        />

        {/* MAIN — left content column + right info aside */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start pb-4">
          {/* LEFT: stacked content — all sections share this column's width */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {/* TIMELINE: Key Moments */}
            <WorkContextRow />

            {/* ANCHOR YEAR */}
            <WorkAnchorRow />

            {/* WATCH VIDEO ARCHIVE (+ PLAY AUDIO slides in/out on the right) */}
            <WorkMediaRow />

            {/* ESSENTIAL NOLLYWOOD FILMS */}
            <EssentialFilmsSection />

            {/* PIONEERS & ICONS */}
            <PioneersSection />
          </div>

          {/* RIGHT: At a glance + Quick Facts + Related Works */}
          <WorkInfoAside />
        </div>

        {/* EXPLORE MORE RELATED IDEAS */}
        <ExploreMoreSection />
      </div>
    </div>
  );
}
