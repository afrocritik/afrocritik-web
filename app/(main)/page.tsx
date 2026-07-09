import { HeroSection } from "@/components/features/home/HeroSection";
import { EssentialWorksSection } from "@/components/features/home/EssentialWorksSection";
import { PillarsSection } from "@/components/features/home/PillarsSection";
import { ThinkersSection } from "@/components/features/home/ThinkersSection";
import { IdeasSection } from "@/components/features/home/IdeasSection";
import { ReportCTA } from "@/components/features/home/ReportCTA";
import { EssentialWorksByTypeSection } from "@/components/features/home/EssentialWorksByTypeSection";
import { PopularInterestSection } from "@/components/features/home/PopularInterestSection";
import { KnowledgePipeline } from "@/components/features/home/KnowledgePipeline";
import { JoinNetworkCTA } from "@/components/features/home/JoinNetworkCTA";
import { api, getMediaUrl } from "@/lib/api";

// Regenerate the static homepage at most once a minute so admin-added content
// (and the newest-first fallbacks) surface promptly without rendering on every
// request. Data is fetched via axios, which Next can't track, so ISR at the
// route level is what keeps the page fresh.
export const revalidate = 60;

const BROWN_GRADIENT =
  "linear-gradient(180deg, #4D311D 17.79%, #794C2D 52.4%, #4D311D 95.19%)";

