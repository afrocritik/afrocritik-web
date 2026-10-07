import Link from "next/link";
import { ViewTracker } from "@/components/common/ViewTracker";
import { WorkHeroSection } from "@/components/features/works/WorkHeroSection";
import { WorkContextRow } from "@/components/features/works/WorkContextRow";
import { WorkMediaRow } from "@/components/features/works/WorkMediaRow";
import { WorkInfoAside } from "@/components/features/works/WorkInfoAside";
import { ExploreMoreSection } from "@/components/features/works/ExploreMoreSection";
import { api, getMediaUrl } from "@/lib/api";

function resolveNames(arr: any[]): string[] {
  return arr
    .map((x: any) => (typeof x === "string" ? x : x?.name ?? ""))
    .filter(Boolean);
}

export default async function IdeaDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  let idea: any = null;
  try {
    const res = await api.ideas.bySlug(params.slug);
    idea = res?.docs?.[0] ?? null;
  } catch {
    // API unreachable
  }

  if (!idea) {
    return (
      <div className="bg-[#160907] min-h-screen">
        <div className="container py-20 text-center">
          <h1 className="text-white font-baskervville text-4xl">Idea not found</h1>
          <p className="text-orange-100/50 mt-4 font-inter">
            This idea has not been published yet or could not be found.
          </p>
          <Link href="/explore?tab=ideas" className="mt-8 inline-block text-amber hover:underline font-inter">
            Browse all ideas →
          </Link>
        </div>
      </div>
    );
  }

  const title = idea.title ?? "";
  const description = idea.summary ?? "";
  const image = getMediaUrl(idea.coverImage);

  const countryNames = resolveNames(
    Array.isArray(idea.country) ? idea.country : idea.country ? [idea.country] : []
  );

  const origin = idea.atAGlance?.origin || countryNames.join(", ");
  const period = idea.atAGlance?.period;

  // Hero row per Figma: Origin / Type / Period.
  const meta = [
    origin && { label: "Origin", value: origin },
    idea.typeLabel && { label: "Type", value: idea.typeLabel },
    period && { label: "Period", value: period },
  ].filter(Boolean) as { label: string; value: string }[];

  const relatedThemes = resolveNames(Array.isArray(idea.themes) ? idea.themes : []);

  const timeline = Array.isArray(idea.timeline)
    ? idea.timeline.map((t: any) => ({
        year: String(t.year ?? ""),
        label: t.label ?? "",
        description: typeof t.description === "string" ? t.description : undefined,
      }))
    : [];

  const atAGlance = [
    idea.atAGlance?.origin && { label: "Origin", value: idea.atAGlance.origin },
    idea.atAGlance?.period && { label: "Period", value: idea.atAGlance.period },
    countryNames.length > 0 && { label: "Country", value: countryNames.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  const videoArchive = Array.isArray(idea.videoArchive)
    ? idea.videoArchive.map((v: any, i: number) => ({
        id: `v${i}`,
        title: v.title ?? "",
        url: v.url ?? "",
        thumbnail: getMediaUrl(v.thumbnail),
        duration: v.duration,
      }))
    : [];

  const audioArchive = Array.isArray(idea.audioArchive)
    ? idea.audioArchive.map((a: any, i: number) => ({
        id: `track-${i}`,
        title: a.title ?? "",
        url: a.url ?? "",
        duration: a.duration,
      }))
    : [];

  const relatedIdeas = Array.isArray(idea.relatedIdeas)
    ? idea.relatedIdeas
        .filter((r: any) => r && typeof r === "object" && r.slug)
        .map((r: any) => ({
          slug: r.slug ?? "",
          title: r.title ?? "",
          summary: r.summary || r.cardDescription,
        }))
    : [];

  const toc = [
    { id: "overview", label: "Overview" },
    timeline.length > 0 && { id: "key-moments", label: "Key Moments" },
    (videoArchive.length > 0 || audioArchive.length > 0) && { id: "media-archive", label: "Media Archive" },
    relatedIdeas.length > 0 && { id: "further-reading", label: "Related Ideas" },
  ].filter(Boolean) as { id: string; label: string }[];

  return (
    <div className="bg-[#160907]">
      <ViewTracker collection="ideas" id={idea.id} />
      <div className="container">
        <WorkHeroSection
          title={title}
          workId={idea.id}
          slug={idea.slug}
          saveKind="idea"
          sectionLabel="Ideas"
          sectionHref="/explore?tab=ideas"
          description={description}
          image={image}
          meta={meta}
          relatedThemes={relatedThemes}
          toc={toc}
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start pb-4">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <WorkContextRow workTitle={title} timeline={timeline} />
            <WorkMediaRow videoArchive={videoArchive} audioArchive={audioArchive} />
          </div>

          <WorkInfoAside atAGlance={atAGlance} />
        </div>

        <ExploreMoreSection
          heading="Explore Related Ideas"
          hrefBase="/ideas"
          related={relatedIdeas}
        />
      </div>
    </div>
  );
}
