import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { HeroSearch } from "@/components/features/home/HeroSearch";
import { StatsMarquee } from "@/components/features/home/StatsMarquee";
import { ThinkersSection } from "@/components/features/home/ThinkersSection";
import { IdeasSection } from "@/components/features/home/IdeasSection";

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
  { icon: "/TFP-Digital-Archive.png", title: "Digital Archive", desc: "A comprehensive, searchable database of African cultural works and critical analysis — the continent's cultural memory." },
  { icon: "/TFP-Critic.svg", title: "Critic & Journalist Development", desc: "Fellowships, mentorship, and editorial support for the next generation of African cultural critics and journalists." },
  { icon: "/TFP-Ratings.svg", title: "Ratings & Index", desc: "Structured evaluation frameworks that bring transparency and rigor to African cultural assessment." },
  { icon: "/TFP-Research.svg", title: "Research & Data", desc: "Annual reports, trend analysis, and data-driven cultural research that maps the continent's creative trajectory." },
  { icon: "/TFP-Philosophy.svg", title: "African Philosophy", desc: "Documenting and connecting the philosophical traditions — Ubuntu, Négritude, Maat, Sankofa, Omolúàbí — that undergird African cultural production." },
];

const EWIM_MUSIC = [
  {
    title: "How to stay relevant in the music industry",
    author: "Emmanuel Ogunjobi",
    badge: "ALBUM",
    tags: ["NIGERIA", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIM-Image-1.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "ALBUM REVIEW",
    tags: ["NIGERIA", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIM-Image-2.png",
  },
  {
    title: "Hard work is not a substitute",
    author: "Davido",
    badge: "BIOGRAPHY",
    tags: ["CELEBRITY", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIM-Image-3.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "LITERATURE",
    tags: ["WRITER", "POLITICS", "POETRY"],
    rating: 9.8,
    image: "/EWIM-Image-4.png",
  },
];

const INTERESTS = ["Movies", "Literature", "Report", "Biography"];

const EWIL_LITERATURE = [
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["PROTEST", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIL-Image-1.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["LITERATURE", "COLONIALISM"],
    rating: 9.8,
    image: "/EWIL-Image-2.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["NOLLYWOOD", "SEASONS", "CAST & CREW"],
    rating: 9.8,
    image: "/EWIL-Image-3.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["CELEBRITY", "AFROBEAT", "MUSIC"],
    rating: 9.8,
    image: "/EWIL-Image-4.png",
  },
  {
    title: "Lorem ipsum dolor sit amet consec",
    author: "Criticker",
    badge: "Book Review",
    tags: ["WRITER", "POLITICS", "POETRY"],
    rating: 9.8,
    image: "/EWIL-Image-5.png",
  },
];

const KNOWLEDGE_STEPS = [
  { step: "01", title: "Culture Produced", desc: "Artists and creators across the continent generate new cultural works." },
  { step: "02", title: "Documented", desc: "Works are archived with rich metadata into the digital record." },
  { step: "03", title: "Criticized", desc: "Critics and scholars evaluate, contextualize, and interpret each work." },
  { step: "04", title: "Imparted", desc: "Structured knowledge is shared back with the public and researchers." },
  { step: "05", title: "Indexed", desc: "Works enter the searchable archive, permanently accessible to all." },
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
            Building Africa&apos;s
            <br />
            <span style={{ color: "#C4963C" }}>Cultural Intelligence</span>{" "}
            Platform
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
              className="shrink-0 md:-mr-6"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
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
        </div>
        {/* Full-width row so the NEXT button can bleed off the viewport right edge */}
        <div className="relative" style={{ minHeight: "395px" }}>
          <div
            className="flex gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            {ESSENTIAL_WORKS.map((w) => (
              <WorkCard key={w.title} {...w} essential />
            ))}
          </div>
          {/* NEXT button — chevron visible at viewport right edge, dark rectangle bleeds off */}
          <button
            aria-label="Next"
            className="absolute hidden lg:flex items-center justify-center"
            style={{
              top: "30%",
              right: "-24px",
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
      </section>

      {/* FIVE PILLARS */}
      <section
        id="pillars"
        className="bg-cream-panel pt-14 pb-20 md:pt-20 md:pb-28"
      >
        <div className="container">
          {/* Heading */}
          <div className="flex flex-col">
            <span className="font-hedvig text-sm font-normal capitalize leading-[110%] text-[#ED9828]">
              Institutional Backbone
            </span>
            <h2 className="mt-3 max-w-[607px] font-baskervville text-[40px] font-bold capitalize leading-[110%] text-[#330F09]">
              The Five Pillars
            </h2>
            <p className="mt-3 flex h-[86px] max-w-[622px] flex-col justify-center font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
              The structural foundation of the Afrocritik Institute — designed
              to sustain, develop, and systematize African cultural knowledge
              for generations.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-10 flex flex-wrap justify-start gap-5">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex h-[279px] w-[218px] flex-col items-center gap-3 rounded-[15.409px] bg-white px-4 py-6"
              >
                <Image
                  src={p.icon}
                  alt={p.title}
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <h3 className="w-[180px] text-center font-baskervville text-[18px] font-bold leading-[120%] tracking-[-0.36px] text-[#330F09]">
                  {p.title}
                </h3>
                <p className="w-[183px] text-center font-inter text-xs font-normal leading-[140%] text-[#5C5A59]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THINKERS WHO BUILT THE FOUNDATIONS */}
      <section id="philosophy" className="bg-cream py-20">
        <div className="container">
          <ThinkersSection />
        </div>
      </section>

      {/* IDEAS THAT SHAPE THE CONTINENT */}
      <section className="bg-stone-100 py-20">
        <div className="container">
          <IdeasSection />
        </div>
      </section>

      {/* REPORT CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-950 from 18% via-yellow-900 to-yellow-950">
        <div className="container flex min-h-[692px] items-center gap-12 py-10">
          {/* Book cover — allowed to overflow top/bottom */}
          <div className="relative hidden shrink-0 lg:block">
            <Image
              src="/The-Afrocritik-Report-2.png"
              alt="The Afrocritik Report 2025"
              width={517}
              height={625}
              className="relative z-10 object-cover"
              style={{ maxHeight: "625px" }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <p className="font-hedvig text-sm font-normal capitalize leading-4 text-orange-400">
              The Afrocritik Report 2025
            </p>

            <h2 className="max-w-[549px] font-baskervville text-4xl font-bold capitalize leading-10 text-orange-100">
              What The Report Signals
            </h2>

            <p className="max-w-[564px] font-inter text-base font-normal capitalize leading-6 text-white/90">
              Each year, the Afrocritik Report maps the cultural forces shaping
              Africa and its diaspora — the breakthroughs, the ruptures, and the
              tensions that define the moment. The 2025 edition reveals a
              continent whose creative output is globally ascendant, even as the
              infrastructure beneath it remains deeply contested.
            </p>

            {/* Stat badges */}
            <div className="flex flex-wrap gap-3">
              {["151 PAGES", "5 SECTIONS", "20+ CONTRIBUTORS"].map((badge) => (
                <div
                  key={badge}
                  className="flex h-9 items-center rounded-lg bg-orange-100/10 px-5 text-xs font-semibold leading-3 text-stone-100 outline outline-1 outline-orange-400 font-inter"
                >
                  {badge}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/explore?tab=reports"
              className="inline-flex h-12 w-fit items-center justify-center rounded-xl px-10 font-inter text-xl font-medium capitalize leading-7 text-yellow-950"
              style={{
                background: "linear-gradient(42deg, #92400E 15%, #FB923C 81%)",
              }}
            >
              View Report
            </Link>
          </div>
        </div>
      </section>

      {/* ESSENTIAL WORKS IN MUSIC */}
      <section
        className="relative overflow-hidden pt-24 pb-12"
        style={{
          background: "linear-gradient(180deg, #794C2D 52.4%, #4D311D 73.19%)",
        }}
      >
        <div className="container">
          <SectionHeading
            title="Essential Works In Music"
            linkText="View All →"
            linkHref="/explore?q=music"
          />
        </div>
        {/* Full-width row so the NEXT button can bleed off the viewport right edge */}
        <div className="relative">
          <div
            className="hide-scrollbar flex justify-end gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            {EWIM_MUSIC.map((w) => (
              <WorkCard key={w.title} {...w} ewim />
            ))}
          </div>
          {/* NEXT button — chevron visible at viewport right edge, dark rectangle bleeds off */}
          <button
            aria-label="Next"
            className="absolute hidden lg:flex items-center justify-center"
            style={{
              top: "40%",
              right: "-24px",
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
      </section>

      {/* EXPLORE BASED ON POPULAR INTEREST */}
      <section className="bg-[#59341F] pt-32 pb-12">
        <div className="container">
          <div className="flex justify-between items-end pb-12">
            <h2 className="text-white text-4xl font-normal font-montserrat capitalize leading-10">
              explore based on popular interest
            </h2>
            <Link
              href="/explore"
              className="text-center text-orange-400 text-3xl font-semibold font-inter capitalize leading-8 shrink-0 ml-8"
            >
              See More
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {[
              { label: "Movies", image: "/EBOPI-Image-1.png" },
              { label: "Literature", image: "/EBOPI-Image-2.jpg" },
              { label: "Report", image: "/EBOPI-Image-3.png" },
              { label: "Biography", image: "/EBOPI-Image-4.jpg" },
            ].map(({ label, image }) => (
              <Link
                key={label}
                href={`/explore?q=${label.toLowerCase()}`}
                className="h-80 bg-yellow-700 rounded-[20px] flex flex-col justify-start items-center"
              >
                <div className="self-stretch h-60 relative rounded-tl-[20px] rounded-tr-[20px]">
                  <Image
                    src={image}
                    alt={label}
                    fill
                    className="rounded-tl-[20px] rounded-tr-[20px] object-cover"
                  />
                  <div className="absolute inset-0 bg-white/10 rounded-tl-[20px] rounded-tr-[20px]" />
                </div>
                <div className="self-stretch px-7 pt-5 pb-6 flex flex-col justify-start items-start gap-6">
                  <div className="self-stretch text-white text-base font-semibold font-['Work_Sans'] capitalize leading-6">
                    {label}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ESSENTIAL WORKS IN LITERATURE */}
      <section className="relative overflow-hidden bg-[#59341F] py-24">
        <div className="container">
          <SectionHeading
            title="Essential Works In Literature"
            linkText="View All →"
            linkHref="/explore?q=literature"
          />
        </div>
        {/* Full-width row so the NEXT button can bleed off the viewport right edge */}
        <div className="relative">
          <div
            className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            {EWIL_LITERATURE.map((w) => (
              <WorkCard key={w.image} {...w} ewil />
            ))}
          </div>
          {/* NEXT button — chevron visible at viewport right edge, dark rectangle bleeds off */}
          <button
            aria-label="Next"
            className="absolute hidden lg:flex items-center justify-center"
            style={{
              top: "40%",
              right: "-24px",
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
      </section>

      {/* FROM CULTURE TO KNOWLEDGE */}
      <section className="bg-cream py-20">
        <div className="container">
          <div className="flex flex-col">
            <span className="font-hedvig text-sm font-normal capitalize leading-[110%] text-[#ED9828]">
              How the Platform operates
            </span>
            <h2 className="mt-3 max-w-[607px] font-baskervville text-[40px] font-bold capitalize leading-[110%] text-[#330F09]">
              From Culture To Knowledge
            </h2>
            <p className="mt-3 flex h-[86px] max-w-[622px] flex-col justify-center font-inter text-base font-normal capitalize leading-[140%] text-[#3B3B3B]">
              Culture does not organize itself. Every work, idea, and thinker
              passes through a structured pipeline — from raw production to
              lasting institutional knowledge.
            </p>
          </div>
          <div className="mt-10 flex overflow-x-auto">
            {KNOWLEDGE_STEPS.map((s, i) => {
              const isFirst = i === 0;
              const isLast = i === KNOWLEDGE_STEPS.length - 1;
              return (
                <div
                  key={s.title}
                  className={`flex shrink-0 flex-col items-center justify-center gap-3 size-56 bg-stone-100 border border-yellow-700/30 px-4${
                    isFirst ? " rounded-tl-xl rounded-bl-xl" : " -ml-px"
                  }${isLast ? " rounded-tr-xl rounded-br-xl" : ""}`}
                >
                  <span className="text-yellow-700/30 text-4xl font-normal font-hedvig capitalize leading-[56px]">
                    {s.step}
                  </span>
                  <h3 className="text-center text-neutral-700 text-lg font-bold font-montserrat capitalize leading-6">
                    {s.title}
                  </h3>
                  <p className="text-center text-neutral-700 text-[10px] font-normal font-inter capitalize leading-3">
                    {s.desc}
                  </p>
                </div>
              );
            })}
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
