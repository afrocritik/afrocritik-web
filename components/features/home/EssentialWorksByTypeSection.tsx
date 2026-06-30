import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselRow } from "@/components/common/CarouselRow";
import { mapWorkToCard } from "@/lib/api";

// Human-readable label per Work type, used when an editor hasn't set a custom
// heading on the section.
const TYPE_LABEL: Record<string, string> = {
  film: "Film",
  music: "Music",
  literature: "Literature",
  "visual-art": "Visual Art",
  theatre: "Theatre",
  television: "Television",
};

interface Props {
  type: string;
  heading?: string;
  works?: any[];
}

/**
 * Generic "Essential Works In {Type}" homepage section. Renders the works it's
 * given as a horizontal carousel, picking the card styling that matches the
 * type (music → EWIM, literature → EWIL, everything else → the essential card).
 * Replaces the old hard-coded EssentialMusicSection / EssentialLiteratureSection
 * so admins can add a section for any Work type.
 */
export function EssentialWorksByTypeSection({ type, heading, works = [] }: Props) {
  const cards = works.map(mapWorkToCard);
  const label = TYPE_LABEL[type] ?? type;
  const title = heading?.trim() || `Essential Works In ${label}`;
  const cardVariant =
    type === "music" ? { ewim: true } : type === "literature" ? { ewil: true } : { essential: true };

  return (
    <>
      <div className="container">
        <SectionHeading
          title={title}
          linkText={cards.length > 0 ? "View All →" : undefined}
          linkHref={cards.length > 0 ? `/explore?q=${encodeURIComponent(type)}` : undefined}
          font="serif"
          bleedRight
        />
      </div>
      <div>
        {cards.length > 0 ? (
          <CarouselRow
            className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))", paddingRight: "24px" }}
          >
            {cards.map((w) => (
              <WorkCard key={w.slug} {...w} {...cardVariant} />
            ))}
          </CarouselRow>
        ) : (
          <div
            className="flex items-center justify-center py-14"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            <p className="text-orange-200/50 font-inter text-sm italic">
              {label} works coming soon — content is being curated.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
