import { SectionHeading } from "@/components/common/SectionHeading";
import { WorkCard } from "@/components/common/WorkCard";
import { CarouselRow } from "@/components/common/CarouselRow";
import { mapWorkToCard } from "@/lib/api";

interface Props {
  works?: any[];
}

export function EssentialLiteratureSection({ works = [] }: Props) {
  const cards = works.map(mapWorkToCard);

  return (
    <>
      <div className="container">
        <SectionHeading
          title="Essential Works In Literature"
          linkText={cards.length > 0 ? "View All →" : undefined}
          linkHref={cards.length > 0 ? "/explore?q=literature" : undefined}
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
              <WorkCard key={w.slug} {...w} ewil />
            ))}
          </CarouselRow>
        ) : (
          <div
            className="flex items-center justify-center py-14"
            style={{ paddingLeft: "max(24px, calc(50vw - 636px))" }}
          >
            <p className="text-orange-200/50 font-inter text-sm italic">
              Literature works coming soon — content is being curated.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
