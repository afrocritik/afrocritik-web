import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Bookmark } from "lucide-react";
import { WorkCard } from "@/components/common/WorkCard";
import { SectionHeading } from "@/components/common/SectionHeading";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const TAGS = ["Literature", "Post-Colonialism", "Igbo Culture"];

const FACTS = [
  { label: "Role", value: "Author & Cultural Critic" },
  { label: "Born", value: "1930, Ogidi, Nigeria" },
  { label: "Country", value: "Nigeria" },
  { label: "Active", value: "1958 – 2013" },
];

const WORKS = [
  { slug: "things-fall-apart", title: "Things Fall Apart", type: "Literature", year: 1958, country: "Nigeria", rating: 4.9, badge: "BOOK REVIEW", image: "/EWIL-Image-1.png", description: "The cornerstone of modern African literature." },
  { slug: "no-longer-at-ease", title: "No Longer at Ease", type: "Literature", year: 1960, country: "Nigeria", rating: 4.6, badge: "BOOK REVIEW", image: "/EWIL-Image-2.png", description: "A civil servant caught between tradition and modernity." },
  { slug: "arrow-of-god", title: "Arrow of God", type: "Literature", year: 1964, country: "Nigeria", rating: 4.7, badge: "BOOK REVIEW", image: "/EWIL-Image-3.png", description: "A chief priest reckons with colonial power." },
  { slug: "anthills-of-the-savannah", title: "Anthills of the Savannah", type: "Literature", year: 1987, country: "Nigeria", rating: 4.5, badge: "BOOK REVIEW", image: "/EWIL-Image-4.png", description: "Power and friendship in a fictional West African state." },
];

export default function PersonDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const name = titleCase(params.slug || "person");

  return (
    <div className="bg-[#160907]">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 py-4 font-inter text-xs text-orange-100/70">
          <Link href="/explore?tab=people" className="transition-colors hover:text-amber">
            People
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white">{name}</span>
        </div>

        {/* Hero */}
        <section className="grid gap-8 pb-12 md:grid-cols-[260px_1fr]">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative size-56 overflow-hidden rounded-full border border-yellow-700">
              <Image src="/EW-Image-3.png" alt={name} fill className="object-cover object-top" />
            </div>
            <button
              className="mt-5 inline-flex h-11 w-full max-w-56 items-center justify-center gap-2 rounded-xl px-6 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
            >
              <Bookmark className="size-4" /> Follow
            </button>
          </div>

          <div className="flex flex-col">
            <h1 className="font-baskervville text-4xl font-semibold leading-tight text-white md:text-5xl">
              {name}
            </h1>
            <p className="mt-2 font-inter text-lg text-amber">Author &amp; Cultural Critic</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-yellow-950/50 px-3 py-1 font-inter text-xs text-orange-100 outline outline-1 outline-yellow-700/60"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-orange-100">
              A foundational figure in African letters whose work reframed how
              the continent narrates its own history, identity, and values to
              the world.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-yellow-700 bg-yellow-950/50 px-4 py-3"
                >
                  <dt className="font-inter text-xs uppercase tracking-wide text-orange-100/60">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-inter text-sm font-semibold text-white">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Selected Works */}
        <section className="pb-20">
          <SectionHeading title="Selected Works" font="serif" linkText="See all →" linkHref="/explore" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {WORKS.map((w) => (
              <WorkCard key={w.slug} explore {...w} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
