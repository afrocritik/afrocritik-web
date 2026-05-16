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

const SUGGESTED = ["Nollywood", "Afrobeat", "Fela", "Wizkid", "Reports", "Chimamanda"];

const EW_TAGS       = ["NIGERIA", "AFROBEAT", "MUSIC"];
const EW_TITLE      = "Lorem ipsum dolor sit amet consect etur neque";
const EW_DESC       = "Lorem ipsum dolor sit amet sectetur Vivamus ner neque tempus....";
const EW_HOVER_DESC = "Lorem ipsum dolor sit amet consectetur. Vivamus neque tempus ut ultricies porttitor pretium amet. Scelerisque ut tristique dolor elementum eque tempus.";
const EW_BADGE      = "ALBUM REVIEW";

const ESSENTIAL_WORKS = [
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Music",      year: 1982, country: "Nigeria",      rating: 4.8, image: "/EW-Image-1.png" },
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Literature", year: 1958, country: "Nigeria",      rating: 4.9, image: "/EW-Image-2.png" },
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Film",       year: 2019, country: "Malawi",       rating: 4.6, image: "/EW-Image-3.png" },
  { title: EW_TITLE, description: EW_DESC, hoverDescription: EW_HOVER_DESC, badge: EW_BADGE, tags: EW_TAGS, type: "Film",       year: 2005, country: "South Africa", rating: 4.5, image: "/EW-Image-4.jpg" },
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
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #4D311D 17.79%, #794C2D 52.4%, #4D311D 95.19%)",
        }}
      >
        <div className="container flex flex-col items-center py-12 text-center md:py-16">
          <h1
            style={{
              width: "789px",
              fontFamily: "Baskerville",
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "110%",
              textTransform: "capitalize",
              color: "#FFF",
              textAlign: "center",
            }}
          >
            Building Africa&apos;s<br />
            <span style={{ color: "#C4963C" }}>Cultural Intelligence</span> Platform
          </h1>
          <p
            className="mt-5 font-semibold leading-[110%]"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              textTransform: "capitalize",
              color: "#F3E5D0",
            }}
          >
            connecting works, ideas, and people across African culture.
          </p>
          <div className="mt-9 w-full" style={{ maxWidth: "888px" }}>
            <HeroSearch />
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTED.map((s) => (
                <Link
                  key={s}
                  href={`/explore?q=${encodeURIComponent(s)}`}
                  className="inline-flex items-center"
                  style={{
                    height: "36px",
                    padding: "8px 10px",
                    gap: "8px",
                    borderRadius: "10px",
                    border: "1px solid #9C5C08",
                    background: "rgba(65, 40, 23, 0.40)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "15px",
                      fontWeight: 400,
                      lineHeight: "140%",
                      textTransform: "capitalize",
                      color: "#FFF",
                      opacity: 0.2,
                    }}
                  >
                    {s}
                  </span>
                  <div
                    style={{
                      width: "8.091px",
                      height: "11px",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <path
                        d="M0.500061 0.500061L8.59097 6.16673L0.500061 11.5001"
                        stroke="#9C5C08"
                        strokeWidth="1px"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Stats marquee */}
        <StatsMarquee />
      </section>

      {/* ESSENTIAL WORKS */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #4D311D 17.79%, #794C2D 52.4%, #4D311D 95.19%)",
        }}
        className="relative overflow-hidden py-16"
      >
        <div className="container">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              style={{
                maxWidth: "356px",
                color: "#FFF",
                fontFamily: "var(--font-montserrat)",
                fontSize: "36px",
                fontWeight: 500,
                lineHeight: "110%",
                textTransform: "capitalize",
              }}
            >
              Essential Works
            </h2>
            <Link
              href="/explore"
              className="shrink-0"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <span
                style={{
                  display: "flex",
                  padding: "8px 12px",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  color: "#EFE4D6",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                View All
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 11 11"
                fill="none"
                style={{ width: "9.333px", height: "9.333px", flexShrink: 0 }}
              >
                <path
                  d="M0.799999 5.46665H10.1333M5.46667 10.1333L10.1333 5.46665L5.46667 0.799988"
                  stroke="#EFE4D6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <div className="flex gap-5 overflow-x-auto lg:overflow-x-visible">
              {ESSENTIAL_WORKS.map((w) => (
                <WorkCard key={w.title} {...w} essential />
              ))}
            </div>
            {/* Next button — bleeds off the right edge of the page */}
            <button
              aria-label="Next"
              className="absolute hidden lg:flex items-center justify-center"
              style={{
                top: "50%",
                right: "-36px",
                transform: "translateY(-50%)",
                width: "73px",
                height: "197px",
                borderRadius: "12px",
                background: "rgba(35, 23, 6, 0.40)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="28"
                  viewBox="0 0 16 28"
                  fill="none"
                >
                  <path
                    d="M2 26L14 14L2 2"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
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
