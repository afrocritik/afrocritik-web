import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WorkCard } from "@/components/common/WorkCard";
import { SectionHeading } from "@/components/common/SectionHeading";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const WORKS = [
  { title: "Things Fall Apart", type: "Literature", year: 1958, country: "Nigeria", rating: 4.9 },
  { title: "No Longer at Ease", type: "Literature", year: 1960, country: "Nigeria", rating: 4.6 },
  { title: "Arrow of God", type: "Literature", year: 1964, country: "Nigeria", rating: 4.7 },
  { title: "Anthills of the Savannah", type: "Literature", year: 1987, country: "Nigeria", rating: 4.5 },
];

export default function PersonDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const name = titleCase(params.slug || "person");

  return (
    <div className="bg-bg-primary">
      <div className="container flex items-center gap-1.5 py-4 text-xs text-ink-muted">
        <Link href="/explore?tab=people" className="hover:text-amber">
          People
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink-secondary">{name}</span>
      </div>

      <div className="container grid gap-8 pb-12 md:grid-cols-[240px_1fr]">
        <div className="h-60 w-60 overflow-hidden rounded-full bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
        <div>
          <h1 className="font-display text-3xl font-bold text-white md:text-4xl">
            {name}
          </h1>
          <p className="mt-1 text-amber">Author & Cultural Critic</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Literature", "Post-Colonialism", "Igbo Culture"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-amber-line px-3 py-1 text-xs text-ink-secondary"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-secondary">
            A foundational figure in African letters whose work reframed how
            the continent narrates its own history, identity, and values to
            the world.
          </p>
        </div>
      </div>

      <section className="container pb-20">
        <SectionHeading title="Selected Works" />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {WORKS.map((w) => (
            <WorkCard key={w.title} {...w} />
          ))}
        </div>
      </section>
    </div>
  );
}
