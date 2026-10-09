import { Suspense } from "react";
import { ArchiveBrowser } from "@/components/features/explore/ArchiveBrowser";
import { ExploreIdeasSection } from "@/components/features/explore/ExploreIdeasSection";
import { PopularInterestSection } from "@/components/features/home/PopularInterestSection";
import { ReportCTA } from "@/components/features/home/ReportCTA";
import { JoinNetworkCTA } from "@/components/features/home/JoinNetworkCTA";
import { api, getMediaUrl } from "@/lib/api";
import { getFeaturedReport } from "@/lib/featuredReport";

export default async function ExplorePage() {
  // The explore page is fully open: signed-out visitors get the same archive,
  // filters and discovery sections as members. Sign-in is asked for when they
  // open a detail page past its preview.
  let homepage: any = null;
  try {
    homepage = await api.homepage();
  } catch {
    // API unreachable — sections fall back to their designed defaults
  }

  const featuredReport = await getFeaturedReport(homepage);

  const popularInterests = Array.isArray(homepage?.popularInterestCategories)
    ? homepage.popularInterestCategories.map((c: any) => ({
        label: c.label ?? "",
        category: c.category,
        image: getMediaUrl(c.image) ?? "/images/samples/asake-performing.png",
      }))
    : [];

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      {/* HERO + TABS + FILTER + RESULTS — single gradient, owns search state */}
      <ArchiveBrowser />

      {/* EXPLORE IDEAS */}
      <ExploreIdeasSection />

      {/* POPULAR INTEREST */}
      <section className="bg-[#59341F] pt-32 pb-12">
        <div className="container">
          <PopularInterestSection interests={popularInterests} />
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-950 via-yellow-900 to-yellow-950">
        <ReportCTA report={featuredReport} />
      </section>

      {/* JOIN NETWORK CTA */}
      <section className="bg-[#59341F] pt-32 pb-24">
        <JoinNetworkCTA cta={homepage?.cta} />
      </section>
    </Suspense>
  );
}
