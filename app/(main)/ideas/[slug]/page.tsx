import { IdeaHeroSection } from "@/components/features/ideas/IdeaHeroSection";
import { IdeaContextRow } from "@/components/features/ideas/IdeaContextRow";
import { IdeaAnchorRow } from "@/components/features/ideas/IdeaAnchorRow";
import { IdeaMediaRow } from "@/components/features/ideas/IdeaMediaRow";
import { EssentialFilmsSection } from "@/components/features/ideas/EssentialFilmsSection";
import { PioneersSection } from "@/components/features/ideas/PioneersSection";
import { IdeaImpactSection } from "@/components/features/ideas/IdeaImpactSection";
import { ExploreMoreSection } from "@/components/features/ideas/ExploreMoreSection";

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
        <IdeaHeroSection title={title} />

        {/* RELATED IDEAS + TIMELINE + AT A GLANCE */}
        <IdeaContextRow />

        {/* ANCHOR YEAR + QUICK FACTS + RELATED WORKS */}
        <IdeaAnchorRow />

        {/* WATCH VIDEO ARCHIVE + PLAY AUDIO */}
        <IdeaMediaRow />

        {/* ESSENTIAL NOLLYWOOD FILMS */}
        <EssentialFilmsSection />

        {/* PIONEERS & ICONS */}
        <PioneersSection />

        {/* IMPACT CONTEXT */}
        <IdeaImpactSection />

        {/* EXPLORE MORE RELATED WORKS */}
        <ExploreMoreSection />
      </div>
    </div>
  );
}
