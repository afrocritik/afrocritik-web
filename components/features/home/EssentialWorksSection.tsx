import { HomeSectionHeader } from "./HomeSectionHeader";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselRow } from "@/components/common/CarouselRow";
import { mapWorkToCard } from "@/lib/api";

interface Props {
  works?: any[];
}

// Cards are sized so ~4 show per view; the rest are reached via the carousel's
// Next button. Cap the pool so the row stays a reasonable length.
const MAX_ESSENTIAL_WORKS = 12;

// "See More" only appears once the row overflows (4 full cards + the peeking fifth).
const MIN_CARDS_FOR_SEE_MORE = 5;

export function EssentialWorksSection({ works = [] }: Props) {
  const cards = works.slice(0, MAX_ESSENTIAL_WORKS).map(mapWorkToCard);

  return (
    <>
      <div className="container">
        <HomeSectionHeader title="Spotlighted Works" href={cards.length >= MIN_CARDS_FOR_SEE_MORE ? "/explore" : undefined} bleed />
      </div>
      <div>
        {cards.length > 0 ? (
          <CarouselRow
            className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-2"
            style={{ minHeight: "395px", paddingLeft: "max(24px, calc(50vw - 636px))", paddingRight: "12px" }}
            buttonTop="30%"
          >
            {cards.map((w) => (
              <WorkCard key={w.slug} {...w} essential spotlight />
            ))}
          </CarouselRow>
        ) : (
          <div
            className="flex items-center justify-center py-16"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            <p className="text-orange-200/50 font-inter text-sm italic">
              Essential works coming soon — our curators are on it.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
