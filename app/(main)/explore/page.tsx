import { Suspense } from "react";
import { ArchiveBrowser } from "@/components/features/explore/ArchiveBrowser";
import { ExploreIdeasSection } from "@/components/features/explore/ExploreIdeasSection";
import { PopularInterestSection } from "@/components/features/home/PopularInterestSection";
import { ReportCTA } from "@/components/features/home/ReportCTA";
import { JoinNetworkCTA } from "@/components/features/home/JoinNetworkCTA";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      {/* HERO + TABS + FILTER + RESULTS — single gradient, owns search state */}
      <ArchiveBrowser />

      {/* EXPLORE IDEAS */}
      <ExploreIdeasSection />

      {/* POPULAR INTEREST */}
      <section className="bg-[#59341F] pt-32 pb-12">
        <div className="container">
          <PopularInterestSection />
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-950 from-[18%] via-yellow-900 to-yellow-950">
        <ReportCTA />
      </section>

      {/* JOIN NETWORK CTA */}
      <section className="bg-[#59341F] pt-32 pb-24">
        <JoinNetworkCTA />
      </section>
    </Suspense>
  );
}
