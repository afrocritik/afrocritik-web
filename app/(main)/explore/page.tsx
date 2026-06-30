import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ArchiveBrowser } from "@/components/features/explore/ArchiveBrowser";
import { ExploreIdeasSection } from "@/components/features/explore/ExploreIdeasSection";
import { PopularInterestSection } from "@/components/features/home/PopularInterestSection";
import { ReportCTA } from "@/components/features/home/ReportCTA";
import { JoinNetworkCTA } from "@/components/features/home/JoinNetworkCTA";
import { api, getMediaUrl } from "@/lib/api";

export default async function ExplorePage() {
  // Signed-out visitors get a focused, gated archive: just the search + results.
  // The discovery/marketing sections (Ideas, Popular Interest, Report, Join the
  // Network) and the Refine sidebar are reserved for signed-in users. Resolved
  // server-side so there's no flash of the hidden sections.
  const session = await getServerSession(authOptions);
  const signedIn = !!session?.user;

  let homepage: any = null;
  try {
    homepage = await api.homepage();
  } catch {
    // API unreachable — sections fall back to their designed defaults
  }

  const popularInterests = Array.isArray(homepage?.popularInterestCategories)
    ? homepage.popularInterestCategories.map((c: any) => ({
        label: c.label ?? "",
        category: c.category,
        image: getMediaUrl(c.image) ?? "/EBOPI-Image-1.png",
      }))
    : [];

  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-primary" />}>
      {/* HERO + TABS + FILTER + RESULTS — single gradient, owns search state */}
      <ArchiveBrowser signedIn={signedIn} />

      {signedIn && (
        <>
          {/* EXPLORE IDEAS */}
          <ExploreIdeasSection />

          {/* POPULAR INTEREST */}
          <section className="bg-[#59341F] pt-32 pb-12">
            <div className="container">
              <PopularInterestSection interests={popularInterests} />
            </div>
          </section>

          {/* REPORT CTA */}
          <section className="relative overflow-hidden bg-gradient-to-b from-yellow-950 from-[18%] via-yellow-900 to-yellow-950">
            <ReportCTA report={homepage?.featuredReport} />
          </section>

          {/* JOIN NETWORK CTA */}
          <section className="bg-[#59341F] pt-32 pb-24">
            <JoinNetworkCTA cta={homepage?.cta} />
          </section>
        </>
      )}
    </Suspense>
  );
}
