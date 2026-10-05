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
  music: "/icons/music.svg",
  literature: "/icons/literature.svg",
  report: "/icons/report.svg",
  biography: "/icons/biography.svg",
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
      <HomeSectionHeader title="explore based on popular interest" href="/explore" weight={700} linkSize="lg" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-[33px]">
        {items.map((item) => (
          <Link
            key={item.label}
            href={`/explore?q=${encodeURIComponent(item.category || item.label.toLowerCase())}`}
            className="group flex aspect-[269/309] flex-col items-center justify-center gap-[18px] rounded-[20px] border border-transparent transition-colors duration-300 hover:border-[#ED9828]/70"
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
              className="h-14 w-14 transition-transform duration-300 group-hover:scale-110 md:h-[90px] md:w-[90px]"
            />
            <span
              className="capitalize text-white"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(18px, 2.2vw, 30px)",
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
