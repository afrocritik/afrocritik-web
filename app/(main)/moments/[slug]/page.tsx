import Link from "next/link";
import { MomentHeroSection } from "@/components/features/moments/MomentHeroSection";
import { MomentMediaRow } from "@/components/features/moments/MomentMediaRow";
import { RelatedMomentsSection } from "@/components/features/moments/RelatedMomentsSection";
import { MomentExploreMore } from "@/components/features/moments/MomentExploreMore";
import { MomentPioneersSection } from "@/components/features/moments/MomentPioneersSection";
import { api, getMediaUrl } from "@/lib/api";

function resolveNames(arr: any[]): string[] {
  return arr
    .map((x: any) => (typeof x === "string" ? x : x?.name ?? ""))
    .filter(Boolean);
}

export default async function MomentDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  let moment: any = null;
  try {
    const res = await api.moments.bySlug(params.slug);
    moment = res?.docs?.[0] ?? null;
  } catch {
    // API unreachable
  }

  if (!moment) {
    return (
      <div className="bg-[#160907] min-h-screen">
        <div className="container py-20 text-center">
          <h1 className="text-white font-baskervville text-4xl">Moment not found</h1>
          <p className="text-orange-100/50 mt-4 font-inter">
            This moment has not been published yet or could not be found.
          </p>
          <Link
            href="/explore?tab=moments"
            className="mt-8 inline-block text-amber hover:underline font-inter"
          >
            Browse all moments →
          </Link>
        </div>
      </div>
    );
  }

  const title = moment.title ?? "";
  const summary = moment.summary ?? "";

  const countryNames = resolveNames(
    Array.isArray(moment.country) ? moment.country : moment.country ? [moment.country] : []
  );

  const meta = [
    moment.atAGlance?.origin && { label: "Origin", value: moment.atAGlance.origin },
    moment.typeLabel && { label: "Type", value: moment.typeLabel },
    moment.atAGlance?.period && { label: "Period", value: moment.atAGlance.period },
    !moment.atAGlance?.period && moment.year && { label: "Period", value: moment.year },
    countryNames.length > 0 && { label: "Country", value: countryNames.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  const relatedThemes = resolveNames(Array.isArray(moment.themes) ? moment.themes : []);

  const videos = Array.isArray(moment.videoArchive)
    ? moment.videoArchive.map((v: any, i: number) => ({
        id: `v${i}`,
        title: v.title ?? "",
        caption: v.caption,
        thumbnail: getMediaUrl(v.thumbnail),
        url: v.url ?? "",
      }))
    : [];

  const audioTracks = Array.isArray(moment.audioArchive)
    ? moment.audioArchive.map((a: any, i: number) => ({
        id: `track-${i}`,
        title: a.title ?? "",
        type: "Audio",
        views: "",
        subtitle: "",
        duration: a.duration ?? "",
        url: a.url ?? "",
      }))
    : [];

  const relatedMoments = Array.isArray(moment.relatedMoments)
    ? moment.relatedMoments
        .filter((m: any) => typeof m === "object")
        .map((m: any) => ({
          slug: m.slug ?? "",
          title: m.title ?? "",
          desc: m.summary,
          image: getMediaUrl(m.coverImage),
          tags: resolveNames(Array.isArray(m.country) ? m.country : []),
        }))
    : [];

  const pioneers = Array.isArray(moment.people)
    ? moment.people
        .filter((p: any) => typeof p === "object")
        .map((p: any) => {
          const roles: string[] = Array.isArray(p.role)
            ? p.role.map((r: string) => String(r).toUpperCase())
            : p.role
            ? [String(p.role).toUpperCase()]
            : [];
          const countries = resolveNames(
            Array.isArray(p.country) ? p.country : p.country ? [p.country] : []
          ).map((c) => c.toUpperCase());
          return {
            slug: p.slug,
            name: p.name ?? "",
            tags: [...roles, ...countries].slice(0, 2),
            image: getMediaUrl(p.photo),
          };
        })
    : [];

  const relatedWorks = Array.isArray(moment.works)
    ? moment.works
        .filter((w: any) => typeof w === "object")
        .map((w: any) => ({
          slug: w.slug ?? "",
          title: w.title ?? "",
          desc: w.cardDescription || w.summary,
        }))
    : [];

  return (
    <div className="bg-[#160907]">
      <div className="container">
        {/* HERO — TOC + breadcrumb/header */}
        <MomentHeroSection
          title={title}
          summary={summary}
          meta={meta}
          relatedThemes={relatedThemes}
        />

        {/* PLAY VIDEO + PLAY AUDIO */}
        <MomentMediaRow videos={videos} audioTracks={audioTracks} />

        {/* RELATED MOMENTS */}
        <RelatedMomentsSection moments={relatedMoments} />

        {/* EXPLORE MORE RELATED WORKS */}
        <MomentExploreMore related={relatedWorks} />

        {/* PIONEERS & ICONS */}
        <MomentPioneersSection people={pioneers} />
      </div>
    </div>
  );
}
