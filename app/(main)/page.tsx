import Link from "next/link";
import {
  Archive,
  PenLine,
  BarChart3,
  Database,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { IdeaCard } from "@/components/common/IdeaCard";
import { PersonCard } from "@/components/common/PersonCard";
import { HorizontalScroll } from "@/components/common/HorizontalScroll";
import { HeroSearch } from "@/components/features/home/HeroSearch";
import { StatsMarquee } from "@/components/features/home/StatsMarquee";

const SUGGESTED = ["Afrobeat", "Nollywood", "Négritude", "Chimamanda", "Fela Kuti"];

const ESSENTIAL_WORKS = [
  { title: "Fela: This Bitch of a Life", type: "Music", year: 1982, country: "Nigeria", rating: 4.8 },
  { title: "Things Fall Apart", type: "Literature", year: 1958, country: "Nigeria", rating: 4.9 },
  { title: "The Boy Who Harnessed the Wind", type: "Film", year: 2019, country: "Malawi", rating: 4.6 },
  { title: "Tsotsi", type: "Film", year: 2005, country: "South Africa", rating: 4.5 },
];

const PILLARS = [
  { icon: Archive, title: "Digital Archive", desc: "A living record of African creative works across film, music, and literature." },
  { icon: PenLine, title: "Critic & Journalist Development", desc: "Training the next generation of African cultural critics and writers." },
  { icon: BarChart3, title: "Ratings & Index", desc: "Structured evaluation of works through transparent cultural metrics." },
  { icon: Database, title: "Research & Data", desc: "Evidence-based intelligence on the forces shaping African culture." },
  { icon: BookOpen, title: "African Philosophy", desc: "Centering indigenous thought as the foundation of cultural criticism." },
];

const IDEAS = [
  { slug: "ubuntu", title: "Ubuntu", category: "Philosophy", subtitle: "I am because we are", excerpt: "A Nguni Bantu term describing the interconnectedness of humanity — a person is a person through other persons.", tags: ["Ethics", "Community"] },
  { slug: "sankofa", title: "Sankofa", category: "Symbolism", subtitle: "Return and fetch it", excerpt: "An Akan principle teaching that there is wisdom in learning from the past to build a better future.", tags: ["Heritage", "Akan"] },
  { slug: "maat", title: "Maat", category: "Cosmology", subtitle: "Truth, balance, order", excerpt: "The ancient Kemetic concept of cosmic harmony, justice, and the moral order of the universe.", tags: ["Justice", "Kemet"] },
  { slug: "negritude", title: "Négritude", category: "Movement", subtitle: "Reclaiming blackness", excerpt: "A literary and ideological movement reclaiming the value of Black identity and African culture.", tags: ["Literature", "Politics"] },
];

const THINKERS = [
  { name: "Wole Soyinka", role: "Playwright" },
  { name: "Chinua Achebe", role: "Novelist" },
  { name: "Ngũgĩ wa Thiong'o", role: "Author" },
  { name: "Achille Mbembe", role: "Philosopher" },
  { name: "Mariama Bâ", role: "Writer" },
  { name: "Kwame Nkrumah", role: "Theorist" },
];

const MUSIC = [
  { title: "Zombie", type: "Music", year: 1976, country: "Nigeria", rating: 4.9 },
  { title: "Lágbájá", type: "Music", year: 1991, country: "Nigeria", rating: 4.4 },
  { title: "Made in Lagos", type: "Music", year: 2020, country: "Nigeria", rating: 4.7 },
  { title: "Twice as Tall", type: "Music", year: 2020, country: "Nigeria", rating: 4.6 },
  { title: "Black Times", type: "Music", year: 2018, country: "Nigeria", rating: 4.5 },
];

const INTERESTS = ["Movies", "Literature", "Report", "Biography"];

const LITERATURE = [
  { title: "Purple Hibiscus", type: "Literature", year: 2003, country: "Nigeria", rating: 4.7 },
  { title: "So Long a Letter", type: "Literature", year: 1979, country: "Senegal", rating: 4.6 },
  { title: "Half of a Yellow Sun", type: "Literature", year: 2006, country: "Nigeria", rating: 4.9 },
  { title: "Weep Not, Child", type: "Literature", year: 1964, country: "Kenya", rating: 4.5 },
  { title: "Petals of Blood", type: "Literature", year: 1977, country: "Kenya", rating: 4.4 },
];

const KNOWLEDGE_STEPS = [
  { step: "01", title: "Culture Produced", desc: "Artists and creators across the continent generate new cultural works." },
  { step: "02", title: "Documented", desc: "Works are archived with rich metadata into the digital record." },
  { step: "03", title: "Criticized", desc: "Critics and scholars evaluate, contextualize, and interpret each work." },
  { step: "04", title: "Imparted", desc: "Structured knowledge is shared back with the public and researchers." },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-bg-secondary to-bg-primary">
        <div className="container flex flex-col items-center py-20 text-center md:py-28">
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            Building Africa&apos;s{" "}
            <span className="italic text-amber">Cultural Intelligence</span>{" "}
            Platform
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-ink-secondary md:text-base">
            The definitive archive and intelligence platform for African
            cultural criticism — across film, music, literature, and ideas.
          </p>
          <div className="mt-9 w-full max-w-2xl">
            <HeroSearch />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTED.map((s) => (
                <Link
                  key={s}
                  href={`/explore?q=${encodeURIComponent(s)}`}
                  className="rounded-full border border-amber-line bg-bg-card px-3.5 py-1.5 text-xs text-ink-secondary transition-colors hover:border-amber hover:text-white"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats marquee */}
        <StatsMarquee />
      </section>

      {/* ESSENTIAL WORKS */}
      <section className="bg-bg-primary py-16">
        <div className="container">
          <SectionHeading
            title="Essential Works"
            subtitle="Curated films, music, and literature that define the African cultural canon."
            linkText="See all works →"
            linkHref="/explore"
          />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {ESSENTIAL_WORKS.map((w) => (
              <WorkCard key={w.title} {...w} essential />
            ))}
          </div>
        </div>
      </section>

      {/* FIVE PILLARS */}
      <section id="pillars" className="bg-cream py-20">
        <div className="container">
          <SectionHeading
            theme="light"
            align="center"
            title="The Five Pillars"
            subtitle="The structural framework of the Afrocritik Institute — designed to sustain, scrutinize, and disseminate African cultural knowledge across generations."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col rounded-xl border border-black/10 bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-amber-soft text-amber">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink-dark">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5B4530]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THINKERS WHO BUILT THE FOUNDATIONS */}
      <section id="philosophy" className="bg-cream pb-20">
        <div className="container">
          <SectionHeading
            theme="light"
            title="The Thinkers Who Built The Foundations"
            subtitle="The scholars, critics, and writers whose ideas shape how we understand African culture today."
          />
          <div className="grid gap-6 rounded-2xl border border-black/10 bg-white p-6 md:p-8 lg:grid-cols-[280px_1fr]">
            <div className="flex flex-col">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
              <h3 className="mt-4 font-display text-2xl font-bold text-ink-dark">
                Paulin J. Hountondji
              </h3>
              <p className="text-sm text-[#8B6B4A]">
                Beninese Philosopher · 1942 – 2024
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Philosophy", "Epistemology", "Pan-Africanism"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#F0E6D0] px-2.5 py-0.5 text-[10px] font-medium text-[#6B4A2A]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="font-display text-base font-bold text-amber">
                  Core Contribution
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5B4530]">
                  Hountondji challenged the notion of a collective, unanimous
                  &quot;African philosophy,&quot; arguing instead for rigorous,
                  individual, scientific inquiry. His critique of
                  ethnophilosophy reshaped the discipline across the continent.
                </p>
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-amber">
                  Key Ideas
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5B4530]">
                  He distinguished philosophy as a critical practice from folk
                  worldviews, and championed the idea of endogenous knowledge —
                  locally grounded scholarship serving African societies.
                </p>
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-amber">
                  Knowledge Sovereignty
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5B4530]">
                  His later work focused on building autonomous research
                  infrastructure so African scholars could set their own
                  intellectual agendas.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-black/10 pt-4">
                {[
                  "African Philosophy",
                  "Ethnophilosophy",
                  "Decolonial Thought",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-black/10 px-3 py-1 text-xs text-[#6B4A2A]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IDEAS THAT SHAPE THE CONTINENT */}
      <section className="bg-cream pb-20">
        <div className="container">
          <SectionHeading
            theme="light"
            title="Ideas That Shape The Continent"
            subtitle="Concepts, philosophies, and movements that continue to define African thought."
            linkText="Explore all ideas →"
            linkHref="/explore?tab=ideas"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {IDEAS.map((idea) => (
              <IdeaCard key={idea.slug} {...idea} theme="light" />
            ))}
          </div>
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="bg-bg-secondary py-16">
        <div className="container">
          <div className="flex flex-col items-center gap-8 rounded-2xl border border-amber-line bg-bg-card p-6 md:flex-row md:p-10">
            <div className="flex aspect-[3/4] w-48 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber to-[#7A4A12] p-4 text-center font-display text-xl font-bold text-white">
              The Afrocritik Report 2025
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber">
                The Afrocritik Report
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
                What The Report Signals
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-secondary">
                Each year, the Afrocritik Report maps the cultural forces
                shaping Africa and its diaspora — the breakthroughs, the
                ruptures, and the tensions that define the moment.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Digital Renaissance",
                  "Global Crossover",
                  "Archive Deficit",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-amber px-3 py-1 text-xs text-amber"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Button
                asChild
                className="mt-6 rounded-md bg-amber px-7 text-white hover:bg-amber-hover"
              >
                <Link href="/explore?tab=reports">View Report</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ESSENTIAL WORKS IN MUSIC */}
      <section className="bg-bg-primary py-16">
        <div className="container">
          <SectionHeading
            title="Essential Works In Music"
            linkText="Explore music →"
            linkHref="/explore?q=music"
          />
          <HorizontalScroll>
            {MUSIC.map((w) => (
              <div key={w.title} className="w-[200px] shrink-0">
                <WorkCard {...w} essential />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* EXPLORE BY POPULAR INTEREST */}
      <section className="bg-bg-primary pb-16">
        <div className="container">
          <SectionHeading
            title="Explore Based On Popular Interest"
            linkText="See more →"
            linkHref="/explore"
          />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {INTERESTS.map((interest) => (
              <Link
                key={interest}
                href={`/explore?q=${interest.toLowerCase()}`}
                className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xl border border-amber-line bg-gradient-to-br from-[#3D1F00] to-[#1C0A00]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="relative z-10 p-4 font-display text-lg font-bold text-white">
                  {interest}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ESSENTIAL WORKS IN LITERATURE */}
      <section className="bg-bg-primary pb-16">
        <div className="container">
          <SectionHeading
            title="Essential Works In Literature"
            linkText="Explore literature →"
            linkHref="/explore?q=literature"
          />
          <HorizontalScroll>
            {LITERATURE.map((w) => (
              <div key={w.title} className="w-[200px] shrink-0">
                <WorkCard {...w} essential />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* THINKERS CAROUSEL */}
      <section className="bg-bg-primary pb-16">
        <div className="container">
          <SectionHeading
            title="Voices of African Thought"
            linkText="Browse people →"
            linkHref="/explore?tab=people"
          />
          <HorizontalScroll>
            {THINKERS.map((p) => (
              <div key={p.name} className="w-[150px] shrink-0">
                <PersonCard {...p} />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* FROM CULTURE TO KNOWLEDGE */}
      <section className="bg-cream py-20">
        <div className="container">
          <SectionHeading
            theme="light"
            align="center"
            title="From Culture To Knowledge"
            subtitle="How African creative output becomes structured, durable cultural intelligence."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {KNOWLEDGE_STEPS.map((s, i) => (
              <div
                key={s.title}
                className="relative flex flex-col rounded-xl border border-black/10 bg-white p-5"
              >
                <span className="font-display text-3xl font-bold text-amber/40">
                  {s.step}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink-dark">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5B4530]">
                  {s.desc}
                </p>
                {i < KNOWLEDGE_STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-3.5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-amber lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN NETWORK CTA */}
      <section className="bg-bg-secondary py-20">
        <div className="container flex flex-col items-center text-center">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-white md:text-4xl">
            Join The Network Building Africa&apos;s Cultural Infrastructure
          </h2>
          <p className="mt-4 max-w-xl text-sm text-ink-secondary">
            Whether you&apos;re a scholar, critic, funder, or creative — the
            Afrocritik Institute is building something that must exist. The
            question is whether you&apos;ll help shape it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              className="rounded-md bg-amber px-7 text-white hover:bg-amber-hover"
            >
              <Link href="/signup">Subscribe</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-md border-amber bg-transparent px-7 text-amber hover:bg-amber-soft"
            >
              <Link href="/signup">Become a Contributor</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-md border-amber-line bg-transparent px-7 text-white hover:bg-amber-soft"
            >
              <Link href="#">Partner with Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
