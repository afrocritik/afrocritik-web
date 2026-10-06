import Link from "next/link";
import { ViewTracker } from "@/components/common/ViewTracker";
import { PersonHero, type TocItem } from "@/components/features/people/PersonHero";
import {
  BiographyCard,
  ContributionCard,
  EssentialWorksCard,
  GlanceCard,
  PioneersCard,
  QuickFactsCard,
  RelatedIdeasCard,
  SelectedWorksCard,
} from "@/components/features/people/PersonSections";
import { ExploreMoreSection } from "@/components/features/works/ExploreMoreSection";
import { api, getMediaUrl } from "@/lib/api";
import { richTextToPlain } from "@/lib/richText";

function resolveNames(arr: any[]): string[] {
  return arr.map((x: any) => (typeof x === "string" ? x : x?.name ?? "")).filter(Boolean);
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const idOf = (x: any) => (typeof x === "object" ? x?.id : x);

// First sentence(s) of a longer text, trimmed to roughly `max` characters on a
// word boundary — the hero blurb, so it doesn't just repeat the full summary.
function excerpt(text: string, max = 240): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "));
  if (stop > max * 0.5) return cut.slice(0, stop + 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}


// A bento row whose columns adapt to which cards exist (a missing card never
// leaves an empty gap). Class strings are literal so Tailwind can generate them.
// Literal classes so Tailwind keeps them. Index = number of left-hand rows.
const SPAN = ["lg:row-span-1", "lg:row-span-1", "lg:row-span-2", "lg:row-span-3"];

async function safe<T>(p: Promise<T>): Promise<T | null> {
  try {
    return await p;
  } catch {
    return null;
  }
}

export default async function PersonDetailPage({ params }: { readonly params: { slug: string } }) {
  let person: any = null;
  try {
    const res = await api.people.bySlug(params.slug);
    person = res?.docs?.[0] ?? null;
  } catch {
    // API unreachable
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-[#160907]">
        <div className="container py-20 text-center">
          <h1 className="font-baskervville text-4xl text-white">Person not found</h1>
          <p className="mt-4 font-inter text-orange-100/50">
            This profile has not been published yet or could not be found.
          </p>
          <Link href="/explore?tab=people" className="mt-8 inline-block font-inter text-amber hover:underline">
            Browse all people →
          </Link>
        </div>
      </div>
    );
  }

  const name: string = person.name ?? "";
  const roleValues: string[] = Array.isArray(person.role) ? person.role : person.role ? [String(person.role)] : [];
  const roles = roleValues.map(cap);
  const countryNames = resolveNames(Array.isArray(person.country) ? person.country : person.country ? [person.country] : []);
  const themeNames = resolveNames(Array.isArray(person.themes) ? person.themes : []);
  const tagNames = resolveNames(Array.isArray(person.tags) ? person.tags : []);
  const topics = [...themeNames, ...tagNames].slice(0, 6);

  // "1938, Kampala, Uganda" → year 1938, place "Kampala, Uganda"
  const born = String(person.born ?? "");
  const died = String(person.died ?? "");
  const bornYear = born.split(",")[0].trim();
  const bornPlace = born.split(",").slice(1).join(",").trim();
  const origin = bornPlace || countryNames.join(", ");
  const period = bornYear && died ? `${bornYear} – ${died}` : bornYear ? `${bornYear} – Present` : died;

  const works: any[] = (Array.isArray(person.works) ? person.works : []).filter((w: any) => typeof w === "object");
  const ideas: any[] = (Array.isArray(person.ideas) ? person.ideas : []).filter((i: any) => typeof i === "object");
  const hasBio = richTextToPlain(person.biography).length > 0;

  // Related content, fetched in parallel; each degrades to nothing on failure.
  const themeIds = (Array.isArray(person.themes) ? person.themes : []).map(idOf).filter(Boolean);
  const ownWorkIds = new Set(works.map((w) => String(w.id)));
  const [peers, sameRole, relatedWorks, newestWorks] = await Promise.all([
    safe(api.people.list({ limit: 6, sort: "-createdAt", depth: 1, "where[status][equals]": "published" })),
    roleValues.length ? safe(api.archive({ type: "people", category: roleValues, limit: 6 })) : Promise.resolve(null),
    themeIds.length ? safe(api.archive({ type: "works", theme: themeIds.map(String), limit: 8 })) : Promise.resolve(null),
    safe(api.works.list({ limit: 8, sort: "-createdAt", depth: 1, "where[status][equals]": "published" })),
  ]);

  // Pioneers: people sharing a role with this person, topped up with the newest.
  const seen = new Set<string>([String(person.id)]);
  const pioneers: any[] = [];
  for (const p of [...(sameRole?.docs ?? []), ...(peers?.docs ?? [])]) {
    if (!seen.has(String(p.id))) {
      seen.add(String(p.id));
      pioneers.push(p);
    }
  }

  // Explore more: works sharing a theme, topped up with the newest; never ones
  // already shown on this page.
  const moreSeen = new Set<string>(ownWorkIds);
  const exploreMore: { slug: string; title: string; summary?: string }[] = [];
  for (const w of [...(relatedWorks?.docs ?? []), ...(newestWorks?.docs ?? [])]) {
    if (!moreSeen.has(String(w.id)) && w.slug) {
      moreSeen.add(String(w.id));
      exploreMore.push({ slug: w.slug, title: w.title ?? "", summary: w.cardDescription || w.summary });
    }
  }

  const essentialHeading = (() => {
    const types = new Set(works.map((w) => w.type).filter(Boolean));
    if (types.size === 1) {
      const t = [...types][0] as string;
      if (t === "film") return "Essential Nollywood Films";
      if (t === "music") return "Essential Music";
      if (t === "literature") return "Essential Literature";
    }
    return "Essential Works";
  })();

  const description = excerpt(person.summary || richTextToPlain(person.biography) || "");

  const meta = [
    origin && { label: "Origin", value: origin },
    roles.length > 0 && { label: "Type", value: roles.join(", ") },
    period && { label: "Period", value: period },
  ].filter(Boolean) as { label: string; value: string }[];

  const glance = [
    origin && { label: "Origin", value: origin },
    period && { label: "Period", value: period },
    themeNames.length > 0 && { label: "Key Focus", value: themeNames.slice(0, 3).join(", ") },
    countryNames.length > 0 && { label: "Country", value: countryNames.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  const quickFacts = [
    born && `Born: ${born}`,
    died && `Died: ${died}`,
    roles.length > 0 && `Known as: ${roles.join(", ")}`,
    countryNames.length > 0 && `Associated with ${countryNames.join(", ")}`,
    works.length > 0 && `${works.length} ${works.length === 1 ? "work" : "works"} in the archive`,
    ideas.length > 0 && `${ideas.length} ${ideas.length === 1 ? "idea" : "ideas"} explored`,
  ].filter(Boolean) as string[];

  const hasContribution = Boolean(person.summary || person.keyIdeas || person.knowledgeSovereignty);
  const toc: TocItem[] = [
    { id: "overview", label: "Overview" },
    hasContribution && { id: "core-contribution", label: "Core Contribution" },
    person.keyIdeas && { id: "key-ideas", label: "Key Ideas" },
    hasBio && { id: "impact-influence", label: "Impact & Influence" },
    works.length > 0 && { id: "selected-works", label: "Selected Works" },
    quickFacts.length > 0 && { id: "quick-facts", label: "Quick Facts" },
    pioneers.length > 0 && { id: "pioneers-icons", label: "Pioneers & Icons" },
    ideas.length > 0 && { id: "related-ideas", label: "Related Ideas" },
    exploreMore.length > 0 && { id: "further-reading", label: "Further Reading" },
  ].filter(Boolean) as TocItem[];

  const leftRows = [works.length > 0 || hasContribution, hasBio, pioneers.length > 0].filter(Boolean).length;
  const hasRight = glance.length > 0 || quickFacts.length > 0 || ideas.length > 0;
  const leftCol = works.length > 0 ? <SelectedWorksCard works={works} /> : null;

  return (
    <div className="bg-[#160907]">
      <ViewTracker collection="people" id={person.id} />
      <div className="container pb-16">
        <PersonHero
          personId={String(person.id)}
          slug={person.slug ?? params.slug}
          name={name}
          description={description}
          meta={meta}
          topics={topics}
          photo={getMediaUrl(person.photo)}
          toc={toc}
        />

        <div className="flex flex-col gap-4">
          {/* Left/centre cards form rows; the right-hand cards are one stack beside
              them (spanning those rows), each sized to its own content. */}
          <div className="grid gap-4 lg:grid-cols-[250px_minmax(0,1fr)_280px]">
            {leftCol && <div className="flex min-w-0 flex-col [&>*]:flex-1">{leftCol}</div>}
            {hasContribution && (
              <div className={`flex min-w-0 flex-col [&>*]:flex-1 ${leftCol ? "" : "lg:col-span-2"}`}>
                <ContributionCard
                  summary={person.summary}
                  keyIdeas={person.keyIdeas}
                  knowledgeSovereignty={person.knowledgeSovereignty}
                />
              </div>
            )}
            {hasBio && (
              <div className="min-w-0 lg:col-span-2">
                <BiographyCard biography={person.biography} />
              </div>
            )}
            {pioneers.length > 0 && (
              <div className="min-w-0 lg:col-span-2">
                <PioneersCard people={pioneers} />
              </div>
            )}
            {hasRight && (
              <div
                className={`flex min-w-0 flex-col gap-4 lg:col-start-3 lg:row-start-1 lg:self-start ${
                  SPAN[leftRows] ?? ""
                }`}
              >
                {glance.length > 0 && <GlanceCard rows={glance} />}
                {quickFacts.length > 0 && <QuickFactsCard facts={quickFacts} />}
                {ideas.length > 0 && <RelatedIdeasCard ideas={ideas} />}
              </div>
            )}
          </div>

          <EssentialWorksCard heading={essentialHeading} works={works} />
        </div>

        <ExploreMoreSection heading="Explore more related works" hrefBase="/works" related={exploreMore.slice(0, 3)} />
      </div>
    </div>
  );
}
