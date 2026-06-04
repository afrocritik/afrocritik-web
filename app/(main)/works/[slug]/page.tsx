import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Bookmark, Share2, Star } from "lucide-react";
import { WorkCard } from "@/components/common/WorkCard";
import { SectionHeading } from "@/components/common/SectionHeading";

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const META = [
  { label: "Type", value: "Film" },
  { label: "Year", value: "2024" },
  { label: "Country", value: "Nigeria" },
  { label: "Duration", value: "2h 15m" },
];

const TAGS = ["Nigeria", "Drama", "Classic"];

const RELATED = [
  { slug: "half-of-a-yellow-sun", title: "Half of a Yellow Sun", type: "Literature", year: 2006, country: "Nigeria", rating: 4.9, badge: "BOOK REVIEW", image: "/EBOPI-Image-2.jpg", description: "A sweeping story of love and war set in 1960s Nigeria." },
  { slug: "things-fall-apart", title: "Things Fall Apart", type: "Literature", year: 1958, country: "Nigeria", rating: 4.9, badge: "BOOK REVIEW", image: "/EWIL-Image-1.png", description: "The cornerstone of modern African literature." },
  { slug: "tsotsi", title: "Tsotsi", type: "Film", year: 2005, country: "South Africa", rating: 4.5, badge: "FILM REVIEW", image: "/EW-Image-3.png", description: "A young gangster confronts his conscience in Johannesburg." },
  { slug: "zombie", title: "Zombie", type: "Music", year: 1976, country: "Nigeria", rating: 4.8, badge: "ALBUM REVIEW", image: "/EW-Image-4.jpg", description: "Fela Kuti's searing critique of military rule." },
];

export default function WorkDetailPage({
  params,
}: {
  readonly params: { slug: string };
}) {
  const title = titleCase(params.slug || "work");

  return (
    <div className="bg-[#160907]">
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 py-4 font-inter text-xs text-orange-100/70">
          <Link href="/explore" className="transition-colors hover:text-amber">
            Explore
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-white">{title}</span>
        </div>

        {/* Hero */}
        <section className="grid gap-6 pb-12 lg:grid-cols-[320px_1fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-yellow-700">
            <Image src="/EBOPI-Image-2.jpg" alt={title} fill className="object-cover" />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-md bg-red-700 px-2.5 py-1 font-inter text-[11px] font-medium uppercase tracking-wide text-white">
                Film Review
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-yellow-950/60 px-2.5 py-1 font-inter text-sm text-white outline outline-1 outline-yellow-700">
                <Star className="size-3.5 fill-amber text-amber" /> 4.7
              </span>
            </div>

            <h1 className="mt-4 font-baskervville text-4xl font-semibold leading-tight text-white md:text-5xl">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl font-inter text-base font-light leading-relaxed text-orange-100">
              A landmark work in the African cultural canon — examined here for
              its craft, context, and lasting influence on the creative
              landscape of the continent and its diaspora.
            </p>

            {/* Meta grid */}
            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {META.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-yellow-700 bg-yellow-950/50 px-4 py-3"
                >
                  <dt className="font-inter text-xs uppercase tracking-wide text-orange-100/60">
                    {m.label}
                  </dt>
                  <dd className="mt-1 font-inter text-sm font-semibold text-white">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-yellow-950/50 px-3 py-1 font-inter text-xs text-orange-100 outline outline-1 outline-yellow-700/60"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                className="inline-flex h-11 items-center gap-2 rounded-xl px-6 font-inter text-sm font-medium text-yellow-950 transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(42deg, #A16207 15%, #FB923C 81%)" }}
              >
                <Bookmark className="size-4" /> Save to archive
              </button>
              <button className="inline-flex h-11 items-center gap-2 rounded-xl border border-yellow-700 px-5 font-inter text-sm font-medium text-white transition-colors hover:bg-white/5">
                <Share2 className="size-4" /> Share
              </button>
            </div>
          </div>
        </section>

        {/* Related Works */}
        <section className="pb-20">
          <SectionHeading title="Related Works" font="serif" linkText="See all →" linkHref="/explore" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {RELATED.map((w) => (
              <WorkCard key={w.slug} explore {...w} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
