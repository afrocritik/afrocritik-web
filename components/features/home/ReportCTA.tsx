import Link from "next/link";
import Image from "next/image";
import { getMediaUrl } from "@/lib/api";
import { CardImage } from "@/components/common/CardImage";

const DEFAULT_COVER = "/The-Afrocritik-Report-2.png";

interface FeaturedReport {
  slug?: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  coverImage?: unknown;
  stats?: { value?: string; label?: string }[];
}

const DEFAULT_BADGES = ["151 PAGES", "5 SECTIONS", "20+ CONTRIBUTORS"];

export function ReportCTA({ report }: Readonly<{ report?: FeaturedReport }>) {
  const eyebrow = report?.subtitle || report?.title || "The Afrocritik Report 2025";
  const summary =
    report?.summary ||
    "Each year, the Afrocritik Report maps the cultural forces shaping Africa and its diaspora — the breakthroughs, the ruptures, and the tensions that define the moment. The 2025 edition reveals a continent whose creative output is globally ascendant, even as the infrastructure beneath it remains deeply contested.";
  const remoteCover = getMediaUrl(report?.coverImage);
  const coverAlt = report?.title || "The Afrocritik Report 2025";
  const badges =
    report?.stats && report.stats.length > 0
      ? report.stats
          .map((s) => [s.value, s.label].filter(Boolean).join(" "))
          .filter(Boolean)
      : DEFAULT_BADGES;
  const href = report?.slug ? `/reports/${report.slug}` : "/explore?tab=reports";

  return (
    <div className="container flex min-h-[692px] items-center gap-12 py-10">
      {/* Book cover — allowed to overflow top/bottom */}
      <div className="relative hidden shrink-0 lg:block">
        <CardImage
          src={remoteCover || undefined}
          alt={coverAlt}
          className="relative z-10 object-cover"
          style={{ width: "517px", height: "625px", maxHeight: "625px" }}
          // No cover, or a broken remote cover → fall back to the bundled default.
          fallback={
            <Image
              src={DEFAULT_COVER}
              alt={coverAlt}
              width={517}
              height={625}
              className="relative z-10 object-cover"
              style={{ maxHeight: "625px" }}
            />
          }
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6">
        <p className="font-inter text-sm font-normal capitalize leading-4 text-orange-400">
          {eyebrow}
        </p>

        <h2 className="max-w-[549px] font-baskervville text-4xl font-bold capitalize leading-10 text-orange-100">
          What The Report Signals
        </h2>

        <p className="max-w-[564px] font-inter text-base font-normal capitalize leading-6 text-white/90">
          {summary}
        </p>

        {/* Stat badges + CTA */}
        <div className="flex w-fit flex-col gap-6">
          {badges.length > 0 && (
            <div className="flex gap-3">
              {badges.map((badge) => (
                <div
                  key={badge}
                  className="flex h-9 items-center rounded-lg bg-orange-100/10 px-5 text-xs font-semibold leading-3 text-stone-100 outline outline-1 outline-orange-400 font-inter"
                >
                  {badge}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <Link
            href={href}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl px-10 font-inter text-xl font-medium capitalize leading-7 text-yellow-950"
            style={{
              background: "linear-gradient(42deg, #92400E 15%, #FB923C 81%)",
            }}
          >
            View Report
          </Link>
        </div>
      </div>
    </div>
  );
}