// Pull the newest rows from a collection when an editor hasn't curated a
// section. Failures degrade to an empty list so the homepage never breaks.
async function newest(
  list: (params?: Record<string, any>) => Promise<any>,
  limit: number,
  where?: Record<string, any>,
): Promise<any[]> {
  try {
    const res = await list({ limit, sort: "-createdAt", depth: 2, ...where });
    return res?.docs ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  let homepage: any = null;
  try {
    homepage = await api.homepage();
  } catch {
    // API unreachable — fall through to empty states
  }

  // Curated relationship lists take precedence; when an editor leaves one
  // empty we auto-populate it from the database, newest first — so any
  // content an admin adds surfaces on the landing page without extra steps.
  const curatedWorks: any[] = homepage?.featuredWorks ?? [];
  const curatedPeople: any[] = homepage?.featuredPeople ?? [];
  const curatedIdeas: any[] = homepage?.featuredIdeas ?? [];
  const curatedReport: any = homepage?.featuredReport ?? null;

  // "Essential Works In …" sections are admin-driven. Each row is bound to a
  // Work type; if the editor pinned specific works we use those, otherwise we
  // auto-fill with the newest published works of that type. With no rows
  // configured we fall back to the original Music + Literature sections.
  const sectionConfigs: { type: string; heading?: string; works: any[] }[] =
    Array.isArray(homepage?.essentialSections) && homepage.essentialSections.length
      ? homepage.essentialSections.map((s: any) => ({
          type: s?.type ?? "film",
          heading: s?.heading || undefined,
          works: Array.isArray(s?.works) ? s.works : [],
        }))
      : [
          { type: "music", works: [] },
          { type: "literature", works: [] },
        ];

  const [fallbackWorks, fallbackPeople, fallbackIdeas, fallbackReport, ...sectionFallbacks] =
    await Promise.all([
      curatedWorks.length
        ? Promise.resolve([])
        : newest(api.works.list, 8, {
            "where[type][not_in][0]": "music",
            "where[type][not_in][1]": "literature",
          }),
      curatedPeople.length ? Promise.resolve([]) : newest(api.people.list, 4),
      curatedIdeas.length ? Promise.resolve([]) : newest(api.ideas.list, 4),
      curatedReport ? Promise.resolve([]) : newest(api.reports.list, 1),
      ...sectionConfigs.map((s) =>
        s.works.length
          ? Promise.resolve([])
          : newest(api.works.list, 6, { "where[type][equals]": s.type }),
      ),
    ]);

  const essentialSections = sectionConfigs.map((s, i) => ({
    type: s.type,
    heading: s.heading,
    works: s.works.length ? s.works : sectionFallbacks[i] ?? [],
  }));

  const featuredWorks: any[] = curatedWorks.length ? curatedWorks : fallbackWorks;
  const featuredPeople: any[] = curatedPeople.length ? curatedPeople : fallbackPeople;
  const featuredIdeas: any[] = curatedIdeas.length ? curatedIdeas : fallbackIdeas;

  const hero = homepage?.hero;
  const stats: { value: string; label: string }[] = homepage?.stats ?? [];
  const suggestedSearches: string[] = Array.isArray(hero?.suggestedSearches)
    ? hero.suggestedSearches.map((s: any) => s?.term).filter(Boolean)
    : [];

  const pillars = Array.isArray(homepage?.fivePillars)
    ? homepage.fivePillars.map((p: any) => ({
        icon: getMediaUrl(p.icon) ?? "/TFP-Digital-Archive.png",
        title: p.title ?? "",
        desc: p.description ?? "",
      }))
    : [];

  const popularInterests = Array.isArray(homepage?.popularInterestCategories)
    ? homepage.popularInterestCategories.map((c: any) => ({
        label: c.label ?? "",
        category: c.category,
        image: getMediaUrl(c.image) ?? "/EBOPI-Image-1.png",
      }))
    : [];

  const cta = homepage?.cta;
  const featuredReport = curatedReport ?? fallbackReport[0] ?? null;

  return (
    <>
      {/* HERO + ESSENTIAL WORKS — single gradient flows across both */}
      <div style={{ background: BROWN_GRADIENT }}>
        <section className="relative overflow-hidden">
          <HeroSection
            hero={hero}
            suggestedSearches={suggestedSearches}
            stats={stats}
          />
        </section>
        <section className="relative overflow-hidden py-16">
          <EssentialWorksSection works={featuredWorks} />
        </section>
      </div>

      {/* FIVE PILLARS */}
      <section id="pillars" className="bg-cream-panel py-14 md:py-20">
        <div className="container">
          <PillarsSection pillars={pillars} />
        </div>
      </section>

      {/* THINKERS WHO BUILT THE FOUNDATIONS */}
      <section id="philosophy" className="bg-[#FAF3E5] py-14 md:py-20">
        <div className="container">
          <ThinkersSection people={featuredPeople} />
        </div>
      </section>

      {/* IDEAS THAT SHAPE THE CONTINENT */}
      <section className="bg-stone-100 py-14 md:py-20">
        <div className="container">
          <IdeasSection ideas={featuredIdeas} />
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-950 from 18% via-yellow-900 to-yellow-950">
        <ReportCTA report={featuredReport} />
      </section>

      {/* ESSENTIAL WORKS IN … (first admin-curated section) */}
      {essentialSections[0] && (
        <section className="relative overflow-hidden bg-[#794C2D] py-14 md:py-20">
          <EssentialWorksByTypeSection {...essentialSections[0]} />
        </section>
      )}

      {/* EXPLORE BASED ON POPULAR INTEREST */}
      <section className="bg-[#59341F] py-14 md:py-20">
        <div className="container">
          <PopularInterestSection interests={popularInterests} />
        </div>
      </section>

      {/* ESSENTIAL WORKS IN … (remaining admin-curated sections) */}
      {essentialSections.slice(1).map((section, i) => (
        <section
          key={`${section.type}-${i}`}
          className="relative overflow-hidden bg-[#59341F] py-14 md:py-20"
        >
          <EssentialWorksByTypeSection {...section} />
        </section>
      ))}

      {/* FROM CULTURE TO KNOWLEDGE */}
      <section className="bg-cream py-14 md:py-20">
        <div className="container">
          <KnowledgePipeline />
        </div>
      </section>

      {/* JOIN NETWORK CTA */}
      <section className="bg-[#59341F] py-14 md:py-20">
        <JoinNetworkCTA cta={cta} />
      </section>
    </>
  );
}
