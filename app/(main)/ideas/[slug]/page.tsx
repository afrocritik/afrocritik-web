import Link from "next/link";
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

  const meta = [
    idea.category && { label: "Category", value: idea.category.replace(/-/g, " & ").replace(/\b\w/g, (c: string) => c.toUpperCase()) },
    idea.typeLabel && { label: "Type", value: idea.typeLabel },
    countryNames.length > 0 && { label: "Origin", value: countryNames.join(", ") },
    idea.period && { label: "Period", value: idea.period },
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
    idea.origin && { label: "Origin", value: idea.origin },
    idea.period && { label: "Period", value: idea.period },
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

  const relatedWorks = Array.isArray(idea.works)
    ? idea.works.map((r: any) => ({
        slug: r.slug ?? "",
        title: r.title ?? "",
        summary: r.summary || r.cardDescription,
      }))
    : [];

  return (
    <div className="bg-[#160907]">
      <div className="container">
        <WorkHeroSection
          title={title}
          sectionLabel="Ideas"
          sectionHref="/explore?tab=ideas"
          description={description}
          image={image}
          meta={meta}
          relatedThemes={relatedThemes}
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start pb-4">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <WorkContextRow workTitle={title} timeline={timeline} />
            <WorkMediaRow videoArchive={videoArchive} audioArchive={audioArchive} />
          </div>

          <WorkInfoAside atAGlance={atAGlance} />
        </div>

        <ExploreMoreSection
          heading="Explore related works"
          hrefBase="/works"
          related={relatedWorks}
        />
      </div>
    </div>
  );
}
