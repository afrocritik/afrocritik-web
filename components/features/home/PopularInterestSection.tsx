import Link from "next/link";
import { HomeSectionHeader } from "./HomeSectionHeader";

interface InterestItem {
  label: string;
  /** Legacy CMS field — tiles are now icon-based, so this is ignored. */
  image?: string;
  category?: string;
}

const DEFAULT_INTERESTS: InterestItem[] = [
  { label: "Music", category: "music" },
  { label: "Literature", category: "literature" },
  { label: "Report", category: "report" },
  { label: "Biography", category: "biography" },
];

// Icons live in /public/icons. Matched on the editor's category or label so
// CMS-curated tiles still get the right glyph.
const ICONS: Record<string, string> = {
  music: "/icons/interests/music.svg",
  literature: "/icons/interests/literature.svg",
  report: "/icons/interests/report.svg",
  biography: "/icons/interests/biography.svg",
};

function iconFor(item: InterestItem): string {
  const key = `${item.category ?? ""} ${item.label}`.toLowerCase();
  const match = Object.keys(ICONS).find((k) => key.includes(k));
  if (match) return ICONS[match];
  if (/(film|movie|nollywood)/.test(key)) return ICONS.literature;
  if (/(people|person|bio)/.test(key)) return ICONS.biography;
  return ICONS.report;
}

export function PopularInterestSection({
  interests,
}: Readonly<{ interests?: InterestItem[] }>) {
  const items = interests && interests.length > 0 ? interests : DEFAULT_INTERESTS;

  return (
    <>
      <HomeSectionHeader title="explore based on popular interest" href="/explore" />
      <div className="mx-auto grid max-w-[640px] grid-cols-2 gap-3 lg:max-w-[760px] lg:grid-cols-4 lg:gap-4">
        {items.map((item) => (
          <Link
            key={item.label}
            href={`/explore?q=${encodeURIComponent(item.category || item.label.toLowerCase())}`}
            className="group flex aspect-[269/250] flex-col items-center justify-center gap-2.5 rounded-[14px] border border-transparent transition-colors duration-300 hover:border-[#ED9828]/70"
            style={{
              background: "rgba(255, 255, 255, 0.10)",
              backdropFilter: "blur(7.5px)",
              WebkitBackdropFilter: "blur(7.5px)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconFor(item)}
              alt=""
              aria-hidden
              className="h-9 w-9 transition-transform duration-300 group-hover:scale-110 md:h-[50px] md:w-[50px]"
            />
            <span
              className="capitalize text-white"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(14px, 1.4vw, 18px)",
                fontWeight: 500,
                lineHeight: "140%",
              }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
