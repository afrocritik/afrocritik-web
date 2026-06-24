import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselNextButton } from "@/components/common/CarouselNextButton";
import { mapWorkToCard } from "@/lib/api";

interface Props {
  works?: any[];
}

export function EssentialMusicSection({ works = [] }: Props) {
  const cards = works.map(mapWorkToCard);

  return (
    <>
      <div className="container">
        <SectionHeading
          title="Essential Works In Music"
          linkText="View All →"
          linkHref="/explore?q=music"
          font="serif"
          bleedRight
        />
      </div>
      <div className="relative">
        {cards.length > 0 ? (
          <div
            className="hide-scrollbar flex justify-between gap-5 overflow-x-auto scroll-smooth pb-2 lg:overflow-x-visible"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))", paddingRight: "24px" }}
          >
            {cards.map((w) => (
              <WorkCard key={w.slug} {...w} ewim />
            ))}
          </div>
        ) : (
          <div
            className="flex items-center justify-center py-14"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            <p className="text-orange-200/50 font-inter text-sm italic">
              Music works coming soon — content is being curated.
            </p>
          </div>
        )}
        <CarouselNextButton />
      </div>
    </>
  );
}
