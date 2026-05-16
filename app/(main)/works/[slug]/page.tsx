import Link from "next/link";
import { ChevronRight, Bookmark, Star } from "lucide-react";
import { WorkCard } from "@/components/common/WorkCard";
import { SectionHeading } from "@/components/common/SectionHeading";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const RELATED = [
  { title: "Half of a Yellow Sun", type: "Literature", year: 2006, country: "Nigeria", rating: 4.9 },
  { title: "Things Fall Apart", type: "Literature", year: 1958, country: "Nigeria", rating: 4.9 },
  { title: "Tsotsi", type: "Film", year: 2005, country: "South Africa", rating: 4.5 },
  { title: "Zombie", type: "Music", year: 1976, country: "Nigeria", rating: 4.8 },
];

export default function WorkDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const title = titleCase(params.slug || "work");

  return (
    <div className="bg-bg-primary">
      <div className="container flex items-center gap-1.5 py-4 text-xs text-ink-muted">
        <Link href="/explore" className="hover:text-amber">
          Explore
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink-secondary">{title}</span>
      </div>

      <div className="container grid gap-8 pb-16 md:grid-cols-[300px_1fr]">
        <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-[#5C2E00] to-[#1C0A00]" />
        <div>
          <span className="rounded bg-amber-soft px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-amber">
            Film
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            {title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-muted">
            <span>2024</span>
            <span>Nigeria</span>
            <span className="flex items-center gap-1 text-ink-secondary">
              <Star className="h-4 w-4 fill-amber text-amber" /> 4.7
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-secondary">
            A landmark work in the African cultural canon — examined here for
            its craft, context, and lasting influence on the creative
            landscape of the continent and its diaspora.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-hover">
              <Bookmark className="h-4 w-4" /> Save to archive
            </button>
          </div>
        </div>
      </div>

      <section className="container pb-20">
        <SectionHeading
          title="Related Works"
          linkText="See all →"
          linkHref="/explore"
        />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {RELATED.map((w) => (
            <WorkCard key={w.title} {...w} />
          ))}
        </div>
      </section>
    </div>
  );
}
