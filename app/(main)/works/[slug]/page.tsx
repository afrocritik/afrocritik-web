import Link from "next/link";
import { ViewTracker } from "@/components/common/ViewTracker";
import { WorkHeroSection } from "@/components/features/works/WorkHeroSection";
import { WorkContextRow } from "@/components/features/works/WorkContextRow";
import { WorkAnchorRow } from "@/components/features/works/WorkAnchorRow";
import { WorkMediaRow } from "@/components/features/works/WorkMediaRow";
import { WorkInfoAside } from "@/components/features/works/WorkInfoAside";
import { EssentialFilmsSection } from "@/components/features/works/EssentialFilmsSection";
import { PioneersSection } from "@/components/features/works/PioneersSection";
import { ExploreMoreSection } from "@/components/features/works/ExploreMoreSection";
import { api, getMediaUrl } from "@/lib/api";

function resolveNames(arr: any[]): string[] {
  return arr
    .map((x: any) => (typeof x === "string" ? x : x?.name ?? ""))
    .filter(Boolean);
}

export default async function WorkDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  let work: any = null;
  try {
    const res = await api.works.bySlug(params.slug);
    work = res?.docs?.[0] ?? null;
  } catch {
    // API unreachable
  }

  if (!work) {
    return (
      <div className="bg-[#160907] min-h-screen">
        <div className="container py-20 text-center">
          <h1 className="text-white font-baskervville text-4xl">Work not found</h1>
          <p className="text-orange-100/50 mt-4 font-inter">
            This work has not been published yet or could not be found.
          </p>
          <Link href="/explore" className="mt-8 inline-block text-amber hover:underline font-inter">
            Browse all works →
          </Link>
        </div>
      </div>
    );
  }

  const title = work.title ?? "";
  const description = work.cardDescription || work.summary || "";
  const image = getMediaUrl(work.coverImage);

  const countryNames = resolveNames(
    Array.isArray(work.country) ? work.country : work.country ? [work.country] : []
  );

  const meta = [
    work.atAGlance?.origin && { label: "Origin", value: work.atAGlance.origin },
    work.type && { label: "Type", value: work.type.charAt(0).toUpperCase() + work.type.slice(1) },
    work.atAGlance?.period && { label: "Period", value: work.atAGlance.period },
    countryNames.length > 0 && { label: "Country", value: countryNames.join(", ") },
    work.year && { label: "Year", value: String(work.year) },
  ].filter(Boolean) as { label: string; value: string }[];

  const relatedThemes = resolveNames(Array.isArray(work.themes) ? work.themes : []);

  const timeline = Array.isArray(work.timeline)
    ? work.timeline.map((t: any) => ({
        year: String(t.year ?? ""),
        label: t.label ?? "",
        description: typeof t.description === "string" ? t.description : undefined,
      }))
    : [];

  const atAGlance = [
    work.atAGlance?.origin && { label: "Origin", value: work.atAGlance.origin },
    work.atAGlance?.period && { label: "Period", value: work.atAGlance.period },
    work.atAGlance?.region && { label: "Region", value: work.atAGlance.region },
    work.atAGlance?.keyFocus && { label: "Key Focus", value: work.atAGlance.keyFocus },
    work.atAGlance?.globalImpact && { label: "Global Impact", value: work.atAGlance.globalImpact },
  ].filter(Boolean) as { label: string; value: string }[];

  const quickFacts = Array.isArray(work.quickFacts)
    ? work.quickFacts.map((f: any) => `${f.label}: ${f.value}`)
    : [];

  const asideRelatedWorks = Array.isArray(work.relatedWorks)
    ? work.relatedWorks.map((r: any) => ({
        title: r.title ?? "",
        year: r.year,
        slug: r.slug ?? "",
      }))
    : [];

  const essentialWorks = Array.isArray(work.essentialWorks) ? work.essentialWorks : [];
  const pioneers = Array.isArray(work.people) ? work.people : [];

  const videoArchive = Array.isArray(work.videoArchive)
    ? work.videoArchive.map((v: any, i: number) => ({
        id: `v${i}`,
        title: v.title ?? "",
        url: v.url ?? "",
        thumbnail: getMediaUrl(v.thumbnail),
        duration: v.duration,
      }))
    : [];

  const audioArchive = Array.isArray(work.audioArchive)
    ? work.audioArchive.map((a: any, i: number) => ({
        id: `track-${i}`,
        title: a.title ?? "",
        url: a.url ?? "",
        duration: a.duration,
      }))
    : [];

  const exploreMore = Array.isArray(work.relatedWorks)
    ? work.relatedWorks.map((r: any) => ({
        slug: r.slug ?? "",
        title: r.title ?? "",
        summary: r.summary || r.cardDescription,
      }))
    : [];

  return (
    <div className="bg-[#160907]">
      <ViewTracker collection="works" id={work.id} />
      <div className="container">
        <WorkHeroSection
          title={title}
          description={description}
          image={image}
          meta={meta}
          relatedThemes={relatedThemes}
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start pb-4">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <WorkContextRow workTitle={title} timeline={timeline} />
            <WorkAnchorRow
              heading={work.anchor?.heading}
              subheading={work.anchor?.subheading}
              body={typeof work.anchor?.body === "string" ? work.anchor.body : undefined}
            />
            <WorkMediaRow videoArchive={videoArchive} audioArchive={audioArchive} />
            <EssentialFilmsSection
              heading={`Essential ${work.type ? work.type.charAt(0).toUpperCase() + work.type.slice(1) : "Works"}`}
              works={essentialWorks}
            />
            <PioneersSection people={pioneers} />
          </div>

          <WorkInfoAside
            atAGlance={atAGlance}
            quickFacts={quickFacts}
            relatedWorks={asideRelatedWorks}
          />
        </div>

        <ExploreMoreSection
          heading="Explore more related works"
          hrefBase="/works"
          related={exploreMore}
        />
      </div>
    </div>
  );
}
