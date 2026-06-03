import { MomentHeroSection } from "@/components/features/moments/MomentHeroSection";
import { MomentMediaRow } from "@/components/features/moments/MomentMediaRow";
import { RelatedMomentsSection } from "@/components/features/moments/RelatedMomentsSection";
import { MomentExploreMore } from "@/components/features/moments/MomentExploreMore";
import { MomentPioneersSection } from "@/components/features/moments/MomentPioneersSection";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function MomentDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const title = titleCase(params.slug || "nollywood-history");

  return (
    <div className="bg-[#160907]">
      <div className="container">
        {/* HERO — TOC + breadcrumb/header */}
        <MomentHeroSection title={title} />

        {/* PLAY VIDEO + PLAY AUDIO */}
        <MomentMediaRow />

        {/* RELATED MOMENTS */}
        <RelatedMomentsSection />

        {/* EXPLORE MORE RELATED WORKS */}
        <MomentExploreMore />

        {/* PIONEERS & ICONS */}
        <MomentPioneersSection />
      </div>
    </div>
  );
}
